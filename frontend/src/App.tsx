import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { AthleteDashboard } from './components/AthleteDashboard';
import { AnalystDashboard } from './components/AnalystDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Se o usuário for um atleta, mostrar dashboard específico
  if (user?.role === 'atleta') {
    return <AthleteDashboard user={user} onLogout={handleLogout} />;
  }

  // Se o usuário for um analista, mostrar dashboard de análise
  if (user?.role === 'analista') {
    return <AnalystDashboard user={user} onLogout={handleLogout} />;
  }

  // Presidente, gerente, supervisor, etc. usam o Dashboard principal
  return <Dashboard user={user} onLogout={handleLogout} />;
}