import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando diferentes tipos de usuários baseado no email
    let userRole = 'treinador';
    let category = 'sub-17';
    let athleteId = null;
    
    if (email.includes('presidente')) {
      userRole = 'presidente';
      category = 'todas';
    } else if (email.includes('gerente') || email.includes('supervisor')) {
      userRole = 'gerente';
      category = 'todas';
    } else if (email.includes('financeiro')) {
      userRole = 'financeiro';
      category = 'todas';
    } else if (email.includes('medico')) {
      userRole = 'medico';
    } else if (email.includes('preparador')) {
      userRole = 'preparador_fisico';
    } else if (email.includes('analista')) {
      userRole = 'analista';
      category = 'todas';
    } else if (email.includes('atleta')) {
      userRole = 'atleta';
      // Simular diferentes atletas baseado no email
      if (email.includes('joao')) {
        athleteId = 1;
        category = 'Profissional';
      } else if (email.includes('carlos')) {
        athleteId = 2;
        category = 'Sub-20';
      } else if (email.includes('pedro')) {
        athleteId = 3;
        category = 'Sub-17';
      } else {
        athleteId = 4;
        category = 'Profissional';
      }
    }

    onLogin({
      email,
      role: userRole,
      category,
      name: email.split('@')[0],
      athleteId
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <img 
              src="https://img.sofascore.com/api/v1/team/506795/image"
              alt="Hope Internacional"
              className="w-20 h-20 rounded-full mx-auto"
            />
          </div>
          <CardTitle className="text-2xl">Hope Internacional Football Club</CardTitle>
          <p className="text-muted-foreground">Sistema de Gestão Esportiva</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@hopefc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Exemplos de acesso:</p>
            <p>• presidente@hopefc.com - Acesso máximo (dados sensíveis)</p>
            <p>• gerente@hopefc.com - Acesso total</p>
            <p>• financeiro@hopefc.com - Departamento Financeiro</p>
            <p>• treinador@hopefc.com - Categoria específica</p>
            <p>• medico@hopefc.com - Departamento médico</p>
            <p>• preparador@hopefc.com - Preparação física</p>
            <p>• analista@hopefc.com - Análise técnica</p>
            <p>• atleta.joao@hopefc.com - Atleta (PSE/PSR)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}