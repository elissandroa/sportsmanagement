import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Plus, 
  Save, 
  Edit, 
  Trash2, 
  Target, 
  Clock, 
  Users, 
  AlertTriangle,
  Trophy,
  Video,
  FileText
} from 'lucide-react';

interface PlayerStat {
  id: string;
  playerId: string;
  playerName: string;
  position: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  fouls: number;
  rating: number;
}

interface MatchData {
  id: string;
  opponent: string;
  date: string;
  homeAway: 'home' | 'away';
  result: string;
  goalsFor: number;
  goalsAgainst: number;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  offsides: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  videoUrl: string;
  notes: string;
  playerStats: PlayerStat[];
}

export function MatchStatistics() {
  const [matches, setMatches] = useState<MatchData[]>([
    {
      id: '1',
      opponent: 'Flamengo RJ',
      date: '2024-01-20',
      homeAway: 'home',
      result: '2-1',
      goalsFor: 2,
      goalsAgainst: 1,
      possession: 65,
      shots: 15,
      shotsOnTarget: 8,
      corners: 6,
      offsides: 3,
      fouls: 12,
      yellowCards: 2,
      redCards: 0,
      videoUrl: 'https://youtube.com/watch?v=example1',
      notes: 'Boa performance ofensiva, dominamos o jogo.',
      playerStats: [
        {
          id: '1',
          playerId: '1',
          playerName: 'João Silva',
          position: 'Atacante',
          minutesPlayed: 90,
          goals: 2,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          shots: 5,
          shotsOnTarget: 3,
          passes: 32,
          passAccuracy: 87,
          tackles: 1,
          interceptions: 0,
          fouls: 2,
          rating: 9.2
        }
      ]
    }
  ]);

  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingMatch, setIsAddingMatch] = useState(false);
  const [activeTab, setActiveTab] = useState('matches');

  const [newMatch, setNewMatch] = useState<Partial<MatchData>>({
    opponent: '',
    date: '',
    homeAway: 'home',
    result: '',
    goalsFor: 0,
    goalsAgainst: 0,
    possession: 0,
    shots: 0,
    shotsOnTarget: 0,
    corners: 0,
    offsides: 0,
    fouls: 0,
    yellowCards: 0,
    redCards: 0,
    videoUrl: '',
    notes: '',
    playerStats: []
  });

  // Lista simulada de jogadores disponíveis
  const availablePlayers = [
    { id: '1', name: 'João Silva', position: 'Atacante' },
    { id: '2', name: 'Carlos Santos', position: 'Meio-campo' },
    { id: '3', name: 'Pedro Oliveira', position: 'Zagueiro' },
    { id: '4', name: 'Lucas Costa', position: 'Lateral' },
    { id: '5', name: 'Rafael Lima', position: 'Goleiro' },
    { id: '6', name: 'Gabriel Silva', position: 'Meio-campo' },
    { id: '7', name: 'André Santos', position: 'Atacante' },
    { id: '8', name: 'Diego Costa', position: 'Zagueiro' }
  ];

  const handleSaveMatch = () => {
    if (isEditing && selectedMatch) {
      setMatches(matches.map(m => m.id === selectedMatch.id ? selectedMatch : m));
      setIsEditing(false);
    } else {
      const matchToAdd: MatchData = {
        ...newMatch,
        id: Date.now().toString(),
        playerStats: newMatch.playerStats || []
      } as MatchData;
      setMatches([...matches, matchToAdd]);
      setIsAddingMatch(false);
      setNewMatch({
        opponent: '',
        date: '',
        homeAway: 'home',
        result: '',
        goalsFor: 0,
        goalsAgainst: 0,
        possession: 0,
        shots: 0,
        shotsOnTarget: 0,
        corners: 0,
        offsides: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
        videoUrl: '',
        notes: '',
        playerStats: []
      });
    }
    setSelectedMatch(null);
  };

  const handleAddPlayerStat = (matchId: string) => {
    const newPlayerStat: PlayerStat = {
      id: Date.now().toString(),
      playerId: '',
      playerName: '',
      position: '',
      minutesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      shots: 0,
      shotsOnTarget: 0,
      passes: 0,
      passAccuracy: 0,
      tackles: 0,
      interceptions: 0,
      fouls: 0,
      rating: 0
    };

    if (selectedMatch) {
      setSelectedMatch({
        ...selectedMatch,
        playerStats: [...selectedMatch.playerStats, newPlayerStat]
      });
    }
  };

  const updatePlayerStat = (statId: string, field: keyof PlayerStat, value: any) => {
    if (selectedMatch) {
      setSelectedMatch({
        ...selectedMatch,
        playerStats: selectedMatch.playerStats.map(stat =>
          stat.id === statId ? { ...stat, [field]: value } : stat
        )
      });
    }
  };

  const removePlayerStat = (statId: string) => {
    if (selectedMatch) {
      setSelectedMatch({
        ...selectedMatch,
        playerStats: selectedMatch.playerStats.filter(stat => stat.id !== statId)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Estatísticas de Partidas</h2>
          <p className="text-muted-foreground">
            Gerencie dados detalhados de cada partida e performance dos jogadores
          </p>
        </div>
        <Dialog open={isAddingMatch} onOpenChange={setIsAddingMatch}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Partida
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Partida</DialogTitle>
              <DialogDescription>
                Registre uma nova partida com estatísticas detalhadas dos jogadores e dados de súmula.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
                  <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                  <TabsTrigger value="players">Jogadores</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Adversário *</Label>
                      <Input
                        value={newMatch.opponent || ''}
                        onChange={(e) => setNewMatch({...newMatch, opponent: e.target.value})}
                        placeholder="Nome do adversário"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data da Partida *</Label>
                      <Input
                        type="date"
                        value={newMatch.date || ''}
                        onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Local</Label>
                      <Select
                        value={newMatch.homeAway || 'home'}
                        onValueChange={(value: 'home' | 'away') => setNewMatch({...newMatch, homeAway: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Casa</SelectItem>
                          <SelectItem value="away">Fora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Resultado *</Label>
                      <Input
                        value={newMatch.result || ''}
                        onChange={(e) => setNewMatch({...newMatch, result: e.target.value})}
                        placeholder="Ex: 2-1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Gols Marcados</Label>
                      <Input
                        type="number"
                        value={newMatch.goalsFor || 0}
                        onChange={(e) => setNewMatch({...newMatch, goalsFor: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Gols Sofridos</Label>
                      <Input
                        type="number"
                        value={newMatch.goalsAgainst || 0}
                        onChange={(e) => setNewMatch({...newMatch, goalsAgainst: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Link do Vídeo (YouTube)</Label>
                    <Input
                      value={newMatch.videoUrl || ''}
                      onChange={(e) => setNewMatch({...newMatch, videoUrl: e.target.value})}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Observações</Label>
                    <Textarea
                      value={newMatch.notes || ''}
                      onChange={(e) => setNewMatch({...newMatch, notes: e.target.value})}
                      placeholder="Observações sobre a partida..."
                      rows={3}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Posse de Bola (%)</Label>
                      <Input
                        type="number"
                        value={newMatch.possession || 0}
                        onChange={(e) => setNewMatch({...newMatch, possession: parseInt(e.target.value)})}
                        min="0"
                        max="100"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Finalizações</Label>
                      <Input
                        type="number"
                        value={newMatch.shots || 0}
                        onChange={(e) => setNewMatch({...newMatch, shots: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Chutes no Gol</Label>
                      <Input
                        type="number"
                        value={newMatch.shotsOnTarget || 0}
                        onChange={(e) => setNewMatch({...newMatch, shotsOnTarget: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Escanteios</Label>
                      <Input
                        type="number"
                        value={newMatch.corners || 0}
                        onChange={(e) => setNewMatch({...newMatch, corners: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Impedimentos</Label>
                      <Input
                        type="number"
                        value={newMatch.offsides || 0}
                        onChange={(e) => setNewMatch({...newMatch, offsides: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Faltas</Label>
                      <Input
                        type="number"
                        value={newMatch.fouls || 0}
                        onChange={(e) => setNewMatch({...newMatch, fouls: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cartões Amarelos</Label>
                      <Input
                        type="number"
                        value={newMatch.yellowCards || 0}
                        onChange={(e) => setNewMatch({...newMatch, yellowCards: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cartões Vermelhos</Label>
                      <Input
                        type="number"
                        value={newMatch.redCards || 0}
                        onChange={(e) => setNewMatch({...newMatch, redCards: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="players" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Estatísticas dos Jogadores</h4>
                    <Button 
                      onClick={() => handleAddPlayerStat('new')}
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Jogador
                    </Button>
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {newMatch.playerStats?.map((stat, index) => (
                      <Card key={stat.id || index}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>Jogador</Label>
                              <Select
                                value={stat.playerId}
                                onValueChange={(value) => {
                                  const player = availablePlayers.find(p => p.id === value);
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {
                                    ...stat,
                                    playerId: value,
                                    playerName: player?.name || '',
                                    position: player?.position || ''
                                  };
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecionar jogador" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availablePlayers.map(player => (
                                    <SelectItem key={player.id} value={player.id}>
                                      {player.name} - {player.position}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Minutos</Label>
                              <Input
                                type="number"
                                value={stat.minutesPlayed}
                                onChange={(e) => {
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {...stat, minutesPlayed: parseInt(e.target.value) || 0};
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                                min="0"
                                max="120"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Gols</Label>
                              <Input
                                type="number"
                                value={stat.goals}
                                onChange={(e) => {
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {...stat, goals: parseInt(e.target.value) || 0};
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                                min="0"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Assistências</Label>
                              <Input
                                type="number"
                                value={stat.assists}
                                onChange={(e) => {
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {...stat, assists: parseInt(e.target.value) || 0};
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                                min="0"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Cartões Amarelos</Label>
                              <Input
                                type="number"
                                value={stat.yellowCards}
                                onChange={(e) => {
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {...stat, yellowCards: parseInt(e.target.value) || 0};
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                                min="0"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Cartões Vermelhos</Label>
                              <Input
                                type="number"
                                value={stat.redCards}
                                onChange={(e) => {
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {...stat, redCards: parseInt(e.target.value) || 0};
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                                min="0"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Nota (0-10)</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={stat.rating}
                                onChange={(e) => {
                                  const updatedStats = [...(newMatch.playerStats || [])];
                                  updatedStats[index] = {...stat, rating: parseFloat(e.target.value) || 0};
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                                min="0"
                                max="10"
                              />
                            </div>
                            
                            <div className="flex items-end">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const updatedStats = newMatch.playerStats?.filter((_, i) => i !== index) || [];
                                  setNewMatch({...newMatch, playerStats: updatedStats});
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingMatch(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveMatch}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Partida
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de partidas */}
      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{match.opponent}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(match.date).toLocaleDateString('pt-BR')} - 
                      {match.homeAway === 'home' ? ' Casa' : ' Fora'}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{match.result}</div>
                    <Badge variant={
                      match.goalsFor > match.goalsAgainst ? 'default' :
                      match.goalsFor < match.goalsAgainst ? 'destructive' : 'secondary'
                    }>
                      {match.goalsFor > match.goalsAgainst ? 'Vitória' :
                       match.goalsFor < match.goalsAgainst ? 'Derrota' : 'Empate'}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{match.possession}%</span>
                      </div>
                      <p className="text-muted-foreground">Posse</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{match.shots}</span>
                      </div>
                      <p className="text-muted-foreground">Chutes</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{match.yellowCards + match.redCards}</span>
                      </div>
                      <p className="text-muted-foreground">Cartões</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {match.videoUrl && (
                    <Button size="sm" variant="outline">
                      <Video className="w-4 h-4 mr-1" />
                      Vídeo
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedMatch(match);
                      setIsEditing(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedMatch(match);
                      setActiveTab('details');
                    }}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Detalhes
                  </Button>
                </div>
              </div>
              
              {match.notes && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">{match.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}