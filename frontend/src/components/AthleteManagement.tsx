import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Search, 
  Plus, 
  Eye, 
  Calendar, 
  AlertCircle, 
  Upload, 
  FileText, 
  Lock,
  User,
  MapPin,
  Phone,
  CreditCard,
  Shield,
  Building,
  DollarSign,
  Calendar as CalendarIcon,
  CheckCircle2,
  Heart,
  Clock,
  Stethoscope,
  Download,
  FileDown,
  Users,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { mockAthletes, getAthletesByCategory } from '../data/mockAthletes';
import jsPDF from 'jspdf';
import { addHopeHeaderSync, addHopeFooter, addSectionTitle, addTextLine, checkPageBreak, preloadHopeLogo } from '../utils/pdfHelpers';

interface AthleteManagementProps {
  user: any;
}

// Tipo de dados do atleta expandido
interface Athlete {
  id: number;
  // Dados básicos
  name: string;
  photo?: string;
  position: string;
  positions: string[]; // Todas as posições que pode atuar
  preferredFoot: 'Direito' | 'Esquerdo' | 'Ambidestro';
  category: string;
  age: number;
  jerseyNumber?: number;
  
  // Documentos pessoais
  cpf?: string;
  rg?: string;
  passport?: string;
  bidCBF?: string;
  
  // Contato e endereço
  phone?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Histórico profissional
  joinDate: string;
  previousClubs?: string[];
  
  // Dados contratuais (sensíveis - apenas PRESIDENTE)
  contractType: 'professional' | 'base_with_contract' | 'formation' | 'none';
  professionalContract?: {
    hasContract: boolean;
    value?: number;
    duration?: string;
    startDate?: string;
    endDate?: string;
    contractPDF?: string;
  };
  baseContract?: {
    hasContract: boolean;
    value?: number;
    duration?: string;
    startDate?: string;
    endDate?: string;
    contractPDF?: string;
  };
  formationContract?: {
    hasContract: boolean;
    hasAllowance: boolean;
    allowanceValue?: number;
    duration?: string;
    startDate?: string;
    endDate?: string;
    contractPDF?: string;
  };
  
  // Estatísticas
  matches: number;
  minutes: number;
  yellowCards: number;
  redCards: number;
  goals: number;
  assists: number;
  cardDetails: any[];
}

export function AthleteManagement({ user }: AthleteManagementProps) {
  const [selectedAthlete, setSelectedAthlete] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Verificar se o usuário é presidente
  const isPresident = user.role === 'presidente';
  const canAccessSensitiveData = isPresident;
  
  // Verificar se o usuário pode exportar dados de atletas em PDF (gerente ou presidente)
  const canExportAthletePDF = user.role === 'gerente' || user.role === 'presidente';

  // Função para exportar dados do atleta em PDF
  const exportAthleteDataToPDF = async (athlete: any) => {
    // Carregar logo do Hope primeiro
    const logoBase64 = await preloadHopeLogo();
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    
    // Adicionar cabeçalho com logo
    let yPosition = addHopeHeaderSync(doc, pageWidth, 'FICHA COMPLETA DO ATLETA', logoBase64);

    // Função auxiliar para verificar quebra de página
    const checkBreak = (space: number) => {
      const result = checkPageBreak(doc, yPosition, space, pageHeight, margin);
      yPosition = result.newY;
    };

    // Função auxiliar para adicionar texto
    const addLine = (text: string, size: number = 10, bold: boolean = false) => {
      yPosition = addTextLine(doc, text, yPosition, margin, size, bold);
    };

    // DADOS PESSOAIS
    yPosition = addSectionTitle(doc, 'DADOS PESSOAIS', yPosition, margin);
    addLine(`Nome: ${athlete.name}`, 11, true);
    addLine(`Idade: ${athlete.age} anos`);
    addLine(`Posição: ${athlete.position}`);
    addLine(`Perna Dominante: ${athlete.preferredFoot}`);
    addLine(`Categoria: ${athlete.category}`);
    addLine(`Número da Camisa: ${athlete.jerseyNumber || 'N/A'}`);
    
    if (athlete.positions && athlete.positions.length > 0) {
      addLine(`Posições que atua: ${athlete.positions.join(', ')}`);
    }
    yPosition += 5;

    // DOCUMENTOS
    checkBreak(40);
    yPosition = addSectionTitle(doc, 'DOCUMENTOS', yPosition, margin);
    addLine(`CPF: ${athlete.cpf || 'Não informado'}`);
    addLine(`RG: ${athlete.rg || 'Não informado'}`);
    addLine(`Passaporte: ${athlete.passport || 'Não informado'}`);
    addLine(`BID CBF: ${athlete.bidCBF || 'Não informado'}`);
    yPosition += 5;

    // CONTATO
    checkBreak(30);
    yPosition = addSectionTitle(doc, 'CONTATO', yPosition, margin);
    addLine(`Telefone: ${athlete.phone || 'Não informado'}`);
    
    if (athlete.address) {
      addLine(`Endereço: ${athlete.address.street}, ${athlete.address.number}`);
      if (athlete.address.complement) {
        addLine(`Complemento: ${athlete.address.complement}`);
      }
      addLine(`${athlete.address.neighborhood} - ${athlete.address.city}/${athlete.address.state}`);
      addLine(`CEP: ${athlete.address.zipCode || 'N/A'}`);
    }
    yPosition += 5;

    // ESTATÍSTICAS
    checkBreak(50);
    yPosition = addSectionTitle(doc, 'ESTATÍSTICAS DA TEMPORADA', yPosition, margin);
    addLine(`Partidas Disputadas: ${athlete.matches}`);
    addLine(`Minutos em Campo: ${athlete.minutes}`);
    addLine(`Gols Marcados: ${athlete.goals}`);
    addLine(`Assistências: ${athlete.assists}`);
    addLine(`Cartões Amarelos: ${athlete.yellowCards}`);
    addLine(`Cartões Vermelhos: ${athlete.redCards}`);
    yPosition += 5;

    // HISTÓRICO DE LESÕES
    checkBreak(40);
    yPosition = addSectionTitle(doc, 'HISTÓRICO DE LESÕES', yPosition, margin);
    
    const mockInjuries = athlete.status === 'Lesionado' ? [
      {
        type: 'Lesão Muscular',
        specificType: 'Estiramento na coxa direita',
        severity: 'Moderada',
        date: '2024-10-08',
        expectedReturn: '2024-10-28',
        status: 'Em Recuperação',
        doctor: 'Dr. Carlos Mendes'
      }
    ] : [
      {
        type: 'Lesão Muscular',
        specificType: 'Estiramento posterior da coxa',
        severity: 'Leve',
        date: '2024-08-15',
        actualReturn: '2024-08-24',
        status: 'Recuperado',
        doctor: 'Dr. Carlos Mendes'
      },
      {
        type: 'Entorse',
        specificType: 'Entorse de tornozelo esquerdo',
        severity: 'Moderada',
        date: '2024-06-10',
        actualReturn: '2024-06-30',
        status: 'Recuperado',
        doctor: 'Dr. Carlos Mendes'
      }
    ];

    if (mockInjuries.length > 0) {
      mockInjuries.forEach((injury: any, index: number) => {
        checkBreak(35);
        addLine(`${index + 1}. ${injury.type} - ${injury.specificType}`, 10, true);
        addLine(`   Gravidade: ${injury.severity} | Status: ${injury.status}`, 9);
        addLine(`   Data: ${new Date(injury.date).toLocaleDateString('pt-BR')}`, 9);
        if (injury.actualReturn) {
          addLine(`   Retorno: ${new Date(injury.actualReturn).toLocaleDateString('pt-BR')}`, 9);
        } else if (injury.expectedReturn) {
          addLine(`   Retorno Previsto: ${new Date(injury.expectedReturn).toLocaleDateString('pt-BR')}`, 9);
        }
        addLine(`   Médico: ${injury.doctor}`, 9);
        yPosition += 3;
      });
    } else {
      addLine('Sem lesões registradas');
    }
    yPosition += 5;

    // HISTÓRICO PROFISSIONAL
    checkBreak(40);
    yPosition = addSectionTitle(doc, 'HISTÓRICO PROFISSIONAL', yPosition, margin);
    addLine(`Data de Entrada no Clube: ${new Date(athlete.joinDate).toLocaleDateString('pt-BR')}`);
    
    if (athlete.previousClubs && athlete.previousClubs.length > 0) {
      addLine('Clubes Anteriores:', 10, true);
      athlete.previousClubs.forEach((club: string) => {
        addLine(`  • ${club}`, 9);
      });
    } else {
      addLine('Clube de origem');
    }
    yPosition += 5;

    // DADOS CONTRATUAIS (apenas para presidente)
    if (canAccessSensitiveData) {
      checkBreak(60);
      yPosition = addSectionTitle(doc, 'DADOS CONTRATUAIS (CONFIDENCIAL)', yPosition, margin, '#cc0000');
      
      if (athlete.contractType === 'professional' && athlete.professionalContract?.hasContract) {
        addLine('Contrato Profissional', 11, true);
        addLine(`Valor Mensal: R$ ${athlete.professionalContract.value?.toLocaleString('pt-BR')}`);
        addLine(`Duração: ${athlete.professionalContract.duration}`);
        addLine(`Início: ${new Date(athlete.professionalContract.startDate).toLocaleDateString('pt-BR')}`);
        addLine(`Término: ${new Date(athlete.professionalContract.endDate).toLocaleDateString('pt-BR')}`);
      } else if (athlete.contractType === 'base_with_contract' && athlete.baseContract?.hasContract) {
        addLine('Contrato de Base', 11, true);
        addLine(`Valor Mensal: R$ ${athlete.baseContract.value?.toLocaleString('pt-BR')}`);
        addLine(`Duração: ${athlete.baseContract.duration}`);
        addLine(`Início: ${new Date(athlete.baseContract.startDate).toLocaleDateString('pt-BR')}`);
        addLine(`Término: ${new Date(athlete.baseContract.endDate).toLocaleDateString('pt-BR')}`);
      } else if (athlete.contractType === 'formation' && athlete.formationContract?.hasContract) {
        addLine('Contrato de Formação', 11, true);
        addLine(`Tem Ajuda de Custo: ${athlete.formationContract.hasAllowance ? 'Sim' : 'Não'}`);
        if (athlete.formationContract.hasAllowance) {
          addLine(`Valor da Ajuda: R$ ${athlete.formationContract.allowanceValue?.toLocaleString('pt-BR')}`);
        }
        addLine(`Duração: ${athlete.formationContract.duration}`);
        addLine(`Início: ${new Date(athlete.formationContract.startDate).toLocaleDateString('pt-BR')}`);
        addLine(`Término: ${new Date(athlete.formationContract.endDate).toLocaleDateString('pt-BR')}`);
      } else {
        addLine('Sem contrato registrado');
      }
    }

    // Rodapé
    addHopeFooter(doc, pageWidth, pageHeight);

    // Salvar PDF
    const fileName = `Hope_${athlete.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast.success('PDF exportado com sucesso!');
  };

  // Função para exportar dados do atleta para outros clubes (SEM DADOS SENSÍVEIS)
  const exportAthleteForTransferPDF = async (athlete: any) => {
    // Carregar logo do Hope primeiro
    const logoBase64 = await preloadHopeLogo();
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    
    // Adicionar cabeçalho com logo
    let yPosition = addHopeHeaderSync(doc, pageWidth, undefined, logoBase64);
    
    // Função auxiliar para verificar quebra de página
    const checkBreak = (space: number) => {
      const result = checkPageBreak(doc, yPosition, space, pageHeight, margin);
      yPosition = result.newY;
    };

    // Função auxiliar para adicionar texto
    const addLine = (text: string, size: number = 10, bold: boolean = false) => {
      yPosition = addTextLine(doc, text, yPosition, margin, size, bold);
    };
      
    // Título do Documento
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#000000');
    doc.text('PERFIL DO ATLETA', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#666666');
    doc.text('Documento para apresentação a clubes parceiros', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 5;
    
    // Linha separadora
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    doc.setTextColor('#000000');

    // DADOS BÁSICOS DO ATLETA
    yPosition = addSectionTitle(doc, 'PERFIL DO JOGADOR', yPosition, margin);
    addLine(`Nome: ${athlete.name}`, 12, true);
    addLine(`Idade: ${athlete.age} anos`, 11);
    addLine(`Data de Nascimento: ${new Date(athlete.birthDate || '2000-01-01').toLocaleDateString('pt-BR')}`);
    addLine(`Nacionalidade: ${athlete.nationality || 'Brasileiro'}`);
    addLine(`Categoria Atual: ${athlete.category}`);
    yPosition += 5;

    // CARACTERÍSTICAS TÉCNICAS
    yPosition = addSectionTitle(doc, 'CARACTERÍSTICAS TÉCNICAS', yPosition, margin);
    addLine(`Posição Principal: ${athlete.position}`, 11, true);
    addLine(`Perna Dominante: ${athlete.preferredFoot}`);
    
    if (athlete.positions && athlete.positions.length > 0) {
      addLine(`Pode atuar também como: ${athlete.positions.join(', ')}`);
    }
    
    yPosition += 5;

    // ESTATÍSTICAS DE DESEMPENHO
    checkBreak(60);
    yPosition = addSectionTitle(doc, 'ESTATÍSTICAS E DESEMPENHO', yPosition, margin);
    
    // Box com estatísticas principais
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.3);
    const statsBoxHeight = 45;
    doc.rect(margin, yPosition, pageWidth - 2 * margin, statsBoxHeight);
    
    yPosition += 8;
    const col1 = margin + 10;
    const col2 = margin + (pageWidth - 2 * margin) / 2 + 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Partidas: ${athlete.matches}`, col1, yPosition);
    doc.text(`Minutos: ${athlete.minutes}`, col2, yPosition);
    yPosition += 8;
    
    doc.text(`Gols: ${athlete.goals}`, col1, yPosition);
    doc.text(`Assistências: ${athlete.assists}`, col2, yPosition);
    yPosition += 8;
    
    doc.text(`Cartões Amarelos: ${athlete.yellowCards}`, col1, yPosition);
    doc.text(`Cartões Vermelhos: ${athlete.redCards}`, col2, yPosition);
    yPosition += 15;

    // HISTÓRICO DE LESÕES
    checkBreak(50);
    yPosition = addSectionTitle(doc, 'HISTÓRICO MÉDICO', yPosition, margin);
    
    const mockInjuries = athlete.status === 'Lesionado' ? [
      {
        type: 'Lesão Muscular',
        specificType: 'Estiramento na coxa direita',
        severity: 'Moderada',
        date: '2024-10-08',
        expectedReturn: '2024-10-28',
        status: 'Em Recuperação'
      }
    ] : [
      {
        type: 'Lesão Muscular',
        specificType: 'Estiramento posterior da coxa',
        severity: 'Leve',
        date: '2024-08-15',
        actualReturn: '2024-08-24',
        status: 'Recuperado'
      },
      {
        type: 'Entorse',
        specificType: 'Entorse de tornozelo esquerdo',
        severity: 'Moderada',
        date: '2024-06-10',
        actualReturn: '2024-06-30',
        status: 'Recuperado'
      }
    ];

    if (mockInjuries.length > 0) {
      mockInjuries.forEach((injury: any, index: number) => {
        checkBreak(30);
        addLine(`${index + 1}. ${injury.type} - ${injury.specificType}`, 10, true);
        addLine(`   Gravidade: ${injury.severity} | Status: ${injury.status}`, 9);
        addLine(`   Data: ${new Date(injury.date).toLocaleDateString('pt-BR')}`, 9);
        if (injury.actualReturn) {
          addLine(`   Retorno: ${new Date(injury.actualReturn).toLocaleDateString('pt-BR')}`, 9);
        } else if (injury.expectedReturn) {
          addLine(`   Previsão de Retorno: ${new Date(injury.expectedReturn).toLocaleDateString('pt-BR')}`, 9);
        }
        yPosition += 3;
      });
    } else {
      addLine('Nenhuma lesão registrada no período avaliado');
      yPosition += 3;
    }
    
    yPosition += 5;

    // HISTÓRICO PROFISSIONAL
    checkBreak(40);
    yPosition = addSectionTitle(doc, 'TRAJETÓRIA PROFISSIONAL', yPosition, margin);
    
    addLine(`Ingresso no Hope Internacional: ${new Date(athlete.joinDate).toLocaleDateString('pt-BR')}`);
    
    if (athlete.previousClubs && athlete.previousClubs.length > 0) {
      yPosition += 3;
      addLine('Clubes Anteriores:', 10, true);
      athlete.previousClubs.forEach((club: string) => {
        addLine(`  • ${club}`, 9);
      });
    } else {
      yPosition += 3;
      addLine('Hope Internacional Football Club - Clube formador');
    }
    
    yPosition += 10;

    // Aviso de confidencialidade
    checkBreak(35);
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');
    yPosition += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#333333');
    doc.text('IMPORTANTE:', margin + 5, yPosition);
    yPosition += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Este documento contém informações não confidenciais para fins de apresentação.', margin + 5, yPosition);
    yPosition += 4;
    doc.text('Para maiores informações, entre em contato com o departamento de futebol do Hope Internacional Football Club.', margin + 5, yPosition);

    // Rodapé
    addHopeFooter(doc, pageWidth, pageHeight, 'Hope Internacional Football Club - Documento para Clubes Parceiros');

    // Salvar PDF
    const fileName = `Hope_Transfer_${athlete.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast.success('PDF para transferência exportado com sucesso!');
  };

  // Usar os dados do mock e mapear para a interface esperada
  const allAthletes = filterCategory === 'all' 
    ? mockAthletes 
    : mockAthletes.filter(a => a.category === filterCategory);

  const filteredAthletes = allAthletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.position.toLowerCase().includes(searchTerm.toLowerCase());
    const hasAccess = user.role === 'gerente' || user.role === 'supervisor' || user.role === 'presidente' ||
                     user.category === 'todas' || 
                     athlete.category.toLowerCase().includes(user.category?.toLowerCase() || '');
    
    return matchesSearch && hasAccess;
  }).map(athlete => ({
    ...athlete,
    // Mapear dados do mock para a interface esperada
    positions: athlete.secondaryPositions || [],
    preferredFoot: athlete.dominantFoot,
    joinDate: athlete.entryDate,
    minutes: athlete.minutesPlayed,
    jerseyNumber: athlete.id % 99 + 1,
    cardDetails: [],
    address: athlete.address ? {
      street: athlete.address.split(',')[0] || '',
      number: '',
      neighborhood: '',
      city: 'São Paulo',
      state: 'SP',
      zipCode: ''
    } : undefined,
    contractType: athlete.contractType === 'Profissional' ? 'professional' as const :
                  athlete.salary ? 'base_with_contract' as const : 
                  'formation' as const,
    professionalContract: athlete.contractType === 'Profissional' && athlete.salary ? {
      hasContract: true,
      value: athlete.salary,
      duration: '3 anos',
      startDate: athlete.contractStart,
      endDate: athlete.contractEnd
    } : undefined,
    baseContract: undefined,
    formationContract: undefined
  }));

  const handleFileUpload = (type: string) => {
    toast.success(`${type} carregado com sucesso!`);
  };

  const AthleteCard = ({ athlete }: { athlete: Athlete }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <Avatar className="w-12 h-12">
              <AvatarImage src={athlete.photo} />
              <AvatarFallback>{athlete.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{athlete.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{athlete.position}</p>
            </div>
          </div>
          <Badge variant="outline">{athlete.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{athlete.matches}</p>
            <p className="text-xs text-muted-foreground">Partidas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{athlete.minutes}</p>
            <p className="text-xs text-muted-foreground">Minutos</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{athlete.goals} gols</Badge>
            <Badge variant="secondary">{athlete.assists} assists</Badge>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {athlete.yellowCards > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-4 bg-yellow-400 rounded-sm"></div>
                <span className="text-sm">{athlete.yellowCards}</span>
              </div>
            )}
            {athlete.redCards > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-4 bg-red-500 rounded-sm"></div>
                <span className="text-sm">{athlete.redCards}</span>
              </div>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedAthlete(athlete);
              setIsDetailsDialogOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar atletas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Profissional">Profissional</SelectItem>
              <SelectItem value="Sub-20">Sub-20</SelectItem>
              <SelectItem value="Sub-19">Sub-19</SelectItem>
              <SelectItem value="Sub-18">Sub-18</SelectItem>
              <SelectItem value="Sub-17">Sub-17</SelectItem>
              <SelectItem value="Sub-16">Sub-16</SelectItem>
              <SelectItem value="Sub-15">Sub-15</SelectItem>
              <SelectItem value="Sub-14">Sub-14</SelectItem>
              <SelectItem value="Sub-13">Sub-13</SelectItem>
              <SelectItem value="Sub-12">Sub-12</SelectItem>
              <SelectItem value="Sub-11">Sub-11</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(user.role === 'gerente' || user.role === 'supervisor' || user.role === 'presidente') && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Atleta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Atleta</DialogTitle>
                <DialogDescription>
                  Adicione um novo atleta ao sistema com todas as informações necessárias.
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[calc(90vh-180px)]">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Básico</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                    <TabsTrigger value="contact">Contato</TabsTrigger>
                    {canAccessSensitiveData && (
                      <TabsTrigger value="contract">
                        <Lock className="w-3 h-3 mr-1" />
                        Contrato
                      </TabsTrigger>
                    )}
                  </TabsList>

                  {/* ABA BÁSICO */}
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarFallback>
                            <User className="w-12 h-12" />
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                          onClick={() => handleFileUpload('Foto')}
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label>Nome Completo *</Label>
                        <Input placeholder="Nome completo do atleta" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Posição Principal *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="goleiro">Goleiro</SelectItem>
                            <SelectItem value="zagueiro">Zagueiro</SelectItem>
                            <SelectItem value="lateral">Lateral</SelectItem>
                            <SelectItem value="meio-campo">Meio-campo</SelectItem>
                            <SelectItem value="atacante">Atacante</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Perna Dominante *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direito">Direito</SelectItem>
                            <SelectItem value="esquerdo">Esquerdo</SelectItem>
                            <SelectItem value="ambidestro">Ambidestro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Categoria *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="profissional">Profissional</SelectItem>
                            <SelectItem value="sub-20">Sub-20</SelectItem>
                            <SelectItem value="sub-17">Sub-17</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Número da Camisa</Label>
                        <Input type="number" placeholder="Ex: 10" />
                      </div>

                      <div className="space-y-2">
                        <Label>Data de Nascimento *</Label>
                        <Input type="date" />
                      </div>

                      <div className="space-y-2">
                        <Label>Data de Entrada no Clube *</Label>
                        <Input type="date" />
                      </div>

                      <div className="space-y-2 col-span-2">
                        <Label>Posições que pode atuar</Label>
                        <Textarea 
                          placeholder="Ex: Atacante, Ponta Direita, Ponta Esquerda (separado por vírgula)"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2 col-span-2">
                        <Label>Clubes Anteriores</Label>
                        <Textarea 
                          placeholder="Liste os clubes por onde passou (separado por vírgula)"
                          rows={2}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* ABA DOCUMENTOS */}
                  <TabsContent value="documents" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>CPF</Label>
                        <Input placeholder="000.000.000-00" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>RG</Label>
                        <Input placeholder="00.000.000-0" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Passaporte</Label>
                        <Input placeholder="AB123456" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Número BID CBF</Label>
                        <Input placeholder="12345678" />
                      </div>
                    </div>
                  </TabsContent>

                  {/* ABA CONTATO */}
                  <TabsContent value="contact" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input placeholder="(00) 00000-0000" />
                      </div>

                      <Separator />

                      <h3 className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Endereço Residencial
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>CEP</Label>
                          <Input placeholder="00000-000" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Estado</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SP">São Paulo</SelectItem>
                              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                              <SelectItem value="MG">Minas Gerais</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label>Logradouro</Label>
                          <Input placeholder="Rua, Avenida..." />
                        </div>

                        <div className="space-y-2">
                          <Label>Número</Label>
                          <Input placeholder="123" />
                        </div>

                        <div className="space-y-2">
                          <Label>Complemento</Label>
                          <Input placeholder="Apto, Bloco..." />
                        </div>

                        <div className="space-y-2">
                          <Label>Bairro</Label>
                          <Input placeholder="Nome do bairro" />
                        </div>

                        <div className="space-y-2">
                          <Label>Cidade</Label>
                          <Input placeholder="Nome da cidade" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* ABA CONTRATO (APENAS PRESIDENTE) */}
                  {canAccessSensitiveData && (
                    <TabsContent value="contract" className="space-y-4 mt-4">
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100">Informações Confidenciais</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300">
                              Dados sensíveis - acesso restrito ao Presidente.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tipo de Contrato *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Contrato Profissional</SelectItem>
                              <SelectItem value="base_with_contract">Base com Contrato</SelectItem>
                              <SelectItem value="formation">Contrato de Formação</SelectItem>
                              <SelectItem value="none">Sem Contrato</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Valor Mensal (R$)</Label>
                            <Input type="number" placeholder="0,00" />
                          </div>

                          <div className="space-y-2">
                            <Label>Duração do Contrato</Label>
                            <Input placeholder="Ex: 3 anos" />
                          </div>

                          <div className="space-y-2">
                            <Label>Data de Início</Label>
                            <Input type="date" />
                          </div>

                          <div className="space-y-2">
                            <Label>Data de Término</Label>
                            <Input type="date" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Upload do Contrato (PDF)</Label>
                          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Clique para fazer upload ou arraste o arquivo
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF - Máximo 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </ScrollArea>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  toast.success('Atleta cadastrado com sucesso!');
                  setIsAddDialogOpen(false);
                }}>
                  Cadastrar Atleta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Lista de atletas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((athlete) => (
          <AthleteCard key={athlete.id} athlete={athlete} />
        ))}
      </div>

      {filteredAthletes.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum atleta encontrado</p>
        </div>
      )}

      {/* Dialog de Detalhes do Atleta */}
      {selectedAthlete && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedAthlete.photo} />
                    <AvatarFallback>{selectedAthlete.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{selectedAthlete.name}</DialogTitle>
                    <DialogDescription>
                      {selectedAthlete.position} • {selectedAthlete.category} • Camisa {selectedAthlete.jerseyNumber}
                    </DialogDescription>
                  </div>
                </div>
                {canExportAthletePDF ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Exportar PDF
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuItem
                        onClick={() => exportAthleteDataToPDF(selectedAthlete)}
                        className="cursor-pointer"
                      >
                        <FileDown className="w-4 h-4 mr-2" />
                        <div className="flex flex-col">
                          <span className="font-medium">Ficha Completa</span>
                          <span className="text-xs text-muted-foreground">Uso interno do clube</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => exportAthleteForTransferPDF(selectedAthlete)}
                        className="cursor-pointer"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        <div className="flex flex-col">
                          <span className="font-medium">Ficha para Transferência</span>
                          <span className="text-xs text-muted-foreground">Sem dados sensíveis</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    disabled
                    title="Exportação de dados disponível apenas para Gerentes e Presidente"
                  >
                    <Lock className="w-4 h-4" />
                    Exportar PDF
                  </Button>
                )}
              </div>
            </DialogHeader>
            
            <ScrollArea className="max-h-[calc(90vh-180px)]">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="personal">Pessoal</TabsTrigger>
                  <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                  <TabsTrigger value="cards">Cartões</TabsTrigger>
                  <TabsTrigger value="injuries">Lesões</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                  {canAccessSensitiveData && (
                    <TabsTrigger value="contract">
                      <Lock className="w-3 h-3 mr-1" />
                      Contrato
                    </TabsTrigger>
                  )}
                </TabsList>
                
                {/* ABA DADOS PESSOAIS */}
                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4" />
                        Informações Básicas
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                          <p>{selectedAthlete.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Idade</Label>
                          <p>{selectedAthlete.age} anos</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Posição Principal</Label>
                          <p>{selectedAthlete.position}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Perna Dominante</Label>
                          <p>{selectedAthlete.preferredFoot}</p>
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs text-muted-foreground">Posições que Atua</Label>
                          <div className="flex gap-2 mt-1">
                            {selectedAthlete.positions && selectedAthlete.positions.length > 0 ? (
                              selectedAthlete.positions.map((pos: string, idx: number) => (
                                <Badge key={idx} variant="secondary">{pos}</Badge>
                              ))
                            ) : (
                              <Badge variant="secondary">{selectedAthlete.position}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-4 h-4" />
                        Documentos
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">CPF</Label>
                          <p>{selectedAthlete.cpf || 'Não informado'}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">RG</Label>
                          <p>{selectedAthlete.rg || 'Não informado'}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Passaporte</Label>
                          <p>{selectedAthlete.passport || 'Não informado'}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">BID CBF</Label>
                          <p>{selectedAthlete.bidCBF || 'Não informado'}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <Phone className="w-4 h-4" />
                        Contato
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Telefone</Label>
                          <p>{selectedAthlete.phone || 'Não informado'}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4" />
                        Endereço
                      </h3>
                      {selectedAthlete.address ? (
                        <div className="space-y-2">
                          <p>{selectedAthlete.address.street}, {selectedAthlete.address.number}</p>
                          {selectedAthlete.address.complement && <p>{selectedAthlete.address.complement}</p>}
                          <p>{selectedAthlete.address.neighborhood} - {selectedAthlete.address.city}/{selectedAthlete.address.state}</p>
                          <p>CEP: {selectedAthlete.address.zipCode}</p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Endereço não informado</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* ABA ESTATÍSTICAS */}
                <TabsContent value="stats" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{selectedAthlete.matches}</p>
                        <p className="text-sm text-muted-foreground">Partidas Disputadas</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{selectedAthlete.minutes}</p>
                        <p className="text-sm text-muted-foreground">Minutos em Campo</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600">{selectedAthlete.goals}</p>
                        <p className="text-sm text-muted-foreground">Gols Marcados</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-orange-600">{selectedAthlete.assists}</p>
                        <p className="text-sm text-muted-foreground">Assistências</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-600">{selectedAthlete.yellowCards}</p>
                        <p className="text-sm text-muted-foreground">Cartões Amarelos</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-red-600">{selectedAthlete.redCards}</p>
                        <p className="text-sm text-muted-foreground">Cartões Vermelhos</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* ABA CARTÕES */}
                <TabsContent value="cards" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {selectedAthlete.cardDetails && selectedAthlete.cardDetails.length > 0 ? (
                      selectedAthlete.cardDetails.map((card: any, index: number) => (
                        <Card key={index} className="cursor-pointer hover:bg-accent/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-6 rounded-sm ${
                                  card.card === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'
                                }`}></div>
                                <div>
                                  <p className="font-semibold">{card.match}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Minuto {card.minute} - {card.date}
                                  </p>
                                </div>
                              </div>
                              <Badge 
                                variant={card.card === 'yellow' ? 'default' : 'destructive'}
                              >
                                {card.card === 'yellow' ? 'Amarelo' : 'Vermelho'}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Nenhum cartão registrado</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* ABA LESÕES */}
                <TabsContent value="injuries" className="space-y-4 mt-4">
                  {(() => {
                    // Mock de histórico de lesões baseado no status do atleta
                    const mockInjuries = selectedAthlete.status === 'Lesionado' ? [
                      {
                        id: 1,
                        type: 'Lesão Muscular',
                        specificType: 'Estiramento na coxa direita',
                        severity: 'Moderada',
                        date: '2024-10-08',
                        expectedReturn: '2024-10-28',
                        actualReturn: null,
                        status: 'Em Recuperação',
                        treatment: 'Fisioterapia diária + Fortalecimento',
                        doctor: 'Dr. Carlos Mendes',
                        notes: 'Atleta respondendo bem ao tratamento. Evoluindo conforme esperado.'
                      }
                    ] : [
                      {
                        id: 1,
                        type: 'Lesão Muscular',
                        specificType: 'Estiramento posterior da coxa',
                        severity: 'Leve',
                        date: '2024-08-15',
                        expectedReturn: '2024-08-25',
                        actualReturn: '2024-08-24',
                        status: 'Recuperado',
                        treatment: 'Repouso + Fisioterapia',
                        doctor: 'Dr. Carlos Mendes',
                        notes: 'Recuperação dentro do prazo previsto.'
                      },
                      {
                        id: 2,
                        type: 'Entorse',
                        specificType: 'Entorse de tornozelo esquerdo',
                        severity: 'Moderada',
                        date: '2024-06-10',
                        expectedReturn: '2024-07-01',
                        actualReturn: '2024-06-30',
                        status: 'Recuperado',
                        treatment: 'Imobilização + Fisioterapia',
                        doctor: 'Dr. Carlos Mendes',
                        notes: 'Boa evolução no tratamento.'
                      }
                    ];

                    const getSeverityColor = (severity: string) => {
                      if (severity === 'Leve') return 'bg-green-100 text-green-800 border-green-200';
                      if (severity === 'Moderada') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                      return 'bg-red-100 text-red-800 border-red-200';
                    };

                    const getStatusBadge = (status: string) => {
                      if (status === 'Recuperado') return 'default';
                      if (status === 'Em Recuperação') return 'secondary';
                      return 'destructive';
                    };

                    return mockInjuries && mockInjuries.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            Histórico de Lesões ({mockInjuries.length})
                          </h3>
                          <Badge variant={selectedAthlete.status === 'Lesionado' ? 'destructive' : 'default'}>
                            {selectedAthlete.status}
                          </Badge>
                        </div>

                        {mockInjuries.map((injury: any) => (
                          <Card key={injury.id} className={`border-l-4 ${
                            injury.status === 'Em Recuperação' ? 'border-l-red-500' : 'border-l-green-500'
                          }`}>
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-base">{injury.type}</CardTitle>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {injury.specificType}
                                  </p>
                                </div>
                                <Badge variant={getStatusBadge(injury.status)}>
                                  {injury.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    Data da Lesão
                                  </Label>
                                  <p className="text-sm">{new Date(injury.date).toLocaleDateString('pt-BR')}</p>
                                </div>
                                
                                <div>
                                  <Label className="text-xs text-muted-foreground">Gravidade</Label>
                                  <div className={`inline-block px-2 py-1 rounded text-xs border ${getSeverityColor(injury.severity)}`}>
                                    {injury.severity}
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Retorno Previsto
                                  </Label>
                                  <p className="text-sm">{new Date(injury.expectedReturn).toLocaleDateString('pt-BR')}</p>
                                </div>

                                {injury.actualReturn && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                                      Retorno Real
                                    </Label>
                                    <p className="text-sm text-green-600 font-semibold">
                                      {new Date(injury.actualReturn).toLocaleDateString('pt-BR')}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <Separator />

                              <div className="space-y-2">
                                <div>
                                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Stethoscope className="w-3 h-3" />
                                    Médico Responsável
                                  </Label>
                                  <p className="text-sm">{injury.doctor}</p>
                                </div>

                                <div>
                                  <Label className="text-xs text-muted-foreground">Tratamento</Label>
                                  <p className="text-sm">{injury.treatment}</p>
                                </div>

                                {injury.notes && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Observações</Label>
                                    <p className="text-sm text-muted-foreground italic">{injury.notes}</p>
                                  </div>
                                )}
                              </div>

                              {injury.status === 'Em Recuperação' && (
                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                                  <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                        Previsão de Retorno
                                      </p>
                                      <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Aproximadamente {Math.ceil((new Date(injury.expectedReturn).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}

                        {/* Resumo Estatístico */}
                        <Card className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-base">Resumo do Histórico</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{mockInjuries.length}</p>
                                <p className="text-xs text-muted-foreground">Total de Lesões</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                  {mockInjuries.filter((i: any) => i.status === 'Recuperado').length}
                                </p>
                                <p className="text-xs text-muted-foreground">Recuperado</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">
                                  {mockInjuries.filter((i: any) => i.status === 'Em Recuperação').length}
                                </p>
                                <p className="text-xs text-muted-foreground">Em Tratamento</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold text-green-700 mb-2">Sem Lesões Registradas</h3>
                        <p className="text-muted-foreground">Este atleta não possui histórico de lesões.</p>
                      </div>
                    );
                  })()}
                </TabsContent>

                {/* ABA HISTÓRICO */}
                <TabsContent value="history" className="space-y-4 mt-4">
                  <div>
                    <h3 className="flex items-center gap-2 mb-3">
                      <Building className="w-4 h-4" />
                      Carreira
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Data de Entrada no Clube</Label>
                        <p className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(selectedAthlete.joinDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 block">Clubes Anteriores</Label>
                        {selectedAthlete.previousClubs && selectedAthlete.previousClubs.length > 0 ? (
                          <div className="space-y-2">
                            {selectedAthlete.previousClubs.map((club: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span>{club}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">Clube de origem</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* ABA CONTRATO (APENAS PRESIDENTE) */}
                {canAccessSensitiveData && (
                  <TabsContent value="contract" className="space-y-4 mt-4">
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900 dark:text-amber-100">Informações Sensíveis</h4>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Estes dados são confidenciais e acessíveis apenas ao Presidente.
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedAthlete.contractType === 'professional' && selectedAthlete.professionalContract?.hasContract && (
                      <div>
                        <h3 className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4" />
                          Contrato Profissional
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Valor Mensal</Label>
                              <p className="text-lg font-semibold text-green-600">
                                R$ {selectedAthlete.professionalContract.value?.toLocaleString('pt-BR')}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Duração</Label>
                              <p>{selectedAthlete.professionalContract.duration}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Início</Label>
                              <p>{new Date(selectedAthlete.professionalContract.startDate!).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Término</Label>
                              <p>{new Date(selectedAthlete.professionalContract.endDate!).toLocaleDateString('pt-BR')}</p>
                            </div>
                          </div>
                          
                          {selectedAthlete.professionalContract.contractPDF && (
                            <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">Contrato Digital</p>
                                <p className="text-xs text-muted-foreground">{selectedAthlete.professionalContract.contractPDF}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Visualizar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedAthlete.contractType === 'base_with_contract' && selectedAthlete.baseContract?.hasContract && (
                      <div>
                        <h3 className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4" />
                          Contrato de Base
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Valor Mensal</Label>
                              <p className="text-lg font-semibold text-green-600">
                                R$ {selectedAthlete.baseContract.value?.toLocaleString('pt-BR')}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Duração</Label>
                              <p>{selectedAthlete.baseContract.duration}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Início</Label>
                              <p>{new Date(selectedAthlete.baseContract.startDate!).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Término</Label>
                              <p>{new Date(selectedAthlete.baseContract.endDate!).toLocaleDateString('pt-BR')}</p>
                            </div>
                          </div>
                          
                          {selectedAthlete.baseContract.contractPDF && (
                            <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">Contrato Digital</p>
                                <p className="text-xs text-muted-foreground">{selectedAthlete.baseContract.contractPDF}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Visualizar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedAthlete.contractType === 'formation' && selectedAthlete.formationContract?.hasContract && (
                      <div>
                        <h3 className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4" />
                          Contrato de Formação
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Tem Ajuda de Custo?</Label>
                              <p>{selectedAthlete.formationContract.hasAllowance ? 'Sim' : 'Não'}</p>
                            </div>
                            {selectedAthlete.formationContract.hasAllowance && (
                              <div>
                                <Label className="text-xs text-muted-foreground">Valor da Ajuda</Label>
                                <p className="text-lg font-semibold text-green-600">
                                  R$ {selectedAthlete.formationContract.allowanceValue?.toLocaleString('pt-BR')}
                                </p>
                              </div>
                            )}
                            <div>
                              <Label className="text-xs text-muted-foreground">Duração</Label>
                              <p>{selectedAthlete.formationContract.duration}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Início</Label>
                              <p>{new Date(selectedAthlete.formationContract.startDate!).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Término</Label>
                              <p>{new Date(selectedAthlete.formationContract.endDate!).toLocaleDateString('pt-BR')}</p>
                            </div>
                          </div>
                          
                          {selectedAthlete.formationContract.contractPDF && (
                            <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">Contrato Digital</p>
                                <p className="text-xs text-muted-foreground">{selectedAthlete.formationContract.contractPDF}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Visualizar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedAthlete.contractType === 'none' && (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Sem contrato registrado</p>
                      </div>
                    )}
                  </TabsContent>
                )}
              </Tabs>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}