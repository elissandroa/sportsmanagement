import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { MatchStatistics } from './MatchStatistics';
import { MatchReports } from './MatchReports';
import { PlayerPerformance } from './PlayerPerformance';
import { VideoAnalysis } from './VideoAnalysis';
import { DetailedMatchAnalysis } from './DetailedMatchAnalysis';
import { 
  BarChart3, 
  LogOut, 
  Target, 
  Users, 
  Video, 
  Calendar,
  TrendingUp,
  Activity,
  Play
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalystDashboardProps {
  user: any;
  onLogout: () => void;
}

export function AnalystDashboard({ user, onLogout }: AnalystDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Dados simulados de estatísticas gerais
  const overviewStats = {
    totalMatches: 15,
    totalGoals: 32,
    totalCards: 18,
    avgPossession: 58.3,
    winRate: 66.7
  };

  // Dados simulados para gráficos
  const matchesData = [
    { match: 'Jogo 1', goals: 2, possession: 65, cards: 1 },
    { match: 'Jogo 2', goals: 1, possession: 52, cards: 3 },
    { match: 'Jogo 3', goals: 3, possession: 68, cards: 0 },
    { match: 'Jogo 4', goals: 0, possession: 45, cards: 2 },
    { match: 'Jogo 5', goals: 2, possession: 61, cards: 1 }
  ];

  const performanceData = [
    { player: 'João Silva', goals: 8, assists: 4, minutes: 1200 },
    { player: 'Carlos Santos', goals: 5, assists: 7, minutes: 1150 },
    { player: 'Pedro Oliveira', goals: 2, assists: 2, minutes: 1300 },
    { player: 'Lucas Costa', goals: 6, assists: 3, minutes: 1100 },
    { player: 'Rafael Lima', goals: 4, assists: 5, minutes: 1000 }
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: 'Flamengo RJ',
      date: '2024-01-20',
      result: '2-1',
      status: 'Vitória',
      analyzed: true,
      videoUrl: 'https://youtube.com/watch?v=example1'
    },
    {
      id: 2,
      opponent: 'Santos FC',
      date: '2024-01-15',
      result: '0-2',
      status: 'Derrota',
      analyzed: true,
      videoUrl: 'https://youtube.com/watch?v=example2'
    },
    {
      id: 3,
      opponent: 'Palmeiras SP',
      date: '2024-01-10',
      result: '1-1',
      status: 'Empate',
      analyzed: false,
      videoUrl: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://img.sofascore.com/api/v1/team/506795/image"
              alt="Hope Internacional"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">Análise Técnica - Hope Internacional Football Club</h1>
              <p className="text-muted-foreground">Bem-vindo, {user.name || 'Analista'}</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Tabs principais */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
            <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="performance">Desempenho</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Cards de estatísticas principais */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Partidas</p>
                      <p className="text-2xl font-bold">{overviewStats.totalMatches}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Gols</p>
                      <p className="text-2xl font-bold text-green-600">{overviewStats.totalGoals}</p>
                    </div>
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Cartões</p>
                      <p className="text-2xl font-bold text-yellow-600">{overviewStats.totalCards}</p>
                    </div>
                    <Activity className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Posse Média</p>
                      <p className="text-2xl font-bold text-purple-600">{overviewStats.avgPossession}%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de Vitória</p>
                      <p className="text-2xl font-bold text-emerald-600">{overviewStats.winRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Partidas recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Partidas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(match.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold">{match.result}</p>
                          <Badge 
                            variant={match.status === 'Vitória' ? 'default' : 
                                   match.status === 'Derrota' ? 'destructive' : 'secondary'}
                          >
                            {match.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={match.analyzed ? 'default' : 'outline'}>
                          {match.analyzed ? 'Analisado' : 'Pendente'}
                        </Badge>
                        {match.videoUrl && (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Vídeo
                          </Button>
                        )}
                        <Button size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de performance por partida */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gols por Partida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={matchesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="match" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="goals" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Posse de Bola por Partida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={matchesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="match" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="possession" stroke="#8b5cf6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-6">
            <MatchStatistics />
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-6">
            <DetailedMatchAnalysis />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <MatchReports />
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <PlayerPerformance performanceData={performanceData} />
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            <VideoAnalysis matches={recentMatches} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}