import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Clock,
  Activity,
  Award,
  BarChart3,
  Users
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface PlayerStats {
  playerId: string;
  playerName: string;
  position: string;
  category: string;
  matchesPlayed: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  averageRating: number;
  shots: number;
  shotsOnTarget: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  lastMatches: {
    opponent: string;
    rating: number;
    goals: number;
    assists: number;
    minutes: number;
  }[];
}

interface PlayerPerformanceProps {
  performanceData?: any[];
}

export function PlayerPerformance({ performanceData }: PlayerPerformanceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  // Dados simulados expandidos de performance dos jogadores
  const [playersStats] = useState<PlayerStats[]>([
    {
      playerId: '1',
      playerName: 'João Silva',
      position: 'Atacante',
      category: 'Profissional',
      matchesPlayed: 15,
      minutesPlayed: 1320,
      goals: 12,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      averageRating: 8.2,
      shots: 45,
      shotsOnTarget: 28,
      passAccuracy: 82,
      tackles: 8,
      interceptions: 4,
      lastMatches: [
        { opponent: 'Flamengo RJ', rating: 9.2, goals: 2, assists: 0, minutes: 90 },
        { opponent: 'Santos FC', rating: 7.1, goals: 0, assists: 1, minutes: 78 },
        { opponent: 'Palmeiras SP', rating: 8.5, goals: 1, assists: 0, minutes: 90 },
        { opponent: 'Corinthians SP', rating: 7.8, goals: 1, assists: 1, minutes: 85 },
        { opponent: 'São Paulo FC', rating: 8.9, goals: 2, assists: 0, minutes: 90 }
      ]
    },
    {
      playerId: '2',
      playerName: 'Carlos Santos',
      position: 'Meio-campo',
      category: 'Sub-20',
      matchesPlayed: 12,
      minutesPlayed: 1080,
      goals: 4,
      assists: 8,
      yellowCards: 3,
      redCards: 0,
      averageRating: 7.5,
      shots: 18,
      shotsOnTarget: 12,
      passAccuracy: 89,
      tackles: 32,
      interceptions: 28,
      lastMatches: [
        { opponent: 'Flamengo RJ', rating: 7.5, goals: 0, assists: 1, minutes: 90 },
        { opponent: 'Santos FC', rating: 8.2, goals: 1, assists: 2, minutes: 90 },
        { opponent: 'Palmeiras SP', rating: 6.8, goals: 0, assists: 0, minutes: 67 },
        { opponent: 'Corinthians SP', rating: 7.9, goals: 1, assists: 1, minutes: 90 },
        { opponent: 'São Paulo FC', rating: 7.3, goals: 0, assists: 1, minutes: 88 }
      ]
    },
    {
      playerId: '3',
      playerName: 'Pedro Oliveira',
      position: 'Zagueiro',
      category: 'Sub-17',
      matchesPlayed: 14,
      minutesPlayed: 1260,
      goals: 2,
      assists: 1,
      yellowCards: 5,
      redCards: 1,
      averageRating: 7.1,
      shots: 8,
      shotsOnTarget: 4,
      passAccuracy: 85,
      tackles: 42,
      interceptions: 38,
      lastMatches: [
        { opponent: 'Flamengo RJ', rating: 6.8, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'Santos FC', rating: 7.5, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'Palmeiras SP', rating: 7.2, goals: 1, assists: 0, minutes: 90 },
        { opponent: 'Corinthians SP', rating: 6.9, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'São Paulo FC', rating: 7.8, goals: 0, assists: 1, minutes: 90 }
      ]
    },
    {
      playerId: '4',
      playerName: 'Lucas Costa',
      position: 'Lateral',
      category: 'Profissional',
      matchesPlayed: 16,
      minutesPlayed: 1440,
      goals: 3,
      assists: 7,
      yellowCards: 4,
      redCards: 0,
      averageRating: 7.3,
      shots: 12,
      shotsOnTarget: 8,
      passAccuracy: 87,
      tackles: 28,
      interceptions: 24,
      lastMatches: [
        { opponent: 'Flamengo RJ', rating: 7.1, goals: 0, assists: 1, minutes: 90 },
        { opponent: 'Santos FC', rating: 6.9, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'Palmeiras SP', rating: 7.8, goals: 1, assists: 1, minutes: 90 },
        { opponent: 'Corinthians SP', rating: 7.5, goals: 0, assists: 1, minutes: 90 },
        { opponent: 'São Paulo FC', rating: 7.2, goals: 0, assists: 0, minutes: 90 }
      ]
    },
    {
      playerId: '5',
      playerName: 'Rafael Lima',
      position: 'Goleiro',
      category: 'Profissional',
      matchesPlayed: 15,
      minutesPlayed: 1350,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      averageRating: 7.8,
      shots: 0,
      shotsOnTarget: 0,
      passAccuracy: 78,
      tackles: 0,
      interceptions: 0,
      lastMatches: [
        { opponent: 'Flamengo RJ', rating: 8.0, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'Santos FC', rating: 6.5, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'Palmeiras SP', rating: 8.5, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'Corinthians SP', rating: 7.8, goals: 0, assists: 0, minutes: 90 },
        { opponent: 'São Paulo FC', rating: 8.2, goals: 0, assists: 0, minutes: 90 }
      ]
    }
  ]);

  // Filtrar e ordenar jogadores
  const filteredPlayers = playersStats
    .filter(player => {
      const matchesName = player.playerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
      const matchesCategory = categoryFilter === 'all' || player.category === categoryFilter;
      return matchesName && matchesPosition && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.averageRating - a.averageRating;
        case 'goals': return b.goals - a.goals;
        case 'assists': return b.assists - a.assists;
        case 'minutes': return b.minutesPlayed - a.minutesPlayed;
        default: return 0;
      }
    });

  // Dados para gráficos
  const topScorers = playersStats
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 5)
    .map(player => ({
      name: player.playerName.split(' ')[0],
      goals: player.goals,
      assists: player.assists
    }));

  const positionStats = [
    { position: 'Atacante', count: playersStats.filter(p => p.position === 'Atacante').length },
    { position: 'Meio-campo', count: playersStats.filter(p => p.position === 'Meio-campo').length },
    { position: 'Zagueiro', count: playersStats.filter(p => p.position === 'Zagueiro').length },
    { position: 'Lateral', count: playersStats.filter(p => p.position === 'Lateral').length },
    { position: 'Goleiro', count: playersStats.filter(p => p.position === 'Goleiro').length }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 8.5) return 'text-green-600';
    if (rating >= 7.5) return 'text-blue-600';
    if (rating >= 6.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  // Dados do radar para jogador selecionado
  const getRadarData = (player: PlayerStats) => [
    { subject: 'Gols', value: Math.min((player.goals / player.matchesPlayed) * 10, 10) },
    { subject: 'Assistências', value: Math.min((player.assists / player.matchesPlayed) * 10, 10) },
    { subject: 'Precisão', value: player.passAccuracy / 10 },
    { subject: 'Nota Média', value: player.averageRating },
    { subject: 'Disciplina', value: Math.max(10 - (player.yellowCards + player.redCards * 2), 0) },
    { subject: 'Participação', value: (player.minutesPlayed / (player.matchesPlayed * 90)) * 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Performance dos Jogadores</h2>
          <p className="text-muted-foreground">
            Análise detalhada do desempenho individual dos atletas
          </p>
        </div>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Artilheiro</p>
                <p className="font-semibold">{topScorers[0]?.name}</p>
                <p className="text-xl font-bold text-green-600">{topScorers[0]?.goals} gols</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maior Nota</p>
                <p className="font-semibold">{playersStats.sort((a, b) => b.averageRating - a.averageRating)[0]?.playerName.split(' ')[0]}</p>
                <p className="text-xl font-bold text-blue-600">{playersStats.sort((a, b) => b.averageRating - a.averageRating)[0]?.averageRating}</p>
              </div>
              <Award className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mais Minutos</p>
                <p className="font-semibold">{playersStats.sort((a, b) => b.minutesPlayed - a.minutesPlayed)[0]?.playerName.split(' ')[0]}</p>
                <p className="text-xl font-bold text-purple-600">{playersStats.sort((a, b) => b.minutesPlayed - a.minutesPlayed)[0]?.minutesPlayed}min</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Jogadores</p>
                <p className="text-xl font-bold">{playersStats.length}</p>
                <p className="text-sm text-muted-foreground">ativos</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Artilheiros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topScorers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="goals" fill="#10b981" name="Gols" />
                  <Bar dataKey="assists" fill="#3b82f6" name="Assistências" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Posição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={positionStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="position" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar jogador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por posição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as posições</SelectItem>
            <SelectItem value="Atacante">Atacante</SelectItem>
            <SelectItem value="Meio-campo">Meio-campo</SelectItem>
            <SelectItem value="Zagueiro">Zagueiro</SelectItem>
            <SelectItem value="Lateral">Lateral</SelectItem>
            <SelectItem value="Goleiro">Goleiro</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="Profissional">Profissional</SelectItem>
            <SelectItem value="Sub-20">Sub-20</SelectItem>
            <SelectItem value="Sub-17">Sub-17</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Nota média</SelectItem>
            <SelectItem value="goals">Gols</SelectItem>
            <SelectItem value="assists">Assistências</SelectItem>
            <SelectItem value="minutes">Minutos jogados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de jogadores */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogador</TableHead>
                <TableHead>Jogos</TableHead>
                <TableHead>Minutos</TableHead>
                <TableHead>Gols</TableHead>
                <TableHead>Assist.</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Cartões</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.map((player, index) => (
                <TableRow key={player.playerId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {player.playerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{player.playerName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {player.position}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {player.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{player.matchesPlayed}</TableCell>
                  <TableCell>{player.minutesPlayed}'</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{player.goals}</span>
                      {player.assists > 0 && (
                        <span className="text-muted-foreground text-sm">({player.assists}a)</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{player.assists}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getRatingColor(player.averageRating)}`}>
                        {player.averageRating}
                      </span>
                      {/* {index > 0 && getRatingIcon(player.averageRating, filteredPlayers[index-1].averageRating)} */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {player.yellowCards > 0 && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
                          {player.yellowCards}🟨
                        </Badge>
                      )}
                      {player.redCards > 0 && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">
                          {player.redCards}🟥
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPlayer(player)}
                    >
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de detalhes do jogador */}
      {selectedPlayer && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl">
                    {selectedPlayer.playerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedPlayer.playerName}</CardTitle>
                  <p className="text-muted-foreground">
                    {selectedPlayer.position} • {selectedPlayer.category}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedPlayer(null)}>
                Fechar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Estatísticas detalhadas */}
              <div className="space-y-4">
                <h4 className="font-semibold">Estatísticas da Temporada</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Eficiência nos Chutes</p>
                    <Progress value={(selectedPlayer.shotsOnTarget / selectedPlayer.shots) * 100} />
                    <p className="text-xs">{selectedPlayer.shotsOnTarget}/{selectedPlayer.shots} no alvo</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Precisão de Passes</p>
                    <Progress value={selectedPlayer.passAccuracy} />
                    <p className="text-xs">{selectedPlayer.passAccuracy}% de acerto</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Minutos por Jogo</p>
                    <Progress value={(selectedPlayer.minutesPlayed / selectedPlayer.matchesPlayed / 90) * 100} />
                    <p className="text-xs">{Math.round(selectedPlayer.minutesPlayed / selectedPlayer.matchesPlayed)} min/jogo</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Participação em Gols</p>
                    <Progress value={Math.min(((selectedPlayer.goals + selectedPlayer.assists) / selectedPlayer.matchesPlayed) * 20, 100)} />
                    <p className="text-xs">{selectedPlayer.goals + selectedPlayer.assists} participações</p>
                  </div>
                </div>
              </div>

              {/* Gráfico radar */}
              <div>
                <h4 className="font-semibold mb-4">Perfil do Jogador</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={getRadarData(selectedPlayer)}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} />
                      <Radar
                        name={selectedPlayer.playerName}
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Últimas partidas */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Últimas 5 Partidas</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {selectedPlayer.lastMatches.map((match, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p className="font-medium text-sm mb-2">{match.opponent}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Nota:</span>
                          <span className={`font-semibold ${getRatingColor(match.rating)}`}>
                            {match.rating}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Gols:</span>
                          <span>{match.goals}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Assist.:</span>
                          <span>{match.assists}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Min.:</span>
                          <span>{match.minutes}'</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}