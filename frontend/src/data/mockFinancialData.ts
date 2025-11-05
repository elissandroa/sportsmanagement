// Mock de dados financeiros do clube

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  category: string;
  salary: number;
  active: boolean;
  joinDate: string;
}

export interface Payment {
  id: number;
  recipientId: number;
  recipientName: string;
  recipientType: 'atleta' | 'staff';
  type: 'salario' | 'ajuda_custo';
  amount: number;
  referenceMonth: string;
  paymentDate?: string;
  status: 'pago' | 'pendente' | 'agendado';
  description?: string;
}

export interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'pago' | 'pendente';
  approvedBy?: string;
  invoice?: string;
}

export interface AllowanceRequest {
  id: number;
  recipientId: number;
  recipientName: string;
  recipientType: 'atleta' | 'staff';
  category: string;
  reason: string;
  amount: number;
  requestDate: string;
  approvalDate?: string;
  paymentDate?: string;
  status: 'pendente' | 'aprovado' | 'pago' | 'rejeitado';
  approvedBy?: string;
  notes?: string;
}

export interface Sponsorship {
  id: number;
  company: string;
  type: 'master' | 'patrocinador' | 'apoiador' | 'fornecedor';
  category: string;
  monthlyAmount: number;
  totalAmount: number;
  startDate: string;
  endDate: string;
  status: 'ativo' | 'vencido' | 'renovacao';
  contractNumber: string;
  contact: string;
  phone: string;
  email: string;
  benefits?: string[];
  logo?: string;
}

export interface SalaryAdjustment {
  id: number;
  date: string;
  type: 'atletas' | 'staff' | 'mensalidades';
  adjustmentType: 'percentual' | 'valor_fixo';
  value: number;
  affectedCount: number;
  approvedBy: string;
  notes?: string;
}

export interface CategoryFee {
  category: string;
  monthlyFee: number;
  athleteCount: number;
  lastUpdate?: string;
  updatedBy?: string;
}

export interface IndividualSalaryAdjustment {
  id: number;
  date: string;
  personId: number;
  personName: string;
  personType: 'atleta' | 'staff';
  oldSalary: number;
  newSalary: number;
  adjustmentType: 'percentual' | 'valor_fixo';
  adjustmentValue: number;
  approvedBy: string;
  notes?: string;
}

// Mock de profissionais do clube com salários
export const mockStaff: StaffMember[] = [
  {
    id: 1,
    name: 'Carlos Mendes',
    role: 'Treinador Principal',
    category: 'Profissional',
    salary: 25000,
    active: true,
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Ana Silva',
    role: 'Médica',
    category: 'Todas',
    salary: 18000,
    active: true,
    joinDate: '2023-03-10'
  },
  {
    id: 3,
    name: 'Roberto Lima',
    role: 'Preparador Físico',
    category: 'Sub-20',
    salary: 12000,
    active: true,
    joinDate: '2023-02-20'
  },
  {
    id: 4,
    name: 'Marina Costa',
    role: 'Auxiliar Técnico',
    category: 'Sub-17',
    salary: 8000,
    active: true,
    joinDate: '2023-04-05'
  },
  {
    id: 5,
    name: 'João Supervisor',
    role: 'Supervisor Geral',
    category: 'Todas',
    salary: 22000,
    active: true,
    joinDate: '2022-08-01'
  },
  {
    id: 6,
    name: 'Patricia Fernandes',
    role: 'Nutricionista',
    category: 'Todas',
    salary: 9500,
    active: true,
    joinDate: '2023-05-12'
  },
  {
    id: 7,
    name: 'Fernando Santos',
    role: 'Preparador de Goleiros',
    category: 'Profissional',
    salary: 11000,
    active: true,
    joinDate: '2023-01-20'
  },
  {
    id: 8,
    name: 'Juliana Pereira',
    role: 'Analista de Desempenho',
    category: 'Todas',
    salary: 10500,
    active: true,
    joinDate: '2023-06-01'
  },
  {
    id: 9,
    name: 'Ricardo Alves',
    role: 'Fisioterapeuta',
    category: 'Todas',
    salary: 8500,
    active: true,
    joinDate: '2023-02-15'
  },
  {
    id: 10,
    name: 'Camila Rodrigues',
    role: 'Treinador Sub-20',
    category: 'Sub-20',
    salary: 15000,
    active: true,
    joinDate: '2023-03-01'
  },
  {
    id: 11,
    name: 'Paulo Oliveira',
    role: 'Gerente de Futebol',
    category: 'Todas',
    salary: 28000,
    active: true,
    joinDate: '2022-11-01'
  },
  {
    id: 12,
    name: 'Beatriz Lima',
    role: 'Coordenadora Base',
    category: 'Base',
    salary: 14000,
    active: true,
    joinDate: '2023-04-10'
  }
];

// Mock de despesas
export const mockExpenses: Expense[] = [
  {
    id: 1,
    category: 'Infraestrutura',
    description: 'Manutenção campo de treino',
    amount: 15000,
    date: '2024-10-05',
    paymentMethod: 'Transferência',
    status: 'pago',
    approvedBy: 'Paulo Oliveira',
    invoice: 'INV-2024-001'
  },
  {
    id: 2,
    category: 'Transporte',
    description: 'Fretamento ônibus - Jogo Santos',
    amount: 4500,
    date: '2024-10-12',
    paymentMethod: 'Transferência',
    status: 'pago',
    approvedBy: 'Paulo Oliveira',
    invoice: 'INV-2024-002'
  },
  {
    id: 3,
    category: 'Alimentação',
    description: 'Refeições CT - Outubro',
    amount: 12000,
    date: '2024-10-01',
    paymentMethod: 'Transferência',
    status: 'pago',
    approvedBy: 'Paulo Oliveira',
    invoice: 'INV-2024-003'
  },
  {
    id: 4,
    category: 'Material Esportivo',
    description: 'Bolas de treino (50 unidades)',
    amount: 3200,
    date: '2024-10-08',
    paymentMethod: 'Cartão Corporativo',
    status: 'pago',
    approvedBy: 'João Supervisor'
  },
  {
    id: 5,
    category: 'Médico',
    description: 'Exames médicos atletas base',
    amount: 8500,
    date: '2024-10-15',
    paymentMethod: 'Transferência',
    status: 'pago',
    approvedBy: 'Ana Silva'
  },
  {
    id: 6,
    category: 'Energia',
    description: 'Conta de luz - CT',
    amount: 6800,
    date: '2024-10-10',
    paymentMethod: 'Débito Automático',
    status: 'pago',
    approvedBy: 'Paulo Oliveira'
  },
  {
    id: 7,
    category: 'Água',
    description: 'Conta de água - CT',
    amount: 2400,
    date: '2024-10-10',
    paymentMethod: 'Débito Automático',
    status: 'pago',
    approvedBy: 'Paulo Oliveira'
  },
  {
    id: 8,
    category: 'Marketing',
    description: 'Produção de conteúdo - Redes Sociais',
    amount: 5500,
    date: '2024-10-18',
    paymentMethod: 'Transferência',
    status: 'pendente',
    approvedBy: 'Paulo Oliveira'
  },
  {
    id: 9,
    category: 'Arbitragem',
    description: 'Taxa de arbitragem - Campeonato Paulista',
    amount: 3800,
    date: '2024-10-20',
    paymentMethod: 'Transferência',
    status: 'pendente'
  },
  {
    id: 10,
    category: 'Hospedagem',
    description: 'Hotel - Jogo em Curitiba',
    amount: 7200,
    date: '2024-10-14',
    paymentMethod: 'Cartão Corporativo',
    status: 'pago',
    approvedBy: 'Paulo Oliveira'
  }
];

// Mock de ajudas de custo
export const mockAllowances: AllowanceRequest[] = [
  {
    id: 1,
    recipientId: 125,
    recipientName: 'Gabriel Silva',
    recipientType: 'atleta',
    category: 'Transporte',
    reason: 'Deslocamento para convocação Seleção Sub-20',
    amount: 800,
    requestDate: '2024-10-01',
    approvalDate: '2024-10-02',
    paymentDate: '2024-10-05',
    status: 'pago',
    approvedBy: 'Paulo Oliveira',
    notes: 'Convocação oficial CBF'
  },
  {
    id: 2,
    recipientId: 3,
    recipientName: 'Roberto Lima',
    recipientType: 'staff',
    category: 'Alimentação',
    reason: 'Alimentação durante viagem - Jogo em Recife',
    amount: 450,
    requestDate: '2024-10-08',
    approvalDate: '2024-10-09',
    paymentDate: '2024-10-10',
    status: 'pago',
    approvedBy: 'Paulo Oliveira'
  },
  {
    id: 3,
    recipientId: 89,
    recipientName: 'Pedro Costa',
    recipientType: 'atleta',
    category: 'Moradia',
    reason: 'Auxílio moradia - Atleta de outro estado',
    amount: 1200,
    requestDate: '2024-10-01',
    approvalDate: '2024-10-03',
    paymentDate: '2024-10-05',
    status: 'pago',
    approvedBy: 'Paulo Oliveira',
    notes: 'Auxílio mensal - Atleta da base'
  },
  {
    id: 4,
    recipientId: 1,
    recipientName: 'Carlos Mendes',
    recipientType: 'staff',
    category: 'Transporte',
    reason: 'Combustível - Visita técnica clubes parceiros',
    amount: 600,
    requestDate: '2024-10-12',
    approvalDate: '2024-10-13',
    status: 'aprovado',
    approvedBy: 'Paulo Oliveira',
    notes: 'Aguardando depósito'
  },
  {
    id: 5,
    recipientId: 156,
    recipientName: 'Lucas Oliveira',
    recipientType: 'atleta',
    category: 'Educação',
    reason: 'Material escolar',
    amount: 350,
    requestDate: '2024-10-15',
    status: 'pendente',
    notes: 'Aguardando aprovação gerência'
  },
  {
    id: 6,
    recipientId: 4,
    recipientName: 'Marina Costa',
    recipientType: 'staff',
    category: 'Curso',
    reason: 'Curso de atualização - CBF Academy',
    amount: 2500,
    requestDate: '2024-10-16',
    approvalDate: '2024-10-17',
    status: 'aprovado',
    approvedBy: 'Paulo Oliveira',
    notes: 'Investimento em desenvolvimento profissional'
  },
  {
    id: 7,
    recipientId: 234,
    recipientName: 'Matheus Santos',
    recipientType: 'atleta',
    category: 'Saúde',
    reason: 'Tratamento odontológico',
    amount: 950,
    requestDate: '2024-10-18',
    status: 'pendente',
    notes: 'Aguardando documentação'
  },
  {
    id: 8,
    recipientId: 198,
    recipientName: 'Rafael Mendes',
    recipientType: 'atleta',
    category: 'Transporte',
    reason: 'Passagem aérea - Funeral familiar',
    amount: 1400,
    requestDate: '2024-10-10',
    approvalDate: '2024-10-10',
    paymentDate: '2024-10-11',
    status: 'pago',
    approvedBy: 'Paulo Oliveira',
    notes: 'Situação emergencial'
  }
];

// Mock de patrocínios
export const mockSponsorships: Sponsorship[] = [
  {
    id: 1,
    company: 'Nike',
    type: 'master',
    category: 'Uniformes',
    monthlyAmount: 5000,
    totalAmount: 60000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'ativo',
    contractNumber: 'CON-2024-001',
    contact: 'João Silva',
    phone: '11 98765-4321',
    email: 'joao.silva@nike.com',
    benefits: ['Uniformes personalizados', 'Publicidade em redes sociais'],
    logo: 'nike-logo.png'
  },
  {
    id: 2,
    company: 'Adidas',
    type: 'patrocinador',
    category: 'Material Esportivo',
    monthlyAmount: 3000,
    totalAmount: 36000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'ativo',
    contractNumber: 'CON-2024-002',
    contact: 'Maria Oliveira',
    phone: '11 98765-4321',
    email: 'maria.oliveira@adidas.com',
    benefits: ['Bolas de treino', 'Publicidade em redes sociais'],
    logo: 'adidas-logo.png'
  },
  {
    id: 3,
    company: 'Puma',
    type: 'apoiador',
    category: 'Material Esportivo',
    monthlyAmount: 2000,
    totalAmount: 24000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'ativo',
    contractNumber: 'CON-2024-003',
    contact: 'Carlos Pereira',
    phone: '11 98765-4321',
    email: 'carlos.pereira@puma.com',
    benefits: ['Bolas de treino', 'Publicidade em redes sociais'],
    logo: 'puma-logo.png'
  },
  {
    id: 4,
    company: 'Fila',
    type: 'fornecedor',
    category: 'Material Esportivo',
    monthlyAmount: 1000,
    totalAmount: 12000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'ativo',
    contractNumber: 'CON-2024-004',
    contact: 'Ana Costa',
    phone: '11 98765-4321',
    email: 'ana.costa@fila.com',
    benefits: ['Bolas de treino', 'Publicidade em redes sociais'],
    logo: 'fila-logo.png'
  }
];

// Mock de ajustes salariais
export const mockSalaryAdjustments: SalaryAdjustment[] = [
  {
    id: 1,
    date: '2024-01-01',
    type: 'atletas',
    adjustmentType: 'percentual',
    value: 5,
    affectedCount: 20,
    approvedBy: 'Paulo Oliveira',
    notes: 'Aumento de 5% para atletas'
  },
  {
    id: 2,
    date: '2024-01-01',
    type: 'staff',
    adjustmentType: 'percentual',
    value: 3,
    affectedCount: 10,
    approvedBy: 'Paulo Oliveira',
    notes: 'Aumento de 3% para profissionais'
  },
  {
    id: 3,
    date: '2024-01-01',
    type: 'mensalidades',
    adjustmentType: 'valor_fixo',
    value: 100,
    affectedCount: 5,
    approvedBy: 'Paulo Oliveira',
    notes: 'Aumento de R$100 para mensalidades'
  }
];

// Funções auxiliares
export const getTotalStaffSalaries = (): number => {
  return mockStaff.filter(s => s.active).reduce((sum, staff) => sum + staff.salary, 0);
};

export const getExpensesByCategory = () => {
  const categories: { [key: string]: number } = {};
  mockExpenses.forEach(expense => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }
    categories[expense.category] += expense.amount;
  });
  return categories;
};

export const getPendingAllowances = (): AllowanceRequest[] => {
  return mockAllowances.filter(a => a.status === 'pendente');
};

export const getApprovedAllowances = (): AllowanceRequest[] => {
  return mockAllowances.filter(a => a.status === 'aprovado');
};

export const getTotalAllowancesByType = () => {
  const byType: { [key: string]: number } = {
    atleta: 0,
    staff: 0
  };
  mockAllowances.forEach(allowance => {
    byType[allowance.recipientType] += allowance.amount;
  });
  return byType;
};

export const getTotalSponsorshipAmount = (): number => {
  return mockSponsorships.reduce((sum, sponsorship) => sum + sponsorship.totalAmount, 0);
};

export const getActiveSponsorships = (): Sponsorship[] => {
  return mockSponsorships.filter(s => s.status === 'ativo');
};

export const getTotalSalaryAdjustments = (): number => {
  return mockSalaryAdjustments.reduce((sum, adjustment) => sum + adjustment.value * adjustment.affectedCount, 0);
};

export const getSalaryAdjustmentsByType = () => {
  const byType: { [key: string]: number } = {
    atletas: 0,
    staff: 0,
    mensalidades: 0
  };
  mockSalaryAdjustments.forEach(adjustment => {
    byType[adjustment.type] += adjustment.value * adjustment.affectedCount;
  });
  return byType;
};

// Mock de configuração de mensalidades por categoria
export const mockCategoryFees: CategoryFee[] = [
  {
    category: 'Sub-11',
    monthlyFee: 100,
    athleteCount: 30,
    lastUpdate: '2024-01-01',
    updatedBy: 'Paulo Oliveira'
  },
  {
    category: 'Sub-12',
    monthlyFee: 110,
    athleteCount: 30,
    lastUpdate: '2024-01-01',
    updatedBy: 'Paulo Oliveira'
  },
  {
    category: 'Sub-13',
    monthlyFee: 120,
    athleteCount: 30,
    lastUpdate: '2024-01-01',
    updatedBy: 'Paulo Oliveira'
  },
  {
    category: 'Sub-14',
    monthlyFee: 130,
    athleteCount: 30,
    lastUpdate: '2024-01-01',
    updatedBy: 'Paulo Oliveira'
  },
  {
    category: 'Sub-15',
    monthlyFee: 140,
    athleteCount: 30,
    lastUpdate: '2024-01-01',
    updatedBy: 'Paulo Oliveira'
  }
];

// Mock de ajustes salariais individuais
export const mockIndividualAdjustments: IndividualSalaryAdjustment[] = [
  {
    id: 1,
    date: '2024-09-01',
    personId: 1,
    personName: 'Carlos Mendes',
    personType: 'staff',
    oldSalary: 22000,
    newSalary: 25000,
    adjustmentType: 'percentual',
    adjustmentValue: 13.6,
    approvedBy: 'Paulo Oliveira',
    notes: 'Promoção por desempenho excepcional'
  },
  {
    id: 2,
    date: '2024-08-15',
    personId: 125,
    personName: 'Gabriel Silva',
    personType: 'atleta',
    oldSalary: 8000,
    newSalary: 12000,
    adjustmentType: 'valor_fixo',
    adjustmentValue: 4000,
    approvedBy: 'Paulo Oliveira',
    notes: 'Renovação contratual - Desempenho destacado'
  },
  {
    id: 3,
    date: '2024-07-20',
    personId: 2,
    personName: 'Ana Silva',
    personType: 'staff',
    oldSalary: 16000,
    newSalary: 18000,
    adjustmentType: 'percentual',
    adjustmentValue: 12.5,
    approvedBy: 'Paulo Oliveira',
    notes: 'Reajuste anual + bonificação'
  }
];

export const getCategoryFees = (): CategoryFee[] => {
  return mockCategoryFees;
};

export const getTotalMonthlyFeeRevenue = (): number => {
  return mockCategoryFees.reduce((sum, cat) => sum + (cat.monthlyFee * cat.athleteCount), 0);
};

export const getIndividualAdjustments = (): IndividualSalaryAdjustment[] => {
  return mockIndividualAdjustments;
};