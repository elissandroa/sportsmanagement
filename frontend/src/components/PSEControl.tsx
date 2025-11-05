import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart3, Plus, TrendingUp, Activity, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface PSEControlProps {
  user: any;
}

export function PSEControl({ user }: PSEControlProps) {
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2024-01-25');

  // Dados de PSE/PSR dos atletas
  const athletesPSE = [
    {
      id: 1,
      name: 'João Silva',
      category: 'Profissional',
      position: 'Atacante',
      currentPSE: 7,
      currentPSR: 6,
      weeklyAverage: 6.8,
      status: 'Normal',
      lastUpdate: '2024-01-25',
      history: [
        { date: '2024-01-20', pse: 6, psr: 7 },
        { date: '2024-01-21', pse: 8, psr: 5 },
        { date: '2024-01-22', pse: 7, psr: 6 },
        { date: '2024-01-23', pse: 5, psr: 8 },
        { date: '2024-01-24', pse: 7, psr: 6 },
        { date: '2024-01-25', pse: 7, psr: 6 }
      ]
    },
    {
      id: 2,
      name: 'Carlos Santos',
      category: 'Sub-20',
      position: 'Meio-campo',
      currentPSE: 9,
      currentPSR: 4,
      weeklyAverage: 8.2,
      status: 'Atenção',
      lastUpdate: '2024-01-25',
      history: [
        { date: '2024-01-20', pse: 8, psr: 5 },
        { date: '2024-01-21', pse: 9, psr: 4 },
        { date: '2024-01-22', pse: 8, psr: 5 },
        { date: '2024-01-23', pse: 9, psr: 3 },
        { date: '2024-01-24', pse: 8, psr: 4 },
        { date: '2024-01-25', pse: 9, psr: 4 }
      ]
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      category: 'Sub-17',
      position: 'Zagueiro',
      currentPSE: 5,
      currentPSR: 8,
      weeklyAverage: 5.5,
      status: 'Ótimo',
      lastUpdate: '2024-01-25',
      history: [
        { date: '2024-01-20', pse: 5, psr: 8 },
        { date: '2024-01-21', pse: 6, psr: 7 },
        { date: '2024-01-22', pse: 5, psr: 8 },
        { date: '2024-01-23', pse: 4, psr: 9 },
        { date: '2024-01-24', pse: 6, psr: 7 },
        { date: '2024-01-25', pse: 5, psr: 8 }
      ]
    },
    {
      id: 4,
      name: 'Lucas Mendes',
      category: 'Profissional',
      position: 'Goleiro',
      currentPSE: 6,
      currentPSR: 7,
      weeklyAverage: 6.2,
      status: 'Normal',
      lastUpdate: '2024-01-25',
      history: [
        { date: '2024-01-20', pse: 6, psr: 7 },
        { date: '2024-01-21', pse: 7, psr: 6 },
        { date: '2024-01-22', pse: 6, psr: 7 },
        { date: '2024-01-23', pse: 5, psr: 8 },
        { date: '2024-01-24', pse: 6, psr: 7 },
        { date: '2024-01-25', pse: 6, psr: 7 }
      ]
    },
    {
      id: 5,
      name: 'Rafael Costa',
      category: 'Profissional',
      position: 'Lateral',
      currentPSE: 8,
      currentPSR: 5,
      weeklyAverage: 7.5,
      status: 'Atenção',
      lastUpdate: '2024-01-25',
      history: [
        { date: '2024-01-20', pse: 7, psr: 6 },
        { date: '2024-01-21', pse: 8, psr: 5 },
        { date: '2024-01-22', pse: 8, psr: 5 },
        { date: '2024-01-23', pse: 7, psr: 6 },
        { date: '2024-01-24', pse: 8, psr: 5 },
        { date: '2024-01-25', pse: 8, psr: 5 }
      ]
    }
  ];

  const filteredAthletes = athletesPSE.filter(athlete => {
    if (user.role === 'gerente') return true;
    if (user.category === 'todas') return true;
    return athlete.category.toLowerCase().includes(user.category.toLowerCase());
  });

  // Dados para gráficos
  const categoryAverages = [
    { category: 'Profissional', pse: 6.8, psr: 6.2, athletes: 3 },
    { category: 'Sub-20', pse: 8.2, psr: 4.0, athletes: 1 },
    { category: 'Sub-17', pse: 5.5, psr: 8.0, athletes: 1 }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ótimo': return 'text-green-600 bg-green-100';
      case 'normal': return 'text-blue-600 bg-blue-100';
      case 'atenção': return 'text-orange-600 bg-orange-100';
      case 'crítico': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPSELevel = (pse: number) => {
    if (pse <= 3) return { label: 'Muito Baixo', color: 'bg-green-500' };
    if (pse <= 5) return { label: 'Baixo', color: 'bg-blue-500' };
    if (pse <= 7) return { label: 'Moderado', color: 'bg-yellow-500' };
    if (pse <= 8) return { label: 'Alto', color: 'bg-orange-500' };
    return { label: 'Muito Alto', color: 'bg-red-500' };
  };

  const getPSRLevel = (psr: number) => {
    if (psr <= 3) return { label: 'Muito Baixa', color: 'bg-red-500' };
    if (psr <= 5) return { label: 'Baixa', color: 'bg-orange-500' };
    if (psr <= 7) return { label: 'Moderada', color: 'bg-yellow-500' };
    if (psr <= 8) return { label: 'Boa', color: 'bg-blue-500' };
    return { label: 'Excelente', color: 'bg-green-500' };
  };

  const AthleteCard = ({ athlete }: { athlete: any }) => {
    const pseLevel = getPSELevel(athlete.currentPSE);
    const psrLevel = getPSRLevel(athlete.currentPSR);

    return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{athlete.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{athlete.position} - {athlete.category}</p>
            </div>
            <Badge className={getStatusColor(athlete.status)}>
              {athlete.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${pseLevel.color}`} />
                  <span className="text-xs text-muted-foreground">PSE</span>
                </div>
                <p className="text-2xl font-bold">{athlete.currentPSE}</p>
                <p className="text-xs text-muted-foreground">{pseLevel.label}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${psrLevel.color}`} />
                  <span className="text-xs text-muted-foreground">PSR</span>
                </div>
                <p className="text-2xl font-bold">{athlete.currentPSR}</p>
                <p className="text-xs text-muted-foreground">{psrLevel.label}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Média Semanal PSE</span>
                <span>{athlete.weeklyAverage}</span>
              </div>
              <Progress value={(athlete.weeklyAverage / 10) * 100} className="h-2" />
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Última atualização: {new Date(athlete.lastUpdate).toLocaleDateString('pt-BR')}</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedAthlete(athlete)}
                >
                  Ver Histórico PSE/PSR
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Histórico PSE/PSR - {athlete.name}</DialogTitle>
                  <DialogDescription>
                    Visualize o histórico completo de PSE (Percepção Subjetiva de Esforço) e PSR (Percepção Subjetiva de Recuperação) do atleta.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="chart">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chart">Gráfico</TabsTrigger>
                    <TabsTrigger value="data">Dados</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chart" className="space-y-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={athlete.history}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="pse" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            name="PSE"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="psr" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                            name="PSR"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="data" className="space-y-4">
                    <div className="space-y-3">
                      {athlete.history.map((record: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">
                                  {new Date(record.date).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <div className="text-center">
                                  <p className="text-sm text-muted-foreground">PSE</p>
                                  <p className="text-lg font-bold">{record.pse}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-muted-foreground">PSR</p>
                                  <p className="text-lg font-bold">{record.psr}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Atletas que não registraram PSE/PSR hoje
  const today = new Date().toISOString().split('T')[0];
  const athletesNotRegistered = [
    { name: 'Lucas Mendes', category: 'Profissional', lastRegistration: '2024-01-24' },
    { name: 'Rafael Costa', category: 'Profissional', lastRegistration: '2024-01-23' },
    { name: 'Bruno Lima', category: 'Sub-20', lastRegistration: '2024-01-25' },
    { name: 'Gabriel Rocha', category: 'Sub-17', lastRegistration: '2024-01-22' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Controle PSE/PSR</h2>
          <p className="text-muted-foreground">
            Percepção Subjetiva de Esforço e Recuperação
            {user.role === 'treinador' && ' - Monitoramento dos Atletas'}
          </p>
        </div>
        
        <div className="flex gap-4">
          {(user.role === 'preparador_fisico' || user.role === 'gerente') && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar PSE/PSR
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar PSE/PSR</DialogTitle>
                <DialogDescription>
                  Registre a percepção subjetiva de esforço e recuperação do atleta após treinos ou atividades.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Atleta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar atleta" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAthletes.map(athlete => (
                        <SelectItem key={athlete.id} value={athlete.id.toString()}>
                          {athlete.name} - {athlete.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>PSE (1-10)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="PSE" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      1 = Muito fácil, 10 = Máximo esforço
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>PSR (1-10)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="PSR" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      1 = Muito cansado, 10 = Totalmente recuperado
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input type="date" defaultValue={selectedDate} />
                </div>
                
                <Button className="w-full">Registrar</Button>
              </div>
            </DialogContent>
          </Dialog>
          )}
          
          {user.role === 'treinador' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              Monitoramento de atletas - Apenas visualização
            </div>
          )}
        </div>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atletas Monitorados</p>
                <p className="text-2xl font-bold">
                  {filteredAthletes.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">PSE Médio</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(filteredAthletes.reduce((acc, a) => acc + a.currentPSE, 0) / filteredAthletes.length).toFixed(1)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">PSR Médio</p>
                <p className="text-2xl font-bold text-green-600">
                  {(filteredAthletes.reduce((acc, a) => acc + a.currentPSR, 0) / filteredAthletes.length).toFixed(1)}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Atenção</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredAthletes.filter(a => a.status === 'Atenção').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de categorias */}
      <Card>
        <CardHeader>
          <CardTitle>PSE/PSR por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="pse" fill="#8884d8" name="PSE Médio" />
                <Bar dataKey="psr" fill="#82ca9d" name="PSR Médio" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Relatório detalhado por atleta */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Relatório Detalhado por Atleta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAthletes.map((athlete) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      </div>

      {/* Atletas que não registraram PSE/PSR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Atletas que não Registraram PSE/PSR Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          {athletesNotRegistered.length > 0 ? (
            <div className="space-y-3">
              {athletesNotRegistered
                .filter(athlete => {
                  if (user.role === 'gerente') return true;
                  if (user.category === 'todas') return true;
                  return athlete.category.toLowerCase().includes(user.category.toLowerCase());
                })
                .map((athlete, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                    <div>
                      <p className="font-medium">{athlete.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {athlete.category} - Último registro: {new Date(athlete.lastRegistration).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-orange-600">
                        Pendente
                      </Badge>
                      <Button size="sm" variant="outline">
                        Lembrar
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Todos os atletas registraram PSE/PSR hoje!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabela resumo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo PSE/PSR - {new Date(selectedDate).toLocaleDateString('pt-BR')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Atleta</th>
                  <th className="text-center p-2">Categoria</th>
                  <th className="text-center p-2">PSE</th>
                  <th className="text-center p-2">PSR</th>
                  <th className="text-center p-2">Média Semanal</th>
                  <th className="text-center p-2">Status</th>
                  <th className="text-center p-2">Registrado Hoje</th>
                </tr>
              </thead>
              <tbody>
                {filteredAthletes.map((athlete) => (
                  <tr key={athlete.id} className="border-b hover:bg-accent/50">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{athlete.name}</p>
                        <p className="text-sm text-muted-foreground">{athlete.position}</p>
                      </div>
                    </td>
                    <td className="text-center p-2">
                      <Badge variant="outline">{athlete.category}</Badge>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-lg font-bold">{athlete.currentPSE}</span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-lg font-bold">{athlete.currentPSR}</span>
                    </td>
                    <td className="text-center p-2">
                      <span>{athlete.weeklyAverage}</span>
                    </td>
                    <td className="text-center p-2">
                      <Badge className={getStatusColor(athlete.status)}>
                        {athlete.status}
                      </Badge>
                    </td>
                    <td className="text-center p-2">
                      {athlete.lastUpdate === selectedDate ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}