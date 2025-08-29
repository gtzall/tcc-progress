import { NextResponse } from "next/server"

export async function GET() {
  // This is a simplified version of the questions from the JSON file
  const questions = {
    facil: [
      {
        enunciado: "Qual é a prova que dá acesso às universidades brasileiras?",
        alternativas: ["ENEM", "OAB", "ENCCEJA", "Vestibular"],
        respostaCorreta: 0,
        tema: "Provas",
        explicacao:
          "O ENEM (Exame Nacional do Ensino Médio) é a principal porta de entrada para as universidades brasileiras, tanto públicas quanto privadas.",
      },
      {
        enunciado: "O que significa a sigla ENEM?",
        alternativas: [
          "Exame Nacional do Ensino Médio",
          "Exame Nacional de Educação Média",
          "Exame Nacional para Entrada na Universidade",
          "Exame Nacional de Escolas Médias",
        ],
        respostaCorreta: 0,
        tema: "Provas",
        explicacao:
          "ENEM significa Exame Nacional do Ensino Médio, criado em 1998 para avaliar o desempenho escolar ao final da educação básica.",
      },
      {
        enunciado: "Qual é a nota máxima possível na redação do ENEM?",
        alternativas: ["900", "1000", "950", "800"],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao: "A redação do ENEM pode chegar a 1000 pontos, sendo avaliada em cinco competências diferentes.",
      },
      {
        enunciado: "Quantas áreas de conhecimento são avaliadas no ENEM?",
        alternativas: ["3", "4", "5", "6"],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao:
          "O ENEM avalia 4 áreas: Linguagens, Códigos e suas Tecnologias; Ciências Humanas e suas Tecnologias; Ciências da Natureza e suas Tecnologias; e Matemática e suas Tecnologias.",
      },
      {
        enunciado: "Qual destes NÃO é um curso superior?",
        alternativas: ["Bacharelado", "Licenciatura", "Técnico", "Tecnólogo"],
        respostaCorreta: 2,
        tema: "Cursos",
        explicacao:
          "O curso técnico é de nível médio, enquanto bacharelado, licenciatura e tecnólogo são cursos superiores.",
      },
      {
        enunciado: "Qual é a duração mínima de um curso de bacharelado no Brasil?",
        alternativas: ["2 anos", "3 anos", "4 anos", "5 anos"],
        respostaCorreta: 2,
        tema: "Cursos",
        explicacao:
          "A maioria dos cursos de bacharelado no Brasil tem duração mínima de 4 anos, embora alguns como Medicina possam ter 6 anos.",
      },
      {
        enunciado: "O que significa a sigla SISU?",
        alternativas: [
          "Sistema de Seleção Unificada",
          "Sistema Integrado de Seleção Universitária",
          "Sistema de Ingresso Superior Unificado",
          "Sistema de Seleção Universitária",
        ],
        respostaCorreta: 0,
        tema: "Provas",
        explicacao:
          "SISU significa Sistema de Seleção Unificada, que utiliza as notas do ENEM para selecionar estudantes para universidades públicas.",
      },
      {
        enunciado: "Qual destes é um programa de bolsas em universidades particulares?",
        alternativas: ["FIES", "PROUNI", "SISU", "ENEM"],
        respostaCorreta: 1,
        tema: "Programas",
        explicacao:
          "O PROUNI (Programa Universidade para Todos) oferece bolsas de estudo em instituições particulares de ensino superior.",
      },
      {
        enunciado: "Quantos dias dura a aplicação do ENEM?",
        alternativas: ["1", "2", "3", "4"],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao:
          "O ENEM é aplicado em dois domingos consecutivos, com diferentes áreas de conhecimento em cada dia.",
      },
      {
        enunciado: "Qual destes é um tipo de questão comum no ENEM?",
        alternativas: ["Dissertativa", "Múltipla escolha", "Verdadeiro ou falso", "Associação"],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao:
          "O ENEM utiliza predominantemente questões de múltipla escolha, com exceção da redação que é dissertativa.",
      },
    ],
    medio: [
      {
        enunciado: "Quantos anos tem o Ensino Fundamental no Brasil?",
        alternativas: ["8 anos", "9 anos", "10 anos", "11 anos"],
        respostaCorreta: 1,
        tema: "Escola",
        explicacao:
          "Desde 2006, com a Lei nº 11.274, o Ensino Fundamental no Brasil passou a ter 9 anos de duração, iniciando aos 6 anos de idade.",
      },
      {
        enunciado: "Qual destes não é um curso da área de Humanas?",
        alternativas: ["Direito", "Psicologia", "Engenharia Civil", "História"],
        respostaCorreta: 2,
        tema: "Cursos",
        explicacao:
          "Engenharia Civil é um curso da área de Exatas/Tecnológicas, enquanto os outros são da área de Humanas.",
      },
      {
        enunciado: "Qual é o órgão responsável pelo ENEM no Brasil?",
        alternativas: ["MEC", "INEP", "CAPES", "CNE"],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao:
          "O INEP (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira) é o órgão responsável pela aplicação do ENEM.",
      },
      {
        enunciado: "Qual destes cursos geralmente tem a maior nota de corte no SISU?",
        alternativas: ["Medicina", "Direito", "Engenharia Civil", "Administração"],
        respostaCorreta: 0,
        tema: "Cursos",
        explicacao: "Medicina tradicionalmente tem as notas de corte mais altas no SISU devido à grande concorrência.",
      },
      {
        enunciado: "Quantas competências são avaliadas na redação do ENEM?",
        alternativas: ["3", "4", "5", "6"],
        respostaCorreta: 2,
        tema: "Provas",
        explicacao: "A redação do ENEM é avaliada em 5 competências, cada uma valendo até 200 pontos.",
      },
      {
        enunciado: "Qual é o tempo mínimo de duração de um curso de tecnólogo?",
        alternativas: ["1 ano", "2 anos", "3 anos", "4 anos"],
        respostaCorreta: 1,
        tema: "Cursos",
        explicacao: "Os cursos superiores de tecnologia (tecnólogos) têm duração mínima de 2 anos.",
      },
      {
        enunciado: "O que significa a sigla FIES?",
        alternativas: [
          "Fundo de Investimento em Educação Superior",
          "Fundo de Inclusão Educacional Social",
          "Fundo de Financiamento Estudantil",
          "Fundo de Integração Educacional Superior",
        ],
        respostaCorreta: 2,
        tema: "Programas",
        explicacao:
          "FIES significa Fundo de Financiamento Estudantil, um programa do governo que financia cursos superiores em instituições privadas.",
      },
      {
        enunciado: "Qual destes é um vestibular tradicional de universidade pública?",
        alternativas: ["ENEM", "FUVEST", "PROUNI", "SISU"],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao: "A FUVEST é o vestibular da Universidade de São Paulo (USP), um dos mais tradicionais do país.",
      },
      {
        enunciado: "Qual é a duração máxima permitida para concluir um curso superior no Brasil?",
        alternativas: [
          "O dobro da duração regular",
          "O triplo da duração regular",
          "Não há limite definido",
          "5 anos independente do curso",
        ],
        respostaCorreta: 0,
        tema: "Cursos",
        explicacao:
          "Segundo as diretrizes do MEC, o tempo máximo para conclusão de um curso superior é o dobro da duração regular.",
      },
      {
        enunciado: "Qual destes itens é proibido levar para a prova do ENEM?",
        alternativas: ["Caneta esferográfica preta", "Lápis", "Borracha", "Relógio"],
        respostaCorreta: 3,
        tema: "Provas",
        explicacao:
          "Relógios são proibidos na prova do ENEM para evitar possíveis fraudes com dispositivos eletrônicos.",
      },
    ],
    dificil: [
      {
        enunciado: "Qual curso universitário tem a prova específica chamada 'FUVEST'?",
        alternativas: ["Medicina na UFMG", "Direito na USP", "Engenharia na UNICAMP", "Medicina na USP"],
        respostaCorreta: 3,
        tema: "Cursos",
        explicacao:
          "A FUVEST é o vestibular da Universidade de São Paulo (USP), e Medicina é um dos cursos mais concorridos.",
      },
      {
        enunciado: "Qual universidade brasileira foi considerada a melhor da América Latina em 2023?",
        alternativas: ["USP", "UNICAMP", "UFMG", "UFRJ"],
        respostaCorreta: 0,
        tema: "Universidades",
        explicacao:
          "A Universidade de São Paulo (USP) foi classificada como a melhor da América Latina em rankings internacionais recentes.",
      },
      {
        enunciado: "Qual é o nome do método de correção utilizado pelo ENEM?",
        alternativas: [
          "Teoria Clássica dos Testes",
          "Teoria de Resposta ao Item",
          "Método de Análise Fatorial",
          "Avaliação por Competências",
        ],
        respostaCorreta: 1,
        tema: "Provas",
        explicacao:
          "O ENEM utiliza a Teoria de Resposta ao Item (TRI), que considera não apenas o número de acertos, mas o padrão de respostas.",
      },
      {
        enunciado: "Qual destas NÃO é uma das competências avaliadas na redação do ENEM?",
        alternativas: [
          "Domínio da norma padrão da língua escrita",
          "Compreensão da proposta de redação",
          "Conhecimento de língua estrangeira",
          "Proposta de intervenção para o problema abordado",
        ],
        respostaCorreta: 2,
        tema: "Provas",
        explicacao:
          "O conhecimento de língua estrangeira não é avaliado na redação do ENEM, que deve ser escrita em português.",
      },
      {
        enunciado: "Qual foi a nota média nacional na redação do ENEM em 2022?",
        alternativas: ["587,4", "623,4", "654,2", "701,5"],
        respostaCorreta: 0,
        tema: "Provas",
        explicacao: "Em 2022, a média nacional na redação do ENEM foi de 587,4 pontos, segundo dados do INEP.",
      },
      {
        enunciado: "Quantas universidades brasileiras estão entre as 1000 melhores do mundo no ranking THE 2023?",
        alternativas: ["5", "7", "10", "15"],
        respostaCorreta: 1,
        tema: "Universidades",
        explicacao:
          "Em 2023, sete universidades brasileiras apareceram no ranking das 1000 melhores do mundo segundo o Times Higher Education.",
      },
      {
        enunciado: "Qual destes cursos tem a maior carga horária mínima exigida pelo MEC?",
        alternativas: ["Medicina", "Direito", "Engenharia Civil", "Arquitetura e Urbanismo"],
        respostaCorreta: 0,
        tema: "Cursos",
        explicacao:
          "Medicina tem a maior carga horária, com mínimo de 7.200 horas, enquanto os outros cursos têm entre 3.000 e 4.000 horas.",
      },
      {
        enunciado: "Qual foi o tema da redação do ENEM em 2022?",
        alternativas: [
          "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
          "O estigma associado às doenças mentais na sociedade brasileira",
          "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil",
          "Manipulação do comportamento do usuário pelo controle de dados na internet",
        ],
        respostaCorreta: 0,
        tema: "Provas",
        explicacao:
          "Em 2022, o tema da redação foi 'Desafios para a valorização de comunidades e povos tradicionais no Brasil'.",
      },
      {
        enunciado: "Qual destas universidades foi a primeira a ser criada no Brasil?",
        alternativas: ["USP", "UFMG", "UFRJ", "UFBA"],
        respostaCorreta: 2,
        tema: "Universidades",
        explicacao:
          "A Universidade Federal do Rio de Janeiro (UFRJ) tem suas origens em 1792 com a criação da Academia Real Militar, sendo considerada a mais antiga.",
      },
      {
        enunciado: "Qual porcentagem aproximada de estudantes que concluem o ensino superior no Brasil?",
        alternativas: ["8%", "18%", "28%", "38%"],
        respostaCorreta: 1,
        tema: "Estatísticas",
        explicacao:
          "Segundo dados recentes, cerca de 18% dos brasileiros entre 25 e 34 anos têm ensino superior completo.",
      },
    ],
  }

  return NextResponse.json(questions)
}
