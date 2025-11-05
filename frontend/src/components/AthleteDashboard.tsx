import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HumanBodyMap } from './HumanBodyMap';
import { AthletePSERegistration } from './AthletePSERegistration';
import { AthletePSRRegistration } from './AthletePSRRegistration';
import { Calendar, Activity, TrendingUp, CheckCircle, XCircle, LogOut, Heart, BarChart3, MapPin, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AthleteDashboardProps {
  user: any;
  onLogout: () => void;
}

interface PainPoint {
  id: string;
  x: number;
  y: number;
  intensity: number;
  type: string;
  description: string;
  bodyPart: string;
}

export function AthleteDashboard({ user, onLogout }: AthleteDashboardProps) {
  const [selectedPSE, setSelectedPSE] = useState('');
  const [selectedPSR, setSelectedPSR] = useState('');
  const [todayRegistered, setTodayRegistered] = useState(false);
  const [painPoints, setPainPoints] = useState<PainPoint[]>([
    { id: '1', x: 0.6, y: 0.7, intensity: 3, type: 'Dor muscular', description: 'Leve dor na coxa', bodyPart: 'Coxa Direita' },
    { id: '2', x: 0.5, y: 0.4, intensity: 2, type: 'Tensão', description: 'Tensão nas costas', bodyPart: 'Costas' }
  ]);

  // Dados simulados do atleta baseado no ID
  const athleteData = {
    1: {
      name: 'João Silva',
      position: 'Atacante',
      category: 'Profissional',
      currentStreak: 7,
      weeklyAverage: { pse: 6.8, psr: 6.2 },
      history: [
        { date: '2024-01-19', pse: 6, psr: 7 },
        { date: '2024-01-20', pse: 8, psr: 5 },
        { date: '2024-01-21', pse: 7, psr: 6 },
        { date: '2024-01-22', pse: 5, psr: 8 },
        { date: '2024-01-23', pse: 7, psr: 6 },
        { date: '2024-01-24', pse: 7, psr: 6 },
        { date: '2024-01-25', pse: 6, psr: 7 }
      ]
    },
    2: {
      name: 'Carlos Santos',
      position: 'Meio-campo',
      category: 'Sub-20',
      currentStreak: 5,
      weeklyAverage: { pse: 8.2, psr: 4.0 },
      history: [
        { date: '2024-01-19', pse: 8, psr: 4 },
        { date: '2024-01-20', pse: 9, psr: 3 },
        { date: '2024-01-21', pse: 8, psr: 4 },
        { date: '2024-01-22', pse: 7, psr: 5 },
        { date: '2024-01-23', pse: 8, psr: 4 },
        { date: '2024-01-24', pse: 9, psr: 3 },
        { date: '2024-01-25', pse: 8, psr: 4 }
      ]
    },
    3: {
      name: 'Pedro Oliveira',
      position: 'Zagueiro',
      category: 'Sub-17',
      currentStreak: 12,
      weeklyAverage: { pse: 5.5, psr: 8.0 },
      history: [
        { date: '2024-01-19', pse: 5, psr: 8 },
        { date: '2024-01-20', pse: 6, psr: 7 },
        { date: '2024-01-21', pse: 5, psr: 8 },
        { date: '2024-01-22', pse: 4, psr: 9 },
        { date: '2024-01-23', pse: 6, psr: 7 },
        { date: '2024-01-24', pse: 5, psr: 8 },
        { date: '2024-01-25', pse: 5, psr: 8 }
      ]
    }
  };

  const athlete = athleteData[user.athleteId] || athleteData[1];
  const today = new Date().toISOString().split('T')[0];

  const handleAddPainPoint = (point: PainPoint) => {
    setPainPoints([...painPoints, point]);
  };

  const handleRemovePainPoint = (id: string) => {
    setPainPoints(painPoints.filter(p => p.id !== id));
  };

  const handleSubmitPSE = () => {
    if (selectedPSE && selectedPSR) {
      // Simular registro dos dados
      setTodayRegistered(true);
      setSelectedPSE('');
      setSelectedPSR('');
      
      // Em um sistema real, aqui seria feita a chamada para a API
      console.log('PSE/PSR registrado:', {
        athleteId: user.athleteId,
        date: today,
        pse: selectedPSE,
        psr: selectedPSR
      });
    }
  };

  const getPSEDescription = (value: string) => {
    const descriptions = {
      '1': 'Muito fácil - Descansado',
      '2': 'Fácil - Confortável',
      '3': 'Moderado - Leve esforço',
      '4': 'Moderado - Um pouco difícil',
      '5': 'Difícil - Esforço considerável',
      '6': 'Difícil - Muito esforço',
      '7': 'Muito difícil - Esforço intenso',
      '8': 'Muito difícil - Muito intenso',
      '9': 'Máximo - Extremamente difícil',
      '10': 'Máximo - Impossível continuar'
    };
    return descriptions[value] || '';
  };

  const getPSRDescription = (value: string) => {
    const descriptions = {
      '1': 'Muito mal - Extremamente cansado',
      '2': 'Mal - Muito cansado',
      '3': 'Mal - Cansado',
      '4': 'Regular - Um pouco cansado',
      '5': 'Regular - Normal',
      '6': 'Bem - Ligeiramente recuperado',
      '7': 'Bem - Recuperado',
      '8': 'Muito bem - Bem recuperado',
      '9': 'Muito bem - Muito recuperado',
      '10': 'Excelente - Totalmente recuperado'
    };
    return descriptions[value] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://img.sofascore.com/api/v1/team/506795/image"
              alt="Hope Internacional"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">Bem-vindo, {athlete.name}!</h1>
              <p className="text-muted-foreground">{athlete.position} - {athlete.category}</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="body">Meu Corpo</TabsTrigger>
            <TabsTrigger value="pse">Registrar PSE</TabsTrigger>
            <TabsTrigger value="psr">Registrar PSR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            {/* Status do dia */}
            <Card className={todayRegistered ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {todayRegistered ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-orange-600" />
                    )}
                    <div>
                      <p className="font-semibold">
                        {todayRegistered ? 'PSE/PSR registrado hoje!' : 'Registre seu PSE/PSR de hoje'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {todayRegistered 
                          ? 'Obrigado por manter seus dados atualizados' 
                          : 'É importante registrar diariamente para monitoramento'
                        }
                      </p>
                    </div>
                  </div>
                  <Badge variant={todayRegistered ? 'default' : 'destructive'}>
                    {new Date().toLocaleDateString('pt-BR')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Formulário rápido de registro PSE/PSR */}
            {!todayRegistered && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Registro Rápido PSE/PSR - {new Date().toLocaleDateString('pt-BR')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* PSE */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">PSE - Percepção Subjetiva de Esforço</h3>
                        <p className="text-sm text-muted-foreground">
                          Como foi o esforço do seu treino/jogo hoje?
                        </p>
                      </div>
                      
                      <Select value={selectedPSE} onValueChange={setSelectedPSE}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione de 1 a 10" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} - {getPSEDescription(num.toString()).split(' - ')[1]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedPSE && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            {getPSEDescription(selectedPSE)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* PSR */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">PSR - Percepção Subjetiva de Recuperação</h3>
                        <p className="text-sm text-muted-foreground">
                          Como você se sente em relação à recuperação?
                        </p>
                      </div>
                      
                      <Select value={selectedPSR} onValueChange={setSelectedPSR}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione de 1 a 10" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} - {getPSRDescription(num.toString()).split(' - ')[1]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedPSR && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">
                            {getPSRDescription(selectedPSR)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSubmitPSE} 
                    className="w-full" 
                    disabled={!selectedPSE || !selectedPSR}
                  >
                    Registro Rápido PSE/PSR
                  </Button>

                  <div className="flex justify-center gap-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Para registro completo com mapa de dor, use as abas específicas ↑
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Estatísticas pessoais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sequência de Registros</p>
                      <p className="text-2xl font-bold text-green-600">{athlete.currentStreak}</p>
                      <p className="text-xs text-muted-foreground">dias consecutivos</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">PSE Médio Semanal</p>
                      <p className="text-2xl font-bold text-orange-600">{athlete.weeklyAverage.pse}</p>
                      <p className="text-xs text-muted-foreground">últimos 7 dias</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">PSR Médio Semanal</p>
                      <p className="text-2xl font-bold text-blue-600">{athlete.weeklyAverage.psr}</p>
                      <p className="text-xs text-muted-foreground">últimos 7 dias</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pontos de Dor</p>
                      <p className="text-2xl font-bold text-red-600">{painPoints.length}</p>
                      <p className="text-xs text-muted-foreground">registrados</p>
                    </div>
                    <MapPin className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico do histórico */}
            <Card>
              <CardHeader>
                <CardTitle>Seu Histórico PSE/PSR - Últimos 7 Dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={athlete.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: '2-digit' 
                        })}
                      />
                      <YAxis domain={[0, 10]} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pse" 
                        stroke="#f97316" 
                        strokeWidth={3}
                        name="PSE"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="psr" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="PSR"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-orange-500 rounded"></div>
                    <span className="text-sm">PSE (Esforço)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-blue-500 rounded"></div>
                    <span className="text-sm">PSR (Recuperação)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dicas e orientações */}
            <Card>
              <CardHeader>
                <CardTitle>Dicas para um Melhor Monitoramento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-orange-600">PSE - Percepção de Esforço</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Registre sempre após o treino/jogo</li>
                      <li>• Considere o esforço total da atividade</li>
                      <li>• Seja honesto com sua percepção</li>
                      <li>• PSE alto não é ruim, é informação</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-600">PSR - Percepção de Recuperação</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Avalie sempre no mesmo horário</li>
                      <li>• Considere sono, alimentação, stress</li>
                      <li>• PSR baixo indica necessidade de descanso</li>
                      <li>• Comunique valores baixos persistentes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="body" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Meu Mapa Corporal
                </CardTitle>
                <p className="text-muted-foreground">
                  Visualize onde você tem sentido dor ou desconforto. Clique para adicionar novos pontos.
                </p>
              </CardHeader>
              <CardContent>
                <HumanBodyMap
                  painPoints={painPoints}
                  onAddPainPoint={handleAddPainPoint}
                  onRemovePainPoint={handleRemovePainPoint}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pse" className="space-y-6">
            <AthletePSERegistration user={user} />
          </TabsContent>
          
          <TabsContent value="psr" className="space-y-6">
            <AthletePSRRegistration user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}