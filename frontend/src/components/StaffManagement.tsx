import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { UserCog, Plus, Users, Shield, Settings, Eye, DollarSign, FileText, Briefcase, Edit } from 'lucide-react';

interface StaffManagementProps {
  user: any;
}

export function StaffManagement({ user }: StaffManagementProps) {
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [newStaffDialogOpen, setNewStaffDialogOpen] = useState(false);
  const [editContractDialogOpen, setEditContractDialogOpen] = useState(false);

  const staff = [
    {
      id: 1,
      name: 'Carlos Mendes',
      email: 'carlos.mendes@hopefc.com',
      role: 'treinador',
      category: 'Profissional',
      permissions: {
        athletes: true,
        matches: true,
        competitions: true,
        medical: false,
        pse: false,
        materials: false,
        opponents: true
      },
      active: true,
      joinDate: '2023-01-15',
      phone: '(11) 99999-1234',
      salary: 25000,
      contractType: 'CLT',
      allowances: [
        { type: 'Transporte', amount: 800, frequency: 'Mensal' },
        { type: 'Alimentação', amount: 600, frequency: 'Mensal' }
      ]
    },
    {
      id: 2,
      name: 'Ana Silva',
      email: 'ana.silva@hopefc.com',
      role: 'medico',
      category: 'Todas',
      permissions: {
        athletes: true,
        matches: false,
        competitions: false,
        medical: true,
        pse: false,
        materials: false,
        opponents: false
      },
      active: true,
      joinDate: '2023-03-10',
      phone: '(11) 99999-5678',
      salary: 18000,
      contractType: 'CLT',
      allowances: [
        { type: 'Transporte', amount: 600, frequency: 'Mensal' }
      ]
    },
    {
      id: 3,
      name: 'Roberto Lima',
      email: 'roberto.lima@hopefc.com',
      role: 'preparador_fisico',
      category: 'Sub-20',
      permissions: {
        athletes: true,
        matches: false,
        competitions: false,
        medical: false,
        pse: true,
        materials: false,
        opponents: false
      },
      active: true,
      joinDate: '2023-02-20',
      phone: '(11) 99999-9012',
      salary: 12000,
      contractType: 'PJ',
      allowances: []
    },
    {
      id: 4,
      name: 'Marina Costa',
      email: 'marina.costa@hopefc.com',
      role: 'auxiliar_tecnico',
      category: 'Sub-17',
      permissions: {
        athletes: true,
        matches: true,
        competitions: false,
        medical: false,
        pse: false,
        materials: false,
        opponents: false
      },
      active: true,
      joinDate: '2023-04-05',
      phone: '(11) 99999-3456',
      salary: 8000,
      contractType: 'MEI',
      allowances: [
        { type: 'Moradia', amount: 1200, frequency: 'Mensal' }
      ]
    },
    {
      id: 5,
      name: 'João Supervisor',
      email: 'joao.supervisor@hopefc.com',
      role: 'supervisor',
      category: 'Todas',
      permissions: {
        athletes: true,
        matches: true,
        competitions: true,
        medical: true,
        pse: true,
        materials: true,
        opponents: true
      },
      active: true,
      joinDate: '2022-08-01',
      phone: '(11) 99999-7890',
      salary: 22000,
      contractType: 'CLT',
      allowances: [
        { type: 'Transporte', amount: 1000, frequency: 'Mensal' },
        { type: 'Alimentação', amount: 800, frequency: 'Mensal' }
      ]
    }
  ];

  const getRoleLabel = (role: string) => {
    const roles: { [key: string]: string } = {
      'treinador': 'Treinador',
      'preparador_fisico': 'Preparador Físico',
      'auxiliar_tecnico': 'Auxiliar Técnico',
      'medico': 'Médico',
      'gerente': 'Gerente',
      'supervisor': 'Supervisor',
      'nutricionista': 'Nutricionista',
      'fisioterapeuta': 'Fisioterapeuta',
      'analista': 'Analista'
    };
    return roles[role] || role;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'gerente': return 'bg-purple-100 text-purple-800';
      case 'supervisor': return 'bg-blue-100 text-blue-800';
      case 'treinador': return 'bg-green-100 text-green-800';
      case 'preparador_fisico': return 'bg-orange-100 text-orange-800';
      case 'auxiliar_tecnico': return 'bg-yellow-100 text-yellow-800';
      case 'medico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeBadge = (type: string) => {
    switch (type) {
      case 'CLT':
        return <Badge className="bg-blue-500">CLT</Badge>;
      case 'PJ':
        return <Badge className="bg-purple-500">PJ</Badge>;
      case 'MEI':
        return <Badge className="bg-green-500">MEI</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getPermissionLabel = (permission: string) => {
    const labels: { [key: string]: string } = {
      'athletes': 'Atletas',
      'matches': 'Partidas',
      'competitions': 'Competições',
      'medical': 'Dep. Médico',
      'pse': 'PSE/PSR',
      'materials': 'Materiais',
      'opponents': 'Adversários'
    };
    return labels[permission] || permission;
  };

  const getTotalAllowances = (member: any) => {
    return member.allowances?.reduce((sum: number, allowance: any) => sum + allowance.amount, 0) || 0;
  };

  const StaffCard = ({ member }: { member: any }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={getRoleColor(member.role)}>
              {getRoleLabel(member.role)}
            </Badge>
            {member.active ? (
              <Badge variant="outline" className="text-green-600">Ativo</Badge>
            ) : (
              <Badge variant="outline" className="text-red-600">Inativo</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Informações Financeiras */}
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                  Salário
                </span>
              </div>
              {getContractTypeBadge(member.contractType)}
            </div>
            <p className="text-xl font-bold text-green-700 dark:text-green-300">
              R$ {member.salary?.toLocaleString('pt-BR')}
            </p>
            {member.allowances && member.allowances.length > 0 && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                + R$ {getTotalAllowances(member).toLocaleString('pt-BR')} (ajudas de custo)
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Categoria de Acesso</p>
            <p className="font-medium">{member.category}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Permissões</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(member.permissions)
                .filter(([_, hasPermission]) => hasPermission)
                .map(([permission, _]) => (
                  <Badge key={permission} variant="secondary" className="text-xs">
                    {getPermissionLabel(permission)}
                  </Badge>
                ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Ingresso: {new Date(member.joinDate).toLocaleDateString('pt-BR')}</p>
            <p>Telefone: {member.phone}</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSelectedStaff(member)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Gerenciar Colaborador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Gerenciar Colaborador - {member.name}</DialogTitle>
                <DialogDescription>
                  Gerencie as informações, permissões e dados contratuais do colaborador.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="contract">Dados Contratuais</TabsTrigger>
                  <TabsTrigger value="permissions">Permissões</TabsTrigger>
                </TabsList>
                
                {/* ABA: INFORMAÇÕES */}
                <TabsContent value="info" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Nome</Label>
                          <p className="font-medium">{member.name}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">E-mail</Label>
                          <p className="font-medium">{member.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Função</Label>
                          <Badge className={getRoleColor(member.role)}>
                            {getRoleLabel(member.role)}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Categoria</Label>
                          <p className="font-medium">{member.category}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Telefone</Label>
                          <p className="font-medium">{member.phone}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Data de Ingresso</Label>
                          <p className="font-medium">{new Date(member.joinDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Editar Informações
                        </Button>
                        <Button 
                          variant={member.active ? "destructive" : "default"} 
                          className="flex-1"
                        >
                          {member.active ? "Desativar" : "Ativar"} Usuário
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ABA: DADOS CONTRATUAIS */}
                <TabsContent value="contract" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Informações Contratuais</CardTitle>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditContractDialogOpen(true)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Tipo de Contrato e Salário */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            <Label className="text-sm text-blue-800 dark:text-blue-200">
                              Tipo de Contrato
                            </Label>
                          </div>
                          {getContractTypeBadge(member.contractType)}
                          <p className="text-xs text-muted-foreground mt-2">
                            {member.contractType === 'CLT' ? 'Consolidação das Leis do Trabalho' :
                             member.contractType === 'PJ' ? 'Pessoa Jurídica' :
                             'Microempreendedor Individual'}
                          </p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <Label className="text-sm text-green-800 dark:text-green-200">
                              Salário Mensal
                            </Label>
                          </div>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                            R$ {member.salary?.toLocaleString('pt-BR')}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Pagamento mensal
                          </p>
                        </div>
                      </div>

                      {/* Ajudas de Custo */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-semibold">Ajudas de Custo</Label>
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3 mr-1" />
                            Adicionar
                          </Button>
                        </div>

                        {member.allowances && member.allowances.length > 0 ? (
                          <div className="space-y-2">
                            {member.allowances.map((allowance: any, index: number) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-3 border rounded-lg bg-orange-50 dark:bg-orange-950"
                              >
                                <div>
                                  <p className="font-medium text-sm">{allowance.type}</p>
                                  <p className="text-xs text-muted-foreground">{allowance.frequency}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-orange-700 dark:text-orange-300">
                                    R$ {allowance.amount.toLocaleString('pt-BR')}
                                  </p>
                                  <Button size="sm" variant="ghost" className="h-6 text-xs mt-1">
                                    Remover
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-between items-center pt-2 border-t">
                              <span className="text-sm font-semibold">Total de Ajudas</span>
                              <span className="text-lg font-bold text-orange-600">
                                R$ {getTotalAllowances(member).toLocaleString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-6 border-2 border-dashed rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Nenhuma ajuda de custo cadastrada
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Resumo Financeiro */}
                      <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20">
                        <Label className="text-sm font-semibold">Resumo Financeiro Mensal</Label>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Salário Base</span>
                            <span className="font-semibold">R$ {member.salary?.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Ajudas de Custo</span>
                            <span className="font-semibold">R$ {getTotalAllowances(member).toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="font-bold">Total</span>
                            <span className="text-xl font-bold text-primary">
                              R$ {(member.salary + getTotalAllowances(member)).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* ABA: PERMISSÕES */}
                <TabsContent value="permissions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Controle de Acesso aos Recursos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(member.permissions).map(([permission, hasAccess]) => (
                        <div key={permission} className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">
                              {getPermissionLabel(permission)}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Acesso ao módulo de {getPermissionLabel(permission).toLowerCase()}
                            </p>
                          </div>
                          <Switch 
                            checked={hasAccess as boolean}
                            disabled={member.role === 'gerente' || member.role === 'supervisor'}
                          />
                        </div>
                      ))}
                      
                      {(member.role === 'gerente' || member.role === 'supervisor') && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <Shield className="w-4 h-4 inline mr-2" />
                            Gerentes e supervisores têm acesso total ao sistema.
                          </p>
                        </div>
                      )}
                      
                      <div className="pt-4">
                        <Button className="w-full">Salvar Permissões</Button>
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <UserCog className="w-6 h-6" />
            Gestão de Colaboradores
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie a equipe técnica, staff e suas permissões de acesso
          </p>
        </div>
        <Button onClick={() => setNewStaffDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Colaborador
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total de Colaboradores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{staff.length}</p>
            <p className="text-xs text-muted-foreground">
              {staff.filter(s => s.active).length} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Folha de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              R$ {staff.reduce((sum, s) => sum + s.salary, 0).toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">Total mensal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Tipos de Contrato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge className="bg-blue-500">
                {staff.filter(s => s.contractType === 'CLT').length} CLT
              </Badge>
              <Badge className="bg-purple-500">
                {staff.filter(s => s.contractType === 'PJ').length} PJ
              </Badge>
              <Badge className="bg-green-500">
                {staff.filter(s => s.contractType === 'MEI').length} MEI
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Ajudas de Custo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              R$ {staff.reduce((sum, s) => sum + getTotalAllowances(s), 0).toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">Total mensal</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Colaboradores */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Equipe Cadastrada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map(member => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Dialog: Novo Colaborador */}
      <Dialog open={newStaffDialogOpen} onOpenChange={setNewStaffDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Colaborador</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo membro da equipe técnica ou staff
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h4 className="font-semibold mb-3">Informações Básicas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome Completo</Label>
                  <Input placeholder="Ex: João da Silva" />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="joao@hopefc.com" />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input placeholder="(11) 99999-9999" />
                </div>
                <div>
                  <Label>Data de Ingresso</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Função</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treinador">Treinador</SelectItem>
                      <SelectItem value="preparador_fisico">Preparador Físico</SelectItem>
                      <SelectItem value="auxiliar_tecnico">Auxiliar Técnico</SelectItem>
                      <SelectItem value="medico">Médico</SelectItem>
                      <SelectItem value="nutricionista">Nutricionista</SelectItem>
                      <SelectItem value="fisioterapeuta">Fisioterapeuta</SelectItem>
                      <SelectItem value="analista">Analista</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Categoria de Acesso</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas">Todas</SelectItem>
                      <SelectItem value="Profissional">Profissional</SelectItem>
                      <SelectItem value="Sub-20">Sub-20</SelectItem>
                      <SelectItem value="Sub-17">Sub-17</SelectItem>
                      <SelectItem value="Base">Base (até Sub-15)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dados Contratuais */}
            <div>
              <h4 className="font-semibold mb-3">Dados Contratuais</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de Contrato</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT - Consolidação das Leis do Trabalho</SelectItem>
                      <SelectItem value="PJ">PJ - Pessoa Jurídica</SelectItem>
                      <SelectItem value="MEI">MEI - Microempreendedor Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Salário Mensal</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
              </div>
            </div>

            {/* Ajudas de Custo */}
            <div>
              <h4 className="font-semibold mb-3">Ajudas de Custo (Opcional)</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transporte">Transporte</SelectItem>
                        <SelectItem value="Alimentacao">Alimentação</SelectItem>
                        <SelectItem value="Moradia">Moradia</SelectItem>
                        <SelectItem value="Educacao">Educação</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Valor</Label>
                    <Input type="number" placeholder="0,00" />
                  </div>
                  <div>
                    <Label className="text-xs">Frequência</Label>
                    <Select defaultValue="Mensal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mensal">Mensal</SelectItem>
                        <SelectItem value="Eventual">Eventual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-3 h-3 mr-2" />
                  Adicionar Outra Ajuda de Custo
                </Button>
              </div>
            </div>

            {/* Observações */}
            <div>
              <Label>Observações</Label>
              <Textarea placeholder="Informações adicionais sobre o colaborador..." rows={3} />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewStaffDialogOpen(false)}>
                Cancelar
              </Button>
              <Button>Cadastrar Colaborador</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Editar Contrato */}
      <Dialog open={editContractDialogOpen} onOpenChange={setEditContractDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Dados Contratuais</DialogTitle>
            <DialogDescription>
              Atualize as informações de salário, tipo de contrato e ajudas de custo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Contrato</Label>
                <Select defaultValue={selectedStaff?.contractType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="MEI">MEI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Salário Mensal</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedStaff?.salary}
                  placeholder="0,00" 
                />
              </div>
            </div>

            <div>
              <Label>Observações sobre a Alteração</Label>
              <Textarea placeholder="Motivo da alteração contratual..." rows={3} />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditContractDialogOpen(false)}>
                Cancelar
              </Button>
              <Button>Salvar Alterações</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
