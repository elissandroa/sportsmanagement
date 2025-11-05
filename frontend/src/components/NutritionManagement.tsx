import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Apple, Utensils, TrendingUp, Calendar, Plus, AlertCircle, Activity } from 'lucide-react';
import { mockAthletes } from '../data/mockAthletes';

interface NutritionManagementProps {
  user: any;
}

export function NutritionManagement({ user }: NutritionManagementProps) {
  const [selectedCategory, setSelectedCategory] = useState('Profissional');
  const [selectedAthlete, setSelectedAthlete] = useState<number | null>(null);

  const athletes = mockAthletes.filter(a => a.category === selectedCategory);

  const nutritionPlans = [
    {
      id: 1,
      athleteId: athletes[0]?.id,
      athleteName: athletes[0]?.name,
      type: 'Ganho de Massa',
      calories: 3500,
      protein: 180,
      carbs: 450,
      fat: 100,
      water: 4.5,
      supplements: ['Whey Protein', 'Creatina', 'BCAA'],
      restrictions: [],
      startDate: '2024-01-01',
      nutritionist: 'Dra. Maria Santos'
    },
    {
      id: 2,
      athleteId: athletes[1]?.id,
      athleteName: athletes[1]?.name,
      type: 'Manutenção',
      calories: 2800,
      protein: 140,
      carbs: 350,
      fat: 80,
      water: 3.5,
      supplements: ['Whey Protein', 'Multivitamínico'],
      restrictions: ['Lactose'],
      startDate: '2024-01-10',
      nutritionist: 'Dra. Maria Santos'
    },
    {
      id: 3,
      athleteId: athletes[2]?.id,
      athleteName: athletes[2]?.name,
      type: 'Perda de Peso',
      calories: 2200,
      protein: 150,
      carbs: 250,
      fat: 60,
      water: 3.0,
      supplements: ['Whey Protein'],
      restrictions: ['Glúten'],
      startDate: '2024-01-05',
      nutritionist: 'Dr. João Silva'
    }
  ];

  const mealPlans = [
    {
      meal: 'Café da Manhã',
      time: '07:00',
      foods: ['2 ovos mexidos', '2 fatias de pão integral', '1 banana', '200ml de leite desnatado'],
      calories: 450
    },
    {
      meal: 'Lanche da Manhã',
      time: '10:00',
      foods: ['1 shake de whey protein', '1 maçã'],
      calories: 200
    },
    {
      meal: 'Almoço',
      time: '12:30',
      foods: ['150g de frango grelhado', '200g de arroz integral', '100g de feijão', 'Salada verde'],
      calories: 800
    },
    {
      meal: 'Lanche Pré-Treino',
      time: '15:00',
      foods: ['1 batata doce média', '1 scoop de whey protein'],
      calories: 300
    },
    {
      meal: 'Lanche Pós-Treino',
      time: '18:00',
      foods: ['1 shake de whey protein', '1 banana'],
      calories: 250
    },
    {
      meal: 'Jantar',
      time: '20:00',
      foods: ['150g de peixe grelhado', '200g de batata doce', 'Legumes cozidos'],
      calories: 600
    },
    {
      meal: 'Ceia',
      time: '22:00',
      foods: ['200g de iogurte natural', '1 colher de pasta de amendoim'],
      calories: 200
    }
  ];

  const hydrationLog = [
    { time: '07:00', amount: 500, status: 'completed' },
    { time: '09:00', amount: 500, status: 'completed' },
    { time: '11:00', amount: 500, status: 'completed' },
    { time: '13:00', amount: 500, status: 'pending' },
    { time: '15:00', amount: 500, status: 'pending' },
    { time: '17:00', amount: 500, status: 'pending' },
    { time: '19:00', amount: 500, status: 'pending' },
    { time: '21:00', amount: 500, status: 'pending' }
  ];

  const totalHydration = hydrationLog
    .filter(h => h.status === 'completed')
    .reduce((sum, h) => sum + h.amount, 0) / 1000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestão Nutricional</h2>
          <p className="text-muted-foreground">
            Controle de dietas e suplementação dos atletas
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Profissional">Profissional</SelectItem>
              <SelectItem value="Sub-20">Sub-20</SelectItem>
              <SelectItem value="Sub-17">Sub-17</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Plano Nutricional</DialogTitle>
                <DialogDescription>
                  Configure um novo plano alimentar para o atleta
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Atleta</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {athletes.slice(0, 10).map(athlete => (
                        <SelectItem key={athlete.id} value={athlete.id.toString()}>
                          {athlete.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Plano</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ganho">Ganho de Massa</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                      <SelectItem value="perda">Perda de Peso</SelectItem>
                      <SelectItem value="recuperacao">Recuperação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Calorias Diárias (kcal)</Label>
                  <Input type="number" placeholder="2500" />
                </div>
                <div className="space-y-2">
                  <Label>Proteínas (g)</Label>
                  <Input type="number" placeholder="150" />
                </div>
                <div className="space-y-2">
                  <Label>Carboidratos (g)</Label>
                  <Input type="number" placeholder="300" />
                </div>
                <div className="space-y-2">
                  <Label>Gorduras (g)</Label>
                  <Input type="number" placeholder="70" />
                </div>
                <div className="space-y-2">
                  <Label>Hidratação Diária (L)</Label>
                  <Input type="number" step="0.1" placeholder="3.5" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Input type="date" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Suplementos</Label>
                  <Textarea placeholder="Ex: Whey Protein, Creatina, BCAA..." />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Restrições Alimentares</Label>
                  <Textarea placeholder="Ex: Lactose, Glúten..." />
                </div>
              </div>
              <Button className="w-full">Criar Plano Nutricional</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Planos Ativos</p>
                <p className="text-2xl font-bold">{nutritionPlans.length}</p>
              </div>
              <Utensils className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Média Calórica</p>
                <p className="text-2xl font-bold">
                  {Math.round(nutritionPlans.reduce((sum, p) => sum + p.calories, 0) / nutritionPlans.length)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Restrições</p>
                <p className="text-2xl font-bold">
                  {nutritionPlans.filter(p => p.restrictions.length > 0).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suplementação</p>
                <p className="text-2xl font-bold">
                  {nutritionPlans.reduce((sum, p) => sum + p.supplements.length, 0)}
                </p>
              </div>
              <Apple className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Conteúdo */}
      <Tabs defaultValue="plans">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Planos Ativos</TabsTrigger>
          <TabsTrigger value="meals">Cardápio</TabsTrigger>
          <TabsTrigger value="hydration">Hidratação</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4">
            {nutritionPlans.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{plan.athleteName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.nutritionist}</p>
                    </div>
                    <Badge>{plan.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{plan.calories}</p>
                      <p className="text-xs text-muted-foreground">Calorias/dia</p>
                    </div>
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{plan.protein}g</p>
                      <p className="text-xs text-muted-foreground">Proteínas</p>
                    </div>
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{plan.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carboidratos</p>
                    </div>
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{plan.fat}g</p>
                      <p className="text-xs text-muted-foreground">Gorduras</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Suplementos:</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.supplements.map((supp, idx) => (
                          <Badge key={idx} variant="outline">{supp}</Badge>
                        ))}
                      </div>
                    </div>
                    {plan.restrictions.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Restrições:</p>
                        <div className="flex flex-wrap gap-2">
                          {plan.restrictions.map((rest, idx) => (
                            <Badge key={idx} variant="secondary">{rest}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Início: {new Date(plan.startDate).toLocaleDateString('pt-BR')}
                    </p>
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cardápio Diário - Exemplo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPlans.map((meal, idx) => (
                  <div key={idx} className="p-4 bg-accent rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{meal.meal}</p>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                      <Badge variant="outline">{meal.calories} kcal</Badge>
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                      {meal.foods.map((food, foodIdx) => (
                        <li key={foodIdx}>{food}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="font-medium">Total Diário: {mealPlans.reduce((sum, m) => sum + m.calories, 0)} kcal</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hydration" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Controle de Hidratação</CardTitle>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{totalHydration}L</p>
                  <p className="text-sm text-muted-foreground">de 4.0L hoje</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hydrationLog.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className={`w-5 h-5 ${log.status === 'completed' ? 'text-blue-600' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="text-sm font-medium">{log.time}</p>
                        <p className="text-xs text-muted-foreground">{log.amount}ml</p>
                      </div>
                    </div>
                    <Badge variant={log.status === 'completed' ? 'default' : 'outline'}>
                      {log.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
