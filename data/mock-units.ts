export type Unit = {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  location: string;
  type: "hospital" | "farmacia" | "clinica";
  beds: number;
  occupancyRate: number;
};

export type UnitStock = {
  unitId: string;
  medicineId: string;
  currentStock: number;
  forecastConsumption: number;
};

export const mockUnits: Unit[] = [
  {
    id: "hospital-central",
    name: "Hospital Central",
    companyId: "rede-saude",
    companyName: "Rede Saúde Brasil",
    location: "Centro, São Paulo",
    type: "hospital",
    beds: 320,
    occupancyRate: 84,
  },
  {
    id: "hospital-norte",
    name: "Hospital Norte",
    companyId: "rede-saude",
    companyName: "Rede Saúde Brasil",
    location: "Zona Norte, São Paulo",
    type: "hospital",
    beds: 210,
    occupancyRate: 71,
  },
  {
    id: "hospital-sul",
    name: "Hospital Sul",
    companyId: "rede-saude",
    companyName: "Rede Saúde Brasil",
    location: "Zona Sul, São Paulo",
    type: "hospital",
    beds: 185,
    occupancyRate: 68,
  },
  {
    id: "upa-leste",
    name: "UPA Leste",
    companyId: "rede-saude",
    companyName: "Rede Saúde Brasil",
    location: "Zona Leste, São Paulo",
    type: "hospital",
    beds: 80,
    occupancyRate: 92,
  },
  {
    id: "farmacia-vida-centro",
    name: "Farmácia Vida Centro",
    companyId: "farmacia-vida",
    companyName: "Farmácia Vida",
    location: "Centro, São Paulo",
    type: "farmacia",
    beds: 0,
    occupancyRate: 0,
  },
  {
    id: "farmacia-vida-norte",
    name: "Farmácia Vida Norte",
    companyId: "farmacia-vida",
    companyName: "Farmácia Vida",
    location: "Zona Norte, São Paulo",
    type: "farmacia",
    beds: 0,
    occupancyRate: 0,
  },
  {
    id: "drogaria-mais",
    name: "Drogaria Mais",
    companyId: "drogaria-mais",
    companyName: "Drogaria Mais",
    location: "Vila Mariana, São Paulo",
    type: "farmacia",
    beds: 0,
    occupancyRate: 0,
  },
];

export const mockUnitStocks: UnitStock[] = [
  // Hospital Central
  { unitId: "hospital-central", medicineId: "med-001", currentStock: 180, forecastConsumption: 200 },
  { unitId: "hospital-central", medicineId: "med-002", currentStock: 90, forecastConsumption: 140 },
  { unitId: "hospital-central", medicineId: "med-003", currentStock: 1400, forecastConsumption: 700 },
  { unitId: "hospital-central", medicineId: "med-004", currentStock: 40, forecastConsumption: 110 },
  { unitId: "hospital-central", medicineId: "med-005", currentStock: 35, forecastConsumption: 55 },
  { unitId: "hospital-central", medicineId: "med-006", currentStock: 30, forecastConsumption: 46 },
  { unitId: "hospital-central", medicineId: "med-007", currentStock: 420, forecastConsumption: 360 },
  { unitId: "hospital-central", medicineId: "med-008", currentStock: 60, forecastConsumption: 100 },
  { unitId: "hospital-central", medicineId: "med-009", currentStock: 70, forecastConsumption: 150 },
  { unitId: "hospital-central", medicineId: "med-010", currentStock: 220, forecastConsumption: 200 },

  // Hospital Norte
  { unitId: "hospital-norte", medicineId: "med-001", currentStock: 120, forecastConsumption: 130 },
  { unitId: "hospital-norte", medicineId: "med-002", currentStock: 95, forecastConsumption: 80 },
  { unitId: "hospital-norte", medicineId: "med-003", currentStock: 900, forecastConsumption: 550 },
  { unitId: "hospital-norte", medicineId: "med-004", currentStock: 35, forecastConsumption: 90 },
  { unitId: "hospital-norte", medicineId: "med-005", currentStock: 28, forecastConsumption: 40 },
  { unitId: "hospital-norte", medicineId: "med-006", currentStock: 22, forecastConsumption: 35 },
  { unitId: "hospital-norte", medicineId: "med-007", currentStock: 310, forecastConsumption: 280 },
  { unitId: "hospital-norte", medicineId: "med-008", currentStock: 55, forecastConsumption: 75 },
  { unitId: "hospital-norte", medicineId: "med-009", currentStock: 65, forecastConsumption: 110 },
  { unitId: "hospital-norte", medicineId: "med-010", currentStock: 180, forecastConsumption: 150 },

  // Hospital Sul
  { unitId: "hospital-sul", medicineId: "med-001", currentStock: 75, forecastConsumption: 110 },
  { unitId: "hospital-sul", medicineId: "med-002", currentStock: 40, forecastConsumption: 80 },
  { unitId: "hospital-sul", medicineId: "med-003", currentStock: 650, forecastConsumption: 300 },
  { unitId: "hospital-sul", medicineId: "med-004", currentStock: 20, forecastConsumption: 55 },
  { unitId: "hospital-sul", medicineId: "med-005", currentStock: 14, forecastConsumption: 28 },
  { unitId: "hospital-sul", medicineId: "med-006", currentStock: 14, forecastConsumption: 24 },
  { unitId: "hospital-sul", medicineId: "med-007", currentStock: 180, forecastConsumption: 160 },
  { unitId: "hospital-sul", medicineId: "med-008", currentStock: 30, forecastConsumption: 50 },
  { unitId: "hospital-sul", medicineId: "med-009", currentStock: 35, forecastConsumption: 65 },
  { unitId: "hospital-sul", medicineId: "med-010", currentStock: 95, forecastConsumption: 100 },

  // UPA Leste
  { unitId: "upa-leste", medicineId: "med-001", currentStock: 45, forecastConsumption: 100 },
  { unitId: "upa-leste", medicineId: "med-002", currentStock: 35, forecastConsumption: 90 },
  { unitId: "upa-leste", medicineId: "med-003", currentStock: 350, forecastConsumption: 150 },
  { unitId: "upa-leste", medicineId: "med-004", currentStock: 15, forecastConsumption: 25 },
  { unitId: "upa-leste", medicineId: "med-005", currentStock: 8, forecastConsumption: 17 },
  { unitId: "upa-leste", medicineId: "med-006", currentStock: 10, forecastConsumption: 15 },
  { unitId: "upa-leste", medicineId: "med-007", currentStock: 70, forecastConsumption: 100 },
  { unitId: "upa-leste", medicineId: "med-008", currentStock: 15, forecastConsumption: 25 },
  { unitId: "upa-leste", medicineId: "med-009", currentStock: 20, forecastConsumption: 45 },
  { unitId: "upa-leste", medicineId: "med-010", currentStock: 35, forecastConsumption: 50 },

  // Farmácia Vida / Drogaria Mais cross-company offers
  { unitId: "farmacia-vida-centro", medicineId: "med-001", currentStock: 220, forecastConsumption: 120 },
  { unitId: "farmacia-vida-centro", medicineId: "med-003", currentStock: 210, forecastConsumption: 130 },
  { unitId: "farmacia-vida-centro", medicineId: "med-006", currentStock: 120, forecastConsumption: 60 },
  { unitId: "farmacia-vida-norte", medicineId: "med-002", currentStock: 180, forecastConsumption: 90 },
  { unitId: "farmacia-vida-norte", medicineId: "med-007", currentStock: 140, forecastConsumption: 75 },
  { unitId: "drogaria-mais", medicineId: "med-001", currentStock: 50, forecastConsumption: 140 },
  { unitId: "drogaria-mais", medicineId: "med-003", currentStock: 60, forecastConsumption: 170 },
  { unitId: "drogaria-mais", medicineId: "med-006", currentStock: 25, forecastConsumption: 90 },
  { unitId: "drogaria-mais", medicineId: "med-007", currentStock: 35, forecastConsumption: 110 },
];
