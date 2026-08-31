export type Transfer = {
  id: string;
  fromUnitId: string;
  toUnitId: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  status: "concluída" | "pendente" | "aprovada";
  date: string;
  requestedBy: string;
};

export const mockTransfers: Transfer[] = [
  {
    id: "trf-001",
    fromUnitId: "hospital-central",
    toUnitId: "upa-leste",
    medicineId: "med-001",
    medicineName: "Ceftriaxona 1g",
    quantity: 80,
    status: "concluída",
    date: "2025-06-02",
    requestedBy: "Dr. Carlos Mendes",
  },
  {
    id: "trf-002",
    fromUnitId: "hospital-norte",
    toUnitId: "hospital-sul",
    medicineId: "med-003",
    medicineName: "Dipirona 1g",
    quantity: 200,
    status: "concluída",
    date: "2025-06-05",
    requestedBy: "Enf. Ana Souza",
  },
  {
    id: "trf-003",
    fromUnitId: "hospital-central",
    toUnitId: "hospital-sul",
    medicineId: "med-009",
    medicineName: "Propofol 10mg/ml",
    quantity: 30,
    status: "aprovada",
    date: "2025-06-08",
    requestedBy: "Dr. Paulo Lima",
  },
  {
    id: "trf-004",
    fromUnitId: "hospital-norte",
    toUnitId: "upa-leste",
    medicineId: "med-002",
    medicineName: "Meropenem 500mg",
    quantity: 40,
    status: "pendente",
    date: "2025-06-10",
    requestedBy: "Dra. Marina Costa",
  },
  {
    id: "trf-005",
    fromUnitId: "hospital-central",
    toUnitId: "upa-leste",
    medicineId: "med-004",
    medicineName: "Morfina 10mg",
    quantity: 20,
    status: "pendente",
    date: "2025-06-11",
    requestedBy: "Dr. Roberto Ferreira",
  },
  {
    id: "trf-006",
    fromUnitId: "hospital-sul",
    toUnitId: "hospital-norte",
    medicineId: "med-010",
    medicineName: "Midazolam 5mg",
    quantity: 50,
    status: "concluída",
    date: "2025-05-28",
    requestedBy: "Enf. João Alves",
  },
  {
    id: "trf-007",
    fromUnitId: "hospital-norte",
    toUnitId: "hospital-sul",
    medicineId: "med-007",
    medicineName: "Enoxaparina 40mg",
    quantity: 100,
    status: "aprovada",
    date: "2025-06-09",
    requestedBy: "Dr. Lucas Gomes",
  },
  {
    id: "trf-008",
    fromUnitId: "hospital-central",
    toUnitId: "hospital-norte",
    medicineId: "med-008",
    medicineName: "Amiodarona 200mg",
    quantity: 25,
    status: "pendente",
    date: "2025-06-12",
    requestedBy: "Dra. Fernanda Torres",
  },
];
