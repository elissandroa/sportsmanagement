import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Package, Plus, AlertTriangle, TrendingDown, Box, Shirt } from 'lucide-react';

interface MaterialManagementProps {
  user: any;
}

export function MaterialManagement({ user }: MaterialManagementProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const materials = [
    {
      id: 1,
      name: 'Uniforme Titular',
      category: 'Uniformes',
      type: 'Camisa',
      currentStock: 45,
      minStock: 30,
      maxStock: 100,
      status: 'Em estoque',
      location: 'Almoxarifado A',
      supplier: 'Nike',
      lastPurchase: '2024-01-10',
      unitPrice: 89.90,
      sizes: {
        'P': 8,
        'M': 15,
        'G': 12,
        'GG': 10
      }
    },
    {
      id: 2,
      name: 'Chuteiras Profissional',
      category: 'Calçados',
      type: 'Chuteira',
      currentStock: 15,
      minStock: 20,
      maxStock: 50,
      status: 'Estoque baixo',
      location: 'Almoxarifado B',
      supplier: 'Adidas',
      lastPurchase: '2023-12-15',
      unitPrice: 299.90,
      sizes: {
        '38': 2,
        '39': 3,
        '40': 4,
        '41': 3,
        '42': 2,
        '43': 1
      }
    },
    {
      id: 3,
      name: 'Bolas de Treino',
      category: 'Material de Treino',
      type: 'Bola',
      currentStock: 25,
      minStock: 15,
      maxStock: 40,
      status: 'Em estoque',
      location: 'Depósito de Materiais',
      supplier: 'Penalty',
      lastPurchase: '2024-01-05',
      unitPrice: 79.90,
      sizes: null
    },
    {
      id: 4,
      name: 'Cones de Treinamento',
      category: 'Material de Treino',
      type: 'Equipamento',
      currentStock: 50,
      minStock: 30,
      maxStock: 80,
      status: 'Em estoque',
      location: 'Depósito de Materiais',
      supplier: 'Vollo',
      lastPurchase: '2024-01-08',
      unitPrice: 12.90,
      sizes: null
    },
    {
      id: 5,
      name: 'Agasalho de Viagem',
      category: 'Uniformes',
      type: 'Agasalho',
      currentStock: 8,
      minStock: 25,
      maxStock: 60,
      status: 'Estoque crítico',
      location: 'Almoxarifado A',
      supplier: 'Umbro',
      lastPurchase: '2023-11-20',
      unitPrice: 149.90,
      sizes: {
        'P': 1,
        'M': 2,
        'G': 3,
        'GG': 2
      }
    },
    {
      id: 6,
      name: 'Luvas de Goleiro',
      category: 'Equipamentos',
      type: 'Luva',
      currentStock: 12,
      minStock: 8,
      maxStock: 20,
      status: 'Em estoque',
      location: 'Almoxarifado B',
      supplier: 'Reusch',
      lastPurchase: '2024-01-12',
      unitPrice: 189.90,
      sizes: {
        '8': 3,
        '9': 4,
        '10': 3,
        '11': 2
      }
    }
  ];

  const filteredMaterials = materials.filter(material => {
    if (selectedCategory === 'all') return true;
    return material.category === selectedCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'em estoque': return 'bg-green-100 text-green-800';
      case 'estoque baixo': return 'bg-yellow-100 text-yellow-800';
      case 'estoque crítico': return 'bg-red-100 text-red-800';
      case 'sem estoque': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    if (current <= min * 0.5) return { level: 'critical', color: 'bg-red-500' };
    if (current <= min) return { level: 'low', color: 'bg-yellow-500' };
    if (current >= max * 0.8) return { level: 'high', color: 'bg-green-500' };
    return { level: 'normal', color: 'bg-blue-500' };
  };

  const MaterialCard = ({ material }: { material: any }) => {
    const stockLevel = getStockLevel(material.currentStock, material.minStock, material.maxStock);
    
    return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{material.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{material.type} - {material.category}</p>
            </div>
            <Badge className={getStatusColor(material.status)}>
              {material.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-blue-600">{material.currentStock}</p>
                <p className="text-xs text-muted-foreground">Atual</p>
              </div>
              <div>
                <p className="text-xl font-bold text-orange-600">{material.minStock}</p>
                <p className="text-xs text-muted-foreground">Mínimo</p>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">{material.maxStock}</p>
                <p className="text-xs text-muted-foreground">Máximo</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nível do estoque</span>
                <span>{((material.currentStock / material.maxStock) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stockLevel.color}`}
                  style={{ width: `${(material.currentStock / material.maxStock) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Local: {material.location}</p>
              <p>Fornecedor: {material.supplier}</p>
              <p>Última compra: {new Date(material.lastPurchase).toLocaleDateString('pt-BR')}</p>
              <p>Preço unitário: R$ {material.unitPrice.toFixed(2)}</p>
            </div>
            
            {material.sizes && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tamanhos disponíveis:</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(material.sizes).map(([size, quantity]) => (
                    <Badge key={size} variant="outline" className="text-xs">
                      {size}: {quantity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Gerenciar Estoque
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Gerenciar Estoque - {material.name}</DialogTitle>
                  <DialogDescription>
                    Gerencie o estoque, movimentações e tamanhos disponíveis do material.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <TabsTrigger value="movement">Movimentação</TabsTrigger>
                    <TabsTrigger value="sizes">Tamanhos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Item</Label>
                            <p className="font-medium">{material.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Categoria</Label>
                            <p className="font-medium">{material.category}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Tipo</Label>
                            <p className="font-medium">{material.type}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Localização</Label>
                            <p className="font-medium">{material.location}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Fornecedor</Label>
                            <p className="font-medium">{material.supplier}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Preço Unitário</Label>
                            <p className="font-medium">R$ {material.unitPrice.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{material.currentStock}</p>
                            <p className="text-sm text-muted-foreground">Estoque Atual</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{material.minStock}</p>
                            <p className="text-sm text-muted-foreground">Estoque Mínimo</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{material.maxStock}</p>
                            <p className="text-sm text-muted-foreground">Estoque Máximo</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="movement" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Entrada de Estoque</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <Label>Quantidade</Label>
                            <Input type="number" placeholder="Quantidade a adicionar" />
                          </div>
                          <div className="space-y-2">
                            <Label>Motivo</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="compra">Compra</SelectItem>
                                <SelectItem value="devolucao">Devolução</SelectItem>
                                <SelectItem value="transferencia">Transferência</SelectItem>
                                <SelectItem value="ajuste">Ajuste de inventário</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full" variant="default">
                            Adicionar ao Estoque
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Saída de Estoque</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <Label>Quantidade</Label>
                            <Input type="number" placeholder="Quantidade a retirar" />
                          </div>
                          <div className="space-y-2">
                            <Label>Motivo</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="uso">Uso/Distribuição</SelectItem>
                                <SelectItem value="perda">Perda/Dano</SelectItem>
                                <SelectItem value="transferencia">Transferência</SelectItem>
                                <SelectItem value="descarte">Descarte</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full" variant="destructive">
                            Retirar do Estoque
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sizes" className="space-y-4">
                    {material.sizes ? (
                      <div className="space-y-3">
                        <h4 className="font-medium">Distribuição por Tamanho</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(material.sizes).map(([size, quantity]) => (
                            <Card key={size}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">Tamanho {size}</p>
                                    <p className="text-sm text-muted-foreground">{quantity} unidades</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline">-</Button>
                                    <Button size="sm" variant="outline">+</Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Box className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Este item não possui controle por tamanho
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Gestão de Materiais</h2>
          <p className="text-muted-foreground">
            Controle de estoque de uniformes e equipamentos
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Material</DialogTitle>
              <DialogDescription>
                Adicione um novo material ao estoque definindo categoria, quantidades e tamanhos.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Item</Label>
                  <Input placeholder="Ex: Camisa Titular" />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uniformes">Uniformes</SelectItem>
                      <SelectItem value="calcados">Calçados</SelectItem>
                      <SelectItem value="material-treino">Material de Treino</SelectItem>
                      <SelectItem value="equipamentos">Equipamentos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Input placeholder="Ex: Camisa, Chuteira" />
                </div>
                <div className="space-y-2">
                  <Label>Fornecedor</Label>
                  <Input placeholder="Ex: Nike, Adidas" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Estoque Atual</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Estoque Mínimo</Label>
                  <Input type="number" placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label>Estoque Máximo</Label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preço Unitário</Label>
                  <Input type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Localização</Label>
                  <Input placeholder="Ex: Almoxarifado A" />
                </div>
              </div>
              
              <Button className="w-full">Cadastrar Material</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros por categoria */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="Uniformes">Uniformes</TabsTrigger>
          <TabsTrigger value="Calçados">Calçados</TabsTrigger>
          <TabsTrigger value="Material de Treino">Material de Treino</TabsTrigger>
          <TabsTrigger value="Equipamentos">Equipamentos</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Estatísticas de estoque */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Itens</p>
                <p className="text-2xl font-bold">{filteredMaterials.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredMaterials.filter(m => m.status === 'Estoque baixo').length}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estoque Crítico</p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredMaterials.filter(m => m.status === 'Estoque crítico').length}
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
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {filteredMaterials.reduce((acc, m) => acc + (m.currentStock * m.unitPrice), 0).toLocaleString('pt-BR')}
                </p>
              </div>
              <Shirt className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de materiais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum material encontrado nesta categoria</p>
        </div>
      )}

      {/* Alertas de estoque */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Alertas de Estoque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {materials
              .filter(m => m.status === 'Estoque baixo' || m.status === 'Estoque crítico')
              .map((material) => (
                <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{material.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Estoque atual: {material.currentStock} | Mínimo: {material.minStock}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(material.status)}>
                      {material.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Comprar
                    </Button>
                  </div>
                </div>
              ))}
            
            {materials.filter(m => m.status === 'Estoque baixo' || m.status === 'Estoque crítico').length === 0 && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">Todos os estoques estão em níveis adequados</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}