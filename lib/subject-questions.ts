export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
  difficulty: 'facil' | 'medio' | 'dificil'
  subject: string
}

export const subjectQuestions: Record<string, Question[]> = {
  "Matemática": [
    // TÓPICO: Operações Básicas
    {
      id: "math-001",
      question: "Qual é o resultado de 15 + 27?",
      options: ["40", "42", "41", "43"],
      correctAnswer: 1,
      explanation: "15 + 27 = 42",
      topic: "Operações Básicas",
      difficulty: "facil",
      subject: "Matemática"
    },
    {
      id: "math-002",
      question: "Quanto é 8 × 7?",
      options: ["54", "56", "58", "60"],
      correctAnswer: 1,
      explanation: "8 × 7 = 56",
      topic: "Operações Básicas",
      difficulty: "facil",
      subject: "Matemática"
    },
    {
      id: "math-003",
      question: "Qual é a raiz quadrada de 64?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "√64 = 8, pois 8² = 64",
      topic: "Operações Básicas",
      difficulty: "facil",
      subject: "Matemática"
    },
    // TÓPICO: Frações
    {
      id: "math-004",
      question: "Qual é o resultado de 3/4 + 1/4?",
      options: ["1/2", "1", "4/8", "2/4"],
      correctAnswer: 1,
      explanation: "3/4 + 1/4 = 4/4 = 1",
      topic: "Frações",
      difficulty: "facil",
      subject: "Matemática"
    },
    {
      id: "math-005",
      question: "Quanto é 2/3 × 3/4?",
      options: ["1/2", "6/12", "1/6", "1/4"],
      correctAnswer: 0,
      explanation: "2/3 × 3/4 = 6/12 = 1/2",
      topic: "Frações",
      difficulty: "medio",
      subject: "Matemática"
    },
    // TÓPICO: Álgebra
    {
      id: "math-006",
      question: "Qual é o valor de x na equação 2x + 5 = 13?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "2x + 5 = 13 → 2x = 8 → x = 4",
      topic: "Álgebra",
      difficulty: "medio",
      subject: "Matemática"
    },
    {
      id: "math-007",
      question: "Resolva a equação: 3x - 7 = 2x + 3",
      options: ["x = 5", "x = 10", "x = 4", "x = 6"],
      correctAnswer: 1,
      explanation: "3x - 7 = 2x + 3 → 3x - 2x = 3 + 7 → x = 10",
      topic: "Álgebra",
      difficulty: "medio",
      subject: "Matemática"
    },
    // TÓPICO: Geometria
    {
      id: "math-008",
      question: "Qual é a área de um quadrado com lado de 6 cm?",
      options: ["12 cm²", "24 cm²", "36 cm²", "48 cm²"],
      correctAnswer: 2,
      explanation: "Área = lado² = 6² = 36 cm²",
      topic: "Geometria",
      difficulty: "facil",
      subject: "Matemática"
    },
    {
      id: "math-009",
      question: "Qual é o perímetro de um retângulo com 8 cm de comprimento e 5 cm de largura?",
      options: ["13 cm", "26 cm", "40 cm", "20 cm"],
      correctAnswer: 1,
      explanation: "Perímetro = 2(comprimento + largura) = 2(8 + 5) = 26 cm",
      topic: "Geometria",
      difficulty: "facil",
      subject: "Matemática"
    },
    {
      id: "math-010",
      question: "Qual é a área de um círculo com raio de 4 cm? (Use π = 3,14)",
      options: ["25,12 cm²", "50,24 cm²", "12,56 cm²", "16 cm²"],
      correctAnswer: 1,
      explanation: "Área = πr² = 3,14 × 4² = 50,24 cm²",
      topic: "Geometria",
      difficulty: "medio",
      subject: "Matemática"
    }
  ],

  "Português": [
    // TÓPICO: Gramática
    {
      id: "port-001",
      question: "Qual é a classe gramatical da palavra 'rapidamente'?",
      options: ["Substantivo", "Adjetivo", "Advérbio", "Verbo"],
      correctAnswer: 2,
      explanation: "'Rapidamente' é um advérbio de modo",
      topic: "Gramática",
      difficulty: "facil",
      subject: "Português"
    },
    {
      id: "port-002",
      question: "Qual é o plural de 'cidadão'?",
      options: ["cidadãos", "cidadães", "cidadões", "cidadãos"],
      correctAnswer: 0,
      explanation: "O plural de 'cidadão' é 'cidadãos'",
      topic: "Gramática",
      difficulty: "facil",
      subject: "Português"
    },
    {
      id: "port-003",
      question: "Qual é a função sintática da palavra 'estudar' na frase 'Gosto de estudar'?",
      options: ["Sujeito", "Predicado", "Objeto direto", "Objeto indireto"],
      correctAnswer: 2,
      explanation: "'Estudar' é objeto direto do verbo 'gostar'",
      topic: "Gramática",
      difficulty: "medio",
      subject: "Português"
    },
    // TÓPICO: Literatura
    {
      id: "port-004",
      question: "Qual é o principal representante do Romantismo no Brasil?",
      options: ["Machado de Assis", "José de Alencar", "Gonçalves Dias", "Álvares de Azevedo"],
      correctAnswer: 1,
      explanation: "José de Alencar é considerado o principal romancista do Romantismo brasileiro",
      topic: "Literatura",
      difficulty: "medio",
      subject: "Português"
    },
    {
      id: "port-005",
      question: "Qual figura de linguagem está presente em 'O tempo voa'?",
      options: ["Metáfora", "Comparação", "Personificação", "Hipérbole"],
      correctAnswer: 0,
      explanation: "'O tempo voa' é uma metáfora, pois compara o tempo ao voo sem usar conectivo",
      topic: "Literatura",
      difficulty: "medio",
      subject: "Português"
    }
  ],

  "História": [
    // TÓPICO: História do Brasil
    {
      id: "hist-001",
      question: "Em que ano o Brasil foi descoberto oficialmente?",
      options: ["1492", "1500", "1501", "1498"],
      correctAnswer: 1,
      explanation: "O Brasil foi descoberto oficialmente em 22 de abril de 1500 por Pedro Álvares Cabral",
      topic: "História do Brasil",
      difficulty: "facil",
      subject: "História"
    },
    {
      id: "hist-002",
      question: "Qual foi o primeiro imperador do Brasil?",
      options: ["D. Pedro I", "D. João VI", "D. Pedro II", "D. Maria I"],
      correctAnswer: 0,
      explanation: "D. Pedro I foi o primeiro imperador do Brasil, de 1822 a 1831",
      topic: "História do Brasil",
      difficulty: "facil",
      subject: "História"
    },
    {
      id: "hist-003",
      question: "Em que ano a República foi proclamada no Brasil?",
      options: ["1889", "1890", "1888", "1891"],
      correctAnswer: 0,
      explanation: "A República foi proclamada em 15 de novembro de 1889",
      topic: "História do Brasil",
      difficulty: "medio",
      subject: "História"
    },
    // TÓPICO: História Mundial
    {
      id: "hist-004",
      question: "Em que ano começou a Primeira Guerra Mundial?",
      options: ["1914", "1915", "1913", "1916"],
      correctAnswer: 0,
      explanation: "A Primeira Guerra Mundial começou em 1914",
      topic: "História Mundial",
      difficulty: "medio",
      subject: "História"
    },
    {
      id: "hist-005",
      question: "Qual foi o principal líder da Revolução Russa de 1917?",
      options: ["Stalin", "Lenin", "Trotsky", "Marx"],
      correctAnswer: 1,
      explanation: "Vladimir Lenin foi o principal líder da Revolução Russa de 1917",
      topic: "História Mundial",
      difficulty: "medio",
      subject: "História"
    }
  ],

  "Geografia": [
    // TÓPICO: Geografia do Brasil
    {
      id: "geo-001",
      question: "Quantas regiões o Brasil possui?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      explanation: "O Brasil possui 5 regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul",
      topic: "Geografia do Brasil",
      difficulty: "facil",
      subject: "Geografia"
    },
    {
      id: "geo-002",
      question: "Qual é o maior estado do Brasil em território?",
      options: ["Amazonas", "Pará", "Mato Grosso", "Minas Gerais"],
      correctAnswer: 0,
      explanation: "O Amazonas é o maior estado do Brasil em território",
      topic: "Geografia do Brasil",
      difficulty: "facil",
      subject: "Geografia"
    },
    {
      id: "geo-003",
      question: "Qual é o clima predominante na região Nordeste?",
      options: ["Tropical", "Semiárido", "Equatorial", "Subtropical"],
      correctAnswer: 1,
      explanation: "O clima semiárido é predominante na região Nordeste",
      topic: "Geografia do Brasil",
      difficulty: "medio",
      subject: "Geografia"
    },
    // TÓPICO: Geografia Mundial
    {
      id: "geo-004",
      question: "Quantos continentes existem no mundo?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation: "Existem 7 continentes: África, América, Antártida, Ásia, Europa, Oceania",
      topic: "Geografia Mundial",
      difficulty: "facil",
      subject: "Geografia"
    },
    {
      id: "geo-005",
      question: "Qual é o maior oceano do mundo?",
      options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
      correctAnswer: 2,
      explanation: "O Oceano Pacífico é o maior oceano do mundo",
      topic: "Geografia Mundial",
      difficulty: "facil",
      subject: "Geografia"
    }
  ],

  "Biologia": [
    // TÓPICO: Célula
    {
      id: "bio-001",
      question: "Qual organela é responsável pela produção de energia na célula?",
      options: ["Núcleo", "Mitocôndria", "Ribossomo", "Lisossomo"],
      correctAnswer: 1,
      explanation: "A mitocôndria é responsável pela produção de energia (ATP) na célula",
      topic: "Célula",
      difficulty: "facil",
      subject: "Biologia"
    },
    {
      id: "bio-002",
      question: "Qual é a função do núcleo celular?",
      options: ["Produzir energia", "Controlar as atividades celulares", "Digestão", "Síntese de proteínas"],
      correctAnswer: 1,
      explanation: "O núcleo controla as atividades celulares e contém o material genético",
      topic: "Célula",
      difficulty: "facil",
      subject: "Biologia"
    },
    {
      id: "bio-003",
      question: "Qual organela é responsável pela síntese de proteínas?",
      options: ["Mitocôndria", "Ribossomo", "Lisossomo", "Golgi"],
      correctAnswer: 1,
      explanation: "Os ribossomos são responsáveis pela síntese de proteínas",
      topic: "Célula",
      difficulty: "medio",
      subject: "Biologia"
    },
    // TÓPICO: Genética
    {
      id: "bio-004",
      question: "Qual é a unidade básica da hereditariedade?",
      options: ["Cromossomo", "Gene", "DNA", "Proteína"],
      correctAnswer: 1,
      explanation: "O gene é a unidade básica da hereditariedade",
      topic: "Genética",
      difficulty: "medio",
      subject: "Biologia"
    },
    {
      id: "bio-005",
      question: "Quantos cromossomos tem uma célula humana normal?",
      options: ["23", "46", "44", "48"],
      correctAnswer: 1,
      explanation: "Uma célula humana normal tem 46 cromossomos (23 pares)",
      topic: "Genética",
      difficulty: "medio",
      subject: "Biologia"
    }
  ],

  "Física": [
    // TÓPICO: Mecânica
    {
      id: "fis-001",
      question: "Qual é a unidade de medida da força no Sistema Internacional?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correctAnswer: 1,
      explanation: "A unidade de medida da força é o Newton (N)",
      topic: "Mecânica",
      difficulty: "facil",
      subject: "Física"
    },
    {
      id: "fis-002",
      question: "Qual é a primeira lei de Newton?",
      options: ["Lei da Ação e Reação", "Lei da Inércia", "Lei da Aceleração", "Lei da Gravitação"],
      correctAnswer: 1,
      explanation: "A primeira lei de Newton é a Lei da Inércia",
      topic: "Mecânica",
      difficulty: "medio",
      subject: "Física"
    },
    {
      id: "fis-003",
      question: "Qual é a fórmula da energia cinética?",
      options: ["E = mgh", "E = mv²/2", "E = Fd", "E = Pt"],
      correctAnswer: 1,
      explanation: "A energia cinética é calculada por E = mv²/2",
      topic: "Mecânica",
      difficulty: "medio",
      subject: "Física"
    }
  ],

  "Química": [
    // TÓPICO: Estrutura Atômica
    {
      id: "qui-001",
      question: "Qual é o número atômico do hidrogênio?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation: "O número atômico do hidrogênio é 1",
      topic: "Estrutura Atômica",
      difficulty: "facil",
      subject: "Química"
    },
    {
      id: "qui-002",
      question: "Quantos elétrons tem um átomo neutro de oxigênio?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Um átomo neutro de oxigênio tem 8 elétrons",
      topic: "Estrutura Atômica",
      difficulty: "facil",
      subject: "Química"
    },
    {
      id: "qui-003",
      question: "Qual é a fórmula da água?",
      options: ["H2O", "CO2", "O2", "H2"],
      correctAnswer: 0,
      explanation: "A fórmula da água é H2O",
      topic: "Estrutura Atômica",
      difficulty: "facil",
      subject: "Química"
    }
  ]
}

export function getQuestionsBySubject(subject: string): Question[] {
  return subjectQuestions[subject] || []
}

export function getQuestionsByTopic(subject: string, topic: string): Question[] {
  const subjectQs = getQuestionsBySubject(subject)
  return subjectQs.filter(q => q.topic === topic)
}

export function getQuestionsByDifficulty(subject: string, difficulty: 'facil' | 'medio' | 'dificil'): Question[] {
  const subjectQs = getQuestionsBySubject(subject)
  return subjectQs.filter(q => q.difficulty === difficulty)
}

export function getTopicsBySubject(subject: string): string[] {
  const subjectQs = getQuestionsBySubject(subject)
  const topics = [...new Set(subjectQs.map(q => q.topic))]
  return topics
}

export function getAllTopics(): Record<string, string[]> {
  const topics: Record<string, string[]> = {}
  Object.keys(subjectQuestions).forEach(subject => {
    topics[subject] = getTopicsBySubject(subject)
  })
  return topics
}
