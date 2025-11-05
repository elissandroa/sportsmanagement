import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { HumanBodyMap } from './HumanBodyMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, Clock, Target, AlertTriangle, CheckCircle, Save } from 'lucide-react';

interface AthletePSERegistrationProps {
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

export function AthletePSERegistration({ user }: AthletePSERegistrationProps) {
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    pse: [5],
    duration: '',
    trainingType: '',
    notes: '',
    sleepQuality: [7],
    stress: [3],
    date: new Date().toISOString().split('T')[0]
  });

  const trainingTypes = [
    'Treino Técnico', 'Treino Físico', 'Treino Tático',
    'Jogo/Partida', 'Recuperação Ativa', 'Trabalho de Força',
    'Trabalho Aeróbico', 'Trabalho Anaeróbico'
  ];

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
    
    const newRecord = {
      athleteId: user.athleteId,
      date: formData.date,
      pse: formData.pse[0],
      duration: parseInt(formData.duration),
      trainingType: formData.trainingType,
      notes: formData.notes,
      sleepQuality: formData.sleepQuality[0],
      stress: formData.stress[0],
      painPoints: painPoints,
      timestamp: Date.now()
    };

    console.log('Registro PSE do atleta:', newRecord);
    setIsSubmitted(true);
    
    // Reset depois de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        pse: [5],
        duration: '',
        trainingType: '',
        notes: '',
        sleepQuality: [7],
        stress: [3],
        date: new Date().toISOString().split('T')[0]
      });
      setPainPoints([]);
    }, 3000);
  };

  const currentPSE = getPSELevel(formData.pse[0]);
  const currentStress = getStressLevel(formData.stress[0]);
  const currentSleep = getSleepQuality(formData.sleepQuality[0]);

  // Dados para exemplo do gráfico
  const weeklyData = [
    { day: 'Seg', pse: 6 },
    { day: 'Ter', pse: 7 },
    { day: 'Qua', pse: 5 },
    { day: 'Qui', pse: 8 },
    { day: 'Sex', pse: 6 },
    { day: 'Sáb', pse: 4 },
    { day: 'Dom', pse: 3 }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                PSE Registrado com Sucesso!
              </h2>
              <p className="text-green-700 mb-4">
                Obrigado por manter seus dados atualizados. Isso nos ajuda a monitorar seu desempenho e bem-estar.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Data:</strong> {new Date(formData.date).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>PSE:</strong> {formData.pse[0]} - {currentPSE.label}
                </p>
                {formData.trainingType && (
                  <p className="text-sm text-gray-600">
                    <strong>Tipo:</strong> {formData.trainingType}
                  </p>
                )}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Registro de PSE</h1>
                <p className="text-muted-foreground">
                  Percepção Subjetiva de Esforço - Como foi seu treino hoje?
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
          <Tabs defaultValue="pse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pse">PSE e Esforço</TabsTrigger>
              <TabsTrigger value="body">Mapa de Dor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pse" className="space-y-6">
              {/* PSE Principal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Percepção Subjetiva de Esforço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Como foi o esforço do seu treino/jogo? *</Label>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label>Tipo de Atividade *</Label>
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
                </CardContent>
              </Card>

              {/* Fatores complementares */}
              <Card>
                <CardHeader>
                  <CardTitle>Fatores que Influenciam o Desempenho</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

                  <div className="space-y-2">
                    <Label>Observações sobre o treino</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Como você se sentiu durante o treino? Alguma dificuldade ou destaque?"
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
                    Marque no corpo onde você sentiu dor ou desconforto durante ou após o treino
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
                disabled={!formData.trainingType || !formData.duration}
              >
                <Save className="w-4 h-4 mr-2" />
                Registrar PSE
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Seus dados ajudam a equipe técnica a monitorar seu bem-estar e desempenho
              </p>
            </CardContent>
          </Card>
        </form>

        {/* Gráfico do histórico */}
        <Card>
          <CardHeader>
            <CardTitle>Seu Histórico PSE - Última Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="pse" fill="#f59e0b" name="PSE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}