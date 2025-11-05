import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HumanBodyMap } from './HumanBodyMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Heart, Scale, Ruler, Activity, TrendingDown, Users, AlertCircle } from 'lucide-react';

interface PSRRegistrationProps {
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

interface AnthropometricData {
  weight: number;
  height: number;
  bodyFat: number;
  leanMass: number;
  date: string;
}

interface PSRRecord {
  id: number;
  athleteId: number;
  date: string;
  psr: number;
  fatigueLevel: number;
  motivationLevel: number;
  stressLevel: number;
  sleepHours: number;
  sleepQuality: number;
  muscleAching: number;
  notes: string;
  painPoints: PainPoint[];
  anthropometric?: AnthropometricData;
  hydrationLevel: number;
  appetiteLevel: number;
}

export function PSRRegistration({ user }: PSRRegistrationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  
  const [formData, setFormData] = useState({
    psr: [7],
    fatigueLevel: [3],
    motivationLevel: [8],
    stressLevel: [3],
    sleepHours: '8',
    sleepQuality: [7],
    muscleAching: [2],
    hydrationLevel: [8],
    appetiteLevel: [8],
    notes: '',
    date: new Date().toISOString().split('T')[0],
    // Dados antropométricos
    weight: '',
    height: '',
    bodyFat: '',
    leanMass: ''
  });

  // Dados simulados
  const athletes = [
    { id: 1, name: 'João Silva', category: 'Profissional', position: 'Atacante' },
    { id: 2, name: 'Carlos Santos', category: 'Sub-20', position: 'Meio-campo' },
    { id: 3, name: 'Pedro Oliveira', category: 'Sub-17', position: 'Zagueiro' },
    { id: 4, name: 'Lucas Mendes', category: 'Profissional', position: 'Goleiro' },
    { id: 5, name: 'Rafael Costa', category: 'Profissional', position: 'Lateral' }
  ];

  const psrRecords: PSRRecord[] = [
    {
      id: 1,
      athleteId: 1,
      date: '2024-01-25',
      psr: 6,
      fatigueLevel: 4,
      motivationLevel: 8,
      stressLevel: 3,
      sleepHours: 7.5,
      sleepQuality: 7,
      muscleAching: 3,
      hydrationLevel: 8,
      appetiteLevel: 7,
      notes: 'Sentindo-se bem recuperado',
      painPoints: [
        { id: '1', x: 0.6, y: 0.7, intensity: 3, type: 'Dor muscular', description: 'Leve dor na coxa', bodyPart: 'Coxa Direita' }
      ],
      anthropometric: {
        weight: 75.2,
        height: 178,
        bodyFat: 12.5,
        leanMass: 65.8,
        date: '2024-01-25'
      }
    }
  ];

  const filteredAthletes = athletes.filter(athlete => {
    if (user.role === 'gerente' || user.role === 'supervisor') return true;
    if (user.category === 'todas') return true;
    return athlete.category.toLowerCase().includes(user.category.toLowerCase());
  });

  const getPSRLevel = (psr: number) => {
    if (psr <= 3) return { label: 'Muito Baixa', color: 'bg-red-500', description: 'Não recuperado' };
    if (psr <= 5) return { label: 'Baixa', color: 'bg-orange-500', description: 'Pouco recuperado' };
    if (psr <= 7) return { label: 'Moderada', color: 'bg-yellow-500', description: 'Parcialmente recuperado' };
    if (psr <= 8) return { label: 'Boa', color: 'bg-blue-500', description: 'Bem recuperado' };
    return { label: 'Excelente', color: 'bg-green-500', description: 'Totalmente recuperado' };
  };

  const getFatigueLevel = (fatigue: number) => {
    if (fatigue <= 2) return { label: 'Baixa', color: 'text-green-600' };
    if (fatigue <= 4) return { label: 'Moderada', color: 'text-yellow-600' };
    if (fatigue <= 6) return { label: 'Alta', color: 'text-orange-600' };
    return { label: 'Muito Alta', color: 'text-red-600' };
  };

  const getMotivationLevel = (motivation: number) => {
    if (motivation <= 3) return { label: 'Baixa', color: 'text-red-600' };
    if (motivation <= 5) return { label: 'Moderada', color: 'text-orange-600' };
    if (motivation <= 7) return { label: 'Alta', color: 'text-yellow-600' };
    return { label: 'Muito Alta', color: 'text-green-600' };
  };

  const handleAddPainPoint = (point: PainPoint) => {
    setPainPoints([...painPoints, point]);
  };

  const handleRemovePainPoint = (id: string) => {
    setPainPoints(painPoints.filter(p => p.id !== id));
  };

  const calculateLeanMass = () => {
    if (formData.weight && formData.bodyFat) {
      const weight = parseFloat(formData.weight);
      const bodyFat = parseFloat(formData.bodyFat);
      const leanMass = weight * (1 - bodyFat / 100);
      setFormData({...formData, leanMass: leanMass.toFixed(1)});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAthlete) {
      alert('Selecione um atleta');
      return;
    }

    const anthropometric = formData.weight ? {
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height) || 0,
      bodyFat: parseFloat(formData.bodyFat) || 0,
      leanMass: parseFloat(formData.leanMass) || 0,
      date: formData.date
    } : undefined;

    const newRecord: PSRRecord = {
      id: Date.now(),
      athleteId: parseInt(selectedAthlete),
      date: formData.date,
      psr: formData.psr[0],
      fatigueLevel: formData.fatigueLevel[0],
      motivationLevel: formData.motivationLevel[0],
      stressLevel: formData.stressLevel[0],
      sleepHours: parseFloat(formData.sleepHours),
      sleepQuality: formData.sleepQuality[0],
      muscleAching: formData.muscleAching[0],
      hydrationLevel: formData.hydrationLevel[0],
      appetiteLevel: formData.appetiteLevel[0],
      notes: formData.notes,
      painPoints: painPoints,
      anthropometric: anthropometric
    };

    console.log('Novo registro PSR:', newRecord);
    
    // Reset form
    setFormData({
      psr: [7],
      fatigueLevel: [3],
      motivationLevel: [8],
      stressLevel: [3],
      sleepHours: '8',
      sleepQuality: [7],
      muscleAching: [2],
      hydrationLevel: [8],
      appetiteLevel: [8],
      notes: '',
      date: new Date().toISOString().split('T')[0],
      weight: '',
      height: '',
      bodyFat: '',
      leanMass: ''
    });
    setPainPoints([]);
    setSelectedAthlete('');
    setIsDialogOpen(false);
  };

  const currentPSR = getPSRLevel(formData.psr[0]);
  const currentFatigue = getFatigueLevel(formData.fatigueLevel[0]);
  const currentMotivation = getMotivationLevel(formData.motivationLevel[0]);

  // Dados para gráficos
  const weeklyRecoveryData = [
    { day: 'Seg', psr: 6, fatigue: 4, motivation: 7 },
    { day: 'Ter', psr: 5, fatigue: 6, motivation: 6 },
    { day: 'Qua', psr: 7, fatigue: 3, motivation: 8 },
    { day: 'Qui', psr: 4, fatigue: 7, motivation: 5 },
    { day: 'Sex', psr: 8, fatigue: 2, motivation: 9 },
    { day: 'Sáb', psr: 7, fatigue: 3, motivation: 8 },
    { day: 'Dom', psr: 9, fatigue: 1, motivation: 9 }
  ];

  const canEditAnthropometric = user.role === 'preparador_fisico' || user.role === 'gerente' || user.role === 'supervisor';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Registro de PSR</h2>
          <p className="text-muted-foreground">
            Percepção Subjetiva de Recuperação - Monitoramento da Recuperação e Bem-estar
          </p>
        </div>
        
        {(user.role === 'preparador_fisico' || user.role === 'gerente' || user.role === 'supervisor' || user.role === 'atleta') && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Registrar PSR
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Percepção Subjetiva de Recuperação</DialogTitle>
                <DialogDescription>
                  Avalie como o atleta se sente em relação à recuperação, incluindo pontos de dor e dados antropométricos.
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

                <Tabs defaultValue="wellness" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="wellness">Bem-estar</TabsTrigger>
                    <TabsTrigger value="body">Mapa Corporal</TabsTrigger>
                    {canEditAnthropometric && <TabsTrigger value="anthropometric">Antropometria</TabsTrigger>}
                  </TabsList>
                  
                  <TabsContent value="wellness" className="space-y-6">
                    {/* PSR Principal */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label>PSR - Percepção Subjetiva de Recuperação *</Label>
                          <Badge className={`${currentPSR.color} text-white`}>
                            {formData.psr[0]} - {currentPSR.label}
                          </Badge>
                        </div>
                        <Slider
                          value={formData.psr}
                          onValueChange={(value) => setFormData({...formData, psr: value})}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-muted-foreground text-center">
                          {currentPSR.description}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Não Recuperado</span>
                          <span>10 - Totalmente Recuperado</span>
                        </div>
                      </div>
                    </div>

                    {/* Fatores de Bem-estar */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Nível de Fadiga</Label>
                            <Badge variant="outline" className={currentFatigue.color}>
                              {formData.fatigueLevel[0]} - {currentFatigue.label}
                            </Badge>
                          </div>
                          <Slider
                            value={formData.fatigueLevel}
                            onValueChange={(value) => setFormData({...formData, fatigueLevel: value})}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - Sem Fadiga</span>
                            <span>10 - Extremamente Fatigado</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Nível de Motivação</Label>
                            <Badge variant="outline" className={currentMotivation.color}>
                              {formData.motivationLevel[0]} - {currentMotivation.label}
                            </Badge>
                          </div>
                          <Slider
                            value={formData.motivationLevel}
                            onValueChange={(value) => setFormData({...formData, motivationLevel: value})}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - Sem Motivação</span>
                            <span>10 - Muito Motivado</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Nível de Estresse: {formData.stressLevel[0]}</Label>
                          <Slider
                            value={formData.stressLevel}
                            onValueChange={(value) => setFormData({...formData, stressLevel: value})}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - Sem Estresse</span>
                            <span>10 - Muito Estressado</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label>Dor Muscular Geral: {formData.muscleAching[0]}</Label>
                          <Slider
                            value={formData.muscleAching}
                            onValueChange={(value) => setFormData({...formData, muscleAching: value})}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 - Sem Dor</span>
                            <span>10 - Muita Dor</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Qualidade do Sono: {formData.sleepQuality[0]}</Label>
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

                        <div className="space-y-2">
                          <Label>Horas de Sono</Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={formData.sleepHours}
                            onChange={(e) => setFormData({...formData, sleepHours: e.target.value})}
                            placeholder="Ex: 8.5"
                            min="0"
                            max="15"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fatores adicionais */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label>Nível de Hidratação: {formData.hydrationLevel[0]}</Label>
                        <Slider
                          value={formData.hydrationLevel}
                          onValueChange={(value) => setFormData({...formData, hydrationLevel: value})}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Desidratado</span>
                          <span>10 - Bem Hidratado</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Nível de Apetite: {formData.appetiteLevel[0]}</Label>
                        <Slider
                          value={formData.appetiteLevel}
                          onValueChange={(value) => setFormData({...formData, appetiteLevel: value})}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Sem Apetite</span>
                          <span>10 - Apetite Normal</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Observações</Label>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Como você está se sentindo? Descreva qualquer sintoma ou sensação..."
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
                  
                  {canEditAnthropometric && (
                    <TabsContent value="anthropometric" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Scale className="w-5 h-5" />
                            Dados Antropométricos
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Registre os dados corporais do atleta (apenas preparadores físicos)
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Peso (kg)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.weight}
                                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                placeholder="Ex: 75.2"
                                min="40"
                                max="150"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Altura (cm)</Label>
                              <Input
                                type="number"
                                value={formData.height}
                                onChange={(e) => setFormData({...formData, height: e.target.value})}
                                placeholder="Ex: 178"
                                min="150"
                                max="220"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Gordura Corporal (%)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.bodyFat}
                                onChange={(e) => setFormData({...formData, bodyFat: e.target.value})}
                                onBlur={calculateLeanMass}
                                placeholder="Ex: 12.5"
                                min="3"
                                max="50"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Massa Magra (kg)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.leanMass}
                                onChange={(e) => setFormData({...formData, leanMass: e.target.value})}
                                placeholder="Calculado automaticamente"
                                min="20"
                                max="120"
                              />
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={calculateLeanMass}
                                disabled={!formData.weight || !formData.bodyFat}
                              >
                                Calcular Automaticamente
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  )}
                </Tabs>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Registrar PSR
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
                <p className="text-sm text-muted-foreground">PSR Médio</p>
                <p className="text-2xl font-bold text-green-600">
                  {(weeklyRecoveryData.reduce((acc, d) => acc + d.psr, 0) / weeklyRecoveryData.length).toFixed(1)}
                </p>
              </div>
              <Heart className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fadiga Média</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(weeklyRecoveryData.reduce((acc, d) => acc + d.fatigue, 0) / weeklyRecoveryData.length).toFixed(1)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Motivação Média</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(weeklyRecoveryData.reduce((acc, d) => acc + d.motivation, 0) / weeklyRecoveryData.length).toFixed(1)}
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
                <p className="text-sm text-muted-foreground">Atletas com Dor</p>
                <p className="text-2xl font-bold text-red-600">
                  {psrRecords.filter(r => r.painPoints.length > 0).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de recuperação */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Recuperação - Última Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyRecoveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="psr" stroke="#10b981" strokeWidth={3} name="PSR" />
                <Line type="monotone" dataKey="fatigue" stroke="#f59e0b" strokeWidth={2} name="Fadiga" />
                <Line type="monotone" dataKey="motivation" stroke="#3b82f6" strokeWidth={2} name="Motivação" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Registros recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Registros Recentes de PSR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {psrRecords.map((record) => {
              const athlete = athletes.find(a => a.id === record.athleteId);
              const psrLevel = getPSRLevel(record.psr);
              
              return (
                <div key={record.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${psrLevel.color} flex items-center justify-center text-white font-bold`}>
                        {record.psr}
                      </div>
                      <div>
                        <p className="font-medium">{athlete?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </p>
                        <Badge className={`${psrLevel.color} text-white mt-1`}>
                          {psrLevel.label}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground">Fadiga</p>
                          <p className="font-medium">{record.fatigueLevel}/10</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Motivação</p>
                          <p className="font-medium">{record.motivationLevel}/10</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sono</p>
                          <p className="font-medium">{record.sleepHours}h ({record.sleepQuality}/10)</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Dor Muscular</p>
                          <p className="font-medium">{record.muscleAching}/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {record.painPoints.length > 0 && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800 mb-2">
                        Pontos de Dor ({record.painPoints.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {record.painPoints.map((point) => (
                          <Badge key={point.id} variant="outline" className="text-red-600">
                            {point.bodyPart} ({point.intensity}/10)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {record.anthropometric && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-2">Dados Antropométricos</p>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Peso</p>
                          <p className="font-medium">{record.anthropometric.weight}kg</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Altura</p>
                          <p className="font-medium">{record.anthropometric.height}cm</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">% Gordura</p>
                          <p className="font-medium">{record.anthropometric.bodyFat}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Massa Magra</p>
                          <p className="font-medium">{record.anthropometric.leanMass}kg</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {record.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}