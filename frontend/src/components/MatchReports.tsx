import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MatchReport {
  id: string;
  matchId: string;
  opponent: string;
  date: string;
  result: string;
  tacticalFormation: string;
  keyMoments: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  playerRatings: { [playerId: string]: number };
  technicalAnalysis: string;
  tacticalAnalysis: string;
  physicalAnalysis: string;
  createdBy: string;
  createdAt: string;
}

export function MatchReports() {
  const [reports, setReports] = useState<MatchReport[]>([
    {
      id: '1',
      matchId: '1',
      opponent: 'Flamengo RJ',
      date: '2024-01-20',
      result: '2-1',
      tacticalFormation: '4-3-3',
      keyMoments: [
        'Gol aos 15\' - João Silva (assistência de Carlos)',
        'Cartão amarelo aos 23\' - Pedro Oliveira',
        'Gol adversário aos 34\' - contra-ataque',
        'Gol da vitória aos 78\' - João Silva (pênalti)'
      ],
      strengths: [
        'Boa pressão no campo ofensivo',
        'Transições rápidas',
        'Solidez defensiva nos momentos finais',
        'Eficiência nas bolas paradas'
      ],
      weaknesses: [
        'Muitas perdas de bola no meio-campo',
        'Falta de concentração aos 34\'',
        'Pouca criatividade no segundo tempo',
        'Problemas na saída de bola'
      ],
      recommendations: [
        'Trabalhar mais a posse de bola no treino',
        'Melhorar a comunicação defensiva',
        'Dar mais opções para o meio-campo',
        'Treinar situações de contra-ataque'
      ],
      playerRatings: {
        '1': 9.2,
        '2': 7.5,
        '3': 6.8,
        '4': 7.1,
        '5': 8.0
      },
      technicalAnalysis: 'A equipe mostrou boa qualidade técnica, especialmente no primeiro tempo. Os passes curtos funcionaram bem, mas sentimos falta de mais verticalidade. João Silva teve uma atuação excepcional.',
      tacticalAnalysis: 'A formação 4-3-3 funcionou bem ofensivamente. O meio-campo conseguiu dar suporte tanto na criação quanto na marcação. A linha de impedimento esteve bem sincronizada na maior parte do jogo.',
      physicalAnalysis: 'A equipe manteve boa intensidade durante os 90 minutos. Notamos uma pequena queda física entre os 30-40 minutos do segundo tempo, mas se recuperou bem nos momentos finais.',
      createdBy: 'Analista Técnico',
      createdAt: '2024-01-21'
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<MatchReport | null>(null);
  const [isViewingReport, setIsViewingReport] = useState(false);
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');

  const [newReport, setNewReport] = useState<Partial<MatchReport>>({
    opponent: '',
    date: '',
    result: '',
    tacticalFormation: '',
    keyMoments: [''],
    strengths: [''],
    weaknesses: [''],
    recommendations: [''],
    technicalAnalysis: '',
    tacticalAnalysis: '',
    physicalAnalysis: ''
  });

  // Dados para gráficos analíticos
  const formationData = [
    { formation: '4-3-3', count: 8, wins: 6 },
    { formation: '4-4-2', count: 4, wins: 2 },
    { formation: '3-5-2', count: 3, wins: 2 }
  ];

  const strengthsData = [
    { name: 'Posse de Bola', value: 35 },
    { name: 'Transições', value: 25 },
    { name: 'Bolas Paradas', value: 20 },
    { name: 'Pressão', value: 20 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.result.includes(searchTerm);
    
    if (filterPeriod === 'all') return matchesSearch;
    
    const reportDate = new Date(report.date);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (filterPeriod) {
      case 'week': return matchesSearch && daysDiff <= 7;
      case 'month': return matchesSearch && daysDiff <= 30;
      case 'season': return matchesSearch && daysDiff <= 365;
      default: return matchesSearch;
    }
  });

  const handleCreateReport = () => {
    const reportToAdd: MatchReport = {
      ...newReport,
      id: Date.now().toString(),
      matchId: Date.now().toString(),
      keyMoments: newReport.keyMoments?.filter(moment => moment.trim()) || [],
      strengths: newReport.strengths?.filter(strength => strength.trim()) || [],
      weaknesses: newReport.weaknesses?.filter(weakness => weakness.trim()) || [],
      recommendations: newReport.recommendations?.filter(rec => rec.trim()) || [],
      playerRatings: {},
      createdBy: 'Analista Técnico',
      createdAt: new Date().toISOString().split('T')[0]
    } as MatchReport;

    setReports([...reports, reportToAdd]);
    setIsCreatingReport(false);
    setNewReport({
      opponent: '',
      date: '',
      result: '',
      tacticalFormation: '',
      keyMoments: [''],
      strengths: [''],
      weaknesses: [''],
      recommendations: [''],
      technicalAnalysis: '',
      tacticalAnalysis: '',
      physicalAnalysis: ''
    });
  };

  const addArrayField = (field: 'keyMoments' | 'strengths' | 'weaknesses' | 'recommendations') => {
    setNewReport({
      ...newReport,
      [field]: [...(newReport[field] || []), '']
    });
  };

  const updateArrayField = (field: 'keyMoments' | 'strengths' | 'weaknesses' | 'recommendations', index: number, value: string) => {
    const updatedArray = [...(newReport[field] || [])];
    updatedArray[index] = value;
    setNewReport({
      ...newReport,
      [field]: updatedArray
    });
  };

  const removeArrayField = (field: 'keyMoments' | 'strengths' | 'weaknesses' | 'recommendations', index: number) => {
    const updatedArray = (newReport[field] || []).filter((_, i) => i !== index);
    setNewReport({
      ...newReport,
      [field]: updatedArray
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Relatórios de Partidas</h2>
          <p className="text-muted-foreground">
            Análises detalhadas e insights técnicos de cada partida
          </p>
        </div>
        <Dialog open={isCreatingReport} onOpenChange={setIsCreatingReport}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Relatório
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Relatório de Partida</DialogTitle>
              <DialogDescription>
                Crie um relatório detalhado com análises técnicas, táticas e recomendações para a partida.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Informações básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Adversário *</Label>
                  <Input
                    value={newReport.opponent || ''}
                    onChange={(e) => setNewReport({...newReport, opponent: e.target.value})}
                    placeholder="Nome do adversário"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Input
                    type="date"
                    value={newReport.date || ''}
                    onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Resultado *</Label>
                  <Input
                    value={newReport.result || ''}
                    onChange={(e) => setNewReport({...newReport, result: e.target.value})}
                    placeholder="Ex: 2-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Formação Tática</Label>
                  <Select
                    value={newReport.tacticalFormation || ''}
                    onValueChange={(value) => setNewReport({...newReport, tacticalFormation: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar formação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4-3-3">4-3-3</SelectItem>
                      <SelectItem value="4-4-2">4-4-2</SelectItem>
                      <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                      <SelectItem value="3-5-2">3-5-2</SelectItem>
                      <SelectItem value="5-3-2">5-3-2</SelectItem>
                      <SelectItem value="4-5-1">4-5-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Momentos chave */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Momentos Chave da Partida</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addArrayField('keyMoments')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                {newReport.keyMoments?.map((moment, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={moment}
                      onChange={(e) => updateArrayField('keyMoments', index, e.target.value)}
                      placeholder="Ex: Gol aos 15' - João Silva"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField('keyMoments', index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              {/* Pontos fortes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Pontos Fortes</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addArrayField('strengths')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                {newReport.strengths?.map((strength, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={strength}
                      onChange={(e) => updateArrayField('strengths', index, e.target.value)}
                      placeholder="Ex: Boa pressão no campo ofensivo"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField('strengths', index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              {/* Pontos fracos */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Pontos a Melhorar</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addArrayField('weaknesses')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                {newReport.weaknesses?.map((weakness, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={weakness}
                      onChange={(e) => updateArrayField('weaknesses', index, e.target.value)}
                      placeholder="Ex: Muitas perdas de bola no meio-campo"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField('weaknesses', index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              {/* Recomendações */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Recomendações para Próximos Treinos</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addArrayField('recommendations')}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                {newReport.recommendations?.map((rec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={rec}
                      onChange={(e) => updateArrayField('recommendations', index, e.target.value)}
                      placeholder="Ex: Trabalhar mais a posse de bola"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField('recommendations', index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              {/* Análises detalhadas */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Análise Técnica</Label>
                  <Textarea
                    value={newReport.technicalAnalysis || ''}
                    onChange={(e) => setNewReport({...newReport, technicalAnalysis: e.target.value})}
                    placeholder="Avaliação da qualidade técnica individual e coletiva..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Análise Tática</Label>
                  <Textarea
                    value={newReport.tacticalAnalysis || ''}
                    onChange={(e) => setNewReport({...newReport, tacticalAnalysis: e.target.value})}
                    placeholder="Avaliação da organização tática, movimentações, posicionamento..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Análise Física</Label>
                  <Textarea
                    value={newReport.physicalAnalysis || ''}
                    onChange={(e) => setNewReport({...newReport, physicalAnalysis: e.target.value})}
                    placeholder="Avaliação da condição física, intensidade, resistência..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingReport(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateReport}>
                  Criar Relatório
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas analíticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Formações Mais Utilizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formation" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="Jogos" />
                  <Bar dataKey="wins" fill="#10b981" name="Vitórias" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Principais Pontos Fortes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={strengthsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {strengthsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por adversário ou resultado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterPeriod} onValueChange={setFilterPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os períodos</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="season">Temporada atual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de relatórios */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <h3 className="font-semibold text-lg">{report.opponent}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{report.tacticalFormation}</span>
                      <span>•</span>
                      <span>Por {report.createdBy}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold">{report.result}</div>
                    <Badge variant={
                      report.result.split('-')[0] > report.result.split('-')[1] ? 'default' :
                      report.result.split('-')[0] < report.result.split('-')[1] ? 'destructive' : 'secondary'
                    }>
                      {report.result.split('-')[0] > report.result.split('-')[1] ? 'Vitória' :
                       report.result.split('-')[0] < report.result.split('-')[1] ? 'Derrota' : 'Empate'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedReport(report);
                      setIsViewingReport(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Baixar PDF
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-600 mb-1">Pontos Fortes</p>
                  <p>{report.strengths.length} identificados</p>
                </div>
                <div>
                  <p className="font-medium text-orange-600 mb-1">Pontos a Melhorar</p>
                  <p>{report.weaknesses.length} identificados</p>
                </div>
                <div>
                  <p className="font-medium text-blue-600 mb-1">Recomendações</p>
                  <p>{report.recommendations.length} sugestões</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para visualizar relatório */}
      <Dialog open={isViewingReport} onOpenChange={setIsViewingReport}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Relatório: {selectedReport.opponent} - {selectedReport.result}
                </DialogTitle>
                <DialogDescription>
                  {new Date(selectedReport.date).toLocaleDateString('pt-BR')} • 
                  Formação: {selectedReport.tacticalFormation}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Momentos chave */}
                <div>
                  <h4 className="font-semibold mb-3">Momentos Chave</h4>
                  <ul className="space-y-2">
                    {selectedReport.keyMoments.map((moment, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{moment}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Análises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">Pontos Fortes</h4>
                    <ul className="space-y-2">
                      {selectedReport.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-3">Pontos a Melhorar</h4>
                    <ul className="space-y-2">
                      {selectedReport.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-500">⚠</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recomendações */}
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">Recomendações</h4>
                  <ul className="space-y-2">
                    {selectedReport.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Análises detalhadas */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Análise Técnica</h4>
                    <p className="text-sm bg-muted p-3 rounded-lg">{selectedReport.technicalAnalysis}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Análise Tática</h4>
                    <p className="text-sm bg-muted p-3 rounded-lg">{selectedReport.tacticalAnalysis}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Análise Física</h4>
                    <p className="text-sm bg-muted p-3 rounded-lg">{selectedReport.physicalAnalysis}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}