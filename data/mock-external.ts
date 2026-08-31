export type EpidemicAlert = {
  id: string;
  disease: string;
  severity: "alta" | "moderada" | "baixa";
  affectedRegions: string[];
  impactedMedicines: string[];
  startDate: string;
  description: string;
};

export type SeasonalEvent = {
  id: string;
  name: string;
  period: string;
  expectedDemandIncrease: number;
  affectedCategories: string[];
  description: string;
};

export type RegionalOccupancy = {
  unitId: string;
  unitName: string;
  occupancyRate: number;
  trend: "subindo" | "estável" | "caindo";
  icuOccupancy: number;
};

export const mockEpidemicAlerts: EpidemicAlert[] = [
  {
    id: "alert-001",
    disease: "Dengue",
    severity: "alta",
    affectedRegions: ["Zona Leste", "Zona Norte", "Centro"],
    impactedMedicines: ["Dipirona 1g", "Morfina 10mg", "Propofol 10mg/ml"],
    startDate: "2025-05-20",
    description:
      "Surto de dengue em expansão na região metropolitana. Casos aumentaram 340% em relação ao mesmo período do ano anterior. Alta demanda por analgésicos e suporte intensivo.",
  },
  {
    id: "alert-002",
    disease: "Influenza (Gripe Sazonal)",
    severity: "moderada",
    affectedRegions: ["Toda a rede"],
    impactedMedicines: ["Amiodarona 200mg", "Enoxaparina 40mg", "Meropenem 500mg"],
    startDate: "2025-06-01",
    description:
      "Temporada de inverno com pico de influenza previsto entre junho e agosto. Aumento esperado de 60% nos atendimentos respiratórios. Maior risco para cardiopatas e idosos.",
  },
  {
    id: "alert-003",
    disease: "VSR (Vírus Sincicial Respiratório)",
    severity: "baixa",
    affectedRegions: ["Zona Sul", "Zona Oeste"],
    impactedMedicines: ["Midazolam 5mg", "Propofol 10mg/ml"],
    startDate: "2025-06-08",
    description:
      "Aumento de casos de VSR em crianças menores de 5 anos. Monitoramento em andamento. Possível aumento na demanda por anestésicos pediátricos.",
  },
];

export const mockSeasonalEvents: SeasonalEvent[] = [
  {
    id: "season-001",
    name: "Inverno — Pico de Gripe",
    period: "Jun – Ago 2025",
    expectedDemandIncrease: 60,
    affectedCategories: ["Antibióticos", "Cardiológicos", "Analgésicos"],
    description:
      "Temporada de inverno historicamente eleva em 60% a demanda por antibióticos e medicamentos cardiológicos devido a complicações respiratórias.",
  },
  {
    id: "season-002",
    name: "Temporada de Dengue",
    period: "Mar – Jul 2025",
    expectedDemandIncrease: 85,
    affectedCategories: ["Analgésicos", "Anestésicos"],
    description:
      "Alta incidência de dengue na região. Demanda por analgésicos pode elevar em até 85% durante o pico epidêmico.",
  },
  {
    id: "season-003",
    name: "Calendário Vacinal Nacional",
    period: "Ago – Set 2025",
    expectedDemandIncrease: 15,
    affectedCategories: ["Analgésicos"],
    description:
      "Campanha de vacinação nacional pode elevar levemente a demanda por analgésicos pós-vacinação nos postos vinculados.",
  },
  {
    id: "season-004",
    name: "Dia Mundial do Câncer",
    period: "Fev 2026",
    expectedDemandIncrease: 30,
    affectedCategories: ["Oncológicos"],
    description:
      "Período de campanhas e triagens oncológicas resulta em aumento de diagnósticos e início de tratamentos quimioterápicos.",
  },
];

export const mockRegionalOccupancy: RegionalOccupancy[] = [
  {
    unitId: "hospital-central",
    unitName: "Hospital Central",
    occupancyRate: 84,
    trend: "subindo",
    icuOccupancy: 91,
  },
  {
    unitId: "hospital-norte",
    unitName: "Hospital Norte",
    occupancyRate: 71,
    trend: "estável",
    icuOccupancy: 74,
  },
  {
    unitId: "hospital-sul",
    unitName: "Hospital Sul",
    occupancyRate: 68,
    trend: "caindo",
    icuOccupancy: 65,
  },
  {
    unitId: "upa-leste",
    unitName: "UPA Leste",
    occupancyRate: 92,
    trend: "subindo",
    icuOccupancy: 100,
  },
];