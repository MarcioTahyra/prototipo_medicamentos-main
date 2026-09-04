import type {
    EpidemicAlert,
    RegionalOccupancy,
    SeasonalEvent,
} from "@/data/mock-external";
import type { MedicineCategory, MedicineItem } from "@/data/mock-medicines";
import type { Purchase, PurchaseSuggestion } from "@/data/mock-purchases";
import type { Transfer } from "@/data/mock-transfers";
import type { Unit, UnitStock } from "@/data/mock-units";

export type SyncStatus = "queued" | "running" | "success" | "warning" | "failed";

export type SyncJob = {
    id: string;
    source: "ERP" | "Planilha" | "SFTP";
    kind: "importacao" | "reconciliacao" | "previsao";
    status: SyncStatus;
    startedAt: string;
    finishedAt: string | null;
    recordsProcessed: number;
    recordsRejected: number;
    message: string;
};

export type SpreadsheetImportResult = {
    job: SyncJob;
    processedRows: number;
    updatedRows: number;
    createdRows: number;
    rejectedRows: number;
    totalRows: number;
    message: string;
};

export type DashboardMetrics = {
    totalFinancialRisk: number;
    criticalShortageAlerts: number;
    excessStockItems: number;
    potentialSavings: number;
};

export type ConsumptionPoint = {
    month: string;
    actual: number;
    forecast: number;
};

export type PurchaseHistoryPoint = {
    month: string;
    value: number;
    items: number;
};

export type CategoryLossPoint = {
    category: MedicineCategory;
    risk: number;
};

export type MatchCandidate = {
    id: string;
    sourceUnitId: string;
    sourceUnit: string;
    sourceCompany: string;
    sourceLocation: string;
    sourceHas: string;
    sourceAvailableQty: number;
    destinationUnitId: string;
    destinationUnit: string;
    destinationCompany: string;
    destinationLocation: string;
    destinationNeeds: string;
    destinationNeedQty: number;
    medicineName: string;
    medicineId: string;
    transferableQty: number;
    score: number;
};

export type DashboardSnapshot = {
    metrics: DashboardMetrics;
    consumptionTrend: ConsumptionPoint[];
    categoryLossRisk: CategoryLossPoint[];
    epidemicAlerts: EpidemicAlert[];
    seasonalEvents: SeasonalEvent[];
    regionalOccupancy: RegionalOccupancy[];
    purchaseHistory: PurchaseHistoryPoint[];
    lastSyncAt: string;
};

export type PlatformSnapshot = {
    units: Unit[];
    medicines: MedicineItem[];
    unitStocks: UnitStock[];
    transfers: Transfer[];
    purchases: Purchase[];
    purchaseSuggestions: PurchaseSuggestion[];
    syncJobs: SyncJob[];
    dashboard: DashboardSnapshot;
    matchCandidates: MatchCandidate[];
};