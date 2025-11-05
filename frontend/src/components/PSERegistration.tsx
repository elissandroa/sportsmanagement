import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HumanBodyMap } from './HumanBodyMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Plus, TrendingUp, Calendar, Clock, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface PSERegistrationProps {
  user: any;
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

interface PSERecord {
  id: number;
  athleteId: number;
  date: string;
  pse: number;
  duration: number;
  trainingType: string;
  notes: string;
  bodyWeight?: number;
  sleepQuality: number;
  stress: number;
  painPoints?: PainPoint[];
}

export function PSERegistration({ user }: PSERegistrationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  
  const [formData, setFormData] = useState({
    pse: [5],
    duration: '',
    trainingType: '',
    notes: '',
    bodyWeight: '',
    sleepQuality: [7],
    stress: [3],
    date: new Date().toISOString().split('T')[0]
  });

  // Dados simulados
  const athletes = [
    { id: 1, name: 'João Silva', category: 'Profissional', position: 'Atacante' },
    { id: 2, name: 'Carlos Santos', category: 'Sub-20', position: 'Meio-campo' },
    { id: 3, name: 'Pedro Oliveira', category: 'Sub-17', position: 'Zagueiro' },
    { id: 4, name: 'Lucas Mendes', category: 'Profissional', position: 'Goleiro' },
    { id: 5, name: 'Rafael Costa', category: 'Profissional', position: 'Lateral' }
  ];

  const pseRecords: PSERecord[] = [
    {
      id: 1,
      athleteId: 1,
      date: '2024-01-25',
      pse: 7,
      duration: 90,
      trainingType: 'Treino Técnico',
      notes: 'Sentiu-se bem durante o treino',
      bodyWeight: 75.2,
      sleepQuality: 8,
      stress: 3,
      painPoints: [
        { id: '1', x: 0.5, y: 0.3, intensity: 2, type: 'Dor muscular', description: 'Leve tensão no peito', bodyPart: 'Peito' }
      ]
    },
    {
      id: 2,
      athleteId: 2,
      date: '2024-01-25',
      pse: 9,
      duration: 120,
      trainingType: 'Treino Físico',
      notes: 'Treino muito intenso, fadiga muscular',
      bodyWeight: 68.5,
      sleepQuality: 6,
      stress: 5,
      painPoints: [
        { id: '2', x: 0.6, y: 0.7, intensity: 4, type: 'Fadiga', description: 'Fadiga muscular nas coxas', bodyPart: 'Coxa Direita' }
      ]
    }
  ];

  const trainingTypes = [
    'Treino Técnico', 'Treino Físico', 'Treino Tático',
    'Jogo/Partida', 'Recuperação Ativa', 'Trabalho de Força',
    'Trabalho Aeróbico', 'Trabalho Anaeróbico'
  ];

  const filteredAthletes = athletes.filter(athlete => {
    if (user.role === 'gerente' || user.role === 'supervisor') return true;
    if (user.category === 'todas') return true;
    return athlete.category.toLowerCase().includes(user.category.toLowerCase());
  });

  const getPSELevel = (pse: number) => {
    if (pse <= 2) return { label: 'Muito Fácil', color: 'bg-green-500', description: 'Esforço mínimo' };
    if (pse <= 4) return { label: 'Fácil', color: 'bg-blue-500', description: 'Esforço leve' };
    if (pse <= 6) return { label: 'Moderado', color: 'bg-yellow-500', description: 'Esforço moderado' };
    if (pse <= 8) return { label: 'Difícil', color: 'bg-orange-500', description: 'Esforço intenso' };
    return { label: 'Muito Difícil', color: 'bg-red-500', description: 'Esforço máximo' };
  };

  const getStressLevel = (stress: number) => {
    if (stress <= 2) return { label: 'Baixo', color: 'text-green-600' };
    if (stress <= 4) return { label: 'Moderado', color: 'text-yellow-600' };
    if (stress <= 6) return { label: 'Alto', color: 'text-orange-600' };
    return { label: 'Muito Alto', color: 'text-red-600' };
  };

  const getSleepQuality = (quality: number) => {
    if (quality <= 3) return { label: 'Ruim', color: 'text-red-600' };
    if (quality <= 5) return { label: 'Regular', color: 'text-orange-600' };
    if (quality <= 7) return { label: 'Boa', color: 'text-yellow-600' };
    return { label: 'Excelente', color: 'text-green-600' };
  };

  const handleAddPainPoint = (point: PainPoint) => {
    setPainPoints([...painPoints, point]);
  };

  const handleRemovePainPoint = (id: string) => {
    setPainPoints(painPoints.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAthlete) {
      alert('Selecione um atleta');
      return;
    }

    const newRecord: PSERecord = {
      id: Date.now(),
      athleteId: parseInt(selectedAthlete),
      date: formData.date,
      pse: formData.pse[0],
      duration: parseInt(formData.duration),
      trainingType: formData.trainingType,
      notes: formData.notes,
      bodyWeight: formData.bodyWeight ? parseFloat(formData.bodyWeight) : undefined,
      sleepQuality: formData.sleepQuality[0],
      stress: formData.stress[0],
      painPoints: painPoints
    };

    console.log('Novo registro PSE:', newRecord);
    
    // Reset form
    setFormData({
      pse: [5],
      duration: '',
      trainingType: '',
      notes: '',
      bodyWeight: '',
      sleepQuality: [7],
      stress: [3],
      date: new Date().toISOString().split('T')[0]
    });
    setPainPoints([]);
    setSelectedAthlete('');
    setIsDialogOpen(false);
  };

  const currentPSE = getPSELevel(formData.pse[0]);
  const currentStress = getStressLevel(formData.stress[0]);
  const currentSleep = getSleepQuality(formData.sleepQuality[0]);

  // Dados para o gráfico
  const weeklyData = [
    { day: 'Seg', pse: 6, load: 450 },
    { day: 'Ter', pse: 7, load: 560 },
    { day: 'Qua', pse: 5, load: 300 },
    { day: 'Qui', pse: 8, load: 640 },
    { day: 'Sex', pse: 6, load: 480 },
    { day: 'Sáb', pse: 4, load: 240 },
    { day: 'Dom', pse: 3, load: 120 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Registro de PSE</h2>
          <p className="text-muted-foreground">
            Percepção Subjetiva de Esforço - Monitoramento da Carga de Treino
          </p>
        </div>
        
        {(user.role === 'preparador_fisico' || user.role === 'gerente' || user.role === 'supervisor') && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Registrar PSE
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Percepção Subjetiva de Esforço</DialogTitle>
                <DialogDescription>
                  Registre como o atleta percebeu o esforço durante o treino ou atividade física.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Atleta *</Label>
                    <Select value={selectedAthlete} onValueChange={setSelectedAthlete}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar atleta" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredAthletes.map(athlete => (
                          <SelectItem key={athlete.id} value={athlete.id.toString()}>
                            {athlete.name} - {athlete.position} ({athlete.category})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Data *</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <Tabs defaultValue="pse" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pse">PSE e Esforço</TabsTrigger>
                    <TabsTrigger value="body">Mapa de Dor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pse" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label>PSE - Percepção Subjetiva de Esforço *</Label>
                          <Badge className={`${currentPSE.color} text-white`}>
                            {formData.pse[0]} - {currentPSE.label}
                          </Badge>
                        </div>
                        <Slider
                          value={formData.pse}
                          onValueChange={(value) => setFormData({...formData, pse: value})}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-muted-foreground text-center">
                          {currentPSE.description}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Muito Fácil</span>
                          <span>10 - Máximo</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Duração (minutos) *</Label>
                        <Input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          placeholder="Ex: 90"
                          min="1"
                          max="300"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Tipo de Treino *</Label>
                        <Select value={formData.trainingType} onValueChange={(value) => setFormData({...formData, trainingType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {trainingTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Fatores complementares */}
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-medium">Fatores Complementares</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label>Qualidade do Sono</Label>
                          <Badge variant="outline" className={currentSleep.color}>
                            {formData.sleepQuality[0]} - {currentSleep.label}
                          </Badge>
                        </div>
                        <Slider
                          value={formData.sleepQuality}
                          onValueChange={(value) => setFormData({...formData, sleepQuality: value})}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Muito Ruim</span>
                          <span>10 - Excelente</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label>Nível de Estresse</Label>
                          <Badge variant="outline" className={currentStress.color}>
                            {formData.stress[0]} - {currentStress.label}
                          </Badge>
                        </div>
                        <Slider
                          value={formData.stress}
                          onValueChange={(value) => setFormData({...formData, stress: value})}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Muito Baixo</span>
                          <span>10 - Muito Alto</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Peso Corporal (kg)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={formData.bodyWeight}
                          onChange={(e) => setFormData({...formData, bodyWeight: e.target.value})}
                          placeholder="Ex: 75.2"
                          min="40"
                          max="150"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Observações</Label>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Descreva como se sentiu durante o treino, dores, fadiga, etc..."
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="body" className="space-y-4">
                    <HumanBodyMap
                      painPoints={painPoints}
                      onAddPainPoint={handleAddPainPoint}
                      onRemovePainPoint={handleRemovePainPoint}
                    />
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Registrar PSE
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Registros Hoje</p>
                <p className="text-2xl font-bold">
                  {pseRecords.filter(r => r.date === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">PSE Médio Semanal</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(weeklyData.reduce((acc, d) => acc + d.pse, 0) / weeklyData.length).toFixed(1)}
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
                <p className="text-sm text-muted-foreground">Carga Total Semanal</p>
                <p className="text-2xl font-bold text-blue-600">
                  {weeklyData.reduce((acc, d) => acc + d.load, 0)}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atletas em Alerta</p>
                <p className="text-2xl font-bold text-red-600">
                  {pseRecords.filter(r => r.pse >= 8).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico semanal */}
      <Card>
        <CardHeader>
          <CardTitle>PSE e Carga de Treino - Última Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 10]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 800]} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="pse" fill="#f59e0b" name="PSE" />
                <Bar yAxisId="right" dataKey="load" fill="#3b82f6" name="Carga (UA)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Registros recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Registros Recentes de PSE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pseRecords.map((record) => {
              const athlete = athletes.find(a => a.id === record.athleteId);
              const pseLevel = getPSELevel(record.pse);
              
              return (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${pseLevel.color} flex items-center justify-center text-white font-bold`}>
                      {record.pse}
                    </div>
                    <div>
                      <p className="font-medium">{athlete?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.trainingType} • {record.duration}min • {new Date(record.date).toLocaleDateString('pt-BR')}
                      </p>
                      {record.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                      )}
                      {record.painPoints && record.painPoints.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {record.painPoints.map((point) => (
                            <Badge key={point.id} variant="outline" className="text-xs">
                              {point.bodyPart}: {point.intensity}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${pseLevel.color} text-white mb-2`}>
                      {pseLevel.label}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      <p>Sono: {record.sleepQuality}/10</p>
                      <p>Estresse: {record.stress}/10</p>
                      {record.bodyWeight && <p>Peso: {record.bodyWeight}kg</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}