import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Calendar, Plus, Users, Target, Clock, MapPin, FileText, Upload, Download, Eye, X } from 'lucide-react';

interface MatchManagementProps {
  user: any;
}

interface MatchDocument {
  name: string;
  file: File | null;
  url?: string;
  uploadedAt?: string;
}

export function MatchManagement({ user }: MatchManagementProps) {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [gamePlanDoc, setGamePlanDoc] = useState<MatchDocument>({ name: '', file: null });
  const [summaryDoc, setSummaryDoc] = useState<MatchDocument>({ name: '', file: null });
  const [scheduleDoc, setScheduleDoc] = useState<MatchDocument>({ name: '', file: null });
  const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);

  const matches = [
    {
      id: 1,
      opponent: 'Santos FC',
      date: '2024-01-25',
      time: '16:00',
      venue: 'Casa',
      competition: 'Campeonato Paulista',
      category: 'Profissional',
      status: 'Programado',
      selectedPlayers: ['João Silva', 'Carlos Santos', 'Pedro Oliveira'],
      result: null
    },
    {
      id: 2,
      opponent: 'Corinthians',
      date: '2024-01-20',
      time: '20:00',
      venue: 'Fora',
      competition: 'Copa do Brasil',
      category: 'Profissional',
      status: 'Finalizado',
      selectedPlayers: ['João Silva', 'Pedro Oliveira'],
      result: { home: 0, away: 2 }
    },
    {
      id: 3,
      opponent: 'Palmeiras Sub-20',
      date: '2024-01-28',
      time: '14:00',
      venue: 'Casa',
      competition: 'Campeonato Sub-20',
      category: 'Sub-20',
      status: 'Programado',
      selectedPlayers: ['Carlos Santos'],
      result: null
    }
  ];

  const availableAthletes = [
    { id: 1, name: 'João Silva', position: 'Atacante', category: 'Profissional' },
    { id: 2, name: 'Carlos Santos', position: 'Meio-campo', category: 'Sub-20' },
    { id: 3, name: 'Pedro Oliveira', position: 'Zagueiro', category: 'Sub-17' },
    { id: 4, name: 'Lucas Mendes', position: 'Goleiro', category: 'Profissional' },
    { id: 5, name: 'Rafael Costa', position: 'Lateral', category: 'Profissional' },
    { id: 6, name: 'Bruno Lima', position: 'Atacante', category: 'Sub-20' },
    { id: 7, name: 'Gabriel Rocha', position: 'Meio-campo', category: 'Sub-17' }
  ];

  const filteredMatches = matches.filter(match => {
    if (user.role === 'gerente') return true;
    if (user.category === 'todas') return true;
    return match.category.toLowerCase().includes(user.category.toLowerCase());
  });

  const handlePlayerSelection = (playerName: string, checked: boolean) => {
    if (checked) {
      setSelectedPlayers([...selectedPlayers, playerName]);
    } else {
      setSelectedPlayers(selectedPlayers.filter(p => p !== playerName));
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    docType: 'gamePlan' | 'summary' | 'schedule'
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const docData: MatchDocument = {
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toLocaleDateString('pt-BR')
      };
      
      if (docType === 'gamePlan') setGamePlanDoc(docData);
      else if (docType === 'summary') setSummaryDoc(docData);
      else if (docType === 'schedule') setScheduleDoc(docData);
    }
  };

  const handleRemoveDocument = (docType: 'gamePlan' | 'summary' | 'schedule') => {
    if (docType === 'gamePlan') setGamePlanDoc({ name: '', file: null });
    else if (docType === 'summary') setSummaryDoc({ name: '', file: null });
    else if (docType === 'schedule') setScheduleDoc({ name: '', file: null });
  };

  const handleViewDocument = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const DocumentUploadCard = ({ 
    title, 
    description, 
    document, 
    docType,
    canUpload 
  }: { 
    title: string;
    description: string;
    document: MatchDocument;
    docType: 'gamePlan' | 'summary' | 'schedule';
    canUpload: boolean;
  }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {document.file ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{document.name}</p>
                <p className="text-xs text-muted-foreground">
                  Enviado em {document.uploadedAt}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleViewDocument(document.url)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = document.url || '';
                  link.download = document.name;
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar
              </Button>
              {canUpload && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveDocument(docType)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {canUpload ? (
              <>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Clique para selecionar um arquivo PDF
                  </p>
                  <Input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id={`upload-${docType}`}
                    onChange={(e) => handleFileUpload(e, docType)}
                  />
                  <Label
                    htmlFor={`upload-${docType}`}
                    className="cursor-pointer"
                  >
                    <Button variant="outline" size="sm" asChild>
                      <span>Selecionar PDF</span>
                    </Button>
                  </Label>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhum documento enviado
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const MatchCard = ({ match }: { match: any }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{match.opponent}</CardTitle>
            <p className="text-sm text-muted-foreground">{match.competition}</p>
          </div>
          <Badge 
            variant={
              match.status === 'Programado' ? 'default' :
              match.status === 'Em andamento' ? 'secondary' : 'outline'
            }
          >
            {match.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{new Date(match.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{match.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{match.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{match.selectedPlayers.length} jogadores</span>
            </div>
          </div>
          
          {match.result && (
            <div className="text-center">
              <p className="text-lg font-bold">
                Resultado: {match.venue === 'Casa' ? match.result.home : match.result.away} x {match.venue === 'Casa' ? match.result.away : match.result.home}
              </p>
            </div>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedMatch(match);
                  setIsMatchDialogOpen(true);
                }}
              >
                {match.status === 'Programado' ? 'Gerenciar Partida' : 'Ver Detalhes'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {match.opponent} - {new Date(match.date).toLocaleDateString('pt-BR')}
                </DialogTitle>
                <DialogDescription>
                  Gerencie escalação, resultados e detalhes da partida.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="players">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="players">Jogadores</TabsTrigger>
                  <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="players" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Jogadores Selecionados */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Jogadores Escalados ({match.selectedPlayers.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {match.selectedPlayers.map((player: string, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-accent rounded">
                              <span>{player}</span>
                              <Badge variant="outline">Escalado</Badge>
                            </div>
                          ))}
                          {match.selectedPlayers.length === 0 && (
                            <p className="text-muted-foreground text-center py-4">
                              Nenhum jogador escalado
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Lista de Atletas Disponíveis */}
                    {match.status === 'Programado' && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Atletas Disponíveis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {availableAthletes
                              .filter(athlete => athlete.category === match.category)
                              .map((athlete) => (
                                <div key={athlete.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`athlete-${athlete.id}`}
                                    checked={selectedPlayers.includes(athlete.name)}
                                    onCheckedChange={(checked) => 
                                      handlePlayerSelection(athlete.name, checked as boolean)
                                    }
                                  />
                                  <label 
                                    htmlFor={`athlete-${athlete.id}`}
                                    className="flex-1 text-sm cursor-pointer"
                                  >
                                    <div>
                                      <p className="font-medium">{athlete.name}</p>
                                      <p className="text-muted-foreground text-xs">{athlete.position}</p>
                                    </div>
                                  </label>
                                </div>
                              ))}
                          </div>
                          <Button className="w-full mt-4" size="sm">
                            Atualizar Escalação
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="space-y-4">
                  {match.result ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {match.venue === 'Casa' ? match.result.home : match.result.away}
                          </p>
                          <p className="text-sm text-muted-foreground">Gols Marcados</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-2xl font-bold text-red-600">
                            {match.venue === 'Casa' ? match.result.away : match.result.home}
                          </p>
                          <p className="text-sm text-muted-foreground">Gols Sofridos</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-2xl font-bold text-green-600">65%</p>
                          <p className="text-sm text-muted-foreground">Posse de Bola</p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Estatísticas disponíveis após a partida</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Informações da Partida</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Adversário:</span>
                          <span className="font-medium">{match.opponent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data:</span>
                          <span className="font-medium">{new Date(match.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Horário:</span>
                          <span className="font-medium">{match.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Local:</span>
                          <span className="font-medium">{match.venue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Competição:</span>
                          <span className="font-medium">{match.competition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Categoria:</span>
                          <span className="font-medium">{match.category}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Status da Partida</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge variant="outline" className="w-full justify-center p-2">
                            {match.status}
                          </Badge>
                          {match.status === 'Programado' && (
                            <div className="space-y-2">
                              <Button className="w-full" variant="outline">
                                Editar Partida
                              </Button>
                              <Button className="w-full" variant="outline">
                                Iniciar Partida
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Seção de Documentos PDF */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Documentos da Partida</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <DocumentUploadCard
                        title="Plano de Jogo"
                        description="Plano tático e estratégico para a partida"
                        document={gamePlanDoc}
                        docType="gamePlan"
                        canUpload={user.role === 'gerente' || user.role === 'supervisor' || user.role === 'treinador'}
                      />
                      <DocumentUploadCard
                        title="Súmula"
                        description="Súmula oficial da partida"
                        document={summaryDoc}
                        docType="summary"
                        canUpload={user.role === 'gerente' || user.role === 'supervisor'}
                      />
                      <DocumentUploadCard
                        title="Programação"
                        description="Programação detalhada do jogo"
                        document={scheduleDoc}
                        docType="schedule"
                        canUpload={user.role === 'gerente' || user.role === 'supervisor' || user.role === 'treinador'}
                      />
                    </div>
                  </div>
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
      {/* Header com botão de nova partida */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestão de Partidas</h2>
          <p className="text-muted-foreground">
            Gerencie partidas e escalações do {user.category === 'todas' ? 'clube' : user.category}
          </p>
        </div>
        
        {(user.role === 'gerente' || user.role === 'supervisor' || user.role === 'treinador') && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Partida
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar Nova Partida</DialogTitle>
                <DialogDescription>
                  Preencha as informações para agendar uma nova partida no calendário.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Adversário</Label>
                  <Input placeholder="Nome do adversário" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Local</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="fora">Fora</SelectItem>
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
                <div className="space-y-2">
                  <Label>Competição</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paulista">Campeonato Paulista</SelectItem>
                      <SelectItem value="copa-brasil">Copa do Brasil</SelectItem>
                      <SelectItem value="sub-20">Campeonato Sub-20</SelectItem>
                      <SelectItem value="amistoso">Amistoso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Agendar Partida</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Estatísticas de partidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Próximas</p>
                <p className="text-2xl font-bold">
                  {filteredMatches.filter(m => m.status === 'Programado').length}
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
                <p className="text-sm text-muted-foreground">Finalizadas</p>
                <p className="text-2xl font-bold">
                  {filteredMatches.filter(m => m.status === 'Finalizado').length}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Casa</p>
                <p className="text-2xl font-bold">
                  {filteredMatches.filter(m => m.venue === 'Casa').length}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fora de Casa</p>
                <p className="text-2xl font-bold">
                  {filteredMatches.filter(m => m.venue === 'Fora').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de partidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma partida encontrada</p>
        </div>
      )}
    </div>
  );
}