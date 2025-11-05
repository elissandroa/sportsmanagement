// Mock de dados com 330+ atletas distribuídos nas categorias

export interface Athlete {
  id: number;
  name: string;
  position: string;
  category: string;
  age: number;
  height: number;
  weight: number;
  birthDate: string;
  nationality: string;
  cpf: string;
  rg: string;
  passport?: string;
  address: string;
  phone: string;
  email: string;
  bidCBF: string;
  entryDate: string;
  previousClubs: string[];
  photo: string;
  dominantFoot: 'Direito' | 'Esquerdo' | 'Ambidestro';
  secondaryPositions: string[];
  contractType: 'Profissional' | 'Base' | 'Formação';
  contractStart?: string;
  contractEnd?: string;
  salary?: number;
  monthlyFee?: number; // Mensalidade para atletas da base (até 15 anos)
  status: 'Ativo' | 'Lesionado' | 'Suspenso' | 'Emprestado';
  matches: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

const positions = ['Goleiro', 'Zagueiro', 'Lateral Direito', 'Lateral Esquerdo', 'Volante', 'Meio-campo', 'Atacante', 'Ponta'];
const nationalities = ['Brasileiro', 'Argentino', 'Uruguaio', 'Paraguaio', 'Colombiano', 'Chileno', 'Peruano'];
const categories = ['Sub-11', 'Sub-12', 'Sub-13', 'Sub-14', 'Sub-15', 'Sub-16', 'Sub-17', 'Sub-18', 'Sub-19', 'Sub-20', 'Profissional'];
const firstNames = ['João', 'Pedro', 'Lucas', 'Gabriel', 'Matheus', 'Rafael', 'Felipe', 'Bruno', 'Gustavo', 'Carlos', 'Diego', 'André', 'Thiago', 'Rodrigo', 'Leonardo', 'Fernando', 'Marcelo', 'Daniel', 'Vinicius', 'Caio', 'Igor', 'Henrique', 'Ricardo', 'Paulo', 'Eduardo', 'Renato', 'Fábio', 'Luiz', 'Marcos', 'Alexandre'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Ferreira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento', 'Araújo', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Ribeiro', 'Barbosa', 'Dias', 'Castro', 'Pinto', 'Moreira', 'Monteiro', 'Cardoso', 'Teixeira', 'Mendes', 'Cavalcanti', 'Reis', 'Correia', 'Pereira', 'Nunes'];
const streets = ['Rua das Flores', 'Av. Paulista', 'Rua Augusta', 'Av. Brasil', 'Rua XV de Novembro', 'Rua da Consolação', 'Av. Rebouças', 'Rua Oscar Freire'];
const previousClubs = ['Corinthians', 'Palmeiras', 'Santos', 'São Paulo', 'Flamengo', 'Vasco', 'Botafogo', 'Fluminense', 'Grêmio', 'Internacional', 'Atlético-MG', 'Cruzeiro', 'Ponte Preta', 'Guarani', 'Portuguesa'];

const generateCPF = (id: number): string => {
  const base = String(id).padStart(9, '0');
  return `${base.slice(0, 3)}.${base.slice(3, 6)}.${base.slice(6, 9)}-${(id % 100).toString().padStart(2, '0')}`;
};

const generateRG = (id: number): string => {
  const base = String(id).padStart(8, '0');
  return `${base.slice(0, 2)}.${base.slice(2, 5)}.${base.slice(5, 8)}-${(id % 10)}`;
};

const generateBID = (id: number): string => {
  return `BID${String(id).padStart(7, '0')}`;
};

const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCategoryAge = (category: string): { min: number; max: number } => {
  const ageMap: { [key: string]: { min: number; max: number } } = {
    'Sub-11': { min: 9, max: 11 },
    'Sub-12': { min: 10, max: 12 },
    'Sub-13': { min: 11, max: 13 },
    'Sub-14': { min: 12, max: 14 },
    'Sub-15': { min: 13, max: 15 },
    'Sub-16': { min: 14, max: 16 },
    'Sub-17': { min: 15, max: 17 },
    'Sub-18': { min: 16, max: 18 },
    'Sub-19': { min: 17, max: 19 },
    'Sub-20': { min: 18, max: 20 },
    'Profissional': { min: 18, max: 35 }
  };
  return ageMap[category] || { min: 18, max: 35 };
};

const generateBirthDate = (age: number): string => {
  const year = new Date().getFullYear() - age;
  const month = getRandomNumber(1, 12);
  const day = getRandomNumber(1, 28);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const generateContractDates = (category: string): { start: string; end: string } | { start?: undefined; end?: undefined } => {
  if (category === 'Profissional') {
    const startYear = getRandomNumber(2020, 2024);
    const endYear = startYear + getRandomNumber(2, 5);
    return {
      start: `${startYear}-01-01`,
      end: `${endYear}-12-31`
    };
  }
  return {};
};

const generateAthletes = (): Athlete[] => {
  const athletes: Athlete[] = [];
  let id = 1;

  // Distribuir atletas por categoria (30 atletas por categoria)
  categories.forEach(category => {
    const athletesPerCategory = category === 'Profissional' ? 35 : 30;
    
    for (let i = 0; i < athletesPerCategory; i++) {
      const ageRange = getCategoryAge(category);
      const age = getRandomNumber(ageRange.min, ageRange.max);
      const position = getRandomItem(positions);
      const contractDates = generateContractDates(category);
      const isProfessional = category === 'Profissional';
      
      athletes.push({
        id,
        name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        position,
        category,
        age,
        height: getRandomNumber(160, 195),
        weight: getRandomNumber(60, 90),
        birthDate: generateBirthDate(age),
        nationality: getRandomItem(nationalities),
        cpf: generateCPF(id),
        rg: generateRG(id),
        passport: Math.random() > 0.7 ? `BR${String(id).padStart(8, '0')}` : undefined,
        address: `${getRandomItem(streets)}, ${getRandomNumber(100, 9999)} - São Paulo, SP`,
        phone: `(11) ${getRandomNumber(90000, 99999)}-${getRandomNumber(1000, 9999)}`,
        email: `atleta${id}@hopefc.com.br`,
        bidCBF: generateBID(id),
        entryDate: `${getRandomNumber(2018, 2024)}-${String(getRandomNumber(1, 12)).padStart(2, '0')}-01`,
        previousClubs: Math.random() > 0.5 ? [getRandomItem(previousClubs)] : [],
        photo: `https://ui-avatars.com/api/?name=${firstNames[id % firstNames.length]}+${lastNames[id % lastNames.length]}&size=200&background=random`,
        dominantFoot: getRandomItem(['Direito', 'Esquerdo', 'Ambidestro'] as const),
        secondaryPositions: [getRandomItem(positions.filter(p => p !== position))],
        contractType: isProfessional ? 'Profissional' : (Math.random() > 0.5 ? 'Base' : 'Formação'),
        contractStart: contractDates.start,
        contractEnd: contractDates.end,
        salary: isProfessional ? getRandomNumber(5000, 150000) : undefined,
        monthlyFee: !isProfessional && age <= 15 ? 120.00 : undefined,
        status: getRandomItem(['Ativo', 'Ativo', 'Ativo', 'Ativo', 'Lesionado', 'Suspenso'] as const),
        matches: isProfessional ? getRandomNumber(50, 300) : getRandomNumber(10, 100),
        goals: position.includes('Atacante') || position.includes('Ponta') ? getRandomNumber(5, 50) : getRandomNumber(0, 15),
        assists: position.includes('Meio-campo') || position.includes('Ponta') ? getRandomNumber(5, 40) : getRandomNumber(0, 10),
        yellowCards: getRandomNumber(0, 20),
        redCards: getRandomNumber(0, 3),
        minutesPlayed: isProfessional ? getRandomNumber(2000, 15000) : getRandomNumber(500, 5000)
      });
      
      id++;
    }
  });

  return athletes;
};

export const mockAthletes = generateAthletes();

// Função para buscar atletas por categoria
export const getAthletesByCategory = (category: string): Athlete[] => {
  return mockAthletes.filter(athlete => athlete.category === category);
};

// Função para buscar atleta por ID
export const getAthleteById = (id: number): Athlete | undefined => {
  return mockAthletes.find(athlete => athlete.id === id);
};

// Função para buscar atletas por posição
export const getAthletesByPosition = (position: string): Athlete[] => {
  return mockAthletes.filter(athlete => athlete.position === position);
};

// Estatísticas gerais
export const getAthletesStats = () => {
  const totalAthletes = mockAthletes.length;
  const activeAthletes = mockAthletes.filter(a => a.status === 'Ativo').length;
  const injuredAthletes = mockAthletes.filter(a => a.status === 'Lesionado').length;
  const suspendedAthletes = mockAthletes.filter(a => a.status === 'Suspenso').length;
  
  const categoriesStats = categories.map(category => ({
    category,
    count: mockAthletes.filter(a => a.category === category).length
  }));

  return {
    totalAthletes,
    activeAthletes,
    injuredAthletes,
    suspendedAthletes,
    categoriesStats
  };
};