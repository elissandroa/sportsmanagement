# Diagrama de Classes UML - Sistema de Gestão Esportiva Hope Internacional Football Club

```mermaid
classDiagram
    %% Classe principal User (Sistema de autenticação)
    class User {
        +int id
        +string email
        +string password
        +string name
        +UserRole role
        +string category
        +boolean active
        +DateTime createdAt
        +DateTime updatedAt
        +login(email, password) boolean
        +logout() void
        +hasPermission(permission) boolean
        +canAccessCategory(category) boolean
    }

    %% Enum para roles de usuário
    class UserRole {
        <<enumeration>>
        PRESIDENTE
        TREINADOR
        PREPARADOR_FISICO
        AUXILIAR_TECNICO
        GERENTE
        SUPERVISOR
        ANALISTA
        ATLETA
        MEDICO
    }

    %% Atleta - entidade central expandida
    class Athlete {
        +int id
        +string name
        +string photo
        +string position
        +string[] positions
        +Date birthDate
        +string category
        +int jerseyNumber
        +float height
        +float weight
        +string preferredFoot
        +boolean active
        
        %% Documentos pessoais
        +string cpf
        +string rg
        +string passport
        +string bidCBF
        
        %% Contato
        +string phone
        +Address address
        
        %% Histórico profissional
        +Date joinDate
        +string[] previousClubs
        
        %% Contratos (sensível)
        +ContractType contractType
        +ProfessionalContract professionalContract
        +BaseContract baseContract
        +FormationContract formationContract
        
        +DateTime createdAt
        +DateTime updatedAt
        +getAge() int
        +getStatistics() AthleteStatistics
        +getMedicalHistory() MedicalRecord[]
        +getPSEHistory() PSE[]
        +getPSRHistory() PSR[]
        +getContractDetails() Contract
    }
    
    %% Endereço do atleta
    class Address {
        +string street
        +string number
        +string complement
        +string neighborhood
        +string city
        +string state
        +string zipCode
    }
    
    %% Tipo de contrato
    class ContractType {
        <<enumeration>>
        PROFESSIONAL
        BASE_WITH_CONTRACT
        FORMATION
        NONE
    }
    
    %% Contrato profissional
    class ProfessionalContract {
        +boolean hasContract
        +float value
        +string duration
        +Date startDate
        +Date endDate
        +string contractPDF
        +calculateMonthsRemaining() int
        +isExpiringSoon() boolean
    }
    
    %% Contrato de base
    class BaseContract {
        +boolean hasContract
        +float value
        +string duration
        +Date startDate
        +Date endDate
        +string contractPDF
        +calculateMonthsRemaining() int
        +isExpiringSoon() boolean
    }
    
    %% Contrato de formação
    class FormationContract {
        +boolean hasContract
        +boolean hasAllowance
        +float allowanceValue
        +string duration
        +Date startDate
        +Date endDate
        +string contractPDF
        +calculateMonthsRemaining() int
        +isExpiringSoon() boolean
    }

    %% Estatísticas do atleta
    class AthleteStatistics {
        +int athleteId
        +int matchesPlayed
        +int minutesPlayed
        +int goals
        +int assists
        +int yellowCards
        +int redCards
        +int injuries
        +float averagePSE
        +float averagePSR
        +DateTime lastUpdated
        +calculateTotalMinutes() int
        +getCardsPenalties() Penalty[]
    }

    %% Partidas
    class Match {
        +int id
        +string opponent
        +Date matchDate
        +string venue
        
        +string competition
        +string category
        +string result
        +int goalsFor
        +int goalsAgainst
        +MatchStatus status
        +DateTime createdAt
        +DateTime updatedAt
        +getMatchAnalysis() MatchAnalysis
        +getPlayerStats() MatchPlayerStats[]
        +isFinished() boolean
    }

    %% Status da partida
    class MatchStatus {
        <<enumeration>>
        AGENDADA
        EM_ANDAMENTO
        FINALIZADA
        CANCELADA
        ADIADA
    }

    %% Análise detalhada da partida
    class MatchAnalysis {
        +int id
        +int matchId
        +int passes
        +int passesCompletos
        +float passAccuracy
        +int finalizations
        +int finalizationsOnTarget
        +int longBalls
        +int longBallsCompleted
        +int corners
        +int crosses
        +int crossesCompleted
        +int duels
        +int duelsWon
        +int fouls
        +float ballPossession
        +string pressureAfterLoss
        +string observations
        +DateTime analyzedAt
        +int analyzedBy
        +generateReport() MatchReport
        +calculatePercentages() void
        +exportToCSV() string
    }

    %% Relatório da partida
    class MatchReport {
        +int id
        +int matchAnalysisId
        +string reportData
        +string chartData
        +DateTime generatedAt
        +string format
        +generateCharts() ChartData[]
        +exportPDF() string
    }

    %% Estatísticas individuais na partida
    class MatchPlayerStats {
        +int id
        +int matchId
        +int athleteId
        +int minutesPlayed
        +int goals
        +int assists
        +int yellowCards
        +int redCards
        +int passes
        +int passesCompleted
        +int tackles
        +int interceptions
        +DateTime recordedAt
    }

    %% PSE (Percepção Subjetiva de Esforço)
    class PSE {
        +int id
        +int athleteId
        +Date date
        +int value
        +string observations
        +int recordedBy
        +DateTime createdAt
        +boolean isValid()
        +getWeeklyAverage() float
        +getMonthlyTrend() float[]
    }

    %% PSR (Percepção Subjetiva de Recuperação)
    class PSR {
        +int id
        +int athleteId
        +Date date
        +int value
        +string observations
        +int recordedBy
        +DateTime createdAt
        +boolean isValid()
        +getWeeklyAverage() float
        +getRecoveryTrend() float[]
    }

    %% Departamento médico
    class MedicalRecord {
        +int id
        +int athleteId
        +InjuryType type
        +string bodyPart
        +string description
        +Date injuryDate
        +Date expectedReturn
        +Date actualReturn
        +InjuryStatus status
        +string treatment
        +int treatedBy
        +DateTime createdAt
        +DateTime updatedAt
        +getDaysOut() int
        +isRecovered() boolean
        +updateStatus(status) void
    }

    %% Tipo de lesão
    class InjuryType {
        <<enumeration>>
        MUSCULAR
        ARTICULAR
        OSSEA
        LIGAMENTAR
        CONTUSAO
        OUTROS
    }

    %% Status da lesão
    class InjuryStatus {
        <<enumeration>>
        ATIVA
        EM_TRATAMENTO
        RECUPERADO
        RECIDIVA
    }

    %% Punições/cartões
    class Penalty {
        +int id
        +int athleteId
        +int matchId
        +PenaltyType type
        +string reason
        +Date date
        +int suspensionGames
        +boolean served
        +DateTime createdAt
    }

    %% Tipo de punição
    class PenaltyType {
        <<enumeration>>
        CARTAO_AMARELO
        CARTAO_VERMELHO
        SUSPENSAO
        MULTA
    }

    %% Gestão de materiais
    class Material {
        +int id
        +string name
        +MaterialType type
        +string category
        +int quantity
        +string size
        +string condition
        +Date purchaseDate
        +float costtp
        +string supplier
        +boolean available
        +DateTime createdAt
        +DateTime updatedAt
        +updateQuantity(quantity) void
        +markAsUnavailable() void
        +getUsageHistory() MaterialUsage[]
    }

    %% Tipo de material
    class MaterialType {
        <<enumeration>>
        UNIFORME
        EQUIPAMENTO_TREINO
        BOLA
        CONE
        OUTROS
    }

    %% Uso de material
    class MaterialUsage {
        +int id
        +int materialId
        +int athleteId
        +Date usageDate
        +Date returnDate
        +string condition
        +string observations
        +DateTime createdAt
    }

    %% Competições
    class Competition {
        +int id
        +string name
        +string category
        +Date startDate
        +Date endDate
        +CompetitionType type
        +string regulations
        +boolean active
        +DateTime createdAt
        +getMatches() Match[]
        +getStandings() Standing[]
    }

    %% Tipo de competição
    class CompetitionType {
        <<enumeration>>
        CAMPEONATO
        COPA
        TORNEIO
        AMISTOSO
    }

    %% Adversários
    class Opponent {
        +int id
        +string name
        +string category
        +string city
        +string state
        +string stadium
        +string logo
        +DateTime createdAt
        +DateTime updatedAt
        +getMatchHistory() Match[]
        +getWinRate() float
    }

    %% Agendamento de treinos
    class Training {
        +int id
        +int trainingNumber
        +Date date
        +string time
        +int mesocycleNumber
        +int microcycleNumber
        +int macrocycleNumber
        +int playerCount
        +string objective
        +string category
        +int scheduledBy
        +TrainingStatus status
        +DateTime createdAt
        +DateTime updatedAt
        +getAttendance() TrainingAttendance[]
        +updateStatus(status) void
    }

    %% Status do treino
    class TrainingStatus {
        <<enumeration>>
        AGENDADO
        EM_ANDAMENTO
        CONCLUIDO
        CANCELADO
    }

    %% Presença no treino
    class TrainingAttendance {
        +int id
        +int trainingId
        +int athleteId
        +boolean present
        +string observations
        +DateTime recordedAt
    }

    %% Staff técnico
    class Staff {
        +int id
        +string name
        +string role
        +string category
        +string phone
        +string email
        +Date hireDate
        +boolean active
        +DateTime createdAt
        +DateTime updatedAt
        +getPermissions() Permission[]
    }

    %% Permissões
    class Permission {
        +int id
        +string name
        +string description
        +string module
        +boolean active
    }

    %% Relacionamentos principais
    User ||--o{ UserRole : has
    User ||--o{ Staff : "can be"
    User ||--o{ Athlete : "can be"

    Athlete ||--|| Address : has
    Athlete ||--o{ ContractType : has
    Athlete ||--o| ProfessionalContract : "may have"
    Athlete ||--o| BaseContract : "may have"
    Athlete ||--o| FormationContract : "may have"
    Athlete ||--o{ AthleteStatistics : has
    Athlete ||--o{ PSE : records
    Athlete ||--o{ PSR : records
    Athlete ||--o{ MedicalRecord : has
    Athlete ||--o{ Penalty : receives
    Athlete ||--o{ MatchPlayerStats : plays
    Athlete ||--o{ MaterialUsage : uses
    Athlete ||--o{ TrainingAttendance : attends

    Match ||--o{ MatchAnalysis : has
    Match ||--o{ MatchPlayerStats : contains
    Match ||--o{ MatchReport : generates
    Match }o--|| Opponent : against
    Match }o--|| Competition : "part of"

    MatchAnalysis ||--o{ MatchReport : generates

    MedicalRecord ||--o{ InjuryType : has
    MedicalRecord ||--o{ InjuryStatus : has

    Penalty ||--o{ PenaltyType : has

    Material ||--o{ MaterialType : has
    Material ||--o{ MaterialUsage : tracks

    Competition ||--o{ CompetitionType : has
    Competition ||--o{ Match : contains

    Training ||--o{ TrainingStatus : has
    Training ||--o{ TrainingAttendance : has

    Staff ||--o{ Permission : has
    Staff ||--o{ PSE : records
    Staff ||--o{ PSR : records
    Staff ||--o{ Training : schedules
    Staff ||--o{ MatchAnalysis : performs
```

## Descrição das Classes Principais

### 1. **User (Usuário)**

- Classe central do sistema de autenticação
- Controla acesso baseado em roles e categorias
- Integra com todas as funcionalidades do sistema

### 2. **Athlete (Atleta)** - EXPANDIDO

- Entidade principal do sistema com dados completos
- **Dados Pessoais**: Nome, foto, posições, perna dominante
- **Documentos**: CPF, RG, Passaporte, BID CBF
- **Contato**: Telefone e endereço completo
- **Histórico**: Data de entrada e clubes anteriores
- **Contratos** (Sensível - PRESIDENTE):
  - Contrato Profissional (valor, duração, PDF)
  - Contrato de Base (valor, duração, PDF)
  - Contrato de Formação (ajuda de custo, duração, PDF)
- Conecta-se com estatísticas, PSE/PSR, histórico médico

### 3. **Match (Partida)**

- Representa jogos e competições
- Conecta-se com análises detalhadas e estatísticas
- Integra com sistema de relatórios

### 4. **MatchAnalysis (Análise de Partida)**

- Armazena dados estatísticos avançados
- Gera relatórios automáticos com gráficos
- Suporte a importação CSV

### 5. **PSE/PSR**

- Controle de percepção subjetiva
- Alimentado pelos preparadores físicos
- Gera tendências e médias

### 6. **MedicalRecord (Registro Médico)**

- Histórico de lesões completo
- Previsões de retorno
- Mapeamento corporal integrado

### 7. **Material**

- Gestão de equipamentos e uniformes
- Controle de uso e disponibilidade
- Histórico de utilização

### 8. **Training (Treino)**

- Agendamento semanal de treinos
- Controle de mesociclos/microciclos
- Sistema de presença integrado

### 9. **Competition/Opponent**

- Gestão de competições e adversários
- Histórico de confrontos
- Estatísticas de desempenho

### 10. **Staff**

- Gerenciamento de equipe técnica
- Sistema de permissões granular
- Controle de acesso por categoria

## Características do Sistema

- **Controle de Acesso Hierárquico**: 
  - **PRESIDENTE**: Acesso total + dados sensíveis (contratos, valores)
  - **GERENTE/SUPERVISOR**: Acesso total exceto dados sensíveis
  - **TREINADOR/PREPARADOR/ANALISTA**: Acesso por categoria
  - **ATLETA**: Acesso apenas ao próprio perfil
- **Dados Sensíveis Protegidos**: Informações contratuais e financeiras restritas
- **Cadastro Completo de Atletas**: Documentos, endereço, histórico profissional
- **Gestão Contratual**: Três tipos de contrato com upload de PDF
- **Categorias Separadas**: Base e profissional com acessos distintos
- **Integração Completa**: Todas as entidades se relacionam de forma coesa
- **Relatórios Avançados**: Sistema de análise com gráficos interativos
- **Flexibilidade**: Suporte a diferentes tipos de dados e configurações
- **Auditoria**: Timestamps em todas as entidades principais