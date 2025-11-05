import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  Shield,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  FileText,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  CreditCard,
  BarChart3,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PresidentDashboardProps {
  user: any;
  onLogout: () => void;
}

interface AthleteContract {
  id: number;
  name: string;
  photo?: string;
  category: string;
  position: string;
  contractType: 'professional' | 'base_with_contract' | 'formation' | 'none';
  monthlyValue: number;
  startDate: string;
  endDate: string;
  remainingMonths: number;
  status: 'active' | 'expiring' | 'expired';
  previousClubs?: string[];
  phone?: string;
}

export function PresidentDashboard({ user, onLogout }: PresidentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteContract | null>(null);

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

  // Dados dos atletas com contratos
  const athletesWithContracts: AthleteContract[] = [
    {
      id: 1,
      name: 'João Silva',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
      category: 'Profissional',
      position: 'Atacante',
      contractType: 'professional',
      monthlyValue: 50000,
      startDate: '2022-01-15',
      endDate: '2025-01-15',
      remainingMonths: calculateRemainingMonths('2025-01-15'),
      status: getContractStatus(calculateRemainingMonths('2025-01-15')),
      previousClubs: ['Santos FC', 'São Paulo FC'],
      phone: '(11) 98765-4321'
    },
    {
      id: 2,
      name: 'Carlos Santos',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      category: 'Sub-20',
      position: 'Meio-campo',
      contractType: 'base_with_contract',
      monthlyValue: 2000,
      startDate: '2021-06-01',
      endDate: '2024-12-01',
      remainingMonths: calculateRemainingMonths('2024-12-01'),
      status: getContractStatus(calculateRemainingMonths('2024-12-01')),
      previousClubs: ['Corinthians Base'],
      phone: '(11) 91234-5678'
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      category: 'Sub-17',
      position: 'Zagueiro',
      contractType: 'formation',
      monthlyValue: 800,
      startDate: '2023-01-10',
      endDate: '2026-01-10',
      remainingMonths: calculateRemainingMonths('2026-01-10'),
      status: getContractStatus(calculateRemainingMonths('2026-01-10')),
      previousClubs: [],
      phone: '(11) 93456-7890'
    },
    {
      id: 4,
      name: 'Lucas Ferreira',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
      category: 'Profissional',
      position: 'Goleiro',
      contractType: 'professional',
      monthlyValue: 35000,
      startDate: '2023-06-01',
      endDate: '2024-12-31',
      remainingMonths: calculateRemainingMonths('2024-12-31'),
      status: getContractStatus(calculateRemainingMonths('2024-12-31')),
      previousClubs: ['Fluminense', 'Vasco'],
      phone: '(21) 98888-7777'
    },
    {
      id: 5,
      name: 'Rafael Costa',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael',
      category: 'Profissional',
      position: 'Lateral',
      contractType: 'professional',
      monthlyValue: 28000,
      startDate: '2022-08-01',
      endDate: '2025-08-01',
      remainingMonths: calculateRemainingMonths('2025-08-01'),
      status: getContractStatus(calculateRemainingMonths('2025-08-01')),
      previousClubs: ['Botafogo'],
      phone: '(21) 97777-6666'
    },
    {
      id: 6,
      name: 'Gabriel Souza',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
      category: 'Sub-20',
      position: 'Atacante',
      contractType: 'base_with_contract',
      monthlyValue: 1500,
      startDate: '2023-03-01',
      endDate: '2024-11-30',
      remainingMonths: calculateRemainingMonths('2024-11-30'),
      status: getContractStatus(calculateRemainingMonths('2024-11-30')),
      previousClubs: [],
      phone: '(11) 96666-5555'
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://img.sofascore.com/api/v1/team/506795/image"
                alt="Hope Internacional"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="w-6 h-6 text-amber-600" />
                  Dashboard Presidencial
                </h1>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo, {user.name} • Acesso Total e Dados Sensíveis
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
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
              <p className="text-3xl font-bold">{totalAthletes}</p>
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
              <p className="text-3xl font-bold">R$ {totalMonthlyExpense.toLocaleString('pt-BR')}</p>
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
              <p className="text-3xl font-bold text-amber-600">{expiringContracts}</p>
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
              <p className="text-3xl font-bold text-red-600">{expiredContracts}</p>
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
                  <span className="text-sm font-semibold">R$ {professionalExpense.toLocaleString('pt-BR')}</span>
                </div>
                <Progress value={(professionalExpense / totalMonthlyExpense) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {((professionalExpense / totalMonthlyExpense) * 100).toFixed(1)}% do total
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Categorias de Base</span>
                  <span className="text-sm font-semibold">R$ {baseExpense.toLocaleString('pt-BR')}</span>
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
                  <span className="text-xl font-bold text-green-600">
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
                          <p className="font-semibold truncate">{athlete.name}</p>
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
                            <p className="font-semibold">{athlete.name}</p>
                            <p className="text-xs text-muted-foreground">{athlete.position}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{athlete.category}</Badge>
                      </TableCell>
                      <TableCell>{getContractTypeName(athlete.contractType)}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        R$ {athlete.monthlyValue.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(athlete.startDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(athlete.endDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          athlete.remainingMonths <= 0 ? 'text-red-600' :
                          athlete.remainingMonths <= 6 ? 'text-amber-600' :
                          'text-green-600'
                        }`}>
                          {athlete.remainingMonths <= 0 ? 'Vencido' : `${athlete.remainingMonths} meses`}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(athlete.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Detalhes
                        </Button>
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
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Informações Confidenciais
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Este dashboard contém dados financeiros sensíveis e informações contratuais confidenciais. 
                  Acesso exclusivo ao Presidente. Todas as visualizações são registradas para fins de auditoria.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
