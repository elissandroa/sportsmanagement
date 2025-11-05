import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, Plus, MapPin, Phone, Mail, Search, Calendar } from 'lucide-react';

interface OpponentManagementProps {
  user: any;
}

export function OpponentManagement({ user }: OpponentManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpponent, setSelectedOpponent] = useState(null);

  const opponents = [
    {
      id: 1,
      name: 'Santos FC',
      city: 'Santos',
      state: 'SP',
      address: 'Rua Princesa Isabel, 77 - Vila Belmiro',
      phone: '(13) 3257-4000',
      email: 'contato@santosfc.com.br',
      website: 'www.santosfc.com.br',
      founded: 1912,
      stadium: 'Vila Belmiro',
      capacity: 16068,
      matchHistory: [
        { date: '2024-01-20', result: '2-1', venue: 'Casa', competition: 'Campeonato Paulista' },
        { date: '2023-10-15', result: '1-3', venue: 'Fora', competition: 'Copa do Brasil' },
        { date: '2023-07-22', result: '0-0', venue: 'Casa', competition: 'Campeonato Paulista' }
      ],
      lastMeeting: '2024-01-20',
      totalMatches: 3,
      wins: 1,
      draws: 1,
      losses: 1
    },
    {
      id: 2,
      name: 'Corinthians',
      city: 'São Paulo',
      state: 'SP',
      address: 'Av. Miguel Ignácio Curi, 111 - Arthur Alvim',
      phone: '(11) 2095-3000',
      email: 'sac@corinthians.com.br',
      website: 'www.corinthians.com.br',
      founded: 1910,
      stadium: 'Neo Química Arena',
      capacity: 49205,
      matchHistory: [
        { date: '2024-01-15', result: '0-2', venue: 'Fora', competition: 'Copa do Brasil' },
        { date: '2023-09-10', result: '1-1', venue: 'Casa', competition: 'Campeonato Brasileiro' },
        { date: '2023-05-28', result: '2-0', venue: 'Fora', competition: 'Campeonato Paulista' }
      ],
      lastMeeting: '2024-01-15',
      totalMatches: 3,
      wins: 1,
      draws: 1,
      losses: 1
    },
    {
      id: 3,
      name: 'Palmeiras',
      city: 'São Paulo',
      state: 'SP',
      address: 'Rua Turiassu, 1840 - Perdizes',
      phone: '(11) 3874-6600',
      email: 'contato@palmeiras.com.br',
      website: 'www.palmeiras.com.br',
      founded: 1914,
      stadium: 'Allianz Parque',
      capacity: 43713,
      matchHistory: [
        { date: '2024-01-10', result: '1-1', venue: 'Fora', competition: 'Campeonato Paulista' },
        { date: '2023-11-05', result: '0-3', venue: 'Casa', competition: 'Copa do Brasil' },
        { date: '2023-08-14', result: '2-1', venue: 'Fora', competition: 'Campeonato Brasileiro' }
      ],
      lastMeeting: '2024-01-10',
      totalMatches: 3,
      wins: 1,
      draws: 1,
      losses: 1
    },
    {
      id: 4,
      name: 'São Paulo FC',
      city: 'São Paulo',
      state: 'SP',
      address: 'Praça Roberto Gomes Pedrosa, 1 - Morumbi',
      phone: '(11) 3749-8000',
      email: 'faleconosco@saopaulofc.net',
      website: 'www.saopaulofc.net',
      founded: 1930,
      stadium: 'Estádio do Morumbi',
      capacity: 67052,
      matchHistory: [
        { date: '2023-12-03', result: '1-2', venue: 'Casa', competition: 'Campeonato Brasileiro' },
        { date: '2023-08-20', result: '0-1', venue: 'Fora', competition: 'Copa do Brasil' }
      ],
      lastMeeting: '2023-12-03',
      totalMatches: 2,
      wins: 0,
      draws: 0,
      losses: 2
    },
    {
      id: 5,
      name: 'Flamengo',
      city: 'Rio de Janeiro',
      state: 'RJ',
      address: 'Rua Álvaro Chaves, 41 - Laranjeiras',
      phone: '(21) 2569-2327',
      email: 'relacionamento@flamengo.com.br',
      website: 'www.flamengo.com.br',
      founded: 1895,
      stadium: 'Maracanã',
      capacity: 78838,
      matchHistory: [
        { date: '2023-11-18', result: '1-0', venue: 'Fora', competition: 'Copa do Brasil' }
      ],
      lastMeeting: '2023-11-18',
      totalMatches: 1,
      wins: 1,
      draws: 0,
      losses: 0
    }
  ];

  const filteredOpponents = opponents.filter(opponent =>
    opponent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opponent.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResultColor = (result: string, venue: string) => {
    const [homeGoals, awayGoals] = result.split('-').map(Number);
    let won = false;
    
    if (venue === 'Casa') {
      won = homeGoals > awayGoals;
    } else {
      won = awayGoals > homeGoals;
    }
    
    if (homeGoals === awayGoals) return 'text-yellow-600';
    return won ? 'text-green-600' : 'text-red-600';
  };

  const OpponentCard = ({ opponent }: { opponent: any }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{opponent.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {opponent.city}, {opponent.state}
            </p>
          </div>
          <Badge variant="outline">
            {opponent.totalMatches} jogos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600">{opponent.wins}</p>
              <p className="text-xs text-muted-foreground">Vitórias</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-600">{opponent.draws}</p>
              <p className="text-xs text-muted-foreground">Empates</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">{opponent.losses}</p>
              <p className="text-xs text-muted-foreground">Derrotas</p>
            </div>
          </div>
          
          <div className="text-sm">
            <p><strong>Estádio:</strong> {opponent.stadium}</p>
            <p><strong>Capacidade:</strong> {opponent.capacity.toLocaleString()} pessoas</p>
            <p><strong>Último encontro:</strong> {new Date(opponent.lastMeeting).toLocaleDateString('pt-BR')}</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSelectedOpponent(opponent)}
              >
                Ver Detalhes Completos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{opponent.name} - Informações Completas</DialogTitle>
                <DialogDescription>
                  Visualize informações detalhadas, histórico de confrontos e dados de contato do adversário.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                  <TabsTrigger value="contact">Contato</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Dados do Clube</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Nome</Label>
                            <p className="font-medium">{opponent.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Fundação</Label>
                            <p className="font-medium">{opponent.founded}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Cidade</Label>
                            <p className="font-medium">{opponent.city}, {opponent.state}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Estádio</Label>
                            <p className="font-medium">{opponent.stadium}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Capacidade do Estádio</Label>
                          <p className="font-medium">{opponent.capacity.toLocaleString()} pessoas</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Endereço</Label>
                          <p className="font-medium">{opponent.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Retrospecto Geral</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-green-600">{opponent.wins}</p>
                              <p className="text-sm text-muted-foreground">Vitórias</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-yellow-600">{opponent.draws}</p>
                              <p className="text-sm text-muted-foreground">Empates</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-red-600">{opponent.losses}</p>
                              <p className="text-sm text-muted-foreground">Derrotas</p>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-lg"><strong>Total de jogos:</strong> {opponent.totalMatches}</p>
                            <p className="text-sm text-muted-foreground">
                              Aproveitamento: {((opponent.wins * 3 + opponent.draws) / (opponent.totalMatches * 3) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Últimos Confrontos</h4>
                    {opponent.matchHistory.map((match: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{match.competition}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(match.date).toLocaleDateString('pt-BR')} - {match.venue}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${getResultColor(match.result, match.venue)}`}>
                                {match.result}
                              </p>
                              <Badge variant={match.venue === 'Casa' ? 'default' : 'secondary'}>
                                {match.venue}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Informações de Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Endereço</p>
                            <p className="text-sm text-muted-foreground">{opponent.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Telefone</p>
                            <p className="text-sm text-muted-foreground">{opponent.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">E-mail</p>
                            <p className="text-sm text-muted-foreground">{opponent.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Website</p>
                            <p className="text-sm text-muted-foreground">{opponent.website}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            Editar Informações
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Agendar Partida
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Gestão de Adversários</h2>
          <p className="text-muted-foreground">
            Cadastro e histórico de confrontos com outros clubes
          </p>
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar adversários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Adversário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Adversário</DialogTitle>
                <DialogDescription>
                  Adicione um novo clube adversário ao banco de dados com informações e estatísticas.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Clube</Label>
                    <Input placeholder="Ex: Santos FC" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ano de Fundação</Label>
                    <Input type="number" placeholder="1912" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cidade</Label>
                    <Input placeholder="Ex: Santos" />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Input placeholder="Ex: SP" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Input placeholder="Endereço completo" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estádio</Label>
                    <Input placeholder="Nome do estádio" />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacidade</Label>
                    <Input type="number" placeholder="50000" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input placeholder="(11) 99999-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="contato@clube.com.br" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input placeholder="www.clube.com.br" />
                </div>
                
                <Button className="w-full">Cadastrar Adversário</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Adversários</p>
                <p className="text-2xl font-bold">{opponents.length}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Jogos</p>
                <p className="text-2xl font-bold text-green-600">
                  {opponents.reduce((acc, opp) => acc + opp.totalMatches, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vitórias Totais</p>
                <p className="text-2xl font-bold text-blue-600">
                  {opponents.reduce((acc, opp) => acc + opp.wins, 0)}
                </p>
              </div>
              <Badge className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                V
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aproveitamento</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(() => {
                    const totalMatches = opponents.reduce((acc, opp) => acc + opp.totalMatches, 0);
                    const totalPoints = opponents.reduce((acc, opp) => acc + (opp.wins * 3 + opp.draws), 0);
                    return totalMatches > 0 ? ((totalPoints / (totalMatches * 3)) * 100).toFixed(1) + '%' : '0%';
                  })()}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de adversários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpponents.map((opponent) => (
          <OpponentCard key={opponent.id} opponent={opponent} />
        ))}
      </div>

      {filteredOpponents.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum adversário encontrado</p>
        </div>
      )}

      {/* Resumo de confrontos recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Confrontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opponents
              .flatMap(opp => opp.matchHistory.map(match => ({ ...match, opponent: opp.name })))
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{match.opponent}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(match.date).toLocaleDateString('pt-BR')} - {match.competition}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${getResultColor(match.result, match.venue)}`}>
                      {match.result}
                    </p>
                    <Badge variant={match.venue === 'Casa' ? 'default' : 'secondary'}>
                      {match.venue}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}