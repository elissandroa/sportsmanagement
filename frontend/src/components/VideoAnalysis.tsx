import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Clock, 
  Tag,
  Save,
  ExternalLink,
  Search,
  Filter,
  Calendar
} from 'lucide-react';

interface VideoAnnotation {
  id: string;
  timestamp: string; // formato "MM:SS"
  type: 'goal' | 'foul' | 'card' | 'substitution' | 'tactical' | 'highlight';
  description: string;
  players?: string[];
}

interface MatchVideo {
  id: string;
  matchId: string;
  opponent: string;
  date: string;
  result: string;
  videoUrl: string;
  duration?: string;
  quality: 'HD' | 'FHD' | '4K';
  annotations: VideoAnnotation[];
  tags: string[];
  notes: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface VideoAnalysisProps {
  matches: any[];
}

export function VideoAnalysis({ matches }: VideoAnalysisProps) {
  const [videos, setVideos] = useState<MatchVideo[]>([
    {
      id: '1',
      matchId: '1',
      opponent: 'Flamengo RJ',
      date: '2024-01-20',
      result: '2-1',
      videoUrl: 'https://youtube.com/watch?v=example1',
      duration: '1:45:30',
      quality: 'FHD',
      annotations: [
        {
          id: '1',
          timestamp: '15:30',
          type: 'goal',
          description: 'Gol de João Silva - Finalização dentro da área',
          players: ['João Silva', 'Carlos Santos']
        },
        {
          id: '2',
          timestamp: '23:45',
          type: 'card',
          description: 'Cartão amarelo para Pedro Oliveira - Falta dura',
          players: ['Pedro Oliveira']
        },
        {
          id: '3',
          timestamp: '34:12',
          type: 'goal',
          description: 'Gol do adversário - Contra-ataque rápido',
          players: []
        },
        {
          id: '4',
          timestamp: '78:22',
          type: 'goal',
          description: 'Gol de pênalti - João Silva converte',
          players: ['João Silva']
        }
      ],
      tags: ['vitória', 'bom desempenho', 'gols importantes'],
      notes: 'Jogo com boa intensidade. João Silva teve atuação destacada. Problemas defensivos aos 34 minutos.',
      uploadedBy: 'Analista Técnico',
      uploadedAt: '2024-01-21'
    },
    {
      id: '2',
      matchId: '2',
      opponent: 'Santos FC',
      date: '2024-01-15',
      result: '0-2',
      videoUrl: 'https://youtube.com/watch?v=example2',
      duration: '1:52:15',
      quality: 'HD',
      annotations: [
        {
          id: '5',
          timestamp: '12:30',
          type: 'foul',
          description: 'Falta perigosa sofrida na entrada da área',
          players: ['Carlos Santos']
        },
        {
          id: '6',
          timestamp: '35:20',
          type: 'goal',
          description: 'Primeiro gol sofrido - Falha defensiva',
          players: []
        },
        {
          id: '7',
          timestamp: '67:45',
          type: 'substitution',
          description: 'Entrada de Gabriel Silva no lugar de Pedro Oliveira',
          players: ['Gabriel Silva', 'Pedro Oliveira']
        }
      ],
      tags: ['derrota', 'problemas defensivos', 'falta de criatividade'],
      notes: 'Jogo difícil. Equipe teve dificuldades para criar jogadas. Necessário melhorar a organização defensiva.',
      uploadedBy: 'Analista Técnico',
      uploadedAt: '2024-01-16'
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState<MatchVideo | null>(null);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [newVideo, setNewVideo] = useState<Partial<MatchVideo>>({
    opponent: '',
    date: '',
    result: '',
    videoUrl: '',
    duration: '',
    quality: 'FHD',
    annotations: [],
    tags: [],
    notes: ''
  });

  const [newAnnotation, setNewAnnotation] = useState<Partial<VideoAnnotation>>({
    timestamp: '',
    type: 'highlight',
    description: '',
    players: []
  });

  const annotationTypes = [
    { value: 'goal', label: 'Gol', color: 'bg-green-500' },
    { value: 'foul', label: 'Falta', color: 'bg-yellow-500' },
    { value: 'card', label: 'Cartão', color: 'bg-red-500' },
    { value: 'substitution', label: 'Substituição', color: 'bg-blue-500' },
    { value: 'tactical', label: 'Tático', color: 'bg-purple-500' },
    { value: 'highlight', label: 'Lance', color: 'bg-orange-500' }
  ];

  // Lista simulada de jogadores disponíveis
  const availablePlayers = [
    'João Silva', 'Carlos Santos', 'Pedro Oliveira', 'Lucas Costa', 'Rafael Lima',
    'Gabriel Silva', 'André Santos', 'Diego Costa', 'Marcos Paulo', 'Felipe Ramos'
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.result.includes(searchTerm) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && video.annotations.some(ann => ann.type === filterType);
  });

  const handleSaveVideo = () => {
    if (isEditingVideo && selectedVideo) {
      setVideos(videos.map(v => v.id === selectedVideo.id ? selectedVideo : v));
      setIsEditingVideo(false);
    } else {
      const videoToAdd: MatchVideo = {
        ...newVideo,
        id: Date.now().toString(),
        matchId: Date.now().toString(),
        annotations: [],
        tags: typeof newVideo.tags === 'string' ? newVideo.tags.split(',').map(t => t.trim()) : [],
        uploadedBy: 'Analista Técnico',
        uploadedAt: new Date().toISOString().split('T')[0]
      } as MatchVideo;
      setVideos([...videos, videoToAdd]);
      setIsAddingVideo(false);
    }
    setSelectedVideo(null);
    setNewVideo({
      opponent: '',
      date: '',
      result: '',
      videoUrl: '',
      duration: '',
      quality: 'FHD',
      annotations: [],
      tags: [],
      notes: ''
    });
  };

  const handleAddAnnotation = () => {
    if (selectedVideo && newAnnotation.timestamp && newAnnotation.description) {
      const annotationToAdd: VideoAnnotation = {
        ...newAnnotation,
        id: Date.now().toString(),
        players: newAnnotation.players || []
      } as VideoAnnotation;

      const updatedVideo = {
        ...selectedVideo,
        annotations: [...selectedVideo.annotations, annotationToAdd].sort((a, b) => {
          const timeA = a.timestamp.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
          const timeB = b.timestamp.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
          return timeA - timeB;
        })
      };

      setSelectedVideo(updatedVideo);
      setVideos(videos.map(v => v.id === selectedVideo.id ? updatedVideo : v));
      setIsAddingAnnotation(false);
      setNewAnnotation({
        timestamp: '',
        type: 'highlight',
        description: '',
        players: []
      });
    }
  };

  const removeAnnotation = (annotationId: string) => {
    if (selectedVideo) {
      const updatedVideo = {
        ...selectedVideo,
        annotations: selectedVideo.annotations.filter(ann => ann.id !== annotationId)
      };
      setSelectedVideo(updatedVideo);
      setVideos(videos.map(v => v.id === selectedVideo.id ? updatedVideo : v));
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = annotationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.label : type;
  };

  const getTypeColor = (type: string) => {
    const typeConfig = annotationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'bg-gray-500';
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (videoUrl: string) => {
    const videoId = extractVideoId(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Análise de Vídeos</h2>
          <p className="text-muted-foreground">
            Gerencie vídeos das partidas e crie anotações detalhadas
          </p>
        </div>
        <Dialog open={isAddingVideo} onOpenChange={setIsAddingVideo}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Vídeo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Vídeo da Partida</DialogTitle>
              <DialogDescription>
                Adicione um vídeo do YouTube e configure as informações da partida para análise posterior.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Adversário *</Label>
                  <Input
                    value={newVideo.opponent || ''}
                    onChange={(e) => setNewVideo({...newVideo, opponent: e.target.value})}
                    placeholder="Nome do adversário"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Input
                    type="date"
                    value={newVideo.date || ''}
                    onChange={(e) => setNewVideo({...newVideo, date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Resultado *</Label>
                  <Input
                    value={newVideo.result || ''}
                    onChange={(e) => setNewVideo({...newVideo, result: e.target.value})}
                    placeholder="Ex: 2-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Qualidade</Label>
                  <Select
                    value={newVideo.quality || 'FHD'}
                    onValueChange={(value: 'HD' | 'FHD' | '4K') => setNewVideo({...newVideo, quality: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HD">HD (720p)</SelectItem>
                      <SelectItem value="FHD">Full HD (1080p)</SelectItem>
                      <SelectItem value="4K">4K (2160p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Duração</Label>
                  <Input
                    value={newVideo.duration || ''}
                    onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                    placeholder="Ex: 1:45:30"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>URL do Vídeo (YouTube) *</Label>
                <Input
                  value={newVideo.videoUrl || ''}
                  onChange={(e) => setNewVideo({...newVideo, videoUrl: e.target.value})}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tags (separadas por vírgula)</Label>
                <Input
                  value={Array.isArray(newVideo.tags) ? newVideo.tags.join(', ') : newVideo.tags || ''}
                  onChange={(e) => setNewVideo({...newVideo, tags: e.target.value})}
                  placeholder="Ex: vitória, bom desempenho, gols importantes"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  value={newVideo.notes || ''}
                  onChange={(e) => setNewVideo({...newVideo, notes: e.target.value})}
                  placeholder="Observações sobre o vídeo e a partida..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingVideo(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveVideo}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Vídeo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por adversário, resultado ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {annotationTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de vídeos */}
      <div className="grid gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Thumbnail do vídeo */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-32 bg-muted rounded-lg relative overflow-hidden">
                    {getThumbnailUrl(video.videoUrl) ? (
                      <img
                        src={getThumbnailUrl(video.videoUrl)!}
                        alt={`Thumbnail ${video.opponent}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Informações do vídeo */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{video.opponent}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{new Date(video.date).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span>{video.result}</span>
                        <span>•</span>
                        <span>{video.quality}</span>
                        {video.duration && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {video.duration}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Tags */}
                      <div className="flex gap-2 mb-3">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Anotações resumo */}
                      <p className="text-sm text-muted-foreground mb-2">
                        {video.annotations.length} anotação(ões) • 
                        Por {video.uploadedBy}
                      </p>
                      
                      {video.notes && (
                        <p className="text-sm line-clamp-2">{video.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(video.videoUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Assistir
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedVideo(video);
                          setIsEditingVideo(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setSelectedVideo(video)}
                      >
                        Ver Anotações
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de visualização de anotações */}
      {selectedVideo && !isEditingVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Anotações: {selectedVideo.opponent} - {selectedVideo.result}
              </DialogTitle>
              <DialogDescription>
                Visualize e gerencie as anotações de momentos importantes da partida.
              </DialogDescription>
            </DialogHeader>

            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Anotações da Partida</h4>
                <Dialog open={isAddingAnnotation} onOpenChange={setIsAddingAnnotation}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Anotação
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Anotação</DialogTitle>
                      <DialogDescription>
                        Marque um momento específico do vídeo com uma anotação detalhada.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tempo (MM:SS) *</Label>
                          <Input
                            value={newAnnotation.timestamp || ''}
                            onChange={(e) => setNewAnnotation({...newAnnotation, timestamp: e.target.value})}
                            placeholder="Ex: 15:30"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Tipo *</Label>
                          <Select
                            value={newAnnotation.type || 'highlight'}
                            onValueChange={(value: any) => setNewAnnotation({...newAnnotation, type: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {annotationTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Descrição *</Label>
                        <Textarea
                          value={newAnnotation.description || ''}
                          onChange={(e) => setNewAnnotation({...newAnnotation, description: e.target.value})}
                          placeholder="Descreva o que aconteceu neste momento..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Jogadores Envolvidos</Label>
                        <Select
                          onValueChange={(value) => {
                            const currentPlayers = newAnnotation.players || [];
                            if (!currentPlayers.includes(value)) {
                              setNewAnnotation({
                                ...newAnnotation,
                                players: [...currentPlayers, value]
                              });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Adicionar jogador" />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePlayers.map(player => (
                              <SelectItem key={player} value={player}>
                                {player}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {newAnnotation.players && newAnnotation.players.length > 0 && (
                          <div className="flex gap-2 flex-wrap mt-2">
                            {newAnnotation.players.map((player, index) => (
                              <Badge key={index} variant="secondary">
                                {player}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-auto p-0 ml-2"
                                  onClick={() => {
                                    const updatedPlayers = newAnnotation.players?.filter(p => p !== player) || [];
                                    setNewAnnotation({...newAnnotation, players: updatedPlayers});
                                  }}
                                >
                                  ×
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddingAnnotation(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddAnnotation}>
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Lista de anotações */}
              <div className="space-y-4">
                {selectedVideo.annotations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma anotação encontrada. Adicione a primeira anotação!
                  </p>
                ) : (
                  selectedVideo.annotations.map((annotation) => (
                    <Card key={annotation.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center gap-2">
                              <Badge className={`${getTypeColor(annotation.type)} text-white`}>
                                {getTypeIcon(annotation.type)}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="w-3 h-3 mr-1" />
                                {annotation.timestamp}
                              </Badge>
                            </div>
                            
                            <div className="flex-1">
                              <p className="font-medium mb-1">{annotation.description}</p>
                              {annotation.players && annotation.players.length > 0 && (
                                <p className="text-sm text-muted-foreground">
                                  Jogadores: {annotation.players.join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeAnnotation(annotation.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}