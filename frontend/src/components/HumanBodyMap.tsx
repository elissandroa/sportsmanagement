import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { X, MapPin } from 'lucide-react';

interface PainPoint {
  id: string;
  x: number;
  y: number;
  intensity: number;
  type: string;
  description: string;
  bodyPart: string;
}

interface HumanBodyMapProps {
  painPoints: PainPoint[];
  onAddPainPoint: (point: PainPoint) => void;
  onRemovePainPoint: (id: string) => void;
  readOnly?: boolean;
}

export function HumanBodyMap({ painPoints, onAddPainPoint, onRemovePainPoint, readOnly = false }: HumanBodyMapProps) {
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    intensity: '',
    type: '',
    description: '',
    bodyPart: ''
  });

  const bodyParts = [
    'Cabeça', 'Pescoço', 'Ombro Direito', 'Ombro Esquerdo',
    'Braço Direito', 'Braço Esquerdo', 'Antebraço Direito', 'Antebraço Esquerdo',
    'Mão Direita', 'Mão Esquerda', 'Peito', 'Costas Superior',
    'Costas Inferior', 'Abdômen', 'Quadril', 'Coxa Direita',
    'Coxa Esquerda', 'Joelho Direito', 'Joelho Esquerdo',
    'Panturrilha Direita', 'Panturrilha Esquerda', 'Pé Direito', 'Pé Esquerdo'
  ];

  const painTypes = [
    'Dor muscular', 'Dor articular', 'Tensão', 'Fadiga',
    'Lesão', 'Inflamação', 'Rigidez', 'Desconforto'
  ];

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 2) return 'bg-green-500';
    if (intensity <= 4) return 'bg-yellow-500';
    if (intensity <= 6) return 'bg-orange-500';
    if (intensity <= 8) return 'bg-red-500';
    return 'bg-red-700';
  };

  const getBodyPartFromPosition = (x: number, y: number) => {
    // Mapeamento simplificado baseado na posição no SVG
    if (y < 0.15) return 'Cabeça';
    if (y < 0.25) return 'Pescoço';
    if (y < 0.4) {
      if (x < 0.3) return 'Ombro Esquerdo';
      if (x > 0.7) return 'Ombro Direito';
      return 'Peito';
    }
    if (y < 0.6) {
      if (x < 0.3) return 'Braço Esquerdo';
      if (x > 0.7) return 'Braço Direito';
      return 'Abdômen';
    }
    if (y < 0.8) {
      if (x < 0.4) return 'Coxa Esquerda';
      if (x > 0.6) return 'Coxa Direita';
      return 'Quadril';
    }
    if (y < 0.9) {
      if (x < 0.4) return 'Joelho Esquerdo';
      if (x > 0.6) return 'Joelho Direito';
      return 'Joelho';
    }
    if (x < 0.4) return 'Pé Esquerdo';
    if (x > 0.6) return 'Pé Direito';
    return 'Pé';
  };

  const handleBodyClick = (event: React.MouseEvent<SVGElement>) => {
    if (readOnly) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    const bodyPart = getBodyPartFromPosition(x, y);
    
    setSelectedPosition({ x, y });
    setFormData({
      intensity: '',
      type: '',
      description: '',
      bodyPart
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosition) return;

    const newPainPoint: PainPoint = {
      id: Date.now().toString(),
      x: selectedPosition.x,
      y: selectedPosition.y,
      intensity: parseInt(formData.intensity),
      type: formData.type,
      description: formData.description,
      bodyPart: formData.bodyPart
    };

    onAddPainPoint(newPainPoint);
    setIsDialogOpen(false);
    setSelectedPosition(null);
    setFormData({
      intensity: '',
      type: '',
      description: '',
      bodyPart: ''
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Mapa de Dor Corporal
          </CardTitle>
          {!readOnly && (
            <p className="text-sm text-muted-foreground">
              Clique nas áreas do corpo onde você sente dor ou desconforto
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="relative">
              <svg
                width="300"
                height="600"
                viewBox="0 0 300 600"
                className="border rounded-lg cursor-pointer"
                onClick={handleBodyClick}
              >
                {/* Corpo humano simplificado */}
                {/* Cabeça */}
                <ellipse cx="150" cy="60" rx="40" ry="50" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Pescoço */}
                <rect x="135" y="105" width="30" height="25" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Tronco */}
                <rect x="100" y="130" width="100" height="200" rx="20" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Braços */}
                <ellipse cx="70" cy="200" rx="25" ry="80" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="230" cy="200" rx="25" ry="80" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Antebraços */}
                <ellipse cx="50" cy="300" rx="20" ry="60" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="250" cy="300" rx="20" ry="60" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Mãos */}
                <ellipse cx="50" cy="380" rx="15" ry="25" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="250" cy="380" rx="15" ry="25" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Quadris */}
                <rect x="110" y="330" width="80" height="40" rx="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Coxas */}
                <ellipse cx="125" cy="430" rx="25" ry="70" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="175" cy="430" rx="25" ry="70" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Joelhos */}
                <ellipse cx="125" cy="510" rx="20" ry="20" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="175" cy="510" rx="20" ry="20" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Panturrilhas */}
                <ellipse cx="125" cy="560" rx="18" ry="40" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="175" cy="560" rx="18" ry="40" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Pés */}
                <ellipse cx="125" cy="585" rx="12" ry="15" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <ellipse cx="175" cy="585" rx="12" ry="15" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Pontos de dor */}
                {painPoints.map((point) => (
                  <g key={point.id}>
                    <circle
                      cx={point.x * 300}
                      cy={point.y * 600}
                      r="8"
                      className={`${getIntensityColor(point.intensity)} cursor-pointer`}
                      stroke="#ffffff"
                      strokeWidth="2"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!readOnly) {
                          onRemovePainPoint(point.id);
                        }
                      }}
                    />
                    <text
                      x={point.x * 300}
                      y={point.y * 600 + 4}
                      textAnchor="middle"
                      className="text-xs fill-white font-bold pointer-events-none"
                    >
                      {point.intensity}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
          
          {/* Legenda */}
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Intensidade da Dor (0-10):</h4>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">0-2 Leve</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">3-4 Moderada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-sm">5-6 Intensa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">7-8 Severa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-700"></div>
                <span className="text-sm">9-10 Extrema</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de pontos de dor */}
      {painPoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pontos de Dor Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {painPoints.map((point) => (
                <div key={point.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${getIntensityColor(point.intensity)} flex items-center justify-center text-white text-sm font-bold`}>
                      {point.intensity}
                    </div>
                    <div>
                      <p className="font-medium">{point.bodyPart}</p>
                      <p className="text-sm text-muted-foreground">{point.type}</p>
                      {point.description && (
                        <p className="text-xs text-muted-foreground">{point.description}</p>
                      )}
                    </div>
                  </div>
                  {!readOnly && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemovePainPoint(point.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog para registrar dor */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Dor/Desconforto</DialogTitle>
            <DialogDescription>
              Selecione a intensidade e tipo de dor ou desconforto na região clicada.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Região do Corpo</Label>
              <Select value={formData.bodyPart} onValueChange={(value) => setFormData({...formData, bodyPart: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a região" />
                </SelectTrigger>
                <SelectContent>
                  {bodyParts.map((part) => (
                    <SelectItem key={part} value={part}>{part}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Intensidade (0-10)</Label>
              <Select value={formData.intensity} onValueChange={(value) => setFormData({...formData, intensity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a intensidade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>{i} - {
                      i === 0 ? 'Sem dor' :
                      i <= 2 ? 'Leve' :
                      i <= 4 ? 'Moderada' :
                      i <= 6 ? 'Intensa' :
                      i <= 8 ? 'Severa' : 'Extrema'
                    }</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipo de Dor</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {painTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Descrição (opcional)</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva a dor ou desconforto..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!formData.intensity || !formData.type || !formData.bodyPart}>
                Registrar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}