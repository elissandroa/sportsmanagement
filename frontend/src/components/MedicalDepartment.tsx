import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Heart, Plus, AlertTriangle, Calendar, Activity, FileText, Clock } from 'lucide-react';

interface MedicalDepartmentProps {
  user: any;
}

export function MedicalDepartment({ user }: MedicalDepartmentProps) {
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const injuredAthletes = [
    {
      id: 1,
      name: 'João Silva',
      category: 'Profissional',
      position: 'Atacante',
      injury: 'Lesão muscular na coxa',
      severity: 'Moderada',
      injuryDate: '2024-01-15',
      estimatedReturn: '2024-02-10',
      recoveryProgress: 65,
      status: 'Em recuperação',
      treatment: 'Fisioterapia diária',
      doctor: 'Dr. Carlos Mendes'
    },
    {
      id: 2,
      name: 'Carlos Santos',
      category: 'Sub-20',
      position: 'Meio-campo',
      injury: 'Entorse no tornozelo',
      severity: 'Leve',
      injuryDate: '2024-01-20',
      estimatedReturn: '2024-01-30',
      recoveryProgress: 90,
      status: 'Retorno iminente',
      treatment: 'Fortalecimento',
      doctor: 'Dr. Ana Silva'
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      category: 'Sub-17',
      position: 'Zagueiro',
      injury: 'Contusão no joelho',
      severity: 'Grave',
      injuryDate: '2024-01-05',
      estimatedReturn: '2024-03-15',
      recoveryProgress: 30,
      status: 'Início da recuperação',
      treatment: 'Repouso e anti-inflamatórios',
      doctor: 'Dr. Carlos Mendes'
    }
  ];

  const medicalHistory = [
    {
      id: 1,
      athleteId: 1,
      date: '2024-01-15',
      type: 'Lesão',
      description: 'Lesão muscular na coxa durante treino',
      severity: 'Moderada',
      treatment: 'Fisioterapia, repouso relativo',
      status: 'Ativo'
    },
    {
      id: 2,
      athleteId: 1,
      date: '2023-11-10',
      type: 'Exame',
      description: 'Exame médico de rotina',
      severity: 'Normal',
      treatment: 'Nenhum',
      status: 'Concluído'
    },
    {
      id: 3,
      athleteId: 2,
      date: '2024-01-20',
      type: 'Lesão',
      description: 'Entorse no tornozelo direito',
      severity: 'Leve',
      treatment: 'Gelo, compressão, elevação',
      status: 'Ativo'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      athleteName: 'João Silva',
      date: '2024-01-26',
      time: '09:00',
      type: 'Fisioterapia',
      doctor: 'Dr. Carlos Mendes'
    },
    {
      id: 2,
      athleteName: 'Carlos Santos',
      date: '2024-01-26',
      time: '14:00',
      type: 'Avaliação de retorno',
      doctor: 'Dr. Ana Silva'
    },
    {
      id: 3,
      athleteName: 'Pedro Oliveira',
      date: '2024-01-27',
      time: '10:30',
      type: 'Ressonância magnética',
      doctor: 'Dr. Roberto Lima'
    }
  ];

  const filteredInjuredAthletes = injuredAthletes.filter(athlete => {
    if (user.role === 'gerente' || user.role === 'medico') return true;
    if (user.category === 'todas') return true;
    return athlete.category.toLowerCase().includes(user.category.toLowerCase());
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'leve': return 'bg-yellow-500';
      case 'moderada': return 'bg-orange-500';
      case 'grave': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'retorno iminente': return 'text-green-600';
      case 'em recuperação': return 'text-blue-600';
      case 'início da recuperação': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const InjuredAthleteCard = ({ athlete }: { athlete: any }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{athlete.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{athlete.position} - {athlete.category}</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${getSeverityColor(athlete.severity)}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm">{athlete.injury}</p>
            <p className={`text-sm ${getStatusColor(athlete.status)}`}>{athlete.status}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso da recuperação</span>
              <span>{athlete.recoveryProgress}%</span>
            </div>
            <Progress value={athlete.recoveryProgress} className="h-2" />
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Lesão: {new Date(athlete.injuryDate).toLocaleDateString('pt-BR')}</p>
            <p>Retorno previsto: {new Date(athlete.estimatedReturn).toLocaleDateString('pt-BR')}</p>
            <p>Médico: {athlete.doctor}</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSelectedAthlete(athlete)}
              >
                Ver Histórico Médico
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Histórico Médico - {athlete.name}</DialogTitle>
                <DialogDescription>
                  Visualize o histórico médico completo do atleta, incluindo lesões atuais e anteriores.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="current">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="current">Lesão Atual</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                  <TabsTrigger value="appointments">Consultas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Informações da Lesão Atual</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Tipo de Lesão</Label>
                          <p className="font-medium">{athlete.injury}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Gravidade</Label>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getSeverityColor(athlete.severity)}`} />
                            <span className="font-medium">{athlete.severity}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Data da Lesão</Label>
                          <p className="font-medium">{new Date(athlete.injuryDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Retorno Previsto</Label>
                          <p className="font-medium">{new Date(athlete.estimatedReturn).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-muted-foreground">Tratamento Atual</Label>
                        <p className="font-medium">{athlete.treatment}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-muted-foreground">Progresso da Recuperação</Label>
                        <div className="space-y-2">
                          <Progress value={athlete.recoveryProgress} className="h-3" />
                          <p className="text-sm text-muted-foreground">{athlete.recoveryProgress}% concluído</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-muted-foreground">Médico Responsável</Label>
                        <p className="font-medium">{athlete.doctor}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-3">
                    {medicalHistory
                      .filter(record => record.athleteId === athlete.id)
                      .map((record) => (
                        <Card key={record.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{record.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(record.date).toLocaleDateString('pt-BR')} - {record.type}
                                </p>
                              </div>
                              <Badge 
                                variant={record.status === 'Ativo' ? 'default' : 'secondary'}
                              >
                                {record.status}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <p><span className="text-muted-foreground">Gravidade:</span> {record.severity}</p>
                              <p><span className="text-muted-foreground">Tratamento:</span> {record.treatment}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="appointments" className="space-y-4">
                  <div className="space-y-3">
                    {upcomingAppointments
                      .filter(appointment => appointment.athleteName === athlete.name)
                      .map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{appointment.type}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Médico: {appointment.doctor}
                                </p>
                              </div>
                              <Calendar className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Departamento Médico</h2>
          <p className="text-muted-foreground">
            Acompanhamento médico dos atletas
          </p>
        </div>
        
        {(user.role === 'gerente' || user.role === 'medico') && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Ocorrência
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Nova Ocorrência Médica</DialogTitle>
                <DialogDescription>
                  Registre uma nova ocorrência médica para um atleta, incluindo detalhes da lesão ou problema.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Atleta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar atleta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="carlos">Carlos Santos</SelectItem>
                      <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lesao">Lesão</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="cirurgia">Cirurgia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gravidade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Gravidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leve">Leve</SelectItem>
                        <SelectItem value="moderada">Moderada</SelectItem>
                        <SelectItem value="grave">Grave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descrição detalhada da ocorrência" />
                </div>
                <div className="space-y-2">
                  <Label>Tratamento Prescrito</Label>
                  <Textarea placeholder="Tratamento recomendado" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data da Ocorrência</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Previsão de Retorno</Label>
                    <Input type="date" />
                  </div>
                </div>
                <Button className="w-full">Registrar Ocorrência</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Estatísticas médicas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atletas Lesionados</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredInjuredAthletes.length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retorno Iminente</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredInjuredAthletes.filter(a => a.status === 'Retorno iminente').length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consultas Hoje</p>
                <p className="text-2xl font-bold text-blue-600">
                  {upcomingAppointments.filter(a => a.date === '2024-01-26').length}
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
                <p className="text-sm text-muted-foreground">Lesões Graves</p>
                <p className="text-2xl font-bold text-orange-600">
                  {filteredInjuredAthletes.filter(a => a.severity === 'Grave').length}
                </p>
              </div>
              <Heart className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atletas lesionados */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Atletas Lesionados</h3>
          <div className="space-y-4">
            {filteredInjuredAthletes.map((athlete) => (
              <InjuredAthleteCard key={athlete.id} athlete={athlete} />
            ))}
            {filteredInjuredAthletes.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum atleta lesionado no momento</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Próximas consultas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Próximas Consultas</h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.athleteName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Dr. {appointment.doctor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}