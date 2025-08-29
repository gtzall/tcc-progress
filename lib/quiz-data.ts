export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
  difficulty: 'facil' | 'medio' | 'dificil'
  subject: string
  university?: string
  year?: number
  source?: string
}

export interface Subject {
  name: string
  topics: string[]
  icon: string
  color: string
}

export interface University {
  name: string
  shortName: string
  color: string
  icon: string
}

export const subjects: Subject[] = [
  {
    name: "Matemática",
    topics: ["Álgebra", "Geometria", "Trigonometria", "Cálculo", "Estatística", "Probabilidade", "Análise Combinatória", "Logaritmos", "Funções", "Matrizes", "Vetores", "Números Complexos"],
    icon: "🧮",
    color: "bg-blue-500"
  },
  {
    name: "Física",
    topics: ["Mecânica", "Termodinâmica", "Óptica", "Eletromagnetismo", "Ondas", "Física Moderna", "Hidrostática", "Cinemática", "Dinâmica", "Energia", "Gravitação", "Fluidos"],
    icon: "⚡",
    color: "bg-purple-500"
  },
  {
    name: "Química",
    topics: ["Química Geral", "Química Orgânica", "Química Inorgânica", "Físico-Química", "Bioquímica", "Estequiometria", "Equilíbrio Químico", "Cinética Química", "Eletroquímica", "Radioatividade", "Polímeros", "Química Ambiental"],
    icon: "🧪",
    color: "bg-green-500"
  },
  {
    name: "Biologia",
    topics: ["Citologia", "Genética", "Evolução", "Ecologia", "Fisiologia", "Anatomia", "Microbiologia", "Botânica", "Zoologia", "Biologia Molecular", "Imunologia", "Neurobiologia"],
    icon: "🧬",
    color: "bg-emerald-500"
  },
  {
    name: "História",
    topics: ["História Antiga", "História Medieval", "História Moderna", "História Contemporânea", "História do Brasil", "História da América", "História da África", "História da Ásia", "História da Europa", "História da Arte", "História Militar", "História Econômica"],
    icon: "📚",
    color: "bg-amber-500"
  },
  {
    name: "Geografia",
    topics: ["Geografia Física", "Geografia Humana", "Geografia Econômica", "Geografia Política", "Geografia Regional", "Cartografia", "Climatologia", "Geologia", "Hidrografia", "Urbanização", "Globalização", "Meio Ambiente"],
    icon: "🌍",
    color: "bg-teal-500"
  },
  {
    name: "Português",
    topics: ["Gramática", "Literatura", "Interpretação de Texto", "Redação", "Fonética", "Morfologia", "Sintaxe", "Semântica", "Figuras de Linguagem", "Gêneros Textuais", "Análise Textual", "Produção Textual"],
    icon: "📝",
    color: "bg-red-500"
  },
  {
    name: "Inglês",
    topics: ["Gramática", "Vocabulário", "Interpretação de Texto", "Conversação", "Pronúncia", "Tempos Verbais", "Preposições", "Conectivos", "Phrasal Verbs", "Idiomas", "Business English", "Academic English"],
    icon: "🇺🇸",
    color: "bg-indigo-500"
  },
  {
    name: "Filosofia",
    topics: ["Filosofia Antiga", "Filosofia Medieval", "Filosofia Moderna", "Filosofia Contemporânea", "Ética", "Epistemologia", "Metafísica", "Lógica", "Filosofia Política", "Filosofia da Mente", "Filosofia da Ciência", "Estética"],
    icon: "🤔",
    color: "bg-slate-500"
  },
  {
    name: "Sociologia",
    topics: ["Teoria Sociológica", "Sociologia Urbana", "Sociologia Rural", "Sociologia Política", "Sociologia Econômica", "Sociologia da Educação", "Sociologia da Família", "Sociologia do Trabalho", "Sociologia da Religião", "Sociologia da Cultura", "Sociologia da Juventude", "Sociologia da Violência"],
    icon: "🏛️",
    color: "bg-orange-500"
  }
]

export const universities: University[] = [
  {
    name: "ENEM",
    shortName: "ENEM",
    color: "bg-yellow-500",
    icon: "🎯"
  },
  {
    name: "FUVEST",
    shortName: "FUVEST",
    color: "bg-blue-600",
    icon: "🎓"
  },
  {
    name: "USP",
    shortName: "USP",
    color: "bg-red-600",
    icon: "🏛️"
  },
  {
    name: "UNICAMP",
    shortName: "UNICAMP",
    color: "bg-green-600",
    icon: "🔬"
  },
  {
    name: "UNESP",
    shortName: "UNESP",
    color: "bg-purple-600",
    icon: "📚"
  },
  {
    name: "ITA",
    shortName: "ITA",
    color: "bg-gray-700",
    icon: "🚀"
  },
  {
    name: "IME",
    shortName: "IME",
    color: "bg-indigo-600",
    icon: "⚔️"
  },
  {
    name: "Escola Naval",
    shortName: "EN",
    color: "bg-blue-800",
    icon: "⚓"
  }
]

// Banco de questões extenso - Matemática
export const mathQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-math-001",
    question: "Uma empresa de telefonia cobra R$ 0,50 por minuto de ligação local e R$ 0,30 por minuto de ligação para celular. Se uma pessoa fez 20 minutos de ligação local e 15 minutos para celular, quanto ela pagou?",
    options: ["R$ 14,50", "R$ 15,00", "R$ 15,50", "R$ 16,00"],
    correctAnswer: 0,
    explanation: "20 × R$ 0,50 + 15 × R$ 0,30 = R$ 10,00 + R$ 4,50 = R$ 14,50",
    topic: "Álgebra",
    difficulty: "facil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-002",
    question: "Qual é a área de um círculo com raio de 5 cm? (Use π = 3,14)",
    options: ["78,5 cm²", "31,4 cm²", "15,7 cm²", "25 cm²"],
    correctAnswer: 0,
    explanation: "A = πr² = 3,14 × 5² = 3,14 × 25 = 78,5 cm²",
    topic: "Geometria",
    difficulty: "facil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-003",
    question: "Quanto é 15% de 200?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 2,
    explanation: "15% de 200 = 0,15 × 200 = 30",
    topic: "Álgebra",
    difficulty: "facil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-004",
    question: "Qual é o perímetro de um quadrado com lado de 8 cm?",
    options: ["16 cm", "24 cm", "32 cm", "64 cm"],
    correctAnswer: 2,
    explanation: "Perímetro = 4 × lado = 4 × 8 = 32 cm",
    topic: "Geometria",
    difficulty: "facil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-005",
    question: "Qual é o resultado de 2³ × 3²?",
    options: ["36", "72", "108", "144"],
    correctAnswer: 1,
    explanation: "2³ × 3² = 8 × 9 = 72",
    topic: "Álgebra",
    difficulty: "facil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  // ENEM - Médio
  {
    id: "enem-math-006",
    question: "Uma função quadrática f(x) = ax² + bx + c tem vértice no ponto (2, -4) e passa pelo ponto (0, 0). Qual é o valor de a?",
    options: ["1", "2", "-1", "-2"],
    correctAnswer: 0,
    explanation: "f(0) = 0 → c = 0. Vértice em x = 2 → -b/(2a) = 2 → b = -4a. f(2) = -4 → 4a + 2b = -4 → 4a + 2(-4a) = -4 → 4a - 8a = -4 → -4a = -4 → a = 1",
    topic: "Funções",
    difficulty: "medio",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-007",
    question: "Qual é a soma dos ângulos internos de um hexágono?",
    options: ["540°", "720°", "900°", "1080°"],
    correctAnswer: 1,
    explanation: "Soma dos ângulos internos = (n-2) × 180° = (6-2) × 180° = 4 × 180° = 720°",
    topic: "Geometria",
    difficulty: "medio",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-008",
    question: "Qual é o valor de sen(60°)?",
    options: ["1/2", "√2/2", "√3/2", "1"],
    correctAnswer: 2,
    explanation: "sen(60°) = √3/2",
    topic: "Trigonometria",
    difficulty: "medio",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  // ENEM - Difícil
  {
    id: "enem-math-009",
    question: "Em uma progressão aritmética, o primeiro termo é 3 e a razão é 5. Qual é a soma dos 20 primeiros termos?",
    options: ["1000", "1010", "1020", "1030"],
    correctAnswer: 1,
    explanation: "a₁ = 3, r = 5. Sₙ = n(a₁ + aₙ)/2. a₂₀ = a₁ + 19r = 3 + 19×5 = 98. S₂₀ = 20(3 + 98)/2 = 20×101/2 = 1010",
    topic: "Progressões",
    difficulty: "dificil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-math-010",
    question: "Qual é a derivada da função f(x) = x³ + 2x² - 5x + 3?",
    options: ["3x² + 4x - 5", "3x² + 2x - 5", "x² + 4x - 5", "3x² + 4x"],
    correctAnswer: 0,
    explanation: "f'(x) = 3x² + 4x - 5",
    topic: "Cálculo",
    difficulty: "dificil",
    subject: "Matemática",
    university: "ENEM",
    year: 2023
  },
  // FUVEST - Fácil
  {
    id: "fuvest-math-001",
    question: "Qual é o valor de log₂(8)?",
    options: ["2", "3", "4", "8"],
    correctAnswer: 1,
    explanation: "log₂(8) = x → 2ˣ = 8 → 2ˣ = 2³ → x = 3",
    topic: "Logaritmos",
    difficulty: "facil",
    subject: "Matemática",
    university: "FUVEST",
    year: 2023
  },
  {
    id: "fuvest-math-002",
    question: "Qual é a área de um triângulo com base 6 cm e altura 8 cm?",
    options: ["12 cm²", "24 cm²", "48 cm²", "96 cm²"],
    correctAnswer: 1,
    explanation: "A = (base × altura)/2 = (6 × 8)/2 = 48/2 = 24 cm²",
    topic: "Geometria",
    difficulty: "facil",
    subject: "Matemática",
    university: "FUVEST",
    year: 2023
  },
  // FUVEST - Médio
  {
    id: "fuvest-math-003",
    question: "Seja A uma matriz 2×2 tal que A² = A. Se A ≠ 0 e A ≠ I, então det(A) é igual a:",
    options: ["0", "1", "-1", "2"],
    correctAnswer: 0,
    explanation: "Se A² = A, então A(A - I) = 0. Como A ≠ 0 e A ≠ I, temos que det(A) = 0 ou det(A - I) = 0. Mas se det(A - I) = 0, então A = I, contradição. Logo det(A) = 0",
    topic: "Matrizes",
    difficulty: "medio",
    subject: "Matemática",
    university: "FUVEST",
    year: 2023
  },
  // FUVEST - Difícil
  {
    id: "fuvest-math-004",
    question: "Considere a função f(x) = x³ - 3x + 1. O número de raízes reais da equação f(x) = 0 é:",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation: "f'(x) = 3x² - 3 = 3(x² - 1). Pontos críticos: x = ±1. f(-1) = -1 + 3 + 1 = 3, f(1) = 1 - 3 + 1 = -1. Como f(-∞) = -∞ e f(+∞) = +∞, há 3 raízes reais",
    topic: "Cálculo",
    difficulty: "dificil",
    subject: "Matemática",
    university: "FUVEST",
    year: 2023
  },
  // USP - Fácil
  {
    id: "usp-math-001",
    question: "Qual é o valor de sen(30°)?",
    options: ["1/2", "√2/2", "√3/2", "1"],
    correctAnswer: 0,
    explanation: "sen(30°) = 1/2",
    topic: "Trigonometria",
    difficulty: "facil",
    subject: "Matemática",
    university: "USP",
    year: 2023
  },
  // USP - Médio
  {
    id: "usp-math-002",
    question: "Se z = 3 + 4i é um número complexo, qual é o módulo de z?",
    options: ["5", "7", "12", "25"],
    correctAnswer: 0,
    explanation: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5",
    topic: "Números Complexos",
    difficulty: "medio",
    subject: "Matemática",
    university: "USP",
    year: 2023
  },
  // USP - Difícil
  {
    id: "usp-math-003",
    question: "Qual é a derivada da função f(x) = eˣ × sen(x)?",
    options: ["eˣ × cos(x)", "eˣ × (sen(x) + cos(x))", "eˣ × (sen(x) - cos(x))", "eˣ × (2sen(x))"],
    correctAnswer: 1,
    explanation: "f'(x) = eˣ × sen(x) + eˣ × cos(x) = eˣ × (sen(x) + cos(x))",
    topic: "Cálculo",
    difficulty: "dificil",
    subject: "Matemática",
    university: "USP",
    year: 2023
  }
]

// Banco de questões - Física
export const physicsQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-physics-001",
    question: "Um carro parte do repouso e atinge a velocidade de 20 m/s em 10 segundos. Qual é a aceleração média do carro?",
    options: ["1 m/s²", "2 m/s²", "5 m/s²", "10 m/s²"],
    correctAnswer: 1,
    explanation: "a = Δv/Δt = (20 - 0)/10 = 2 m/s²",
    topic: "Cinemática",
    difficulty: "facil",
    subject: "Física",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-physics-002",
    question: "Qual é a unidade de medida da força no Sistema Internacional?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: 1,
    explanation: "A unidade de força no SI é o Newton (N)",
    topic: "Mecânica",
    difficulty: "facil",
    subject: "Física",
    university: "ENEM",
    year: 2023
  },
  // ENEM - Médio
  {
    id: "enem-physics-003",
    question: "Uma força de 50 N é aplicada a um objeto de massa 10 kg. Qual é a aceleração resultante?",
    options: ["2 m/s²", "5 m/s²", "10 m/s²", "50 m/s²"],
    correctAnswer: 1,
    explanation: "F = ma → a = F/m = 50/10 = 5 m/s²",
    topic: "Dinâmica",
    difficulty: "medio",
    subject: "Física",
    university: "ENEM",
    year: 2023
  },
  // FUVEST - Difícil
  {
    id: "fuvest-physics-001",
    question: "Um bloco de massa m desliza sobre um plano inclinado de ângulo θ. Se o coeficiente de atrito cinético é μ, qual é a aceleração do bloco?",
    options: ["g(senθ - μcosθ)", "g(senθ + μcosθ)", "g(cosθ - μsenθ)", "g(cosθ + μsenθ)"],
    correctAnswer: 0,
    explanation: "a = g(senθ - μcosθ), onde g é a aceleração da gravidade",
    topic: "Dinâmica",
    difficulty: "dificil",
    subject: "Física",
    university: "FUVEST",
    year: 2023
  }
]

// Banco de questões - Química
export const chemistryQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-chemistry-001",
    question: "Qual é a fórmula molecular da água?",
    options: ["H₂O", "CO₂", "O₂", "H₂"],
    correctAnswer: 0,
    explanation: "A água é composta por dois átomos de hidrogênio e um átomo de oxigênio: H₂O",
    topic: "Química Geral",
    difficulty: "facil",
    subject: "Química",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-chemistry-002",
    question: "Qual é o símbolo químico do carbono?",
    options: ["C", "Ca", "Co", "Cu"],
    correctAnswer: 0,
    explanation: "O símbolo químico do carbono é C",
    topic: "Química Geral",
    difficulty: "facil",
    subject: "Química",
    university: "ENEM",
    year: 2023
  },
  // FUVEST - Médio
  {
    id: "fuvest-chemistry-001",
    question: "Qual é o pH de uma solução 0,01 mol/L de HCl?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "pH = -log[H⁺] = -log(0,01) = -log(10⁻²) = 2",
    topic: "Físico-Química",
    difficulty: "medio",
    subject: "Química",
    university: "FUVEST",
    year: 2023
  }
]

// Banco de questões - Biologia
export const biologyQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-biology-001",
    question: "Qual organela é responsável pela produção de energia na célula?",
    options: ["Mitocôndria", "Núcleo", "Lisossomo", "Retículo Endoplasmático"],
    correctAnswer: 0,
    explanation: "A mitocôndria é a organela responsável pela respiração celular e produção de ATP",
    topic: "Citologia",
    difficulty: "facil",
    subject: "Biologia",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-biology-002",
    question: "Qual é o processo pelo qual as plantas produzem seu próprio alimento?",
    options: ["Respiração", "Fotossíntese", "Digestão", "Excreção"],
    correctAnswer: 1,
    explanation: "A fotossíntese é o processo pelo qual as plantas produzem glicose usando luz solar, CO₂ e água",
    topic: "Botânica",
    difficulty: "facil",
    subject: "Biologia",
    university: "ENEM",
    year: 2023
  }
]

// Banco de questões - História
export const historyQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-history-001",
    question: "Em que ano o Brasil se tornou independente de Portugal?",
    options: ["1808", "1822", "1889", "1891"],
    correctAnswer: 1,
    explanation: "O Brasil se tornou independente de Portugal em 7 de setembro de 1822",
    topic: "História do Brasil",
    difficulty: "facil",
    subject: "História",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-history-002",
    question: "Quem foi o primeiro presidente do Brasil?",
    options: ["Deodoro da Fonseca", "Floriano Peixoto", "Prudente de Morais", "Campos Sales"],
    correctAnswer: 0,
    explanation: "Deodoro da Fonseca foi o primeiro presidente do Brasil, de 1889 a 1891",
    topic: "História do Brasil",
    difficulty: "facil",
    subject: "História",
    university: "ENEM",
    year: 2023
  }
]

// Banco de questões - Geografia
export const geographyQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-geography-001",
    question: "Qual é a capital do Brasil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2,
    explanation: "Brasília é a capital federal do Brasil desde 1960",
    topic: "Geografia Política",
    difficulty: "facil",
    subject: "Geografia",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-geography-002",
    question: "Qual é o maior estado do Brasil em território?",
    options: ["Amazonas", "Pará", "Mato Grosso", "Minas Gerais"],
    correctAnswer: 0,
    explanation: "O Amazonas é o maior estado do Brasil em território, com aproximadamente 1,5 milhão de km²",
    topic: "Geografia Regional",
    difficulty: "facil",
    subject: "Geografia",
    university: "ENEM",
    year: 2023
  }
]

// Banco de questões - Português
export const portugueseQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-portuguese-001",
    question: "Qual é a classe gramatical da palavra 'rapidamente'?",
    options: ["Substantivo", "Adjetivo", "Advérbio", "Verbo"],
    correctAnswer: 2,
    explanation: "'Rapidamente' é um advérbio de modo, pois modifica o verbo",
    topic: "Morfologia",
    difficulty: "facil",
    subject: "Português",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-portuguese-002",
    question: "Qual é o plural de 'cidadão'?",
    options: ["cidadãos", "cidadães", "cidadões", "cidadãos"],
    correctAnswer: 0,
    explanation: "O plural de 'cidadão' é 'cidadãos'",
    topic: "Morfologia",
    difficulty: "facil",
    subject: "Português",
    university: "ENEM",
    year: 2023
  }
]

// Banco de questões - Inglês
export const englishQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-english-001",
    question: "What is the past tense of the verb 'to go'?",
    options: ["goed", "went", "gone", "goes"],
    correctAnswer: 1,
    explanation: "The past tense of 'to go' is 'went'",
    topic: "Tempos Verbais",
    difficulty: "facil",
    subject: "Inglês",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-english-002",
    question: "What is the plural of 'child'?",
    options: ["childs", "children", "childes", "child"],
    correctAnswer: 1,
    explanation: "The plural of 'child' is 'children'",
    topic: "Gramática",
    difficulty: "facil",
    subject: "Inglês",
    university: "ENEM",
    year: 2023
  }
]

// Banco de questões - Filosofia
export const philosophyQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-philosophy-001",
    question: "Quem é considerado o pai da filosofia ocidental?",
    options: ["Aristóteles", "Platão", "Sócrates", "Descartes"],
    correctAnswer: 2,
    explanation: "Sócrates é considerado o pai da filosofia ocidental",
    topic: "Filosofia Antiga",
    difficulty: "facil",
    subject: "Filosofia",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-philosophy-002",
    question: "Qual é a obra mais famosa de Platão?",
    options: ["A República", "Ética a Nicômaco", "Meditações", "Discurso do Método"],
    correctAnswer: 0,
    explanation: "A República é a obra mais famosa de Platão",
    topic: "Filosofia Antiga",
    difficulty: "facil",
    subject: "Filosofia",
    university: "ENEM",
    year: 2023
  }
]

// Banco de questões - Sociologia
export const sociologyQuestions: QuizQuestion[] = [
  // ENEM - Fácil
  {
    id: "enem-sociology-001",
    question: "Quem é considerado o pai da sociologia?",
    options: ["Karl Marx", "Émile Durkheim", "Max Weber", "Auguste Comte"],
    correctAnswer: 3,
    explanation: "Auguste Comte é considerado o pai da sociologia",
    topic: "Teoria Sociológica",
    difficulty: "facil",
    subject: "Sociologia",
    university: "ENEM",
    year: 2023
  },
  {
    id: "enem-sociology-002",
    question: "Qual é o conceito de 'fato social' associado a Durkheim?",
    options: ["Ação individual", "Padrão coletivo", "Comportamento biológico", "Fenômeno natural"],
    correctAnswer: 1,
    explanation: "Para Durkheim, fato social é um padrão coletivo que exerce coerção sobre os indivíduos",
    topic: "Teoria Sociológica",
    difficulty: "facil",
    subject: "Sociologia",
    university: "ENEM",
    year: 2023
  }
]

// Banco completo de todas as questões
export const allQuestions: QuizQuestion[] = [
  ...mathQuestions,
  ...physicsQuestions,
  ...chemistryQuestions,
  ...biologyQuestions,
  ...historyQuestions,
  ...geographyQuestions,
  ...portugueseQuestions,
  ...englishQuestions,
  ...philosophyQuestions,
  ...sociologyQuestions
]

// Funções de filtro
export function getQuestionsBySubject(subject: string): QuizQuestion[] {
  return allQuestions.filter(q => q.subject === subject)
}

export function getQuestionsByTopic(topic: string): QuizQuestion[] {
  return allQuestions.filter(q => q.topic === topic)
}

export function getQuestionsByDifficulty(difficulty: 'facil' | 'medio' | 'dificil'): QuizQuestion[] {
  return allQuestions.filter(q => q.difficulty === difficulty)
}

export function getQuestionsByUniversity(university: string): QuizQuestion[] {
  return allQuestions.filter(q => q.university === university)
}

export function getQuestionsBySubjectAndDifficulty(subject: string, difficulty: 'facil' | 'medio' | 'dificil'): QuizQuestion[] {
  return allQuestions.filter(q => q.subject === subject && q.difficulty === difficulty)
}

export function getQuestionsBySubjectAndUniversity(subject: string, university: string): QuizQuestion[] {
  return allQuestions.filter(q => q.subject === subject && q.university === university)
}

export function getQuestionsBySubjectDifficultyAndUniversity(subject: string, difficulty: 'facil' | 'medio' | 'dificil', university: string): QuizQuestion[] {
  return allQuestions.filter(q => 
    q.subject === subject && 
    q.difficulty === difficulty && 
    q.university === university
  )
}

export function getTopicsBySubject(subject: string): string[] {
  const subjectData = subjects.find(s => s.name === subject)
  return subjectData ? subjectData.topics : []
}

export function getRandomQuestions(count: number, filters?: {
  subject?: string
  topic?: string
  difficulty?: 'facil' | 'medio' | 'dificil'
  university?: string
}): QuizQuestion[] {
  let filteredQuestions = allQuestions

  if (filters?.subject) {
    filteredQuestions = filteredQuestions.filter(q => q.subject === filters.subject)
  }
  if (filters?.topic) {
    filteredQuestions = filteredQuestions.filter(q => q.topic === filters.topic)
  }
  if (filters?.difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === filters.difficulty)
  }
  if (filters?.university) {
    filteredQuestions = filteredQuestions.filter(q => q.university === filters.university)
  }

  // Embaralhar e pegar as primeiras 'count' questões
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
