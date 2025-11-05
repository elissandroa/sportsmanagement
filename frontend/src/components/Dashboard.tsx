import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import { Button } from './ui/button';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  UserCog, 
  Package, 
  Shield, 
  Activity, 
  Heart,
  BarChart3,
  LogOut,
  Home,
  CalendarDays,
  DollarSign,
  Apple
} from 'lucide-react';
import { AthleteManagement } from './AthleteManagement';
import { CompetitionManagement } from './CompetitionManagement';
import { MatchManagement } from './MatchManagement';
import { MedicalDepartment } from './MedicalDepartment';
import { PSEControl } from './PSEControl';
import { PSERegistration } from './PSERegistration';
import { PSRRegistration } from './PSRRegistration';
import { StaffManagement } from './StaffManagement';
import { MaterialManagement } from './MaterialManagement';
import { OpponentManagement } from './OpponentManagement';
import { DashboardHome } from './DashboardHome';
import { TrainingSchedule } from './TrainingSchedule';
import { DetailedMatchAnalysis } from './DetailedMatchAnalysis';
import { MatchAnalysisReport } from './MatchAnalysisReport';
import { ContractManagement } from './ContractManagement';
import { FinancialManagement } from './FinancialManagement';
import { ReportsManagement } from './ReportsManagement';
import { NutritionManagement } from './NutritionManagement';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home, roles: ['all'] },
    { id: 'contract-management', label: 'Gestão de Contratos', icon: FileText, roles: ['presidente'] },
    { id: 'financial', label: 'Departamento Financeiro', icon: DollarSign, roles: ['presidente', 'gerente', 'financeiro'] },
    { id: 'athletes', label: 'Atletas', icon: Users, roles: ['presidente', 'gerente', 'supervisor', 'treinador', 'medico', 'preparador_fisico'] },
    { id: 'competitions', label: 'Competições', icon: Trophy, roles: ['presidente', 'gerente', 'supervisor', 'treinador'] },
    { id: 'matches', label: 'Partidas', icon: Calendar, roles: ['presidente', 'gerente', 'supervisor', 'treinador'] },
    { id: 'training', label: 'Agenda de Treinos', icon: CalendarDays, roles: ['presidente', 'gerente', 'supervisor', 'treinador'] },
    { id: 'detailed-analysis', label: 'Análise Detalhada', icon: BarChart3, roles: ['presidente', 'gerente', 'supervisor', 'treinador', 'preparador_fisico'] },
    { id: 'medical', label: 'Departamento Médico', icon: Heart, roles: ['presidente', 'gerente', 'supervisor', 'medico'] },
    { id: 'nutrition', label: 'Nutrição', icon: Apple, roles: ['presidente', 'gerente', 'supervisor', 'medico'] },
    { id: 'pse-overview', label: 'PSE/PSR - Visão Geral', icon: BarChart3, roles: ['presidente', 'gerente', 'supervisor', 'preparador_fisico', 'treinador'] },
    { id: 'pse-registration', label: 'Registro PSE', icon: Activity, roles: ['presidente', 'gerente', 'supervisor', 'preparador_fisico'] },
    { id: 'psr-registration', label: 'Registro PSR', icon: Heart, roles: ['presidente', 'gerente', 'supervisor', 'preparador_fisico', 'atleta'] },
    { id: 'reports', label: 'Relatórios', icon: FileText, roles: ['presidente', 'gerente', 'supervisor'] },
    { id: 'staff', label: 'Colaboradores', icon: UserCog, roles: ['presidente', 'gerente', 'supervisor'] },
    { id: 'materials', label: 'Materiais', icon: Package, roles: ['presidente', 'gerente', 'supervisor'] },
    { id: 'opponents', label: 'Adversários', icon: Shield, roles: ['presidente', 'gerente', 'supervisor', 'treinador'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes('all') || item.roles.includes(user.role)
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome user={user} />;
      case 'contract-management':
        return <ContractManagement user={user} />;
      case 'financial':
        return <FinancialManagement user={user} />;
      case 'athletes':
        return <AthleteManagement user={user} />;
      case 'competitions':
        return <CompetitionManagement user={user} />;
      case 'matches':
        return <MatchManagement user={user} />;
      case 'medical':
        return <MedicalDepartment user={user} />;
      case 'nutrition':
        return <NutritionManagement user={user} />;
      case 'training':
        return <TrainingSchedule user={user} />;
      case 'pse-overview':
        return <PSEControl user={user} />;
      case 'pse-registration':
        return <PSERegistration user={user} />;
      case 'psr-registration':
        return <PSRRegistration user={user} />;
      case 'reports':
        return <ReportsManagement user={user} />;
      case 'staff':
        return <StaffManagement user={user} />;
      case 'materials':
        return <MaterialManagement user={user} />;
      case 'opponents':
        return <OpponentManagement user={user} />;
      case 'detailed-analysis':
        return <DetailedMatchAnalysis />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="https://img.sofascore.com/api/v1/team/506795/image"
                alt="Hope Internacional"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h2 className="font-semibold">Hope Internacional Football Club</h2>
                <p className="text-xs text-muted-foreground">{user.name} - {user.role}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem className="mt-auto">
                <SidebarMenuButton onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-semibold">
                {filteredMenuItems.find(item => item.id === activeTab)?.label || 'Início'}
              </h1>
            </div>
            {user.role === 'presidente' && (
              <div className="text-sm text-amber-600 font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Acesso Presidencial - Dados Sensíveis
              </div>
            )}
            {user.role === 'gerente' && (
              <div className="text-sm text-muted-foreground">
                Acesso Total ao Sistema
              </div>
            )}
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}