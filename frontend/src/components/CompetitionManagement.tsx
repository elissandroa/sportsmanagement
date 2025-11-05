import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Trophy, 
  Plus, 
  Calendar, 
  Users, 
  Target, 
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface CompetitionManagementProps {
  user: any;
}

export function CompetitionManagement({ user }: CompetitionManagementProps) {
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const competitions = [
    {
      id: 1,
      name: 'Campeonato Paulista',
      type: 'Estadual',
      category: 'Profissional',
      startDate: '2024-01-15',
      endDate: '2024-05-20',
      status: 'Em andamento',
      teams: 16,
      matches: [
        { 
          id: 1, 
          opponent: 'Santos FC', 
          date: '2024-01-20', 
          venue: 'Casa', 
          result: '2-1',
          goals: 2,
          conceded: 1,
          status: 'finalizado',
          stadium: 'Estádio Hope Arena',
          attendance: 12500,
          players: ['João Silva', 'Carlos Santos', 'Pedro Oliveira', 'Lucas Ferreira', 'Rafael Costa']
        },
        { 
          id: 2, 
          opponent: 'Palmeiras', 
          date: '2024-01-10', 
          venue: 'Fora', 
          result: '1-1',
          goals: 1,
          conceded: 1,
          status: 'finalizado',
          stadium: 'Allianz Parque',
          attendance: 38000,
          players: ['João Silva', 'Pedro Oliveira', 'Rafael Costa', 'Marcos Souza']
        },
        { 
          id: 3, 
          opponent: 'São Paulo FC', 
          date: '2024-02-05', 
          venue: 'Casa', 
          result: '3-0',
          goals: 3,
          conceded: 0,
          status: 'finalizado',
          stadium: 'Estádio Hope Arena',
          attendance: 15200,
          players: ['João Silva', 'Carlos Santos', 'Pedro Oliveira', 'Lucas Ferreira', 'Rafael Costa', 'Thiago Lima']
        },
        { 
          id: 4, 
          opponent: 'Corinthians', 
          date: '2024-02-18', 
          venue: 'Fora', 
          result: '0-2',
          goals: 0,
          conceded: 2,
          status: 'finalizado',
          stadium: 'Neo Química Arena',
          attendance: 42000,
          players: ['João Silva', 'Pedro Oliveira', 'Marcos Souza', 'Rafael Costa']
        },
        { 
          id: 5, 
          opponent: 'Guarani', 
          date: '2024-10-22', 
          venue: 'Casa', 
          result: '-',
          goals: 0,
          conceded: 0,
          status: 'agendado',
          stadium: 'Estádio Hope Arena',
          attendance: 0,
          players: []
        }
      ],
      position: 8,
      stats: {
        wins: 2,
        draws: 1,
        losses: 1,
        goalsFor: 6,
        goalsAgainst: 4,
        points: 7
      }
    },
    {
      id: 2,
      name: 'Copa do Brasil',
      type: 'Nacional',
      category: 'Profissional',
      startDate: '2024-02-01',
      endDate: '2024-12-15',
      status: 'Em andamento',
      teams: 92,
      matches: [
        { 
          id: 6, 
          opponent: 'Flamengo', 
          date: '2024-02-15', 
          venue: 'Fora', 
          result: '0-3',
          goals: 0,
          conceded: 3,
          status: 'finalizado',
          stadium: 'Maracanã',
          attendance: 55000,
          players: ['João Silva', 'Carlos Santos', 'Pedro Oliveira']
        },
        { 
          id: 7, 
          opponent: 'Atlético-MG', 
          date: '2024-03-10', 
          venue: 'Casa', 
          result: '1-1',
          goals: 1,
          conceded: 1,
          status: 'finalizado',
          stadium: 'Estádio Hope Arena',
          attendance: 18000,
          players: ['João Silva', 'Carlos Santos', 'Lucas Ferreira', 'Thiago Lima']
        }
      ],
      position: null,
      stats: {
        wins: 0,
        draws: 1,
        losses: 1,
        goalsFor: 1,
        goalsAgainst: 4,
        points: 1
      }
    },
    {
      id: 3,
      name: 'Campeonato Sub-20',
      type: 'Estadual',
      category: 'Sub-20',
      startDate: '2024-03-01',
      endDate: '2024-07-30',
      status: 'Programado',
      teams: 12,
      matches: [],
      position: null,
      stats: {
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0
      }
    }
  ];

  const filteredCompetitions = competitions.filter(comp => {
    if (user.role === 'gerente') return true;
    if (user.category === 'todas') return true;
    return comp.category.toLowerCase().includes(user.category.toLowerCase());
  });

  // Função para calcular desempenho
  const getPerformance = (stats: any) => {
    const totalMatches = stats.wins + stats.draws + stats.losses;
    if (totalMatches === 0) return 0;
    return Math.round((stats.wins * 100) / totalMatches);
  };

  // Função para determinar cor do resultado
  const getResultColor = (result: string) => {
    if (result === '-') return 'text-gray-500';
    const [goalsFor, goalsAgainst] = result.split('-').map(Number);
    if (goalsFor > goalsAgainst) return 'text-green-600';
    if (goalsFor < goalsAgainst) return 'text-red-600';
    return 'text-yellow-600';
  };

  const CompetitionCard = ({ competition }: { competition: any }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{competition.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{competition.type}</p>
          </div>
          <Badge 
            variant={
              competition.status === 'Em andamento' ? 'default' :
              competition.status === 'Finalizado' ? 'secondary' : 'outline'
            }
          >
            {competition.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">{competition.teams}</p>
              <p className="text-xs text-muted-foreground">Equipes</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">{competition.matches.length}</p>
              <p className="text-xs text-muted-foreground">Jogos</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Início: {new Date(competition.startDate).toLocaleDateString('pt-BR')}</p>
            <p>Fim: {new Date(competition.endDate).toLocaleDateString('pt-BR')}</p>
          </div>
          
          {competition.position && (
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-3 py-1">
                {competition.position}º Posição
              </Badge>
            </div>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSelectedCompetition(competition)}
              >
                Ver Detalhes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh]">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{competition.name}</DialogTitle>
                    <DialogDescription>
                      {competition.type} • {competition.category}
                    </DialogDescription>
                  </div>
                  <Badge 
                    variant={
                      competition.status === 'Em andamento' ? 'default' :
                      competition.status === 'Finalizado' ? 'secondary' : 'outline'
                    }
                    className="text-sm"
                  >
                    {competition.status}
                  </Badge>
                </div>
              </DialogHeader>
              
              <ScrollArea className="h-[70vh] pr-4">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="matches">Partidas</TabsTrigger>
                    <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
                    <TabsTrigger value="players">Escalações</TabsTrigger>
                  </TabsList>
                  
                  {/* ABA: VISÃO GERAL */}
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    {/* Informações Básicas */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Informações da Competição
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Data de Início</p>
                            <p className="font-medium">{new Date(competition.startDate).toLocaleDateString('pt-BR')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Data de Término</p>
                            <p className="font-medium">{new Date(competition.endDate).toLocaleDateString('pt-BR')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total de Equipes</p>
                            <p className="font-medium">{competition.teams} times</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Categoria</p>
                            <p className="font-medium">{competition.category}</p>
                          </div>
                        </div>
                        {competition.position && (
                          <>
                            <Separator />
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Posição Atual</p>
                              <Badge variant="outline" className="text-xl px-4 py-2">
                                <Award className="w-5 h-5 mr-2" />
                                {competition.position}º Lugar
                              </Badge>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>

                    {/* Resumo de Performance */}
                    {competition.matches.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Resumo de Performance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                              <p className="text-2xl font-bold text-green-600">{competition.stats.wins}</p>
                              <p className="text-xs text-muted-foreground">Vitórias</p>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded-lg">
                              <Minus className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                              <p className="text-2xl font-bold text-yellow-600">{competition.stats.draws}</p>
                              <p className="text-xs text-muted-foreground">Empates</p>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded-lg">
                              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                              <p className="text-2xl font-bold text-red-600">{competition.stats.losses}</p>
                              <p className="text-xs text-muted-foreground">Derrotas</p>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <p className="text-xl font-bold text-blue-600">{competition.stats.points}</p>
                              <p className="text-xs text-muted-foreground">Pontos</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-green-600">{competition.stats.goalsFor}</p>
                              <p className="text-xs text-muted-foreground">Gols Pró</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-red-600">{competition.stats.goalsAgainst}</p>
                              <p className="text-xs text-muted-foreground">Gols Contra</p>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">Aproveitamento</p>
                            <div className="flex items-center justify-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                                  style={{ width: `${getPerformance(competition.stats)}%` }}
                                />
                              </div>
                              <span className="font-bold text-lg">{getPerformance(competition.stats)}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Próxima Partida */}
                    {competition.matches.some((m: any) => m.status === 'agendado') && (
                      <Card className="border-blue-200 bg-blue-50/50">
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            Próxima Partida
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {competition.matches
                            .filter((m: any) => m.status === 'agendado')
                            .slice(0, 1)
                            .map((match: any) => (
                              <div key={match.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-semibold text-lg">{match.opponent}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(match.date).toLocaleDateString('pt-BR', { 
                                        weekday: 'long', 
                                        day: '2-digit', 
                                        month: 'long' 
                                      })}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <MapPin className="w-3 h-3" />
                                      {match.stadium}
                                    </div>
                                  </div>
                                  <Badge variant={match.venue === 'Casa' ? 'default' : 'secondary'} className="text-sm">
                                    {match.venue}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  {/* ABA: PARTIDAS */}
                  <TabsContent value="matches" className="space-y-3 mt-4">
                    {competition.matches.length > 0 ? (
                      competition.matches.map((match: any) => (
                        <Card key={match.id} className={match.status === 'agendado' ? 'border-blue-200' : ''}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <p className="font-semibold text-lg">{match.opponent}</p>
                                  <Badge variant={match.venue === 'Casa' ? 'default' : 'secondary'} className="text-xs">
                                    {match.venue}
                                  </Badge>
                                  {match.status === 'agendado' && (
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Agendado
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(match.date).toLocaleDateString('pt-BR', { 
                                      weekday: 'short', 
                                      day: '2-digit', 
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    {match.stadium}
                                  </div>
                                  {match.attendance > 0 && (
                                    <div className="flex items-center gap-2">
                                      <Users className="w-3 h-3" />
                                      {match.attendance.toLocaleString('pt-BR')} torcedores
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="text-right">
                                {match.status === 'finalizado' ? (
                                  <>
                                    <p className={`text-2xl font-bold ${getResultColor(match.result)}`}>
                                      {match.result}
                                    </p>
                                    {match.result !== '-' && (
                                      <div className="mt-1">
                                        {(() => {
                                          const [goalsFor, goalsAgainst] = match.result.split('-').map(Number);
                                          if (goalsFor > goalsAgainst) {
                                            return (
                                              <Badge variant="default" className="bg-green-600">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                Vitória
                                              </Badge>
                                            );
                                          } else if (goalsFor < goalsAgainst) {
                                            return (
                                              <Badge variant="destructive">
                                                <TrendingDown className="w-3 h-3 mr-1" />
                                                Derrota
                                              </Badge>
                                            );
                                          } else {
                                            return (
                                              <Badge variant="secondary">
                                                <Minus className="w-3 h-3 mr-1" />
                                                Empate
                                              </Badge>
                                            );
                                          }
                                        })()}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <Badge variant="outline" className="text-base">
                                    vs
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Nenhuma partida registrada</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* ABA: ESTATÍSTICAS */}
                  <TabsContent value="statistics" className="space-y-4 mt-4">
                    {competition.matches.filter((m: any) => m.status === 'finalizado').length > 0 ? (
                      <>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Desempenho Geral</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-muted-foreground">Jogos Realizados</p>
                                  <p className="text-2xl font-bold">
                                    {competition.matches.filter((m: any) => m.status === 'finalizado').length}
                                  </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-muted-foreground">Saldo de Gols</p>
                                  <p className={`text-2xl font-bold ${
                                    competition.stats.goalsFor - competition.stats.goalsAgainst > 0 
                                      ? 'text-green-600' 
                                      : competition.stats.goalsFor - competition.stats.goalsAgainst < 0
                                      ? 'text-red-600'
                                      : 'text-gray-600'
                                  }`}>
                                    {competition.stats.goalsFor - competition.stats.goalsAgainst > 0 ? '+' : ''}
                                    {competition.stats.goalsFor - competition.stats.goalsAgainst}
                                  </p>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Média de Gols por Partida</p>
                                <div className="flex items-center gap-4">
                                  <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Marcados</p>
                                    <div className="bg-green-100 rounded-full h-2">
                                      <div 
                                        className="bg-green-600 h-2 rounded-full"
                                        style={{ 
                                          width: `${Math.min((competition.stats.goalsFor / competition.matches.filter((m: any) => m.status === 'finalizado').length / 3) * 100, 100)}%` 
                                        }}
                                      />
                                    </div>
                                    <p className="font-bold mt-1">
                                      {(competition.stats.goalsFor / competition.matches.filter((m: any) => m.status === 'finalizado').length).toFixed(1)}
                                    </p>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs text-muted-foreground mb-1">Sofridos</p>
                                    <div className="bg-red-100 rounded-full h-2">
                                      <div 
                                        className="bg-red-600 h-2 rounded-full"
                                        style={{ 
                                          width: `${Math.min((competition.stats.goalsAgainst / competition.matches.filter((m: any) => m.status === 'finalizado').length / 3) * 100, 100)}%` 
                                        }}
                                      />
                                    </div>
                                    <p className="font-bold mt-1">
                                      {(competition.stats.goalsAgainst / competition.matches.filter((m: any) => m.status === 'finalizado').length).toFixed(1)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Desempenho por Local</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-3">Em Casa</p>
                                <div className="space-y-2">
                                  {(() => {
                                    const homeMatches = competition.matches.filter((m: any) => 
                                      m.venue === 'Casa' && m.status === 'finalizado'
                                    );
                                    const homeWins = homeMatches.filter((m: any) => {
                                      const [gf, ga] = m.result.split('-').map(Number);
                                      return gf > ga;
                                    }).length;
                                    return (
                                      <>
                                        <div className="flex justify-between">
                                          <span className="text-sm">Jogos</span>
                                          <span className="font-bold">{homeMatches.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm">Vitórias</span>
                                          <span className="font-bold text-green-600">{homeWins}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm">Aproveitamento</span>
                                          <span className="font-bold">
                                            {homeMatches.length > 0 
                                              ? Math.round((homeWins / homeMatches.length) * 100) 
                                              : 0}%
                                          </span>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>

                              <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground mb-3">Fora de Casa</p>
                                <div className="space-y-2">
                                  {(() => {
                                    const awayMatches = competition.matches.filter((m: any) => 
                                      m.venue === 'Fora' && m.status === 'finalizado'
                                    );
                                    const awayWins = awayMatches.filter((m: any) => {
                                      const [gf, ga] = m.result.split('-').map(Number);
                                      return gf > ga;
                                    }).length;
                                    return (
                                      <>
                                        <div className="flex justify-between">
                                          <span className="text-sm">Jogos</span>
                                          <span className="font-bold">{awayMatches.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm">Vitórias</span>
                                          <span className="font-bold text-green-600">{awayWins}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-sm">Aproveitamento</span>
                                          <span className="font-bold">
                                            {awayMatches.length > 0 
                                              ? Math.round((awayWins / awayMatches.length) * 100) 
                                              : 0}%
                                          </span>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Estatísticas disponíveis após as partidas</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* ABA: ESCALAÇÕES */}
                  <TabsContent value="players" className="space-y-3 mt-4">
                    {competition.matches.length > 0 ? (
                      competition.matches.map((match: any) => (
                        <Card key={match.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold">{match.opponent}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(match.date).toLocaleDateString('pt-BR')} • {match.venue}
                                </p>
                              </div>
                              <div className="text-right">
                                {match.players.length > 0 ? (
                                  <Badge variant="default">
                                    <Users className="w-3 h-3 mr-1" />
                                    {match.players.length} jogadores
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Aguardando escalação
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {match.players.length > 0 ? (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {match.players.map((player: string, index: number) => (
                                  <Badge key={index} variant="outline" className="justify-start px-3 py-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                                      {index + 1}
                                    </div>
                                    {player}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                Escalação não definida
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Nenhuma escalação disponível</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header com botão de nova competição */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Competições</h2>
          <p className="text-muted-foreground">
            Gerencie as competições do {user.category === 'todas' ? 'clube' : user.category}
          </p>
        </div>
        
        {(user.role === 'gerente' || user.role === 'supervisor') && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Competição
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Competição</DialogTitle>
                <DialogDescription>
                  Crie uma nova competição definindo formato, participantes e configurações.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome da Competição</Label>
                  <Input placeholder="Ex: Campeonato Paulista" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estadual">Estadual</SelectItem>
                        <SelectItem value="nacional">Nacional</SelectItem>
                        <SelectItem value="internacional">Internacional</SelectItem>
                        <SelectItem value="amistoso">Amistoso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profissional">Profissional</SelectItem>
                        <SelectItem value="sub-20">Sub-20</SelectItem>
                        <SelectItem value="sub-17">Sub-17</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data de Início</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Fim</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Número de Equipes</Label>
                  <Input type="number" placeholder="Ex: 16" />
                </div>
                <Button className="w-full">Cadastrar Competição</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Competições Ativas</p>
                <p className="text-2xl font-bold">
                  {filteredCompetitions.filter(c => c.status === 'Em andamento').length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Partidas</p>
                <p className="text-2xl font-bold">
                  {filteredCompetitions.reduce((acc, comp) => acc + comp.matches.length, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Próximas Competições</p>
                <p className="text-2xl font-bold">
                  {filteredCompetitions.filter(c => c.status === 'Programado').length}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de competições */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>

      {filteredCompetitions.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma competição encontrada</p>
        </div>
      )}
    </div>
  );
}