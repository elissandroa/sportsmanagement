import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MatchAnalysisReport } from './MatchAnalysisReport';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Save, 
  Upload, 
  Download, 
  FileText, 
  Calculator,
  Target,
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

interface StatItem {
  correct: number;
  incorrect: number;
  blocked?: number;
  other?: number;
}

interface PossessionData {
  hope: number;
  stopped: number;
  opponent: number;
}

interface MatchAnalysisData {
  matchId: string;
  opponent: string;
  date: string;
  homeAway: 'home' | 'away';
  
  // Passes
  passesHome: StatItem;
  passesAway: StatItem;
  
  // Finalizações
  shotsHome: StatItem; // correct = certa, blocked = bloqueada, incorrect = errada
  shotsAway: StatItem;
  
  // Bola longa
  longBallsHome: StatItem;
  longBallsAway: StatItem;
  
  // Escanteios
  cornersHome: StatItem; // correct = rasteiro, incorrect = cruzamento
  cornersAway: StatItem;
  
  // Cruzamentos
  crossesHome: StatItem; // correct = certo, blocked = bloqueado, incorrect = errado
  crossesAway: StatItem;
  
  // Duelos
  duelsHome: StatItem; // correct = ganho, incorrect = perdido
  duelsAway: StatItem;
  
  // Pressão pós perda
  pressureAfterLoss: { // correct = recuperada, blocked = sem pressão, incorrect = perdida
    recovered: number;
    noPressure: number;
    lost: number;
  };
  
  // Falta lateral
  lateralFoulsHome: StatItem;
  lateralFoulsAway: StatItem;
  
  // Posse
  possessionHome: StatItem; // correct = ganha, incorrect = perdida
  possessionAway: StatItem;
  
  // Posse de bola em minutos
  ballPossessionTime: PossessionData;
  
  // Dados simples
  foulsHome: number;
  foulsAway: number;
  goalsHome: number;
  goalsAway: number;
  offsidesHome: number;
  offsidesAway: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export function DetailedMatchAnalysis() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<string>('');
  const [viewingReport, setViewingReport] = useState<MatchAnalysisData | null>(null);
  
  const [analysisData, setAnalysisData] = useState<MatchAnalysisData>({
    matchId: '',
    opponent: '',
    date: '',
    homeAway: 'home',
    passesHome: { correct: 0, incorrect: 0 },
    passesAway: { correct: 0, incorrect: 0 },
    shotsHome: { correct: 0, blocked: 0, incorrect: 0 },
    shotsAway: { correct: 0, blocked: 0, incorrect: 0 },
    longBallsHome: { correct: 0, incorrect: 0 },
    longBallsAway: { correct: 0, incorrect: 0 },
    cornersHome: { correct: 0, incorrect: 0 },
    cornersAway: { correct: 0, incorrect: 0 },
    crossesHome: { correct: 0, blocked: 0, incorrect: 0 },
    crossesAway: { correct: 0, blocked: 0, incorrect: 0 },
    duelsHome: { correct: 0, incorrect: 0 },
    duelsAway: { correct: 0, incorrect: 0 },
    pressureAfterLoss: { recovered: 0, noPressure: 0, lost: 0 },
    lateralFoulsHome: { correct: 0, incorrect: 0 },
    lateralFoulsAway: { correct: 0, incorrect: 0 },
    possessionHome: { correct: 0, incorrect: 0 },
    possessionAway: { correct: 0, incorrect: 0 },
    ballPossessionTime: { hope: 0, stopped: 0, opponent: 0 },
    foulsHome: 0,
    foulsAway: 0,
    goalsHome: 0,
    goalsAway: 0,
    offsidesHome: 0,
    offsidesAway: 0
  });

  // Partidas disponíveis (simuladas)
  const availableMatches = [
    { id: '1', opponent: 'Flamengo RJ', date: '2024-01-20', homeAway: 'home' },
    { id: '2', opponent: 'Santos FC', date: '2024-01-15', homeAway: 'away' },
    { id: '3', opponent: 'Palmeiras SP', date: '2024-01-10', homeAway: 'home' }
  ];

  // Análises salvas (simuladas)
  const [savedAnalyses] = useState<MatchAnalysisData[]>([
    {
      matchId: '1',
      opponent: 'Flamengo RJ',
      date: '2024-01-20',
      homeAway: 'home',
      passesHome: { correct: 380, incorrect: 85 },
      passesAway: { correct: 320, incorrect: 120 },
      shotsHome: { correct: 8, blocked: 3, incorrect: 4 },
      shotsAway: { correct: 5, blocked: 2, incorrect: 6 },
      longBallsHome: { correct: 12, incorrect: 8 },
      longBallsAway: { correct: 15, incorrect: 12 },
      cornersHome: { correct: 4, incorrect: 2 },
      cornersAway: { correct: 2, incorrect: 1 },
      crossesHome: { correct: 8, blocked: 5, incorrect: 7 },
      crossesAway: { correct: 6, blocked: 4, incorrect: 8 },
      duelsHome: { correct: 45, incorrect: 32 },
      duelsAway: { correct: 38, incorrect: 28 },
      pressureAfterLoss: { recovered: 18, noPressure: 8, lost: 12 },
      lateralFoulsHome: { correct: 8, incorrect: 4 },
      lateralFoulsAway: { correct: 6, incorrect: 6 },
      possessionHome: { correct: 65, incorrect: 28 },
      possessionAway: { correct: 58, incorrect: 35 },
      ballPossessionTime: { hope: 52, stopped: 8, opponent: 40 },
      foulsHome: 12,
      foulsAway: 15,
      goalsHome: 2,
      goalsAway: 1,
      offsidesHome: 3,
      offsidesAway: 5
    }
  ]);

  const calculatePercentage = (value: number, total: number): number => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const getTotal = (stat: StatItem): number => {
    return stat.correct + stat.incorrect + (stat.blocked || 0) + (stat.other || 0);
  };

  const updateStat = (category: string, team: 'Home' | 'Away', field: string, value: number) => {
    const key = `${category}${team}` as keyof MatchAnalysisData;
    setAnalysisData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const updateSimpleStat = (field: keyof MatchAnalysisData, value: number) => {
    setAnalysisData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePossessionTime = (field: keyof PossessionData, value: number) => {
    setAnalysisData(prev => ({
      ...prev,
      ballPossessionTime: {
        ...prev.ballPossessionTime,
        [field]: value
      }
    }));
  };

  const updatePressureAfterLoss = (field: string, value: number) => {
    setAnalysisData(prev => ({
      ...prev,
      pressureAfterLoss: {
        ...prev.pressureAfterLoss,
        [field]: value
      }
    }));
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        // Aqui você implementaria a lógica de parsing do CSV
        console.log('CSV content:', csv);
        // Por agora, vamos simular dados importados
        alert('CSV importado com sucesso! (Funcionalidade simulada)');
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    console.log('Salvando análise:', analysisData);
    alert('Análise salva com sucesso!');
    setIsCreating(false);
  };

  const StatCard = ({ 
    title, 
    stat, 
    labels, 
    team 
  }: { 
    title: string; 
    stat: StatItem; 
    labels: string[]; 
    team: string;
  }) => {
    const total = getTotal(stat);
    const correctPerc = calculatePercentage(stat.correct, total);
    const incorrectPerc = calculatePercentage(stat.incorrect, total);
    const blockedPerc = stat.blocked ? calculatePercentage(stat.blocked, total) : 0;

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">{title} - {team}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="flex justify-between">
                <span>{labels[0]}:</span>
                <span className="font-semibold">{stat.correct}</span>
              </div>
              <Progress value={correctPerc} className="h-1 mt-1" />
              <span className="text-green-600">{correctPerc}%</span>
            </div>
            
            {stat.blocked !== undefined && (
              <div>
                <div className="flex justify-between">
                  <span>{labels[1]}:</span>
                  <span className="font-semibold">{stat.blocked}</span>
                </div>
                <Progress value={blockedPerc} className="h-1 mt-1" />
                <span className="text-yellow-600">{blockedPerc}%</span>
              </div>
            )}
            
            <div>
              <div className="flex justify-between">
                <span>{labels[labels.length - 1]}:</span>
                <span className="font-semibold">{stat.incorrect}</span>
              </div>
              <Progress value={incorrectPerc} className="h-1 mt-1" />
              <span className="text-red-600">{incorrectPerc}%</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground border-t pt-2">
            Total: {total}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Análise Detalhada de Partidas</h2>
          <p className="text-muted-foreground">
            Registre estatísticas detalhadas e gere relatórios completos das partidas
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                // Criar e baixar template CSV
                const csvTemplate = `opponent,date,homeAway,passesHome_correct,passesHome_incorrect,passesAway_correct,passesAway_incorrect,shotsHome_correct,shotsHome_blocked,shotsHome_incorrect,shotsAway_correct,shotsAway_blocked,shotsAway_incorrect,longBallsHome_correct,longBallsHome_incorrect,longBallsAway_correct,longBallsAway_incorrect,cornersHome_correct,cornersHome_incorrect,cornersAway_correct,cornersAway_incorrect,crossesHome_correct,crossesHome_blocked,crossesHome_incorrect,crossesAway_correct,crossesAway_blocked,crossesAway_incorrect,duelsHome_correct,duelsHome_incorrect,duelsAway_correct,duelsAway_incorrect,pressureAfterLoss_recovered,pressureAfterLoss_noPressure,pressureAfterLoss_lost,lateralFoulsHome_correct,lateralFoulsHome_incorrect,lateralFoulsAway_correct,lateralFoulsAway_incorrect,possessionHome_correct,possessionHome_incorrect,possessionAway_correct,possessionAway_incorrect,ballPossessionTime_hope,ballPossessionTime_stopped,ballPossessionTime_opponent,foulsHome,foulsAway,goalsHome,goalsAway,offsidesHome,offsidesAway
Flamengo RJ,2024-01-20,home,380,85,320,120,8,3,4,5,2,6,12,8,15,12,4,2,2,1,8,5,7,6,4,8,45,32,38,28,18,8,12,8,4,6,6,65,28,58,35,52,8,40,12,15,2,1,3,5`;
                
                const blob = new Blob([csvTemplate], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'template_analise_partida.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Template
            </Button>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar CSV
            </Button>
          </div>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Nova Análise
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Análise Detalhada da Partida</DialogTitle>
                <DialogDescription>
                  Insira todas as estatísticas detalhadas da partida para gerar um relatório completo.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
                  <TabsTrigger value="technical">Técnicas</TabsTrigger>
                  <TabsTrigger value="tactical">Táticas</TabsTrigger>
                  <TabsTrigger value="general">Gerais</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Partida</Label>
                      <Select onValueChange={setSelectedMatch}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar partida" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMatches.map(match => (
                            <SelectItem key={match.id} value={match.id}>
                              {match.opponent} - {new Date(match.date).toLocaleDateString('pt-BR')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Adversário</Label>
                      <Input
                        value={analysisData.opponent}
                        onChange={(e) => setAnalysisData(prev => ({...prev, opponent: e.target.value}))}
                        placeholder="Nome do adversário"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={analysisData.date}
                        onChange={(e) => setAnalysisData(prev => ({...prev, date: e.target.value}))}
                      />
                    </div>
                  </div>

                  {/* Passes */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Passes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Hope Internacional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Passes Certos</Label>
                              <Input
                                type="number"
                                value={analysisData.passesHome.correct}
                                onChange={(e) => updateStat('passes', 'Home', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Passes Errados</Label>
                              <Input
                                type="number"
                                value={analysisData.passesHome.incorrect}
                                onChange={(e) => updateStat('passes', 'Home', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Precisão: {calculatePercentage(analysisData.passesHome.correct, getTotal(analysisData.passesHome))}%
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{analysisData.opponent || 'Adversário'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Passes Certos</Label>
                              <Input
                                type="number"
                                value={analysisData.passesAway.correct}
                                onChange={(e) => updateStat('passes', 'Away', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Passes Errados</Label>
                              <Input
                                type="number"
                                value={analysisData.passesAway.incorrect}
                                onChange={(e) => updateStat('passes', 'Away', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Precisão: {calculatePercentage(analysisData.passesAway.correct, getTotal(analysisData.passesAway))}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Finalizações */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Finalizações</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Hope Internacional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Certas</Label>
                              <Input
                                type="number"
                                value={analysisData.shotsHome.correct}
                                onChange={(e) => updateStat('shots', 'Home', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Bloqueadas</Label>
                              <Input
                                type="number"
                                value={analysisData.shotsHome.blocked}
                                onChange={(e) => updateStat('shots', 'Home', 'blocked', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Erradas</Label>
                              <Input
                                type="number"
                                value={analysisData.shotsHome.incorrect}
                                onChange={(e) => updateStat('shots', 'Home', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Eficiência: {calculatePercentage(analysisData.shotsHome.correct, getTotal(analysisData.shotsHome))}%
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{analysisData.opponent || 'Adversário'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Certas</Label>
                              <Input
                                type="number"
                                value={analysisData.shotsAway.correct}
                                onChange={(e) => updateStat('shots', 'Away', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Bloqueadas</Label>
                              <Input
                                type="number"
                                value={analysisData.shotsAway.blocked}
                                onChange={(e) => updateStat('shots', 'Away', 'blocked', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Erradas</Label>
                              <Input
                                type="number"
                                value={analysisData.shotsAway.incorrect}
                                onChange={(e) => updateStat('shots', 'Away', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Eficiência: {calculatePercentage(analysisData.shotsAway.correct, getTotal(analysisData.shotsAway))}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="technical" className="space-y-6">
                  {/* Bolas Longas */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Bolas Longas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Hope Internacional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Certas</Label>
                              <Input
                                type="number"
                                value={analysisData.longBallsHome.correct}
                                onChange={(e) => updateStat('longBalls', 'Home', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Erradas</Label>
                              <Input
                                type="number"
                                value={analysisData.longBallsHome.incorrect}
                                onChange={(e) => updateStat('longBalls', 'Home', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Precisão: {calculatePercentage(analysisData.longBallsHome.correct, getTotal(analysisData.longBallsHome))}%
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{analysisData.opponent || 'Adversário'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Certas</Label>
                              <Input
                                type="number"
                                value={analysisData.longBallsAway.correct}
                                onChange={(e) => updateStat('longBalls', 'Away', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Erradas</Label>
                              <Input
                                type="number"
                                value={analysisData.longBallsAway.incorrect}
                                onChange={(e) => updateStat('longBalls', 'Away', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Precisão: {calculatePercentage(analysisData.longBallsAway.correct, getTotal(analysisData.longBallsAway))}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Cruzamentos */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Cruzamentos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Hope Internacional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Certos</Label>
                              <Input
                                type="number"
                                value={analysisData.crossesHome.correct}
                                onChange={(e) => updateStat('crosses', 'Home', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Bloqueados</Label>
                              <Input
                                type="number"
                                value={analysisData.crossesHome.blocked}
                                onChange={(e) => updateStat('crosses', 'Home', 'blocked', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Errados</Label>
                              <Input
                                type="number"
                                value={analysisData.crossesHome.incorrect}
                                onChange={(e) => updateStat('crosses', 'Home', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Eficiência: {calculatePercentage(analysisData.crossesHome.correct, getTotal(analysisData.crossesHome))}%
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{analysisData.opponent || 'Adversário'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Certos</Label>
                              <Input
                                type="number"
                                value={analysisData.crossesAway.correct}
                                onChange={(e) => updateStat('crosses', 'Away', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Bloqueados</Label>
                              <Input
                                type="number"
                                value={analysisData.crossesAway.blocked}
                                onChange={(e) => updateStat('crosses', 'Away', 'blocked', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Errados</Label>
                              <Input
                                type="number"
                                value={analysisData.crossesAway.incorrect}
                                onChange={(e) => updateStat('crosses', 'Away', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Eficiência: {calculatePercentage(analysisData.crossesAway.correct, getTotal(analysisData.crossesAway))}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tactical" className="space-y-6">
                  {/* Duelos */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Duelos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Hope Internacional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Ganhos</Label>
                              <Input
                                type="number"
                                value={analysisData.duelsHome.correct}
                                onChange={(e) => updateStat('duels', 'Home', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Perdidos</Label>
                              <Input
                                type="number"
                                value={analysisData.duelsHome.incorrect}
                                onChange={(e) => updateStat('duels', 'Home', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Taxa de vitória: {calculatePercentage(analysisData.duelsHome.correct, getTotal(analysisData.duelsHome))}%
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{analysisData.opponent || 'Adversário'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Ganhos</Label>
                              <Input
                                type="number"
                                value={analysisData.duelsAway.correct}
                                onChange={(e) => updateStat('duels', 'Away', 'correct', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Perdidos</Label>
                              <Input
                                type="number"
                                value={analysisData.duelsAway.incorrect}
                                onChange={(e) => updateStat('duels', 'Away', 'incorrect', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Taxa de vitória: {calculatePercentage(analysisData.duelsAway.correct, getTotal(analysisData.duelsAway))}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Pressão pós perda */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Pressão Pós Perda (10 segundos)</h4>
                    <Card>
                      <CardContent className="space-y-3 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Recuperada</Label>
                            <Input
                              type="number"
                              value={analysisData.pressureAfterLoss.recovered}
                              onChange={(e) => updatePressureAfterLoss('recovered', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Sem Pressão</Label>
                            <Input
                              type="number"
                              value={analysisData.pressureAfterLoss.noPressure}
                              onChange={(e) => updatePressureAfterLoss('noPressure', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Perdida</Label>
                            <Input
                              type="number"
                              value={analysisData.pressureAfterLoss.lost}
                              onChange={(e) => updatePressureAfterLoss('lost', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total de situações: {analysisData.pressureAfterLoss.recovered + analysisData.pressureAfterLoss.noPressure + analysisData.pressureAfterLoss.lost}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Posse de Bola em Minutos */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Posse de Bola (Minutos)</h4>
                    <Card>
                      <CardContent className="space-y-3 pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Hope Internacional</Label>
                            <Input
                              type="number"
                              value={analysisData.ballPossessionTime.hope}
                              onChange={(e) => updatePossessionTime('hope', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Bola Parada</Label>
                            <Input
                              type="number"
                              value={analysisData.ballPossessionTime.stopped}
                              onChange={(e) => updatePossessionTime('stopped', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Adversário</Label>
                            <Input
                              type="number"
                              value={analysisData.ballPossessionTime.opponent}
                              onChange={(e) => updatePossessionTime('opponent', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total: {analysisData.ballPossessionTime.hope + analysisData.ballPossessionTime.stopped + analysisData.ballPossessionTime.opponent} minutos
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="general" className="space-y-6">
                  {/* Dados Gerais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Hope Internacional</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Gols</Label>
                            <Input
                              type="number"
                              value={analysisData.goalsHome}
                              onChange={(e) => updateSimpleStat('goalsHome', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Faltas</Label>
                            <Input
                              type="number"
                              value={analysisData.foulsHome}
                              onChange={(e) => updateSimpleStat('foulsHome', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Impedimentos</Label>
                            <Input
                              type="number"
                              value={analysisData.offsidesHome}
                              onChange={(e) => updateSimpleStat('offsidesHome', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">{analysisData.opponent || 'Adversário'}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Gols</Label>
                            <Input
                              type="number"
                              value={analysisData.goalsAway}
                              onChange={(e) => updateSimpleStat('goalsAway', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Faltas</Label>
                            <Input
                              type="number"
                              value={analysisData.foulsAway}
                              onChange={(e) => updateSimpleStat('foulsAway', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Impedimentos</Label>
                            <Input
                              type="number"
                              value={analysisData.offsidesAway}
                              onChange={(e) => updateSimpleStat('offsidesAway', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Análise
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Input oculto para upload de CSV */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleCSVImport}
        className="hidden"
      />

      {/* Lista de análises salvas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Análises Realizadas</h3>
        {savedAnalyses.map((analysis, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold">{analysis.opponent}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(analysis.date).toLocaleDateString('pt-BR')} • 
                    {analysis.goalsHome}-{analysis.goalsAway}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={analysis.goalsHome > analysis.goalsAway ? 'default' : 
                                 analysis.goalsHome < analysis.goalsAway ? 'destructive' : 'secondary'}>
                    {analysis.goalsHome > analysis.goalsAway ? 'Vitória' :
                     analysis.goalsHome < analysis.goalsAway ? 'Derrota' : 'Empate'}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setViewingReport(analysis)}
                  >
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Relatório
                  </Button>
                </div>
              </div>
              
              {/* Preview das principais estatísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  title="Passes"
                  stat={analysis.passesHome}
                  labels={['Certos', 'Errados']}
                  team="Hope"
                />
                <StatCard
                  title="Passes"
                  stat={analysis.passesAway}
                  labels={['Certos', 'Errados']}
                  team={analysis.opponent}
                />
                <StatCard
                  title="Finalizações"
                  stat={analysis.shotsHome}
                  labels={['Certas', 'Bloqueadas', 'Erradas']}
                  team="Hope"
                />
                <StatCard
                  title="Finalizações"
                  stat={analysis.shotsAway}
                  labels={['Certas', 'Bloqueadas', 'Erradas']}
                  team={analysis.opponent}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal do relatório detalhado */}
      {viewingReport && (
        <Dialog open={!!viewingReport} onOpenChange={() => setViewingReport(null)}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Relatório de Análise Detalhada</DialogTitle>
              <DialogDescription>
                Visualize o relatório completo da análise da partida com gráficos e estatísticas detalhadas.
              </DialogDescription>
            </DialogHeader>
            <MatchAnalysisReport 
              analysisData={viewingReport} 
              onClose={() => setViewingReport(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}