import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockAthletes, getAthletesStats } from '../data/mockAthletes';
import { FileText, Download, TrendingUp, Users, Activity, AlertCircle, Award, Target } from 'lucide-react';

interface ReportsManagementProps {
  user: any;
}

export function ReportsManagement({ user }: ReportsManagementProps) {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [reportType, setReportType] = useState('geral');

  const stats = getAthletesStats();

  const filteredAthletes = selectedCategory === 'todas' 
    ? mockAthletes 
    : mockAthletes.filter(a => a.category === selectedCategory);

  const topScorers = [...mockAthletes]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 10);

  const topAssistants = [...mockAthletes]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 10);

  const mostDisciplined = [...mockAthletes]
    .sort((a, b) => (a.yellowCards + a.redCards * 2) - (b.yellowCards + b.redCards * 2))
    .slice(0, 10);

  const reports = [
    {
      id: 1,
      title: 'Relatório Mensal - Janeiro 2024',
      type: 'Mensal',
      date: '2024-01-31',
      category: 'Geral',
      status: 'Disponível'
    },
    {
      id: 2,
      title: 'Análise de Performance - Profissional',
      type: 'Performance',
      date: '2024-01-28',
      category: 'Profissional',
      status: 'Disponível'
    },
    {
      id: 3,
      title: 'Relatório Médico - Todas Categorias',
      type: 'Médico',
      date: '2024-01-25',
      category: 'Geral',
      status: 'Disponível'
    },
    {
      id: 4,
      title: 'Análise Tática - Últimos 10 Jogos',
      type: 'Tático',
      date: '2024-01-20',
      category: 'Profissional',
      status: 'Disponível'
    },
    {
      id: 5,
      title: 'Relatório Financeiro - Trimestre',
      type: 'Financeiro',
      date: '2024-01-15',
      category: 'Geral',
      status: user.role === 'presidente' ? 'Disponível' : 'Restrito'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Relatórios Gerenciais</h2>
          <p className="text-muted-foreground">
            Relatórios e análises completas do clube
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="Profissional">Profissional</SelectItem>
              <SelectItem value="Sub-20">Sub-20</SelectItem>
              <SelectItem value="Sub-17">Sub-17</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Atletas</p>
                <p className="text-2xl font-bold">{stats.totalAthletes}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atletas Ativos</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeAthletes}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lesionados</p>
                <p className="text-2xl font-bold text-red-600">{stats.injuredAthletes}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suspensos</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.suspendedAthletes}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stats.categoriesStats.map(cat => (
              <div key={cat.category} className="text-center p-4 bg-accent rounded-lg">
                <p className="text-sm text-muted-foreground">{cat.category}</p>
                <p className="text-2xl font-bold">{cat.count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Artilheiros */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              <CardTitle className="text-base">Top 10 Artilheiros</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topScorers.map((athlete, index) => (
                <div key={athlete.id} className="flex items-center justify-between p-2 hover:bg-accent rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      {index + 1}º
                    </span>
                    <div>
                      <p className="text-sm font-medium">{athlete.name}</p>
                      <p className="text-xs text-muted-foreground">{athlete.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{athlete.goals} gols</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Assistências */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">Top 10 Assistências</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topAssistants.map((athlete, index) => (
                <div key={athlete.id} className="flex items-center justify-between p-2 hover:bg-accent rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      {index + 1}º
                    </span>
                    <div>
                      <p className="text-sm font-medium">{athlete.name}</p>
                      <p className="text-xs text-muted-foreground">{athlete.category}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{athlete.assists} assist.</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mais Disciplinados */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              <CardTitle className="text-base">Mais Disciplinados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mostDisciplined.map((athlete, index) => (
                <div key={athlete.id} className="flex items-center justify-between p-2 hover:bg-accent rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground w-6">
                      {index + 1}º
                    </span>
                    <div>
                      <p className="text-sm font-medium">{athlete.name}</p>
                      <p className="text-xs text-muted-foreground">{athlete.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-yellow-600">
                      {athlete.yellowCards} 🟨
                    </Badge>
                    <Badge variant="outline" className="text-red-600">
                      {athlete.redCards} 🟥
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map(report => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-4 bg-accent rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge variant="outline">{report.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(report.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {report.status === 'Disponível' ? (
                    <>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary">Acesso Restrito</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
