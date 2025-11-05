import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import {
  Shield,
  DollarSign,
  AlertTriangle,
  Users,
  FileText,
  Search,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  User,
  MapPin,
  Phone,
  CreditCard,
  Building,
  Calendar as CalendarIcon,
  TrendingUp,
  Plus,
  RefreshCw,
  Upload,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Textarea } from './ui/textarea';
import { CreateContractDialog, RenewContractDialog, TerminateContractDialog } from './ContractActions';

interface ContractManagementProps {
  user: any;
}

interface AthleteContract {
  id: number;
  name: string;
  photo?: string;
  category: string;
  position: string;
  positions?: string[];
  preferredFoot?: string;
  age?: number;
  jerseyNumber?: number;
  contractType: 'professional' | 'base_with_contract' | 'formation' | 'none';
  monthlyValue: number;
  startDate: string;
  endDate: string;
  remainingMonths: number;
  status: 'active' | 'expiring' | 'expired';
  previousClubs?: string[];
  phone?: string;
  cpf?: string;
  rg?: string;
  passport?: string;
  bidCBF?: string;
  joinDate?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contractDuration?: string;
  contractPDF?: string;
  // Estatísticas
  matches?: number;
  minutes?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
}

export function ContractManagement({ user }: ContractManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteContract | null>(null);
  
  // Estados para os dialogs de gestão de contratos
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  const [isTerminateDialogOpen, setIsTerminateDialogOpen] = useState(false);
  const [athleteToManage, setAthleteToManage] = useState<AthleteContract | null>(null);

  // Função para calcular meses restantes
  const calculateRemainingMonths = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  // Função para determinar status do contrato
  const getContractStatus = (remainingMonths: number): 'active' | 'expiring' | 'expired' => {
    if (remainingMonths <= 0) return 'expired';
    if (remainingMonths <= 6) return 'expiring';
    return 'active';
  };

  // Dados dos atletas com contratos (mock data)
  const athletesWithContracts: AthleteContract[] = [
    {
      id: 1,
      name: 'João Silva',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
      category: 'Profissional',
      position: 'Atacante',
      positions: ['Atacante', 'Ponta Direita', 'Ponta Esquerda'],
      preferredFoot: 'Direito',
      age: 23,
      jerseyNumber: 10,
      contractType: 'professional',
      monthlyValue: 50000,
      startDate: '2022-01-15',
      endDate: '2025-01-15',
      remainingMonths: calculateRemainingMonths('2025-01-15'),
      status: getContractStatus(calculateRemainingMonths('2025-01-15')),
      previousClubs: ['Santos FC', 'São Paulo FC'],
      phone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      passport: 'AB123456',
      bidCBF: '12345678',
      joinDate: '2022-01-15',
      contractDuration: '3 anos',
      contractPDF: 'contrato_joao_silva.pdf',
      address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      matches: 15,
      minutes: 1230,
      goals: 8,
      assists: 4,
      yellowCards: 3,
      redCards: 0
    },
    {
      id: 2,
      name: 'Carlos Santos',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      category: 'Sub-20',
      position: 'Meio-campo',
      positions: ['Meio-campo', 'Volante'],
      preferredFoot: 'Esquerdo',
      age: 19,
      jerseyNumber: 8,
      contractType: 'base_with_contract',
      monthlyValue: 2000,
      startDate: '2021-06-01',
      endDate: '2024-12-01',
      remainingMonths: calculateRemainingMonths('2024-12-01'),
      status: getContractStatus(calculateRemainingMonths('2024-12-01')),
      previousClubs: ['Corinthians Base'],
      phone: '(11) 91234-5678',
      cpf: '987.654.321-00',
      rg: '98.765.432-1',
      bidCBF: '87654321',
      joinDate: '2021-06-01',
      contractDuration: '2 anos',
      contractPDF: 'contrato_carlos_santos.pdf',
      address: {
        street: 'Avenida Paulista',
        number: '1000',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100'
      },
      matches: 12,
      minutes: 980,
      goals: 3,
      assists: 7,
      yellowCards: 1,
      redCards: 1
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      category: 'Sub-17',
      position: 'Zagueiro',
      positions: ['Zagueiro', 'Zagueiro Central'],
      preferredFoot: 'Direito',
      age: 17,
      jerseyNumber: 4,
      contractType: 'formation',
      monthlyValue: 800,
      startDate: '2023-01-10',
      endDate: '2026-01-10',
      remainingMonths: calculateRemainingMonths('2026-01-10'),
      status: getContractStatus(calculateRemainingMonths('2026-01-10')),
      previousClubs: [],
      phone: '(11) 93456-7890',
      cpf: '456.789.123-00',
      rg: '45.678.912-3',
      bidCBF: '45678912',
      joinDate: '2023-01-10',
      contractDuration: '3 anos',
      contractPDF: 'contrato_pedro_oliveira.pdf',
      address: {
        street: 'Rua Augusta',
        number: '500',
        neighborhood: 'Consolação',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01305-000'
      },
      matches: 18,
      minutes: 1560,
      goals: 1,
      assists: 2,
      yellowCards: 2,
      redCards: 0
    },
    {
      id: 4,
      name: 'Lucas Ferreira',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
      category: 'Profissional',
      position: 'Goleiro',
      positions: ['Goleiro'],
      preferredFoot: 'Direito',
      age: 28,
      jerseyNumber: 1,
      contractType: 'professional',
      monthlyValue: 35000,
      startDate: '2023-06-01',
      endDate: '2024-12-31',
      remainingMonths: calculateRemainingMonths('2024-12-31'),
      status: getContractStatus(calculateRemainingMonths('2024-12-31')),
      previousClubs: ['Fluminense', 'Vasco'],
      phone: '(21) 98888-7777',
      cpf: '321.654.987-00',
      rg: '32.165.498-7',
      passport: 'CD789012',
      bidCBF: '32165498',
      joinDate: '2023-06-01',
      contractDuration: '18 meses',
      contractPDF: 'contrato_lucas_ferreira.pdf',
      address: {
        street: 'Rua do Catete',
        number: '200',
        neighborhood: 'Catete',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22220-000'
      },
      matches: 14,
      minutes: 1260,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0
    },
    {
      id: 5,
      name: 'Rafael Costa',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael',
      category: 'Profissional',
      position: 'Lateral',
      positions: ['Lateral Direito', 'Lateral Esquerdo'],
      preferredFoot: 'Ambidestro',
      age: 25,
      jerseyNumber: 2,
      contractType: 'professional',
      monthlyValue: 28000,
      startDate: '2022-08-01',
      endDate: '2025-08-01',
      remainingMonths: calculateRemainingMonths('2025-08-01'),
      status: getContractStatus(calculateRemainingMonths('2025-08-01')),
      previousClubs: ['Botafogo'],
      phone: '(21) 97777-6666',
      cpf: '741.852.963-00',
      rg: '74.185.296-3',
      passport: 'EF345678',
      bidCBF: '74185296',
      joinDate: '2022-08-01',
      contractDuration: '3 anos',
      contractPDF: 'contrato_rafael_costa.pdf',
      address: {
        street: 'Avenida Atlântica',
        number: '1500',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '22021-000'
      },
      matches: 20,
      minutes: 1750,
      goals: 2,
      assists: 5,
      yellowCards: 4,
      redCards: 0
    },
    {
      id: 6,
      name: 'Gabriel Souza',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
      category: 'Sub-20',
      position: 'Atacante',
      positions: ['Atacante', 'Segundo Atacante'],
      preferredFoot: 'Esquerdo',
      age: 18,
      jerseyNumber: 11,
      contractType: 'base_with_contract',
      monthlyValue: 1500,
      startDate: '2023-03-01',
      endDate: '2024-11-30',
      remainingMonths: calculateRemainingMonths('2024-11-30'),
      status: getContractStatus(calculateRemainingMonths('2024-11-30')),
      previousClubs: [],
      phone: '(11) 96666-5555',
      cpf: '159.753.486-00',
      rg: '15.975.348-6',
      bidCBF: '15975348',
      joinDate: '2023-03-01',
      contractDuration: '20 meses',
      contractPDF: 'contrato_gabriel_souza.pdf',
      address: {
        street: 'Rua Vergueiro',
        number: '800',
        neighborhood: 'Vila Mariana',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '04101-000'
      },
      matches: 16,
      minutes: 1120,
      goals: 6,
      assists: 3,
      yellowCards: 2,
      redCards: 0
    }
  ];

  // Filtrar atletas
  const filteredAthletes = athletesWithContracts.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || athlete.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || athlete.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Estatísticas gerais
  const totalAthletes = athletesWithContracts.length;
  const expiringContracts = athletesWithContracts.filter(a => a.status === 'expiring').length;
  const expiredContracts = athletesWithContracts.filter(a => a.status === 'expired').length;
  const totalMonthlyExpense = athletesWithContracts.reduce((sum, a) => sum + a.monthlyValue, 0);
  const totalAnnualExpense = totalMonthlyExpense * 12;
  
  // Atletas por categoria
  const professionalCount = athletesWithContracts.filter(a => a.category === 'Profissional').length;
  const sub20Count = athletesWithContracts.filter(a => a.category === 'Sub-20').length;
  const sub17Count = athletesWithContracts.filter(a => a.category === 'Sub-17').length;

  // Despesas por categoria
  const professionalExpense = athletesWithContracts
    .filter(a => a.category === 'Profissional')
    .reduce((sum, a) => sum + a.monthlyValue, 0);
  const baseExpense = athletesWithContracts
    .filter(a => a.category !== 'Profissional')
    .reduce((sum, a) => sum + a.monthlyValue, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'expiring':
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Vence em 6 meses</Badge>;
      case 'expired':
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" />Vencido</Badge>;
      default:
        return <Badge variant="outline" className="gap-1"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
    }
  };

  const getContractTypeName = (type: string) => {
    switch (type) {
      case 'professional':
        return 'Profissional';
      case 'base_with_contract':
        return 'Base';
      case 'formation':
        return 'Formação';
      default:
        return 'Sem contrato';
    }
  };

  const handleExportReport = () => {
    toast.success('Relatório exportado com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Header com Botão Novo Contrato */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3>Gestão de Contratos</h3>
                <p className="text-sm text-muted-foreground">
                  Crie, renove ou encerre contratos dos atletas
                </p>
              </div>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Novo Contrato
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alertas Críticos */}
      {(expiringContracts > 0 || expiredContracts > 0) && (
        <Alert variant="destructive" className="border-2">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Atenção: Contratos Requerem Ação Imediata</AlertTitle>
          <AlertDescription>
            {expiringContracts > 0 && (
              <span className="block">
                <strong>{expiringContracts}</strong> contrato(s) vencendo nos próximos 6 meses
              </span>
            )}
            {expiredContracts > 0 && (
              <span className="block">
                <strong>{expiredContracts}</strong> contrato(s) já vencido(s)
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Cards de Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Total de Atletas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{totalAthletes}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {professionalCount} Profissionais • {sub20Count} Sub-20 • {sub17Count} Sub-17
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              Despesa Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">R$ {totalMonthlyExpense.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Anual: R$ {totalAnnualExpense.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Contratos Vencendo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-amber-600">{expiringContracts}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Próximos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Contratos Vencidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-red-600">{expiredContracts}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ação imediata necessária
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Análise Financeira */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Distribuição de Despesas
            </CardTitle>
            <CardDescription>Gastos mensais por categoria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Profissional</span>
                <span className="text-sm">R$ {professionalExpense.toLocaleString('pt-BR')}</span>
              </div>
              <Progress value={(professionalExpense / totalMonthlyExpense) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {((professionalExpense / totalMonthlyExpense) * 100).toFixed(1)}% do total
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Categorias de Base</span>
                <span className="text-sm">R$ {baseExpense.toLocaleString('pt-BR')}</span>
              </div>
              <Progress value={(baseExpense / totalMonthlyExpense) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {((baseExpense / totalMonthlyExpense) * 100).toFixed(1)}% do total
              </p>
            </div>

            <Separator />

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span>Total Mensal</span>
                <span className="text-xl text-green-600">
                  R$ {totalMonthlyExpense.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Atletas com Contratos Críticos
            </CardTitle>
            <CardDescription>Requerem renovação urgente</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {athletesWithContracts
                  .filter(a => a.status === 'expiring' || a.status === 'expired')
                  .sort((a, b) => a.remainingMonths - b.remainingMonths)
                  .map((athlete) => (
                    <div
                      key={athlete.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={athlete.photo} />
                        <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{athlete.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {athlete.position} • {athlete.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={athlete.status === 'expired' ? 'destructive' : 'default'}>
                          {athlete.remainingMonths <= 0 ? 'Vencido' : `${athlete.remainingMonths}m`}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Completa de Atletas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestão Completa de Contratos</CardTitle>
              <CardDescription>Visualize e gerencie todos os contratos dos atletas</CardDescription>
            </div>
            <Button onClick={handleExportReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar atleta ou posição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Profissional">Profissional</SelectItem>
                <SelectItem value="Sub-20">Sub-20</SelectItem>
                <SelectItem value="Sub-17">Sub-17</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="expiring">Vencendo</SelectItem>
                <SelectItem value="expired">Vencidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Atleta</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor Mensal</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Término</TableHead>
                  <TableHead>Restante</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAthletes.map((athlete) => (
                  <TableRow key={athlete.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={athlete.photo} />
                          <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{athlete.name}</p>
                          <p className="text-xs text-muted-foreground">{athlete.position}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{athlete.category}</Badge>
                    </TableCell>
                    <TableCell>{getContractTypeName(athlete.contractType)}</TableCell>
                    <TableCell className="text-green-600">
                      R$ {athlete.monthlyValue.toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(athlete.startDate).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(athlete.endDate).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <span className={`${
                        athlete.remainingMonths <= 0 ? 'text-red-600' :
                        athlete.remainingMonths <= 6 ? 'text-amber-600' :
                        'text-green-600'
                      }`}>
                        {athlete.remainingMonths <= 0 ? 'Vencido' : `${athlete.remainingMonths} meses`}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(athlete.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botões de Ação */}
                        {(athlete.status === 'active' || athlete.status === 'expiring') && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setAthleteToManage(athlete);
                              setIsRenewDialogOpen(true);
                            }}
                          >
                            <RefreshCw className="w-3 h-3" />
                            Renovar
                          </Button>
                        )}
                        
                        {athlete.status !== 'expired' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setAthleteToManage(athlete);
                              setIsTerminateDialogOpen(true);
                            }}
                          >
                            <X className="w-3 h-3" />
                            Encerrar
                          </Button>
                        )}
                        
                        {/* Botão Detalhes */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedAthlete(athlete)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage src={athlete.photo} />
                                  <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <DialogTitle>{athlete.name}</DialogTitle>
                                  <DialogDescription>
                                    {athlete.position} • {athlete.category} • Camisa {athlete.jerseyNumber}
                                  </DialogDescription>
                                </div>
                              </div>
                            </DialogHeader>
                            
                            <ScrollArea className="max-h-[calc(90vh-180px)]">
                              <Tabs defaultValue="contract" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="contract">Contrato</TabsTrigger>
                                  <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
                                </TabsList>

                                <TabsContent value="contract" className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Tipo de Contrato</Label>
                                      <p>{getContractTypeName(athlete.contractType)}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Valor Mensal</Label>
                                      <p className="text-green-600">R$ {athlete.monthlyValue.toLocaleString('pt-BR')}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Data de Início</Label>
                                      <p>{new Date(athlete.startDate).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Data de Término</Label>
                                      <p>{new Date(athlete.endDate).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Duração do Contrato</Label>
                                      <p>{athlete.contractDuration}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Meses Restantes</Label>
                                      <p className={athlete.remainingMonths <= 6 ? 'text-red-600' : 'text-green-600'}>
                                        {athlete.remainingMonths} meses
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="personal" className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>CPF</Label>
                                      <p>{athlete.cpf || 'Não informado'}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>RG</Label>
                                      <p>{athlete.rg || 'Não informado'}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Passaporte</Label>
                                      <p>{athlete.passport || 'Não informado'}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>BID CBF</Label>
                                      <p>{athlete.bidCBF || 'Não informado'}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Telefone</Label>
                                      <p>{athlete.phone || 'Não informado'}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Data de Entrada</Label>
                                      <p>{athlete.joinDate ? new Date(athlete.joinDate).toLocaleDateString('pt-BR') : 'Não informado'}</p>
                                    </div>
                                  </div>

                                  {athlete.address && (
                                    <div className="space-y-2">
                                      <Label>Endereço</Label>
                                      <p className="text-sm">
                                        {athlete.address.street}, {athlete.address.number}
                                        {athlete.address.complement && ` - ${athlete.address.complement}`}<br />
                                        {athlete.address.neighborhood} - {athlete.address.city}/{athlete.address.state}<br />
                                        CEP: {athlete.address.zipCode}
                                      </p>
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    <Label>Clubes Anteriores</Label>
                                    {athlete.previousClubs && athlete.previousClubs.length > 0 ? (
                                      <ul className="list-disc list-inside">
                                        {athlete.previousClubs.map((club, idx) => (
                                          <li key={idx}>{club}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-muted-foreground italic">Clube de formação - sem clubes anteriores</p>
                                    )}
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAthletes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum atleta encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rodapé com Informações */}
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-amber-900 dark:text-amber-100 mb-1">
                Informações Confidenciais
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Este módulo contém dados financeiros sensíveis e informações contratuais confidenciais. 
                Acesso exclusivo ao Presidente. Todas as visualizações são registradas para fins de auditoria.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs de Gestão de Contratos */}
      <CreateContractDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      <RenewContractDialog
        isOpen={isRenewDialogOpen}
        onClose={() => {
          setIsRenewDialogOpen(false);
          setAthleteToManage(null);
        }}
        athlete={athleteToManage}
      />

      <TerminateContractDialog
        isOpen={isTerminateDialogOpen}
        onClose={() => {
          setIsTerminateDialogOpen(false);
          setAthleteToManage(null);
        }}
        athlete={athleteToManage}
      />
    </div>
  );
}
