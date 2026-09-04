import { promises as fs } from "fs";
import path from "path";
import { mockEpidemicAlerts, mockRegionalOccupancy, mockSeasonalEvents } from "@/data/mock-external";
import { consumptionTrend, mockMedicines } from "@/data/mock-medicines";
import { mockPurchases, mockPurchaseSuggestions, type Purchase } from "@/data/mock-purchases";
import { mockTransfers, type Transfer } from "@/data/mock-transfers";
import { mockUnitStocks, mockUnits, type Unit, type UnitStock } from "@/data/mock-units";
import type {
    CategoryLossPoint,
    DashboardMetrics,
    DashboardSnapshot,
    MatchCandidate,
    PlatformSnapshot,
    PurchaseHistoryPoint,
    SyncJob,
} from "@/lib/platform-types";

type PlatformState = {
    units: Unit[];
    medicines: typeof mockMedicines;
    unitStocks: UnitStock[];
    transfers: Transfer[];
    purchases: Purchase[];
    syncJobs: SyncJob[];
};

const DATA_DIR = path.join(process.cwd(), ".synthera");
const DATA_FILE = path.join(DATA_DIR, "platform-db.json");
const EXCESS_THRESHOLD = 1.4;
const POTENTIAL_SAVINGS_RATE = 0.22;
const MAX_MATCH_CANDIDATES = 6;

function clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

function createSeedState(): PlatformState {
    return clone({
        units: mockUnits,
        medicines: mockMedicines,
        unitStocks: mockUnitStocks,
        transfers: mockTransfers,
        purchases: mockPurchases,
        syncJobs: [
            {
                id: "sync-001",
                source: "ERP",
                kind: "importacao",
                status: "success",
                startedAt: "2026-09-04T15:10:00.000Z",
                finishedAt: "2026-09-04T15:42:00.000Z",
                recordsProcessed: 1842,
                recordsRejected: 3,
                message: "Importação reconciliada com sucesso.",
            },
            {
                id: "sync-002",
                source: "Planilha",
                kind: "reconciliacao",
                status: "warning",
                startedAt: "2026-09-03T08:20:00.000Z",
                finishedAt: "2026-09-03T08:35:00.000Z",
                recordsProcessed: 128,
                recordsRejected: 9,
                message: "9 linhas exigiram ajuste manual de unidade e medicamento.",
            },
            {
                id: "sync-003",
                source: "SFTP",
                kind: "previsao",
                status: "running",
                startedAt: "2026-09-04T15:50:00.000Z",
                finishedAt: null,
                recordsProcessed: 0,
                recordsRejected: 0,
                message: "Rodando recalculo de forecast e risco por unidade.",
            },
        ],
    });
}

async function ensureStateFile(): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify(createSeedState(), null, 2), "utf8");
    }
}

async function readState(): Promise<PlatformState> {
    await ensureStateFile();
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as PlatformState;
}

async function writeState(state: PlatformState): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), "utf8");
}

function buildMetrics(medicines: PlatformState["medicines"]): DashboardMetrics {
    const totalFinancialRisk = medicines.reduce((sum, medicine) => sum + medicine.financialRisk, 0);
    const criticalShortageAlerts = medicines.filter((medicine) => medicine.shortageRisk >= 80).length;
    const excessStockItems = medicines.filter(
        (medicine) => medicine.currentStock > medicine.forecastConsumption * EXCESS_THRESHOLD,
    ).length;
    const potentialSavings = Math.round(totalFinancialRisk * POTENTIAL_SAVINGS_RATE);

    return {
        totalFinancialRisk,
        criticalShortageAlerts,
        excessStockItems,
        potentialSavings,
    };
}

function buildCategoryLossRisk(medicines: PlatformState["medicines"]): CategoryLossPoint[] {
    const categoryTotals = new Map<string, number>();

    for (const medicine of medicines) {
        categoryTotals.set(
            medicine.category,
            (categoryTotals.get(medicine.category) ?? 0) + medicine.financialRisk,
        );
    }

    return Array.from(categoryTotals.entries())
        .map(([category, risk]) => ({ category: category as CategoryLossPoint["category"], risk }))
        .sort((left, right) => right.risk - left.risk);
}

function buildPurchaseHistory(purchases: Purchase[]): PurchaseHistoryPoint[] {
    const byMonth = new Map<string, { value: number; items: number }>();

    for (const purchase of purchases) {
        const month = new Date(purchase.orderDate).toLocaleDateString("pt-BR", {
            month: "short",
            year: "2-digit",
        });
        const current = byMonth.get(month) ?? { value: 0, items: 0 };
        current.value += purchase.totalValue;
        current.items += 1;
        byMonth.set(month, current);
    }

    return Array.from(byMonth.entries()).map(([month, entry]) => ({
        month,
        value: entry.value,
        items: entry.items,
    }));
}

function buildMatchCandidates(state: PlatformState): MatchCandidate[] {
    const unitsById = new Map(state.units.map((unit) => [unit.id, unit]));
    const medicinesById = new Map(state.medicines.map((medicine) => [medicine.id, medicine]));

    const excessItems = state.unitStocks
        .filter((stock) => stock.currentStock > stock.forecastConsumption * EXCESS_THRESHOLD)
        .map((stock) => ({
            ...stock,
            medicineName: medicinesById.get(stock.medicineId)?.name ?? stock.medicineId,
            unit: unitsById.get(stock.unitId),
        }));

    const shortageItems = state.unitStocks
        .filter((stock) => stock.currentStock < stock.forecastConsumption)
        .map((stock) => ({
            ...stock,
            medicineName: medicinesById.get(stock.medicineId)?.name ?? stock.medicineId,
            unit: unitsById.get(stock.unitId),
        }));

    return excessItems
        .flatMap((source) => {
            const sourceUnit = source.unit;
            if (!sourceUnit) {
                return [];
            }

            return shortageItems
                .filter((destination) => {
                    const destinationUnit = destination.unit;
                    return (
                        destination.medicineId === source.medicineId &&
                        destination.unitId !== source.unitId &&
                        destinationUnit &&
                        sourceUnit.companyId !== destinationUnit.companyId
                    );
                })
                .map((destination) => {
                    const destinationUnit = destination.unit;
                    const transferableQty = Math.min(
                        source.currentStock - source.forecastConsumption,
                        destination.forecastConsumption - destination.currentStock,
                    );

                    return {
                        id: `${source.unitId}-${destination.unitId}-${source.medicineId}`,
                        sourceUnitId: source.unitId,
                        sourceUnit: sourceUnit.name,
                        sourceCompany: sourceUnit.companyName,
                        sourceLocation: sourceUnit.location,
                        sourceHas: source.medicineName,
                        sourceAvailableQty: Math.max(0, source.currentStock - source.forecastConsumption),
                        destinationUnitId: destination.unitId,
                        destinationUnit: destinationUnit?.name ?? destination.unitId,
                        destinationCompany: destinationUnit?.companyName ?? "Empresa vinculada",
                        destinationLocation: destinationUnit?.location ?? "Local não informado",
                        destinationNeeds: destination.medicineName,
                        destinationNeedQty: Math.max(0, destination.forecastConsumption - destination.currentStock),
                        medicineName: source.medicineName,
                        medicineId: source.medicineId,
                        transferableQty: Math.max(0, transferableQty),
                        score: Math.min(98, 72 + Math.round((transferableQty / 30) * 18)),
                    };
                });
        })
        .filter((candidate) => candidate.transferableQty > 0)
        .sort((left, right) => right.score - left.score)
        .slice(0, MAX_MATCH_CANDIDATES);
}

function buildDashboardSnapshot(state: PlatformState): DashboardSnapshot {
    const latestSyncJob = [...state.syncJobs].sort((left, right) => {
        return new Date(right.startedAt).getTime() - new Date(left.startedAt).getTime();
    })[0];

    return {
        metrics: buildMetrics(state.medicines),
        consumptionTrend: clone(consumptionTrend),
        categoryLossRisk: buildCategoryLossRisk(state.medicines),
        epidemicAlerts: clone(mockEpidemicAlerts),
        seasonalEvents: clone(mockSeasonalEvents),
        regionalOccupancy: clone(mockRegionalOccupancy),
        purchaseHistory: buildPurchaseHistory(state.purchases),
        lastSyncAt: latestSyncJob ? latestSyncJob.startedAt : new Date().toISOString(),
    };
}

function buildPurchaseSuggestions(medicines: PlatformState["medicines"]) {
    return clone(mockPurchaseSuggestions).filter((suggestion) => {
        const medicine = medicines.find((item) => item.id === suggestion.medicineId);
        return medicine ? medicine.shortageRisk >= 60 || medicine.currentStock < medicine.forecastConsumption : true;
    });
}

export async function getPlatformSnapshot(): Promise<PlatformSnapshot> {
    const state = await readState();
    return {
        units: clone(state.units),
        medicines: clone(state.medicines),
        unitStocks: clone(state.unitStocks),
        transfers: clone(state.transfers).sort(
            (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
        ),
        purchases: clone(state.purchases),
        purchaseSuggestions: buildPurchaseSuggestions(state.medicines),
        syncJobs: clone(state.syncJobs).sort(
            (left, right) => new Date(right.startedAt).getTime() - new Date(left.startedAt).getTime(),
        ),
        dashboard: buildDashboardSnapshot(state),
        matchCandidates: buildMatchCandidates(state),
    };
}

export async function createTransfer(input: {
    fromUnitId: string;
    toUnitId: string;
    medicineId: string;
    quantity: number;
    requestedBy?: string;
}): Promise<Transfer> {
    const state = await readState();
    const medicine = state.medicines.find((item) => item.id === input.medicineId);

    if (!medicine) {
        throw new Error("Medicamento não encontrado.");
    }

    const transfer: Transfer = {
        id: `trf-${Date.now()}`,
        fromUnitId: input.fromUnitId,
        toUnitId: input.toUnitId,
        medicineId: input.medicineId,
        medicineName: medicine.name,
        quantity: input.quantity,
        status: "pendente",
        date: new Date().toISOString().slice(0, 10),
        requestedBy: input.requestedBy?.trim() || "Sistema",
    };

    state.transfers = [transfer, ...state.transfers];
    await writeState(state);

    return transfer;
}