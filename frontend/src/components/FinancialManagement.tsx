import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  FileText, 
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Receipt,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  UserCheck,
  Ban,
  Percent,
  Settings,
  Handshake,
  Edit,
  DollarSignIcon
} from 'lucide-react';
import { mockAthletes } from '../data/mockAthletes';
import { 
  mockStaff, 
  mockExpenses, 
  mockAllowances,
  mockSponsorships,
  mockCategoryFees,
  mockIndividualAdjustments,
  getTotalStaffSalaries,
  getExpensesByCategory,
  getPendingAllowances,
  getActiveSponsorships,
  getTotalSponsorshipAmount,
  getTotalMonthlyFeeRevenue
} from '../data/mockFinancialData';

interface FinancialManagementProps {
  user: any;
}

export function FinancialManagement({ user }: FinancialManagementProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [newAllowanceOpen, setNewAllowanceOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [categoryFeeDialogOpen, setCategoryFeeDialogOpen] = useState(false);
  const [adjustIndividualSalaryOpen, setAdjustIndividualSalaryOpen] = useState(false);
  const [newSponsorshipOpen, setNewSponsorshipOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedPersonType, setSelectedPersonType] = useState<'atleta' | 'staff'>('atleta');

  // Atletas que pagam mensalidade (até 15 anos)
  const payingAthletes = mockAthletes.filter(a => a.monthlyFee);
  
  // Mock de status de pagamento
  const paymentStatuses = payingAthletes.map((athlete, index) => ({
    ...athlete,
    paymentStatus: index % 10 === 0 ? 'overdue' : index % 5 === 0 ? 'pending' : 'paid',
    lastPaymentDate: index % 5 === 0 ? undefined : `2024-${String(selectedMonth + 1).padStart(2, '0')}-05`,
    daysOverdue: index % 10 === 0 ? Math.floor(Math.random() * 30) + 1 : 0
  }));

  // Atletas profissionais com salário
  const professionalAthletes = mockAthletes.filter(a => a.category === 'Profissional' && a.salary);

  // Filtrar atletas de mensalidade
  const filteredAthletes = paymentStatuses.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || athlete.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Estatísticas - Mensalidades usando valores por categoria
  const totalExpected = getTotalMonthlyFeeRevenue();
  const totalPaid = paymentStatuses.filter(a => a.paymentStatus === 'paid').length * 120;
  const totalPending = paymentStatuses.filter(a => a.paymentStatus === 'pending').length * 120;
  const totalOverdue = paymentStatuses.filter(a => a.paymentStatus === 'overdue').length * 120;

  // Estatísticas - Pagamentos
  const totalAthleteSalaries = professionalAthletes.reduce((sum, a) => sum + (a.salary || 0), 0);
  const totalStaffSalaries = getTotalStaffSalaries();
  const totalPayroll = totalAthleteSalaries + totalStaffSalaries;

  // Estatísticas - Despesas
  const totalExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenses = mockExpenses.filter(e => e.status === 'pago').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = mockExpenses.filter(e => e.status === 'pendente').reduce((sum, e) => sum + e.amount, 0);

  // Estatísticas - Ajudas de Custo
  const totalAllowances = mockAllowances.reduce((sum, a) => sum + a.amount, 0);
  const paidAllowances = mockAllowances.filter(a => a.status === 'pago').reduce((sum, a) => sum + a.amount, 0);
  const pendingAllowancesList = getPendingAllowances();

  // Estatísticas - Patrocínios
  const activeSponsorships = getActiveSponsorships();
  const totalSponsorshipMonthly = activeSponsorships.reduce((sum, s) => sum + s.monthlyAmount, 0);
  const totalSponsorshipYear = getTotalSponsorshipAmount();

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
      case 'pago':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Pago</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500"><AlertCircle className="w-3 h-3 mr-1" />Atrasado</Badge>;
      case 'aprovado':
        return <Badge className="bg-blue-500"><UserCheck className="w-3 h-3 mr-1" />Aprovado</Badge>;
      case 'rejeitado':
        return <Badge className="bg-gray-500"><Ban className="w-3 h-3 mr-1" />Rejeitado</Badge>;
      case 'ativo':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Ativo</Badge>;
      case 'vencido':
        return <Badge className="bg-red-500"><AlertCircle className="w-3 h-3 mr-1" />Vencido</Badge>;
      case 'renovacao':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Renovação</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const getSponsorshipTypeBadge = (type: string) => {
    switch (type) {
      case 'master':
        return <Badge className="bg-purple-500">Master</Badge>;
      case 'patrocinador':
        return <Badge className="bg-blue-500">Patrocinador</Badge>;
      case 'apoiador':
        return <Badge className="bg-green-500">Apoiador</Badge>;
      case 'fornecedor':
        return <Badge className="bg-orange-500">Fornecedor</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Departamento Financeiro</h2>
          <p className="text-sm text-muted-foreground">
            Gestão completa de receitas, despesas, patrocínios e reajustes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={String(selectedMonth)} onValueChange={(v) => setSelectedMonth(Number(v))}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={String(index)}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(selectedYear)} onValueChange={(v) => setSelectedYear(Number(v))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas Mensais</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              R$ {(totalPaid + totalSponsorshipMonthly).toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Mensalidades + Patrocínios
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folha de Pagamento</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">R$ {totalPayroll.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              {professionalAthletes.length + mockStaff.length} funcionários
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Gerais</CardTitle>
            <Receipt className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">R$ {totalExpenses.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              {mockExpenses.length} lançamentos
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patrocínios Ativos</CardTitle>
            <Handshake className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              R$ {totalSponsorshipMonthly.toLocaleString('pt-BR')}/mês
            </div>
            <p className="text-xs text-muted-foreground">
              {activeSponsorships.length} contratos ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="revenues">Mensalidades</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="allowances">Ajudas de Custo</TabsTrigger>
          <TabsTrigger value="sponsorships">Patrocínios</TabsTrigger>
          <TabsTrigger value="adjustments">Reajustes</TabsTrigger>
          <TabsTrigger value="reports">Resumo</TabsTrigger>
        </TabsList>

        {/* ABA: PAGAMENTOS */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Folha de Pagamento - {months[selectedMonth]} {selectedYear}</h3>
            <Button onClick={() => setPaymentDialogOpen(true)}>
              <CreditCard className="w-4 h-4 mr-2" />
              Efetuar Pagamento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Atletas Profissionais */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Atletas Profissionais</CardTitle>
                  <Badge variant="outline">{professionalAthletes.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold">Total Mensal</span>
                    <span className="text-xl font-bold text-green-600">
                      R$ {totalAthleteSalaries.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {professionalAthletes.slice(0, 10).map((athlete) => (
                      <div key={athlete.id} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <p className="font-medium">{athlete.name}</p>
                          <p className="text-xs text-muted-foreground">{athlete.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R$ {athlete.salary?.toLocaleString('pt-BR')}</p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-1"
                            onClick={() => {
                              setSelectedPerson(athlete);
                              setSelectedPersonType('atleta');
                              setAdjustIndividualSalaryOpen(true);
                            }}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Reajustar
                          </Button>
                        </div>
                      </div>
                    ))}
                    {professionalAthletes.length > 10 && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        + {professionalAthletes.length - 10} atletas
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Staff/Funcionários */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Equipe Técnica e Staff</CardTitle>
                  <Badge variant="outline">{mockStaff.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold">Total Mensal</span>
                    <span className="text-xl font-bold text-green-600">
                      R$ {totalStaffSalaries.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {mockStaff.map((staff) => (
                      <div key={staff.id} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R$ {staff.salary.toLocaleString('pt-BR')}</p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-1"
                            onClick={() => {
                              setSelectedPerson(staff);
                              setSelectedPersonType('staff');
                              setAdjustIndividualSalaryOpen(true);
                            }}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Reajustar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo Total */}
          <Card className="border-2 border-primary">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total da Folha de Pagamento</p>
                  <p className="text-3xl font-bold text-primary">R$ {totalPayroll.toLocaleString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total de Funcionários</p>
                  <p className="text-2xl font-bold">{professionalAthletes.length + mockStaff.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: MENSALIDADES */}
        <TabsContent value="revenues" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Mensalidades por Categoria</h3>
          </div>

          {/* Cards de Mensalidades por Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {mockCategoryFees.map((categoryFee) => (
              <Card key={categoryFee.category} className="hover:border-primary cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{categoryFee.category}</CardTitle>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        setSelectedCategory(categoryFee.category);
                        setCategoryFeeDialogOpen(true);
                      }}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Mensalidade</p>
                      <p className="text-2xl font-bold text-green-600">
                        R$ {categoryFee.monthlyFee.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Atletas</p>
                      <p className="text-lg font-semibold">{categoryFee.athleteCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Receita Mensal</p>
                      <p className="text-sm font-semibold text-blue-600">
                        R$ {(categoryFee.monthlyFee * categoryFee.athleteCount).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo Geral de Mensalidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Esperado/Mês</p>
                  <p className="text-2xl font-bold text-green-600">R$ {totalExpected.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {mockCategoryFees.reduce((sum, cat) => sum + cat.athleteCount, 0)} atletas
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Recebido</p>
                  <p className="text-2xl font-bold text-blue-600">R$ {totalPaid.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Pendente</p>
                  <p className="text-2xl font-bold text-yellow-600">R$ {totalPending.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Em Atraso</p>
                  <p className="text-2xl font-bold text-red-600">R$ {totalOverdue.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label>Buscar Atleta</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Nome ou categoria..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="w-48">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="paid">Pagos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="overdue">Atrasados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tabela */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Atleta</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Mensalidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAthletes.slice(0, 10).map((athlete) => (
                    <TableRow key={athlete.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{athlete.name}</p>
                          <p className="text-xs text-muted-foreground">{athlete.age} anos</p>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{athlete.category}</Badge></TableCell>
                      <TableCell>R$ {athlete.monthlyFee?.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(athlete.paymentStatus)}</TableCell>
                      <TableCell>
                        {athlete.paymentStatus !== 'paid' && (
                          <Button size="sm" variant="outline">Registrar</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: DESPESAS */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Despesas do Clube</h3>
            <Button onClick={() => setNewExpenseOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Registrar Despesa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total de Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {totalExpenses.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Despesas Pagas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">R$ {paidExpenses.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Despesas Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">R$ {pendingExpenses.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Forma Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aprovado por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell><Badge variant="secondary">{expense.category}</Badge></TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell className="font-semibold">R$ {expense.amount.toLocaleString('pt-BR')}</TableCell>
                      <TableCell className="text-sm">{expense.paymentMethod}</TableCell>
                      <TableCell>{getStatusBadge(expense.status)}</TableCell>
                      <TableCell className="text-sm">{expense.approvedBy || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: AJUDAS DE CUSTO */}
        <TabsContent value="allowances" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Ajudas de Custo</h3>
            <Button onClick={() => setNewAllowanceOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Solicitação
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ {totalAllowances.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Pagas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">R$ {paidAllowances.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">{pendingAllowancesList.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Solicitações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{mockAllowances.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Ajuda de Custo</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAllowances.map((allowance) => (
                    <TableRow key={allowance.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{allowance.recipientName}</p>
                          <Badge variant="outline" className="mt-1">
                            {allowance.recipientType === 'atleta' ? 'Atleta' : 'Staff'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell><Badge>{allowance.category}</Badge></TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-sm truncate">{allowance.reason}</p>
                      </TableCell>
                      <TableCell className="font-semibold">R$ {allowance.amount.toLocaleString('pt-BR')}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(allowance.requestDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{getStatusBadge(allowance.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {allowance.status === 'pendente' && (
                            <>
                              <Button size="sm" variant="outline" className="text-green-600">Aprovar</Button>
                              <Button size="sm" variant="outline" className="text-red-600">Rejeitar</Button>
                            </>
                          )}
                          {allowance.status === 'aprovado' && (
                            <Button size="sm" variant="outline">Pagar</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: PATROCÍNIOS */}
        <TabsContent value="sponsorships" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestão de Patrocínios</h3>
            <Button onClick={() => setNewSponsorshipOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Patrocínio
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  R$ {totalSponsorshipMonthly.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-muted-foreground">{activeSponsorships.length} contratos ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Receita Anual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  R$ {totalSponsorshipYear.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-muted-foreground">Contratos vigentes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Patrocinadores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{mockSponsorships.length}</p>
                <p className="text-xs text-muted-foreground">Total de parceiros</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contratos de Patrocínio</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor Mensal</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Vigência</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSponsorships.map((sponsorship) => (
                    <TableRow key={sponsorship.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sponsorship.company}</p>
                          <p className="text-xs text-muted-foreground">{sponsorship.contact}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getSponsorshipTypeBadge(sponsorship.type)}</TableCell>
                      <TableCell><Badge variant="outline">{sponsorship.category}</Badge></TableCell>
                      <TableCell className="font-semibold">
                        R$ {sponsorship.monthlyAmount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        R$ {sponsorship.totalAmount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(sponsorship.startDate).toLocaleDateString('pt-BR')} até{' '}
                        {new Date(sponsorship.endDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{getStatusBadge(sponsorship.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: REAJUSTES */}
        <TabsContent value="adjustments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Histórico de Reajustes Individuais</h3>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reajustes Salariais Aplicados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Salário Anterior</TableHead>
                    <TableHead>Novo Salário</TableHead>
                    <TableHead>Reajuste</TableHead>
                    <TableHead>Aprovado por</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockIndividualAdjustments.map((adjustment) => (
                    <TableRow key={adjustment.id}>
                      <TableCell>{new Date(adjustment.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{adjustment.personName}</p>
                          <Badge variant="outline" className="mt-1">
                            {adjustment.personType === 'atleta' ? 'Atleta' : 'Staff'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge>
                          {adjustment.adjustmentType === 'percentual' ? 'Percentual' : 'Valor Fixo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        R$ {adjustment.oldSalary.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        R$ {adjustment.newSalary.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">
                        {adjustment.adjustmentType === 'percentual' 
                          ? `+${adjustment.adjustmentValue.toFixed(1)}%` 
                          : `+R$ ${adjustment.adjustmentValue.toLocaleString('pt-BR')}`}
                      </TableCell>
                      <TableCell>{adjustment.approvedBy}</TableCell>
                      <TableCell className="text-sm max-w-[200px]">
                        <p className="truncate">{adjustment.notes}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    Como fazer reajustes salariais?
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Acesse a aba "Pagamentos" e clique no botão "Reajustar" ao lado do funcionário desejado para aplicar reajuste individual.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA: RESUMO */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa - {months[selectedMonth]} {selectedYear}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-green-600 flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4" />
                      Receitas (Mensalidades)
                    </span>
                    <span className="font-bold text-green-600">R$ {totalPaid.toLocaleString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-green-600 flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4" />
                      Receitas (Patrocínios)
                    </span>
                    <span className="font-bold text-green-600">R$ {totalSponsorshipMonthly.toLocaleString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-red-600 flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4" />
                      Folha de Pagamento
                    </span>
                    <span className="font-bold text-red-600">R$ {totalPayroll.toLocaleString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-red-600 flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4" />
                      Despesas Gerais
                    </span>
                    <span className="font-bold text-red-600">R$ {totalExpenses.toLocaleString('pt-BR')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-red-600 flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4" />
                      Ajudas de Custo
                    </span>
                    <span className="font-bold text-red-600">R$ {totalAllowances.toLocaleString('pt-BR')}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t-2">
                    <span className="font-bold">Resultado</span>
                    <span className={`text-2xl font-bold ${
                      (totalPaid + totalSponsorshipMonthly - totalPayroll - totalExpenses - totalAllowances) >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      R$ {(totalPaid + totalSponsorshipMonthly - totalPayroll - totalExpenses - totalAllowances).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(getExpensesByCategory()).map(([category, amount]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="font-semibold">R$ {amount.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${(amount / totalExpenses) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <span>Relatório Completo</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Download className="w-6 h-6" />
                <span>Exportar DRE</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Building className="w-6 h-6" />
                <span>Balancete Mensal</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>Projeção Anual</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog: Efetuar Pagamento */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Efetuar Pagamento</DialogTitle>
            <DialogDescription>
              Registre o pagamento de salários para atletas ou staff
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tipo de Beneficiário</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atleta">Atleta Profissional</SelectItem>
                  <SelectItem value="staff">Equipe Técnica/Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Beneficiário</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o beneficiário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Selecione o tipo primeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valor</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div>
                <Label>Mês de Referência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={String(index)}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea placeholder="Observações adicionais..." />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancelar</Button>
              <Button>Confirmar Pagamento</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Nova Despesa */}
      <Dialog open={newExpenseOpen} onOpenChange={setNewExpenseOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registrar Nova Despesa</DialogTitle>
            <DialogDescription>
              Cadastre uma nova despesa do clube
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="material">Material Esportivo</SelectItem>
                    <SelectItem value="medico">Médico</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valor</Label>
                <Input type="number" placeholder="0,00" />
              </div>
            </div>
            <div>
              <Label>Descrição</Label>
              <Input placeholder="Descrição da despesa" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Forma de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                    <SelectItem value="cartao">Cartão Corporativo</SelectItem>
                    <SelectItem value="debito">Débito Automático</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Número da Nota Fiscal (opcional)</Label>
              <Input placeholder="NF-XXXX" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewExpenseOpen(false)}>Cancelar</Button>
              <Button>Registrar Despesa</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Nova Ajuda de Custo */}
      <Dialog open={newAllowanceOpen} onOpenChange={setNewAllowanceOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Ajuda de Custo</DialogTitle>
            <DialogDescription>
              Registre uma nova solicitação de ajuda de custo para atleta ou profissional
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tipo de Beneficiário</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atleta">Atleta</SelectItem>
                  <SelectItem value="staff">Profissional (Staff)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Beneficiário</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o beneficiário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Selecione o tipo primeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="moradia">Moradia</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="curso">Curso/Capacitação</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valor</Label>
                <Input type="number" placeholder="0,00" />
              </div>
            </div>
            <div>
              <Label>Motivo da Solicitação</Label>
              <Textarea placeholder="Descreva o motivo da ajuda de custo..." rows={3} />
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea placeholder="Informações adicionais..." rows={2} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewAllowanceOpen(false)}>Cancelar</Button>
              <Button>Enviar Solicitação</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Configurar Mensalidade por Categoria */}
      <Dialog open={categoryFeeDialogOpen} onOpenChange={setCategoryFeeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configurar Mensalidade - {selectedCategory}</DialogTitle>
            <DialogDescription>
              Defina o valor da mensalidade para esta categoria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm font-semibold">Valor Atual</p>
              <p className="text-2xl font-bold text-blue-600">
                R$ {mockCategoryFees.find(c => c.category === selectedCategory)?.monthlyFee.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {mockCategoryFees.find(c => c.category === selectedCategory)?.athleteCount} atletas nesta categoria
              </p>
            </div>

            <div>
              <Label>Novo Valor da Mensalidade</Label>
              <Input 
                type="number" 
                step="0.01"
                placeholder="0,00" 
                defaultValue={mockCategoryFees.find(c => c.category === selectedCategory)?.monthlyFee}
              />
            </div>

            <div>
              <Label>Data de Vigência</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>Justificativa</Label>
              <Textarea placeholder="Motivo da alteração do valor..." rows={3} />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 p-3 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Esta alteração afetará {mockCategoryFees.find(c => c.category === selectedCategory)?.athleteCount} atletas da categoria {selectedCategory}.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCategoryFeeDialogOpen(false)}>Cancelar</Button>
              <Button>Salvar Alteração</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Reajuste Individual de Salário */}
      <Dialog open={adjustIndividualSalaryOpen} onOpenChange={setAdjustIndividualSalaryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reajustar Salário Individual</DialogTitle>
            <DialogDescription>
              Aplique um reajuste salarial para {selectedPerson?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold">Funcionário</p>
                  <p className="text-lg font-bold text-blue-600">{selectedPerson?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedPersonType === 'atleta' ? selectedPerson?.position : selectedPerson?.role}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Salário Atual</p>
                  <p className="text-2xl font-bold text-blue-600">
                    R$ {(selectedPerson?.salary || 0).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label>Tipo de Reajuste</Label>
              <Select defaultValue="percentual">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentual">Percentual (%)</SelectItem>
                  <SelectItem value="valor_fixo">Valor Fixo (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Valor do Reajuste</Label>
              <Input type="number" placeholder="Ex: 10 (para 10% ou R$ 10,00)" />
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <p className="text-sm font-semibold">Simulação</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Salário Atual</p>
                  <p className="text-lg font-bold">R$ {(selectedPerson?.salary || 0).toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Novo Salário (exemplo: +10%)</p>
                  <p className="text-lg font-bold text-green-600">
                    R$ {((selectedPerson?.salary || 0) * 1.1).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Label>Data de Vigência</Label>
              <Input type="date" />
            </div>

            <div>
              <Label>Justificativa</Label>
              <Textarea placeholder="Descreva o motivo do reajuste..." rows={3} />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAdjustIndividualSalaryOpen(false)}>Cancelar</Button>
              <Button>Aplicar Reajuste</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Novo Patrocínio */}
      <Dialog open={newSponsorshipOpen} onOpenChange={setNewSponsorshipOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Patrocínio</DialogTitle>
            <DialogDescription>
              Registre um novo contrato de patrocínio ou parceria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome da Empresa</Label>
                <Input placeholder="Ex: Nike Brasil" />
              </div>
              <div>
                <Label>Tipo de Parceria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="master">Master (Principal)</SelectItem>
                    <SelectItem value="patrocinador">Patrocinador</SelectItem>
                    <SelectItem value="apoiador">Apoiador</SelectItem>
                    <SelectItem value="fornecedor">Fornecedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Categoria</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uniformes">Uniformes</SelectItem>
                  <SelectItem value="material">Material Esportivo</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valor Mensal</Label>
                <Input type="number" placeholder="0,00" />
              </div>
              <div>
                <Label>Valor Total do Contrato</Label>
                <Input type="number" placeholder="0,00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data de Início</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Data de Término</Label>
                <Input type="date" />
              </div>
            </div>

            <div>
              <Label>Número do Contrato</Label>
              <Input placeholder="Ex: CON-2024-001" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome do Contato</Label>
                <Input placeholder="Nome do responsável" />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input placeholder="(11) 99999-9999" />
              </div>
            </div>

            <div>
              <Label>E-mail</Label>
              <Input type="email" placeholder="contato@empresa.com" />
            </div>

            <div>
              <Label>Benefícios/Contrapartidas</Label>
              <Textarea 
                placeholder="Liste os benefícios oferecidos ao patrocinador (ex: logo no uniforme, publicidade em redes sociais, etc.)" 
                rows={3} 
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewSponsorshipOpen(false)}>Cancelar</Button>
              <Button>Cadastrar Patrocínio</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
