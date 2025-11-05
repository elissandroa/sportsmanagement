import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Plus, RefreshCw, X, Upload, Save, DollarSign, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AthleteContract {
  id: number;
  name: string;
  category: string;
  position: string;
  contractType: string;
  monthlyValue: number;
  startDate: string;
  endDate: string;
  remainingMonths: number;
  status: string;
}

// Dialog: Criar Novo Contrato
interface CreateContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateContractDialog({ isOpen, onClose }: CreateContractDialogProps) {
  const [formData, setFormData] = useState({
    athleteName: '',
    category: '',
    contractType: '',
    monthlyValue: '',
    duration: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleCreate = () => {
    if (!formData.athleteName || !formData.contractType || !formData.monthlyValue) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success(`Contrato criado com sucesso para ${formData.athleteName}!`);
    onClose();
    
    // Reset form
    setFormData({
      athleteName: '',
      category: '',
      contractType: '',
      monthlyValue: '',
      duration: '',
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Criar Novo Contrato
          </DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo contrato de atleta
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
          <div className="space-y-6">
            {/* Informação de Segurança */}
            <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>Informações Confidenciais:</strong> Este contrato contém dados financeiros sensíveis.
                Certifique-se de que todos os valores estão corretos antes de salvar.
              </AlertDescription>
            </Alert>

            {/* Dados do Atleta */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2">
                Dados do Atleta
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Nome do Atleta *</Label>
                  <Input
                    placeholder="Nome completo"
                    value={formData.athleteName}
                    onChange={(e) => setFormData({ ...formData, athleteName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Profissional">Profissional</SelectItem>
                      <SelectItem value="Sub-20">Sub-20</SelectItem>
                      <SelectItem value="Sub-17">Sub-17</SelectItem>
                      <SelectItem value="Sub-15">Sub-15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Contrato *</Label>
                  <Select value={formData.contractType} onValueChange={(value) => setFormData({ ...formData, contractType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profissional</SelectItem>
                      <SelectItem value="base_with_contract">Base com Contrato</SelectItem>
                      <SelectItem value="formation">Formação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Dados Contratuais */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Valores e Condições
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor Mensal (R$) *</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                    value={formData.monthlyValue}
                    onChange={(e) => setFormData({ ...formData, monthlyValue: e.target.value })}
                  />
                  {formData.monthlyValue && (
                    <p className="text-xs text-muted-foreground">
                      Anual: R$ {(parseFloat(formData.monthlyValue) * 12).toLocaleString('pt-BR')}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Duração do Contrato</Label>
                  <Input
                    placeholder="Ex: 3 anos, 18 meses"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data de Início *</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data de Término *</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Upload de Contrato */}
            <div className="space-y-4">
              <h3>Documento do Contrato</h3>
              
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => toast.info('Funcionalidade de upload será implementada')}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Clique para fazer upload ou arraste o arquivo do contrato
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF - Máximo 10MB
                </p>
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label>Observações Adicionais</Label>
              <Textarea
                placeholder="Adicione notas ou condições especiais do contrato..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} className="gap-2">
            <Save className="w-4 h-4" />
            Criar Contrato
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dialog: Renovar Contrato
interface RenewContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  athlete: AthleteContract | null;
}

export function RenewContractDialog({ isOpen, onClose, athlete }: RenewContractDialogProps) {
  const [formData, setFormData] = useState({
    newMonthlyValue: '',
    newDuration: '',
    newStartDate: '',
    newEndDate: '',
    increasePercentage: '',
    notes: ''
  });

  const handleRenew = () => {
    if (!formData.newMonthlyValue || !formData.newEndDate) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success(`Contrato de ${athlete?.name} renovado com sucesso!`);
    onClose();
  };

  const calculateIncrease = () => {
    if (athlete && formData.newMonthlyValue) {
      const oldValue = athlete.monthlyValue;
      const newValue = parseFloat(formData.newMonthlyValue);
      const percentage = ((newValue - oldValue) / oldValue * 100).toFixed(1);
      return percentage;
    }
    return '0';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Renovar Contrato
          </DialogTitle>
          <DialogDescription>
            Renovação de contrato de {athlete?.name} - {athlete?.position}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
          <div className="space-y-6">
            {/* Informações do Contrato Atual */}
            <Alert>
              <CheckCircle2 className="w-4 h-4" />
              <AlertDescription>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <strong>Contrato Atual:</strong>
                    <p className="text-sm">Valor: R$ {athlete?.monthlyValue.toLocaleString('pt-BR')}/mês</p>
                    <p className="text-sm">Término: {athlete?.endDate ? new Date(athlete.endDate).toLocaleDateString('pt-BR') : '-'}</p>
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <p className="text-sm text-amber-600">
                      {athlete?.remainingMonths && athlete.remainingMonths > 0
                        ? `${athlete.remainingMonths} meses restantes`
                        : 'Contrato vencido'}
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {/* Novos Valores */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Novos Valores
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Novo Valor Mensal (R$) *</Label>
                  <Input
                    type="number"
                    placeholder="60000"
                    value={formData.newMonthlyValue}
                    onChange={(e) => setFormData({ ...formData, newMonthlyValue: e.target.value })}
                  />
                  {formData.newMonthlyValue && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Anual: R$ {(parseFloat(formData.newMonthlyValue) * 12).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs font-semibold text-green-600">
                        Aumento: {calculateIncrease()}%
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Nova Duração</Label>
                  <Input
                    placeholder="Ex: 3 anos, 24 meses"
                    value={formData.newDuration}
                    onChange={(e) => setFormData({ ...formData, newDuration: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Input
                    type="date"
                    value={formData.newStartDate}
                    onChange={(e) => setFormData({ ...formData, newStartDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nova Data de Término *</Label>
                  <Input
                    type="date"
                    value={formData.newEndDate}
                    onChange={(e) => setFormData({ ...formData, newEndDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Upload do Novo Contrato */}
            <div className="space-y-4">
              <h3>Novo Documento Contratual</h3>
              
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => toast.info('Funcionalidade de upload será implementada')}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload do contrato renovado (PDF)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF - Máximo 10MB
                </p>
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label>Observações da Renovação</Label>
              <Textarea
                placeholder="Detalhes sobre a renovação, novas cláusulas, etc..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleRenew} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Renovar Contrato
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dialog: Encerrar Contrato
interface TerminateContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  athlete: AthleteContract | null;
}

export function TerminateContractDialog({ isOpen, onClose, athlete }: TerminateContractDialogProps) {
  const [formData, setFormData] = useState({
    reason: '',
    terminationDate: '',
    notes: '',
    hasCompensation: false,
    compensationValue: ''
  });

  const handleTerminate = () => {
    if (!formData.reason || !formData.terminationDate) {
      toast.error('Preencha o motivo e a data de encerramento');
      return;
    }

    toast.success(`Contrato de ${athlete?.name} encerrado com sucesso`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <X className="w-5 h-5" />
            Encerrar Contrato
          </DialogTitle>
          <DialogDescription>
            Encerramento de contrato de {athlete?.name} - {athlete?.position}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
          <div className="space-y-6">
            {/* Alerta de Ação Crítica */}
            <Alert variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong>Atenção:</strong> Esta é uma ação irreversível. O encerramento do contrato
                será registrado permanentemente no sistema.
              </AlertDescription>
            </Alert>

            {/* Informações do Contrato */}
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <h4>Informações do Contrato Atual</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Atleta:</p>
                  <p className="font-semibold">{athlete?.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Categoria:</p>
                  <p className="font-semibold">{athlete?.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Valor Mensal:</p>
                  <p className="font-semibold">R$ {athlete?.monthlyValue.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Término Previsto:</p>
                  <p className="font-semibold">
                    {athlete?.endDate ? new Date(athlete.endDate).toLocaleDateString('pt-BR') : '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Motivo do Encerramento */}
            <div className="space-y-2">
              <Label>Motivo do Encerramento *</Label>
              <Select value={formData.reason} onValueChange={(value) => setFormData({ ...formData, reason: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rescisao_mutua">Rescisão por Acordo Mútuo</SelectItem>
                  <SelectItem value="transferencia">Transferência para Outro Clube</SelectItem>
                  <SelectItem value="termino_natural">Término Natural do Contrato</SelectItem>
                  <SelectItem value="justa_causa">Rescisão por Justa Causa</SelectItem>
                  <SelectItem value="desempenho">Desempenho Insatisfatório</SelectItem>
                  <SelectItem value="financeiro">Motivos Financeiros do Clube</SelectItem>
                  <SelectItem value="outro">Outro Motivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data de Encerramento */}
            <div className="space-y-2">
              <Label>Data de Encerramento *</Label>
              <Input
                type="date"
                value={formData.terminationDate}
                onChange={(e) => setFormData({ ...formData, terminationDate: e.target.value })}
              />
            </div>

            <Separator />

            {/* Compensação Financeira */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasCompensation"
                  checked={formData.hasCompensation}
                  onChange={(e) => setFormData({ ...formData, hasCompensation: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="hasCompensation" className="cursor-pointer">
                  Há compensação financeira no encerramento?
                </Label>
              </div>

              {formData.hasCompensation && (
                <div className="space-y-2 pl-6">
                  <Label>Valor da Compensação (R$)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 150000"
                    value={formData.compensationValue}
                    onChange={(e) => setFormData({ ...formData, compensationValue: e.target.value })}
                  />
                  {formData.compensationValue && (
                    <p className="text-xs text-muted-foreground">
                      R$ {parseFloat(formData.compensationValue).toLocaleString('pt-BR')}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label>Observações e Detalhes</Label>
              <Textarea
                placeholder="Detalhes adicionais sobre o encerramento do contrato..."
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleTerminate} variant="destructive" className="gap-2">
            <X className="w-4 h-4" />
            Encerrar Contrato
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
