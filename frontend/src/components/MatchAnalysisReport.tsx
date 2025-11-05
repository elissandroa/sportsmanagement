import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download, 
  Share, 
  Printer,
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Clock,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';

interface MatchAnalysisData {
  matchId: string;
  opponent: string;
  date: string;
  homeAway: 'home' | 'away';
  
  // Estatísticas detalhadas
  passesHome: { correct: number; incorrect: number };
  passesAway: { correct: number; incorrect: number };
  shotsHome: { correct: number; blocked: number; incorrect: number };
  shotsAway: { correct: number; blocked: number; incorrect: number };
  longBallsHome: { correct: number; incorrect: number };
  longBallsAway: { correct: number; incorrect: number };
  cornersHome: { correct: number; incorrect: number };
  cornersAway: { correct: number; incorrect: number };
  crossesHome: { correct: number; blocked: number; incorrect: number };
  crossesAway: { correct: number; blocked: number; incorrect: number };
  duelsHome: { correct: number; incorrect: number };
  duelsAway: { correct: number; incorrect: number };
  pressureAfterLoss: { recovered: number; noPressure: number; lost: number };
  lateralFoulsHome: { correct: number; incorrect: number };
  lateralFoulsAway: { correct: number; incorrect: number };
  possessionHome: { correct: number; incorrect: number };
  possessionAway: { correct: number; incorrect: number };
  ballPossessionTime: { hope: number; stopped: number; opponent: number };
  foulsHome: number;
  foulsAway: number;
  goalsHome: number;
  goalsAway: number;
  offsidesHome: number;
  offsidesAway: number;
}

interface MatchAnalysisReportProps {
  analysisData: MatchAnalysisData;
  onClose?: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function MatchAnalysisReport({ analysisData, onClose }: MatchAnalysisReportProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const calculatePercentage = (value: number, total: number): number => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const getTotal = (stat: { correct: number; incorrect: number; blocked?: number }): number => {
    return stat.correct + stat.incorrect + (stat.blocked || 0);
  };

  // Preparar dados para gráficos
  const passesData = [
    {
      name: 'Hope Internacional',
      certas: analysisData.passesHome.correct,
      erradas: analysisData.passesHome.incorrect,
      precisao: calculatePercentage(analysisData.passesHome.correct, getTotal(analysisData.passesHome))
    },
    {
      name: analysisData.opponent,
      certas: analysisData.passesAway.correct,
      erradas: analysisData.passesAway.incorrect,
      precisao: calculatePercentage(analysisData.passesAway.correct, getTotal(analysisData.passesAway))
    }
  ];

  const finalizacoesData = [
    {
      name: 'Hope Internacional',
      certas: analysisData.shotsHome.correct,
      bloqueadas: analysisData.shotsHome.blocked,
      erradas: analysisData.shotsHome.incorrect
    },
    {
      name: analysisData.opponent,
      certas: analysisData.shotsAway.correct,
      bloqueadas: analysisData.shotsAway.blocked,
      erradas: analysisData.shotsAway.incorrect
    }
  ];

  const possessionTimeData = [
    { name: 'Hope Internacional', value: analysisData.ballPossessionTime.hope, color: '#10b981' },
    { name: 'Bola Parada', value: analysisData.ballPossessionTime.stopped, color: '#f59e0b' },
    { name: analysisData.opponent, value: analysisData.ballPossessionTime.opponent, color: '#ef4444' }
  ];

  const pressureData = [
    { name: 'Recuperada', value: analysisData.pressureAfterLoss.recovered, color: '#10b981' },
    { name: 'Sem Pressão', value: analysisData.pressureAfterLoss.noPressure, color: '#f59e0b' },
    { name: 'Perdida', value: analysisData.pressureAfterLoss.lost, color: '#ef4444' }
  ];

  const radarData = [
    {
      subject: 'Passes',
      hope: calculatePercentage(analysisData.passesHome.correct, getTotal(analysisData.passesHome)),
      opponent: calculatePercentage(analysisData.passesAway.correct, getTotal(analysisData.passesAway))
    },
    {
      subject: 'Finalizações',
      hope: calculatePercentage(analysisData.shotsHome.correct, getTotal(analysisData.shotsHome)),
      opponent: calculatePercentage(analysisData.shotsAway.correct, getTotal(analysisData.shotsAway))
    },
    {
      subject: 'Bolas Longas',
      hope: calculatePercentage(analysisData.longBallsHome.correct, getTotal(analysisData.longBallsHome)),
      opponent: calculatePercentage(analysisData.longBallsAway.correct, getTotal(analysisData.longBallsAway))
    },
    {
      subject: 'Cruzamentos',
      hope: calculatePercentage(analysisData.crossesHome.correct, getTotal(analysisData.crossesHome)),
      opponent: calculatePercentage(analysisData.crossesAway.correct, getTotal(analysisData.crossesAway))
    },
    {
      subject: 'Duelos',
      hope: calculatePercentage(analysisData.duelsHome.correct, getTotal(analysisData.duelsHome)),
      opponent: calculatePercentage(analysisData.duelsAway.correct, getTotal(analysisData.duelsAway))
    }
  ];

  const resultStatus = analysisData.goalsHome > analysisData.goalsAway ? 'Vitória' :
                      analysisData.goalsHome < analysisData.goalsAway ? 'Derrota' : 'Empate';

  const resultColor = analysisData.goalsHome > analysisData.goalsAway ? 'default' :
                     analysisData.goalsHome < analysisData.goalsAway ? 'destructive' : 'secondary';

  const StatComparisonCard = ({ 
    title, 
    hopeData, 
    opponentData, 
    labels 
  }: { 
    title: string; 
    hopeData: any; 
    opponentData: any; 
    labels: string[];
  }) => {
    const hopeTotal = getTotal(hopeData);
    const opponentTotal = getTotal(opponentData);
    const hopePercent = calculatePercentage(hopeData.correct, hopeTotal);
    const opponentPercent = calculatePercentage(opponentData.correct, opponentTotal);

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Hope Internacional</span>
                <span className="text-sm font-bold text-green-600">{hopePercent}%</span>
              </div>
              <Progress value={hopePercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {hopeData.correct} {labels[0]} / {hopeTotal} total
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{analysisData.opponent}</span>
                <span className="text-sm font-bold text-blue-600">{opponentPercent}%</span>
              </div>
              <Progress value={opponentPercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {opponentData.correct} {labels[0]} / {opponentTotal} total
              </p>
            </div>
            
            <div className="flex items-center justify-center pt-2">
              {hopePercent > opponentPercent ? (
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-xs">Vantagem Hope</span>
                </div>
              ) : hopePercent < opponentPercent ? (
                <div className="flex items-center text-red-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span className="text-xs">Vantagem {analysisData.opponent}</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-600">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-xs">Empate técnico</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header do relatório */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Relatório de Análise Detalhada</h2>
          <div className="flex items-center gap-4 mt-2">
            <h3 className="text-lg">{analysisData.opponent}</h3>
            <Badge variant={resultColor}>{resultStatus}</Badge>
            <span className="text-muted-foreground">
              {new Date(analysisData.date).toLocaleDateString('pt-BR')}
            </span>
            <div className="text-xl font-bold">
              {analysisData.goalsHome} - {analysisData.goalsAway}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="technical">Análise Técnica</TabsTrigger>
          <TabsTrigger value="tactical">Análise Tática</TabsTrigger>
          <TabsTrigger value="comparative">Comparativo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Resumo executivo */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Executivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {calculatePercentage(analysisData.passesHome.correct, getTotal(analysisData.passesHome))}%
                  </div>
                  <p className="text-sm text-muted-foreground">Precisão de Passes</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculatePercentage(analysisData.shotsHome.correct, getTotal(analysisData.shotsHome))}%
                  </div>
                  <p className="text-sm text-muted-foreground">Eficiência Finalização</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {calculatePercentage(analysisData.duelsHome.correct, getTotal(analysisData.duelsHome))}%
                  </div>
                  <p className="text-sm text-muted-foreground">Taxa Vitória Duelos</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {analysisData.ballPossessionTime.hope}min
                  </div>
                  <p className="text-sm text-muted-foreground">Posse de Bola</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de posse de bola */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição da Posse de Bola</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={possessionTimeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}min`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {possessionTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pressão Pós Perda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pressureData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pressureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas gerais */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold">{analysisData.foulsHome}</div>
                  <p className="text-xs text-muted-foreground">Faltas Hope</p>
                </div>
                <div>
                  <div className="text-lg font-bold">{analysisData.foulsAway}</div>
                  <p className="text-xs text-muted-foreground">Faltas {analysisData.opponent}</p>
                </div>
                <div>
                  <div className="text-lg font-bold">{analysisData.offsidesHome}</div>
                  <p className="text-xs text-muted-foreground">Impedimentos Hope</p>
                </div>
                <div>
                  <div className="text-lg font-bold">{analysisData.offsidesAway}</div>
                  <p className="text-xs text-muted-foreground">Impedimentos {analysisData.opponent}</p>
                </div>
                <div>
                  <div className="text-lg font-bold">{getTotal(analysisData.cornersHome)}</div>
                  <p className="text-xs text-muted-foreground">Escanteios Hope</p>
                </div>
                <div>
                  <div className="text-lg font-bold">{getTotal(analysisData.cornersAway)}</div>
                  <p className="text-xs text-muted-foreground">Escanteios {analysisData.opponent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-6">
          {/* Análise técnica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatComparisonCard
              title="Precisão de Passes"
              hopeData={analysisData.passesHome}
              opponentData={analysisData.passesAway}
              labels={['certos']}
            />
            
            <StatComparisonCard
              title="Eficiência em Bolas Longas"
              hopeData={analysisData.longBallsHome}
              opponentData={analysisData.longBallsAway}
              labels={['certas']}
            />
            
            <StatComparisonCard
              title="Precisão em Cruzamentos"
              hopeData={analysisData.crossesHome}
              opponentData={analysisData.crossesAway}
              labels={['certos']}
            />
            
            <StatComparisonCard
              title="Efetividade em Faltas Laterais"
              hopeData={analysisData.lateralFoulsHome}
              opponentData={analysisData.lateralFoulsAway}
              labels={['certas']}
            />
          </div>

          {/* Gráfico de passes */}
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={passesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="certas" fill="#10b981" name="Passes Certos" />
                    <Bar dataKey="erradas" fill="#ef4444" name="Passes Errados" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tactical" className="space-y-6">
          {/* Análise tática */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Finalizações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={finalizacoesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="certas" fill="#10b981" name="Certas" />
                      <Bar dataKey="bloqueadas" fill="#f59e0b" name="Bloqueadas" />
                      <Bar dataKey="erradas" fill="#ef4444" name="Erradas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <StatComparisonCard
              title="Domínio em Duelos"
              hopeData={analysisData.duelsHome}
              opponentData={analysisData.duelsAway}
              labels={['ganhos']}
            />
          </div>

          {/* Análise de posse */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Posse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Recuperação de Posse</h4>
                  <StatComparisonCard
                    title=""
                    hopeData={analysisData.possessionHome}
                    opponentData={analysisData.possessionAway}
                    labels={['ganhas']}
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Distribuição Temporal</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Hope Internacional:</span>
                      <span className="font-bold">{analysisData.ballPossessionTime.hope} min</span>
                    </div>
                    <Progress value={calculatePercentage(analysisData.ballPossessionTime.hope, 
                      analysisData.ballPossessionTime.hope + analysisData.ballPossessionTime.opponent + analysisData.ballPossessionTime.stopped)} />
                    
                    <div className="flex justify-between items-center">
                      <span>Bola Parada:</span>
                      <span className="font-bold">{analysisData.ballPossessionTime.stopped} min</span>
                    </div>
                    <Progress value={calculatePercentage(analysisData.ballPossessionTime.stopped, 
                      analysisData.ballPossessionTime.hope + analysisData.ballPossessionTime.opponent + analysisData.ballPossessionTime.stopped)} />
                    
                    <div className="flex justify-between items-center">
                      <span>{analysisData.opponent}:</span>
                      <span className="font-bold">{analysisData.ballPossessionTime.opponent} min</span>
                    </div>
                    <Progress value={calculatePercentage(analysisData.ballPossessionTime.opponent, 
                      analysisData.ballPossessionTime.hope + analysisData.ballPossessionTime.opponent + analysisData.ballPossessionTime.stopped)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparative" className="space-y-6">
          {/* Comparativo geral */}
          <Card>
            <CardHeader>
              <CardTitle>Radar de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Hope Internacional"
                      dataKey="hope"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Radar
                      name={analysisData.opponent}
                      dataKey="opponent"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resumo comparativo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hope Internacional - Pontos Fortes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {radarData
                    .filter(item => item.hope > item.opponent)
                    .map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{item.subject}</span>
                        <Badge variant="default">{item.hope}%</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{analysisData.opponent} - Pontos Fortes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {radarData
                    .filter(item => item.opponent > item.hope)
                    .map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{item.subject}</span>
                        <Badge variant="destructive">{item.opponent}%</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}