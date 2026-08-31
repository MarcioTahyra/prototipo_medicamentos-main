export type Purchase = {
  id: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  status: "entregue" | "agendada" | "em_transito";
  orderDate: string;
  deliveryDate: string;
  unitId: string;
};

export type PurchaseSuggestion = {
  medicineId: string;
  medicineName: string;
  suggestedQty: number;
  suggestedOrderDate: string;
  estimatedDelivery: string;
  urgency: "alta" | "média" | "baixa";
  reason: string;
  estimatedCost: number;
};

export const mockPurchases: Purchase[] = [
  {
    id: "prc-001",
    medicineId: "med-001",
    medicineName: "Ceftriaxona 1g",
    quantity: 500,
    unitPrice: 18.5,
    totalValue: 9250,
    supplier: "FarmaSupply Brasil",
    status: "entregue",
    orderDate: "2025-05-01",
    deliveryDate: "2025-05-12",
    unitId: "hospital-central",
  },
  {
    id: "prc-002",
    medicineId: "med-004",
    medicineName: "Morfina 10mg",
    quantity: 300,
    unitPrice: 42.0,
    totalValue: 12600,
    supplier: "MediLog Distribuidora",
    status: "entregue",
    orderDate: "2025-05-03",
    deliveryDate: "2025-05-11",
    unitId: "hospital-central",
  },
  {
    id: "prc-003",
    medicineId: "med-009",
    medicineName: "Propofol 10mg/ml",
    quantity: 400,
    unitPrice: 38.0,
    totalValue: 15200,
    supplier: "VidaFarma SP",
    status: "entregue",
    orderDate: "2025-05-06",
    deliveryDate: "2025-05-16",
    unitId: "hospital-norte",
  },
  {
    id: "prc-004",
    medicineId: "med-005",
    medicineName: "Paclitaxel 100mg",
    quantity: 100,
    unitPrice: 210.0,
    totalValue: 21000,
    supplier: "OncoPharma Ltda",
    status: "entregue",
    orderDate: "2025-05-10",
    deliveryDate: "2025-05-29",
    unitId: "hospital-central",
  },
  {
    id: "prc-005",
    medicineId: "med-008",
    medicineName: "Amiodarona 200mg",
    quantity: 200,
    unitPrice: 28.0,
    totalValue: 5600,
    supplier: "CardioMed Distribuidora",
    status: "entregue",
    orderDate: "2025-05-12",
    deliveryDate: "2025-05-25",
    unitId: "hospital-sul",
  },
  {
    id: "prc-006",
    medicineId: "med-002",
    medicineName: "Meropenem 500mg",
    quantity: 350,
    unitPrice: 32.0,
    totalValue: 11200,
    supplier: "FarmaSupply Brasil",
    status: "em_transito",
    orderDate: "2025-06-01",
    deliveryDate: "2025-06-16",
    unitId: "hospital-central",
  },
  {
    id: "prc-007",
    medicineId: "med-006",
    medicineName: "Doxorrubicina 50mg",
    quantity: 80,
    unitPrice: 180.0,
    totalValue: 14400,
    supplier: "OncoPharma Ltda",
    status: "em_transito",
    orderDate: "2025-06-03",
    deliveryDate: "2025-06-24",
    unitId: "hospital-norte",
  },
  {
    id: "prc-008",
    medicineId: "med-003",
    medicineName: "Dipirona 1g",
    quantity: 2000,
    unitPrice: 1.8,
    totalValue: 3600,
    supplier: "MediLog Distribuidora",
    status: "agendada",
    orderDate: "2025-06-15",
    deliveryDate: "2025-06-21",
    unitId: "hospital-sul",
  },
  {
    id: "prc-009",
    medicineId: "med-007",
    medicineName: "Enoxaparina 40mg",
    quantity: 600,
    unitPrice: 14.5,
    totalValue: 8700,
    supplier: "CardioMed Distribuidora",
    status: "agendada",
    orderDate: "2025-06-18",
    deliveryDate: "2025-06-27",
    unitId: "hospital-central",
  },
  {
    id: "prc-010",
    medicineId: "med-010",
    medicineName: "Midazolam 5mg",
    quantity: 300,
    unitPrice: 22.0,
    totalValue: 6600,
    supplier: "VidaFarma SP",
    status: "agendada",
    orderDate: "2025-06-20",
    deliveryDate: "2025-06-29",
    unitId: "upa-leste",
  },
];

export const mockPurchaseSuggestions: PurchaseSuggestion[] = [
  {
    medicineId: "med-004",
    medicineName: "Morfina 10mg",
    suggestedQty: 250,
    suggestedOrderDate: "2025-06-13",
    estimatedDelivery: "2025-06-20",
    urgency: "alta",
    reason: "Estoque crítico: apenas 110 unidades restantes para previsão de 280. Ruptura em 6 dias.",
    estimatedCost: 10500,
  },
  {
    medicineId: "med-009",
    medicineName: "Propofol 10mg/ml",
    suggestedQty: 300,
    suggestedOrderDate: "2025-06-13",
    estimatedDelivery: "2025-06-22",
    urgency: "alta",
    reason: "Estoque abaixo de 52% da previsão. Alto consumo nas UTIs durante surto de dengue.",
    estimatedCost: 11400,
  },
  {
    medicineId: "med-008",
    medicineName: "Amiodarona 200mg",
    suggestedQty: 180,
    suggestedOrderDate: "2025-06-15",
    estimatedDelivery: "2025-06-27",
    urgency: "alta",
    reason: "Validade do lote atual próxima (Jun/2026). Reposição urgente para cobrir lead time de 12 dias.",
    estimatedCost: 5040,
  },
  {
    medicineId: "med-002",
    medicineName: "Meropenem 500mg",
    suggestedQty: 200,
    suggestedOrderDate: "2025-06-18",
    estimatedDelivery: "2025-07-02",
    urgency: "média",
    reason: "Consumo acelerado por casos de infecções hospitalares. Complemento ao pedido em trânsito.",
    estimatedCost: 6400,
  },
  {
    medicineId: "med-005",
    medicineName: "Paclitaxel 100mg",
    suggestedQty: 80,
    suggestedOrderDate: "2025-06-20",
    estimatedDelivery: "2025-07-08",
    urgency: "média",
    reason: "Calendário de quimioterapia aumentado para o próximo trimestre. Lead time de 18 dias exige pedido antecipado.",
    estimatedCost: 16800,
  },
];
