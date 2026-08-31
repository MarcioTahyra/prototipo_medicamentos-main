export type MedicineCategory =
  | "Antibióticos"
  | "Analgésicos"
  | "Oncológicos"
  | "Cardiológicos"
  | "Anestésicos";

export type MedicineItem = {
  id: string;
  name: string;
  batch: string;
  category: MedicineCategory;
  expiryDate: string;
  currentStock: number;
  forecastConsumption: number;
  actualConsumption: number;
  shortageRisk: number;
  financialRisk: number;
  leadTimeDays: number;
};

export const mockMedicines: MedicineItem[] = [
  {
    id: "med-001",
    name: "Ceftriaxona 1g",
    batch: "CTR-2026-07A",
    category: "Antibióticos",
    expiryDate: "2026-06-12",
    currentStock: 420,
    forecastConsumption: 540,
    actualConsumption: 510,
    shortageRisk: 86,
    financialRisk: 22400,
    leadTimeDays: 10,
  },
  {
    id: "med-002",
    name: "Meropenem 500mg",
    batch: "MRP-2026-05C",
    category: "Antibióticos",
    expiryDate: "2026-08-01",
    currentStock: 260,
    forecastConsumption: 390,
    actualConsumption: 402,
    shortageRisk: 79,
    financialRisk: 18400,
    leadTimeDays: 14,
  },
  {
    id: "med-003",
    name: "Dipirona 1g",
    batch: "DIP-2026-11B",
    category: "Analgésicos",
    expiryDate: "2026-12-30",
    currentStock: 3300,
    forecastConsumption: 1700,
    actualConsumption: 1650,
    shortageRisk: 22,
    financialRisk: 5100,
    leadTimeDays: 5,
  },
  {
    id: "med-004",
    name: "Morfina 10mg",
    batch: "MOR-2026-04D",
    category: "Analgésicos",
    expiryDate: "2026-05-20",
    currentStock: 110,
    forecastConsumption: 280,
    actualConsumption: 310,
    shortageRisk: 92,
    financialRisk: 14600,
    leadTimeDays: 7,
  },
  {
    id: "med-005",
    name: "Paclitaxel 100mg",
    batch: "PCT-2026-09F",
    category: "Oncológicos",
    expiryDate: "2026-09-10",
    currentStock: 85,
    forecastConsumption: 140,
    actualConsumption: 132,
    shortageRisk: 67,
    financialRisk: 36700,
    leadTimeDays: 18,
  },
  {
    id: "med-006",
    name: "Doxorrubicina 50mg",
    batch: "DOX-2026-10E",
    category: "Oncológicos",
    expiryDate: "2026-10-18",
    currentStock: 76,
    forecastConsumption: 120,
    actualConsumption: 118,
    shortageRisk: 64,
    financialRisk: 34900,
    leadTimeDays: 20,
  },
  {
    id: "med-007",
    name: "Enoxaparina 40mg",
    batch: "ENX-2026-07G",
    category: "Cardiológicos",
    expiryDate: "2026-07-28",
    currentStock: 980,
    forecastConsumption: 900,
    actualConsumption: 870,
    shortageRisk: 41,
    financialRisk: 9800,
    leadTimeDays: 8,
  },
  {
    id: "med-008",
    name: "Amiodarona 200mg",
    batch: "AMD-2026-06H",
    category: "Cardiológicos",
    expiryDate: "2026-06-06",
    currentStock: 160,
    forecastConsumption: 250,
    actualConsumption: 240,
    shortageRisk: 81,
    financialRisk: 15200,
    leadTimeDays: 12,
  },
  {
    id: "med-009",
    name: "Propofol 10mg/ml",
    batch: "PRF-2026-06I",
    category: "Anestésicos",
    expiryDate: "2026-06-01",
    currentStock: 190,
    forecastConsumption: 370,
    actualConsumption: 392,
    shortageRisk: 88,
    financialRisk: 20100,
    leadTimeDays: 9,
  },
  {
    id: "med-010",
    name: "Midazolam 5mg",
    batch: "MDZ-2026-09J",
    category: "Anestésicos",
    expiryDate: "2026-09-21",
    currentStock: 530,
    forecastConsumption: 500,
    actualConsumption: 520,
    shortageRisk: 48,
    financialRisk: 11300,
    leadTimeDays: 8,
  },
];

export const consumptionTrend = [
  { month: "Jan", actual: 1200, forecast: 1180 },
  { month: "Fev", actual: 1260, forecast: 1240 },
  { month: "Mar", actual: 1330, forecast: 1300 },
  { month: "Abr", actual: 1380, forecast: 1360 },
  { month: "Mai", actual: 1420, forecast: 1450 },
  { month: "Jun", actual: 1490, forecast: 1520 },
];

export const categoryLossRisk = [
  { category: "Oncológicos", risk: 71600 },
  { category: "Antibióticos", risk: 40800 },
  { category: "Anestésicos", risk: 31400 },
  { category: "Cardiológicos", risk: 25000 },
  { category: "Analgésicos", risk: 19700 },
];
