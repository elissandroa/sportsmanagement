import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Trophy, Calendar, Heart, Activity, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockAthletes, getAthletesStats } from '../data/mockAthletes';

interface DashboardHomeProps {
  user: any;
}

export function DashboardHome({ user }: DashboardHomeProps) {
  // Usar dados reais do mock
  const athletesStats = getAthletesStats();
  
  const stats = [
    { title: 'Total de Atletas', value: athletesStats.totalAthletes.toString(), icon: Users, color: 'bg-blue-500' },
    { title: 'Atletas Ativos', value: athletesStats.activeAthletes.toString(), icon: Activity, color: 'bg-green-500' },
    { title: 'Atletas Lesionados', value: athletesStats.injuredAthletes.toString(), icon: Heart, color: 'bg-red-500' },
    { title: 'Atletas Suspensos', value: athletesStats.suspendedAthletes.toString(), icon: AlertTriangle, color: 'bg-yellow-500' },
  ];

  const recentMatches = [
    { opponent: 'Santos FC', result: '2-1', date: '2024-01-20', competition: 'Campeonato Paulista' },
    { opponent: 'Corinthians', result: '0-2', date: '2024-01-15', competition: 'Copa do Brasil' },
    { opponent: 'Palmeiras', result: '1-1', date: '2024-01-10', competition: 'Campeonato Paulista' },
  ];

  const upcomingMatches = [
    { opponent: 'São Paulo FC', date: '2024-01-25', time: '16:00', venue: 'Casa' },
    { opponent: 'Flamengo', date: '2024-01-28', time: '20:00', venue: 'Fora' },
    { opponent: 'Grêmio', date: '2024-02-02', time: '18:00', venue: 'Casa' },
  ];

  const alerts = [
    { type: 'medical', message: 'João Silva - Retorno previsto em 2 semanas', priority: 'high' },
    { type: 'pse', message: 'PSE médio da categoria sub-20 acima do normal', priority: 'medium' },
    { type: 'material', message: 'Estoque de chuteiras baixo', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Partidas */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Partidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{match.opponent}</p>
                    <p className="text-sm text-muted-foreground">{match.competition}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{match.result}</p>
                    <p className="text-sm text-muted-foreground">{match.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximas Partidas */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Partidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{match.opponent}</p>
                    <Badge variant={match.venue === 'Casa' ? 'default' : 'secondary'}>
                      {match.venue}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{match.time}</p>
                    <p className="text-sm text-muted-foreground">{match.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  alert.priority === 'high' ? 'bg-red-500' :
                  alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <p className="flex-1">{alert.message}</p>
                <Badge variant="outline" className="text-xs">
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Imagem do clube */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1625990637351-ee0e5e9ba5e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmb290YmFsbCUyMHRlYW0lMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc1OTE4NDM4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Hope Internacional Team"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">Hope Internacional Football Club - Temporada 2024</h3>
            <p className="text-muted-foreground">Unidos pela paixão, movidos pela excelência</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}