import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar, Plus, Clock, Users, Target, Edit, Trash2, Copy } from 'lucide-react';

interface TrainingScheduleProps {
  user: any;
}

interface Training {
  id: number;
  numero: string;
  data: string;
  horario: string;
  numeroJogadores: number;
  mesociclo: number;
  microciclo: number;
  macrociclo: number;
  objetivo: string;
  categoria: string;
  status: 'agendado' | 'realizado' | 'cancelado';
}

export function TrainingSchedule({ user }: TrainingScheduleProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  // Verifica se o usuário pode editar treinos de uma categoria específica
  const canEditCategory = (categoria: string) => {
    // Gerentes e supervisores têm acesso total
    if (user.role === 'gerente' || user.role === 'supervisor') {
      return true;
    }
    
    // Treinadores só podem editar sua própria categoria
    if (user.role === 'treinador') {
      return user.category === categoria || user.category === 'todas';
    }
    
    return false;
  };

  // Verifica se o usuário pode criar novos treinos
  const canCreateTraining = () => {
    return user.role === 'gerente' || user.role === 'supervisor' || user.role === 'treinador';
  };
  
  // Dados simulados de treinamentos
  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: 1,
      numero: 'T001',
      data: '2024-01-29',
      horario: '09:00',
      numeroJogadores: 22,
      mesociclo: 2,
      microciclo: 1,
      macrociclo: 1,
      objetivo: 'Trabalho técnico - passe e domínio',
      categoria: 'Profissional',
      status: 'agendado'
    },
    {
      id: 2,
      numero: 'T002',
      data: '2024-01-30',
      horario: '15:30',
      numeroJogadores: 20,
      mesociclo: 2,
      microciclo: 1,
      macrociclo: 1,
      objetivo: 'Trabalho físico - resistência aeróbica',
      categoria: 'Profissional',
      status: 'agendado'
    },
    {
      id: 3,
      numero: 'T003',
      data: '2024-01-31',
      horario: '10:00',
      numeroJogadores: 18,
      mesociclo: 1,
      microciclo: 3,
      macrociclo: 1,
      objetivo: 'Trabalho tático - organização defensiva',
      categoria: 'Sub-20',
      status: 'realizado'
    }
  ]);

  const [formData, setFormData] = useState({
    numero: '',
    data: '',
    horario: '',
    numeroJogadores: '',
    mesociclo: '',
    microciclo: '',
    macrociclo: '',
    objetivo: '',
    categoria: user.category === 'todas' ? 'Profissional' : user.category
  });

  function getCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split('T')[0];
  }

  function getWeekDates(startDate: string) {
    const start = new Date(startDate);
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }

  const weekDates = getWeekDates(selectedWeek);
  
  const filteredTrainings = trainings.filter(training => {
    const isInWeek = weekDates.includes(training.data);
    
    // Gerentes e supervisores veem todos os treinos
    if (user.role === 'gerente' || user.role === 'supervisor') {
      return isInWeek;
    }
    
    // Treinadores veem apenas treinos de sua categoria
    if (user.role === 'treinador') {
      if (user.category === 'todas') {
        return isInWeek;
      }
      return isInWeek && training.categoria === user.category;
    }
    
    // Outros roles (preparador físico, auxiliar técnico) veem apenas de sua categoria
    return isInWeek && training.categoria === user.category;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica se o usuário tem permissão para criar/editar treino nesta categoria
    if (!canEditCategory(formData.categoria)) {
      alert('Você não tem permissão para editar treinos desta categoria.');
      return;
    }
    
    const newTraining: Training = {
      id: editingTraining ? editingTraining.id : Date.now(),
      numero: formData.numero,
      data: formData.data,
      horario: formData.horario,
      numeroJogadores: parseInt(formData.numeroJogadores),
      mesociclo: parseInt(formData.mesociclo),
      microciclo: parseInt(formData.microciclo),
      macrociclo: parseInt(formData.macrociclo),
      objetivo: formData.objetivo,
      categoria: formData.categoria,
      status: 'agendado'
    };

    if (editingTraining) {
      setTrainings(prev => prev.map(t => t.id === editingTraining.id ? newTraining : t));
    } else {
      setTrainings(prev => [...prev, newTraining]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      numero: '',
      data: '',
      horario: '',
      numeroJogadores: '',
      mesociclo: '',
      microciclo: '',
      macrociclo: '',
      objetivo: '',
      categoria: user.category === 'todas' ? 'Profissional' : user.category
    });
    setEditingTraining(null);
  };

  const handleEdit = (training: Training) => {
    // Verifica se o usuário tem permissão para editar este treino
    if (!canEditCategory(training.categoria)) {
      alert('Você não tem permissão para editar treinos desta categoria.');
      return;
    }
    
    setFormData({
      numero: training.numero,
      data: training.data,
      horario: training.horario,
      numeroJogadores: training.numeroJogadores.toString(),
      mesociclo: training.mesociclo.toString(),
      microciclo: training.microciclo.toString(),
      macrociclo: training.macrociclo.toString(),
      objetivo: training.objetivo,
      categoria: training.categoria
    });
    setEditingTraining(training);
    setIsDialogOpen(true);
  };

  const handleDelete = (training: Training) => {
    // Verifica se o usuário tem permissão para deletar este treino
    if (!canEditCategory(training.categoria)) {
      alert('Você não tem permissão para deletar treinos desta categoria.');
      return;
    }
    
    if (confirm('Tem certeza que deseja deletar este treino?')) {
      setTrainings(prev => prev.filter(t => t.id !== training.id));
    }
  };

  const handleDuplicate = (training: Training) => {
    // Verifica se o usuário tem permissão para duplicar este treino
    if (!canEditCategory(training.categoria)) {
      alert('Você não tem permissão para duplicar treinos desta categoria.');
      return;
    }
    
    setFormData({
      numero: `${training.numero}_COPY`,
      data: '',
      horario: training.horario,
      numeroJogadores: training.numeroJogadores.toString(),
      mesociclo: training.mesociclo.toString(),
      microciclo: training.microciclo.toString(),
      macrociclo: training.macrociclo.toString(),
      objetivo: training.objetivo,
      categoria: training.categoria
    });
    setIsDialogOpen(true);
  };

  const changeWeek = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedWeek);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newDate.toISOString().split('T')[0]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'realizado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDayName = (date: string) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[new Date(date).getDay()];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Agendamento de Treinamentos</h2>
          <p className="text-muted-foreground">
            Planeje e organize os treinamentos da semana
          </p>
          {user.role === 'treinador' && user.category && user.category !== 'todas' && (
            <p className="text-sm text-blue-600 mt-1">
              Você pode editar apenas treinamentos da categoria: <strong>{user.category}</strong>
            </p>
          )}
        </div>
        
        {canCreateTraining() && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Treino
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTraining ? 'Editar Treino' : 'Agendar Novo Treino'}
              </DialogTitle>
              <DialogDescription>
                {editingTraining ? 'Modifique os dados do treino selecionado.' : 'Agende um novo treino definindo todos os parâmetros necessários.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero">Número do Treino</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                    placeholder="Ex: T001"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select 
                    value={formData.categoria} 
                    onValueChange={(value) => setFormData({...formData, categoria: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {(user.role === 'gerente' || user.role === 'supervisor' || user.category === 'todas') ? (
                        <>
                          <SelectItem value="Profissional">Profissional</SelectItem>
                          <SelectItem value="Sub-20">Sub-20</SelectItem>
                          <SelectItem value="Sub-17">Sub-17</SelectItem>
                          <SelectItem value="Sub-15">Sub-15</SelectItem>
                        </>
                      ) : (
                        <SelectItem value={user.category}>{user.category}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="horario">Horário</Label>
                  <Input
                    id="horario"
                    type="time"
                    value={formData.horario}
                    onChange={(e) => setFormData({...formData, horario: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroJogadores">Número de Jogadores</Label>
                  <Input
                    id="numeroJogadores"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.numeroJogadores}
                    onChange={(e) => setFormData({...formData, numeroJogadores: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="macrociclo">Macrociclo</Label>
                  <Input
                    id="macrociclo"
                    type="number"
                    min="1"
                    value={formData.macrociclo}
                    onChange={(e) => setFormData({...formData, macrociclo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mesociclo">Mesociclo</Label>
                  <Input
                    id="mesociclo"
                    type="number"
                    min="1"
                    value={formData.mesociclo}
                    onChange={(e) => setFormData({...formData, mesociclo: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="microciclo">Microciclo</Label>
                  <Input
                    id="microciclo"
                    type="number"
                    min="1"
                    value={formData.microciclo}
                    onChange={(e) => setFormData({...formData, microciclo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="objetivo">Objetivo do Treino</Label>
                <Textarea
                  id="objetivo"
                  value={formData.objetivo}
                  onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                  placeholder="Descreva o objetivo e foco principal do treino..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTraining ? 'Atualizar' : 'Agendar'} Treino
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        )}
      </div>

      {/* Seletor de semana */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => changeWeek('prev')}>
              ← Semana Anterior
            </Button>
            
            <div className="text-center">
              <p className="font-medium">
                Semana de {new Date(selectedWeek).toLocaleDateString('pt-BR')} a{' '}
                {new Date(weekDates[6]).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-muted-foreground">
                {filteredTrainings.length} treino(s) agendado(s)
                {user.role === 'treinador' && user.category !== 'todas' && (
                  <span className="ml-2">
                    • {filteredTrainings.filter(t => canEditCategory(t.categoria)).length} editáveis
                  </span>
                )}
              </p>
            </div>
            
            <Button variant="outline" onClick={() => changeWeek('next')}>
              Próxima Semana →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid da semana */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const dayTrainings = filteredTrainings.filter(t => t.data === date);
          const isToday = date === new Date().toISOString().split('T')[0];
          
          return (
            <Card key={date} className={isToday ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader className="p-3">
                <div className="text-center">
                  <p className="text-sm font-medium">{getDayName(date)}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit' 
                    })}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {dayTrainings.length > 0 ? (
                  dayTrainings.map((training) => (
                    <div 
                      key={training.id} 
                      className="p-2 bg-accent rounded-lg border"
                    >
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <div className="flex gap-1">
                          <Badge variant="outline" className="text-xs">
                            {training.numero}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {training.categoria}
                          </Badge>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {canEditCategory(training.categoria) ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => handleEdit(training)}
                                title="Editar treino"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => handleDuplicate(training)}
                                title="Duplicar treino"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => handleDelete(training)}
                                title="Deletar treino"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <Badge variant="secondary" className="text-xs px-2">
                              👁️ Visualização
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{training.horario}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{training.numeroJogadores} jogadores</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs">
                          <Target className="h-3 w-3" />
                          <span className="text-xs">
                            Macro {training.macrociclo} | Meso {training.mesociclo} | Micro {training.microciclo}
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {training.objetivo}
                        </p>
                        
                        <Badge className={`text-xs ${getStatusColor(training.status)}`}>
                          {training.status === 'agendado' && 'Agendado'}
                          {training.status === 'realizado' && 'Realizado'}
                          {training.status === 'cancelado' && 'Cancelado'}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Nenhum treino agendado
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo dos ciclos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Macrociclo Atual</p>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Temporada 2024</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mesociclo Atual</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Preparação</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Microciclo Atual</p>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Semana 1</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}