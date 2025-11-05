import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HumanBodyMap } from './HumanBodyMap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Save, CheckCircle, TrendingUp, Activity, Moon, Zap } from 'lucide-react';

interface AthletePSRRegistrationProps {
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

export function AthletePSRRegistration({ user }: AthletePSRRegistrationProps) {
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
    date: new Date().toISOString().split('T')[0]
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
    
    const newRecord = {
      athleteId: user.athleteId,
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
      timestamp: Date.now()
    };

    console.log('Registro PSR do atleta:', newRecord);
    setIsSubmitted(true);
    
    // Reset depois de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
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
        date: new Date().toISOString().split('T')[0]
      });
      setPainPoints([]);
    }, 3000);
  };

  const currentPSR = getPSRLevel(formData.psr[0]);
  const currentFatigue = getFatigueLevel(formData.fatigueLevel[0]);
  const currentMotivation = getMotivationLevel(formData.motivationLevel[0]);
  const currentSleep = getSleepQuality(formData.sleepQuality[0]);

  // Dados para exemplo do gráfico
  const weeklyRecoveryData = [
    { day: 'Seg', psr: 6, fatigue: 4, motivation: 7 },
    { day: 'Ter', psr: 5, fatigue: 6, motivation: 6 },
    { day: 'Qua', psr: 7, fatigue: 3, motivation: 8 },
    { day: 'Qui', psr: 4, fatigue: 7, motivation: 5 },
    { day: 'Sex', psr: 8, fatigue: 2, motivation: 9 },
    { day: 'Sáb', psr: 7, fatigue: 3, motivation: 8 },
    { day: 'Dom', psr: 9, fatigue: 1, motivation: 9 }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                PSR Registrado com Sucesso!
              </h2>
              <p className="text-green-700 mb-4">
                Obrigado por registrar como você se sente hoje. Isso nos ajuda a cuidar melhor da sua recuperação.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Data:</strong> {new Date(formData.date).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>PSR:</strong> {formData.psr[0]} - {currentPSR.label}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Sono:</strong> {formData.sleepHours}h - {currentSleep.label}
                </p>
                {painPoints.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>Pontos de dor:</strong> {painPoints.length} registrado(s)
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Registro de PSR</h1>
                <p className="text-muted-foreground">
                  Percepção Subjetiva de Recuperação - Como você se sente hoje?
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-semibold">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário principal */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="wellness" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wellness">Bem-estar</TabsTrigger>
              <TabsTrigger value="body">Mapa de Dor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wellness" className="space-y-6">
              {/* PSR Principal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Como você se sente hoje?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Percepção Subjetiva de Recuperação *</Label>
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
                </CardContent>
              </Card>

              {/* Fatores de Bem-estar */}
              <Card>
                <CardHeader>
                  <CardTitle>Fatores de Bem-estar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Nível de Fadiga
                          </Label>
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
                          <Label className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Nível de Motivação
                          </Label>
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
                        <div className="flex justify-between items-center">
                          <Label className="flex items-center gap-2">
                            <Moon className="w-4 h-4" />
                            Qualidade do Sono
                          </Label>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label>Como você se sente hoje?</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Descreva como você está se sentindo, se algo está incomodando, se dormiu bem..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="body" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Dor e Desconforto</CardTitle>
                  <p className="text-muted-foreground">
                    Marque no corpo onde você sente dor ou desconforto hoje
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
          </Tabs>

          {/* Botão de envio */}
          <Card>
            <CardContent className="p-6">
              <Button 
                type="submit" 
                className="w-full"
                size="lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Registrar PSR
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Seus dados ajudam a equipe técnica a cuidar da sua recuperação e bem-estar
              </p>
            </CardContent>
          </Card>
        </form>

        {/* Gráfico do histórico */}
        <Card>
          <CardHeader>
            <CardTitle>Sua Evolução de Recuperação - Última Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
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
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 rounded"></div>
                <span className="text-sm">PSR (Recuperação)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-orange-500 rounded"></div>
                <span className="text-sm">Fadiga</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-500 rounded"></div>
                <span className="text-sm">Motivação</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}