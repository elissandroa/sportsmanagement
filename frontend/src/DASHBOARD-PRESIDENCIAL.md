# Gestão de Contratos - Hope Internacional Football Club

## 📊 Visão Geral

A Gestão de Contratos é um módulo executivo exclusivo para o presidente do Hope Internacional Football Club, integrado ao dashboard principal do sistema. Fornece visão completa e detalhada de todos os contratos dos atletas, com alertas automáticos para contratos próximos do vencimento e análises financeiras estratégicas.

---

## 🎯 Objetivo

Fornecer ao presidente uma visão consolidada e em tempo real de:
- Status de todos os contratos dos atletas
- Alertas críticos de vencimentos (próximos 6 meses)
- Análises financeiras e projeções de gastos
- Controle total sobre informações contratuais sensíveis

---

## 🔐 Acesso

**Exclusivo para:** Presidente do clube

**Como Acessar:**
```
Email: presidente@hopefc.com
Senha: qualquer senha (ambiente de demonstração)
```

Ao fazer login como presidente, você terá acesso ao Dashboard completo do sistema com um módulo exclusivo chamado "Gestão de Contratos" no menu lateral.

---

## 📈 Funcionalidades Principais

### 1. **Alertas Críticos**

#### Banner de Alertas Urgentes
- Exibido no topo quando há contratos críticos
- Destaque visual em vermelho com ícone de alerta
- Contadores de:
  - Contratos vencendo nos próximos 6 meses
  - Contratos já vencidos

#### Critérios de Alerta
- **Crítico**: Contratos com ≤ 6 meses para vencimento
- **Vencido**: Contratos com data de término ultrapassada
- **Ativo**: Contratos com mais de 6 meses de vigência

---

### 2. **Cards de Estatísticas Gerais**

#### Total de Atletas
- Contador geral de atletas com contrato
- Distribuição por categoria (Profissional, Sub-20, Sub-17)
- Ícone: Usuários (azul)

#### Despesa Mensal
- Valor total mensal com contratos
- Projeção anual (mensal × 12)
- Formatação em Real (R$)
- Ícone: Cifrão (verde)

#### Contratos Vencendo
- Quantidade de contratos nos próximos 6 meses
- Destaque em amarelo/âmbar
- Ícone: Triângulo de alerta

#### Contratos Vencidos
- Quantidade de contratos já vencidos
- Destaque em vermelho
- Requer ação imediata
- Ícone: X Circle

---

### 3. **Análise Financeira Detalhada**

#### Distribuição de Despesas
**Visualização:**
- Gráfico de barras de progresso
- Comparação entre:
  - Categoria Profissional
  - Categorias de Base (Sub-20 + Sub-17)
- Valores em R$ e percentuais
- Total consolidado destacado

**Insights:**
- Percentual de gastos por categoria
- Identificação de maior despesa
- Base para planejamento orçamentário

#### Atletas com Contratos Críticos
**Lista Priorizada:**
- Ordenados por urgência (menor tempo restante primeiro)
- Cards com foto, nome, posição e categoria
- Badge indicando meses restantes ou "Vencido"
- Scroll vertical para listas longas

---

### 4. **Gestão Completa de Contratos**

#### Tabela Detalhada
**Colunas:**
1. **Atleta**: Foto, nome e posição
2. **Categoria**: Badge identificador
3. **Tipo**: Profissional / Base / Formação
4. **Valor Mensal**: Em R$ com destaque verde
5. **Início**: Data de início do contrato
6. **Término**: Data de fim do contrato
7. **Restante**: Meses até o vencimento (colorido por status)
8. **Status**: Badge visual (Ativo/Vencendo/Vencido)
9. **Ações**: Botão para visualizar detalhes

#### Filtros Avançados
**Busca Textual:**
- Buscar por nome do atleta
- Buscar por posição
- Pesquisa em tempo real

**Filtro por Categoria:**
- Todas
- Profissional
- Sub-20
- Sub-17

**Filtro por Status:**
- Todos
- Ativos
- Vencendo (próximos 6 meses)
- Vencidos

#### Exportação de Relatórios
- Botão "Exportar Relatório"
- Gera arquivo com todos os dados contratuais
- Útil para auditorias e planejamento

---

## 🎨 Design e Interface

### Paleta de Cores

**Cores de Status:**
- 🟢 **Verde**: Contratos ativos, valores positivos
- 🟡 **Amarelo/Âmbar**: Alertas de vencimento próximo (≤ 6 meses)
- 🔴 **Vermelho**: Contratos vencidos, situações críticas
- 🔵 **Azul**: Informações gerais, contadores

**Background:**
- Gradiente suave: Âmbar 50 → Laranja 50
- Transmite sofisticação e exclusividade
- Dark mode compatível

### Elementos Visuais

**Ícones:**
- Shield (Escudo): Acesso presidencial
- Dollar Sign: Valores financeiros
- Alert Triangle: Alertas e avisos
- Users: Contadores de atletas
- Clock: Tempo restante
- File Text: Documentos e relatórios

**Cards:**
- Bordas laterais coloridas por categoria
- Sombras suaves
- Hover effects em tabelas
- Badges coloridos para status

---

## 📊 Dados Exibidos

### Informações por Atleta

**Dados Básicos:**
- Nome completo
- Foto de perfil
- Categoria (Profissional/Base)
- Posição em campo

**Dados Contratuais:**
- Tipo de contrato
- Valor mensal (R$)
- Data de início
- Data de término
- Meses restantes
- Status atual

**Dados Adicionais:**
- Clubes anteriores
- Telefone de contato

### Cálculos Automáticos

**Meses Restantes:**
```javascript
const calculateRemainingMonths = (endDate) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  return diffMonths;
}
```

**Status do Contrato:**
```javascript
const getContractStatus = (remainingMonths) => {
  if (remainingMonths <= 0) return 'expired';
  if (remainingMonths <= 6) return 'expiring';
  return 'active';
}
```

**Despesas Totais:**
- Mensal: Soma de todos os valores mensais
- Anual: Mensal × 12
- Por categoria: Filtrado e somado

---

## 🔔 Sistema de Alertas

### Lógica de Alertas

#### Alerta de 6 Meses
**Quando Dispara:**
- Contrato com ≤ 6 meses para vencimento
- Cálculo em tempo real baseado na data atual

**Visualização:**
- Banner vermelho no topo do dashboard
- Badge "Vence em 6 meses" nos cards
- Cor amarela na tabela
- Destaque na lista de contratos críticos

#### Alerta de Vencido
**Quando Dispara:**
- Data de término do contrato já passou

**Visualização:**
- Banner vermelho com texto de ação imediata
- Badge "Vencido" em vermelho
- Cor vermelha na tabela
- Prioridade máxima na lista crítica

### Priorização

**Ordem de Criticidade:**
1. Contratos vencidos (ação imediata)
2. Contratos vencendo em ≤ 3 meses
3. Contratos vencendo em 4-6 meses
4. Contratos ativos (> 6 meses)

---

## 💰 Análise Financeira

### Métricas Principais

#### Despesa Mensal Total
- Soma de todos os contratos ativos
- Formatação monetária brasileira (R$)
- Destaque em card verde

#### Projeção Anual
- Cálculo: Mensal × 12
- Útil para orçamento anual
- Exibido como informação secundária

#### Distribuição por Categoria

**Profissional:**
- Maior parte dos gastos (geralmente)
- Contratos de valores mais altos
- Percentual calculado do total

**Categorias de Base:**
- Sub-20 + Sub-17 somados
- Valores menores individualmente
- Importante para desenvolvimento

### Gráficos e Visualizações

**Barras de Progresso:**
- Representação visual dos gastos
- Cores diferenciadas por categoria
- Percentuais claros
- Total destacado

---

## 📱 Responsividade

### Desktop (≥ 1024px)
- Layout completo em grid
- 4 cards de estatísticas por linha
- Tabela com todas as colunas visíveis
- Sidebar completa

### Tablet (768px - 1023px)
- 2 cards de estatísticas por linha
- Tabela responsiva com scroll horizontal
- Filtros em linha

### Mobile (< 768px)
- 1 card por linha (empilhamento)
- Tabela compacta com dados essenciais
- Filtros empilhados verticalmente
- Header compacto

---

## 🔒 Segurança e Confidencialidade

### Acesso Restrito

**Controle:**
- Apenas role 'presidente' tem acesso
- Verificação automática no App.tsx
- Redirecionamento automático após login

**Proteção de Dados:**
- Valores financeiros visíveis apenas ao presidente
- PDFs de contratos protegidos
- Informações de contato sensíveis

### Aviso de Confidencialidade

**Footer do Dashboard:**
- Card destacado em amarelo/âmbar
- Ícone de escudo
- Texto claro sobre confidencialidade:
  > "Este dashboard contém dados financeiros sensíveis e informações contratuais confidenciais. 
  > Acesso exclusivo ao Presidente. Todas as visualizações são registradas para fins de auditoria."

### Auditoria (Futuro)

**Recomendações:**
- Log de todos os acessos ao dashboard
- Registro de visualizações de contratos
- Histórico de exportações de relatórios
- Timestamp de todas as ações

---

## 🚀 Casos de Uso

### 1. Planejamento Financeiro Anual
**Cenário:** Presidente precisa planejar orçamento do próximo ano

**Fluxo:**
1. Acessa dashboard presidencial
2. Visualiza "Despesa Mensal Total"
3. Verifica projeção anual
4. Analisa distribuição por categoria
5. Identifica contratos vencendo para renegociação
6. Exporta relatório para discussão com diretoria

### 2. Renovação de Contratos
**Cenário:** Identificar atletas que precisam de renovação urgente

**Fluxo:**
1. Dashboard mostra alertas críticos no topo
2. Acessa card "Atletas com Contratos Críticos"
3. Visualiza lista ordenada por urgência
4. Filtra por categoria se necessário
5. Clica em "Detalhes" para ver informações completas
6. Inicia processo de renovação

### 3. Auditoria Contratual
**Cenário:** Verificar compliance de todos os contratos

**Fluxo:**
1. Acessa tabela completa de contratos
2. Aplica filtros por status "Vencido"
3. Identifica situações irregulares
4. Exporta relatório para auditoria
5. Toma ações corretivas necessárias

### 4. Análise de Investimento
**Cenário:** Avaliar gastos com elenco por categoria

**Fluxo:**
1. Visualiza card "Distribuição de Despesas"
2. Compara gastos entre Profissional e Base
3. Analisa percentuais e barras de progresso
4. Identifica desequilíbrios ou oportunidades
5. Planeja ajustes estratégicos

---

## 📊 Exemplo de Dados

### Atletas no Sistema

**João Silva - Profissional**
- Atacante
- Contrato: R$ 50.000/mês
- Início: 15/01/2022
- Término: 15/01/2025
- Status: Vencendo (3 meses)
- ⚠️ Alerta: Renovação urgente

**Lucas Ferreira - Profissional**
- Goleiro
- Contrato: R$ 35.000/mês
- Início: 01/06/2023
- Término: 31/12/2024
- Status: Vencendo (2 meses)
- ⚠️ Alerta: Ação imediata

**Carlos Santos - Sub-20**
- Meio-campo
- Contrato: R$ 2.000/mês
- Início: 01/06/2021
- Término: 01/12/2024
- Status: Vencendo (1 mês)
- ⚠️ Alerta: Crítico

**Pedro Oliveira - Sub-17**
- Zagueiro
- Contrato de Formação: R$ 800/mês
- Início: 10/01/2023
- Término: 10/01/2026
- Status: Ativo (14 meses)
- ✅ Normal

### Estatísticas Calculadas

**Total de Atletas:** 6  
**Despesa Mensal:** R$ 117.300  
**Despesa Anual:** R$ 1.407.600  
**Contratos Vencendo:** 3  
**Contratos Vencidos:** 0  

**Distribuição:**
- Profissional: R$ 113.000 (96,3%)
- Base: R$ 4.300 (3,7%)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca principal
- **TypeScript**: Tipagem estática
- **Tailwind CSS v4**: Estilização
- **Shadcn/ui**: Componentes UI

### Componentes Principais
- `Card`: Container de conteúdo
- `Table`: Tabela de dados
- `Badge`: Indicadores visuais
- `Alert`: Avisos e alertas
- `Progress`: Barras de progresso
- `Avatar`: Fotos dos atletas
- `Select`: Filtros dropdown
- `Input`: Busca textual
- `Button`: Ações e interações

### Ícones (Lucide React)
- Shield, DollarSign, AlertTriangle
- Users, Clock, FileText
- TrendingUp, TrendingDown
- CheckCircle2, XCircle
- Eye, Download, Filter

---

## 🔄 Fluxo de Navegação

```
Login (presidente@hopefc.com)
         ↓
[Verificação de Role]
         ↓
Dashboard Presidencial
         ↓
    ┌────┴────┐
    ↓         ↓
Alertas   Estatísticas
Críticos   Gerais
    ↓         ↓
Análise   Tabela
Financeira Completa
    ↓         ↓
Exportar  Ver Detalhes
Relatório  do Atleta
```

---

## 📋 Checklist de Implementação

### ✅ Implementado

- [x] Dashboard exclusivo para presidente
- [x] Sistema de alertas de contratos (6 meses)
- [x] Cards de estatísticas gerais
- [x] Análise financeira com gráficos
- [x] Lista de contratos críticos
- [x] Tabela completa de atletas
- [x] Filtros avançados (busca, categoria, status)
- [x] Cálculo automático de meses restantes
- [x] Coloração por status (verde/amarelo/vermelho)
- [x] Design responsivo
- [x] Avisos de confidencialidade
- [x] Integração com App.tsx
- [x] Botão de logout

### 🔄 Próximas Melhorias

- [ ] Conexão com backend (Supabase)
- [ ] Exportação real de relatórios (PDF/Excel)
- [ ] Gráficos interativos (Recharts)
- [ ] Histórico de renovações
- [ ] Notificações push para alertas
- [ ] Filtro por valor de contrato
- [ ] Comparação ano a ano
- [ ] Dashboard de previsões
- [ ] Sistema de aprovação de renovações
- [ ] Assinatura digital de contratos

---

## 🎓 Melhores Práticas

### Performance
- Cálculos memoizados para listas grandes
- Lazy loading de componentes pesados
- Paginação para tabelas extensas
- Debounce na busca textual

### UX/UI
- Feedback visual imediato
- Loading states para ações
- Mensagens de sucesso/erro (toast)
- Tooltips explicativos
- Animações suaves

### Segurança
- Validação de role no frontend
- Proteção de rotas
- Sanitização de inputs
- Logs de auditoria (backend)

### Manutenibilidade
- Componentes reutilizáveis
- Tipagem TypeScript completa
- Código comentado e documentado
- Separação de lógica e apresentação

---

## 📞 Suporte e Documentação

### Documentos Relacionados
- `/ATUALIZACAO-CADASTRO-ATLETAS.md`: Cadastro completo de atletas
- `/diagrama-classes-uml.md`: Arquitetura do sistema
- `/Checklist-Producao.md`: Lista de produção

### Como Testar

**1. Login como Presidente:**
```
Email: presidente@hopefc.com
Senha: qualquer
```

**2. Navegação:**
- Dashboard carrega automaticamente
- Verifique alertas no topo
- Explore cards de estatísticas
- Teste filtros na tabela
- Experimente busca textual

**3. Validação:**
- Confirme cálculo de meses restantes
- Verifique cores de status
- Teste responsividade (mobile/tablet)
- Valide formatação de valores (R$)

---

## 📈 Métricas de Sucesso

### KPIs do Dashboard

**Eficiência:**
- Tempo para identificar contratos críticos: < 10 segundos
- Número de cliques até ação: ≤ 2
- Tempo de carregamento: < 2 segundos

**Utilização:**
- Acessos por mês pelo presidente
- Exportações de relatórios geradas
- Contratos renovados após alerta

**Impacto:**
- Redução de contratos vencidos não renovados
- Economia em renegociações antecipadas
- Melhor planejamento orçamentário

---

**Última atualização:** 13 de outubro de 2025  
**Versão:** 1.0 - Dashboard Presidencial Inaugural  
**Desenvolvido para:** Hope Internacional Football Club
