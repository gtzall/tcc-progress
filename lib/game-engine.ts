// This file implements the core game logic from the original script.js

interface GameOptions {
  onQuestionLoad: (question: any) => void
  onAnswerCheck: (isCorrect: boolean, explanation: string) => void
  onAchievementUnlock: (achievement: string) => void
  onGameComplete: () => void
}

export function initializeGame(options: GameOptions) {
  // Game state
  let currentQuestions: any[] = []
  let currentQuestionIndex = 0
  let player = {
    name: "",
    score: 0,
    level: 1,
    correctAnswers: 0,
    wrongAnswers: 0,
    questionsAnswered: 0,
    answeredCorrectly: [],
    answeredIncorrectly: [],
    lastErrors: 0,
    achievements: [],
  }

  // Achievements list
  const achievements = [
    {
      name: "Iniciante",
      description: "Acertar 2 perguntas",
      condition: (player: any) => player.correctAnswers >= 2,
      icon: "fas fa-award",
    },
    {
      name: "Expert em Provas",
      description: "Acertar 3 perguntas sobre provas",
      condition: (player: any) => player.answeredCorrectly.filter((p: any) => p.tema === "Provas").length >= 3,
      icon: "fas fa-file-alt",
    },
    {
      name: "Sem Erros",
      description: "Responder 3 perguntas seguidas sem errar",
      condition: (player: any) => player.lastErrors === 0 && player.questionsAnswered >= 3,
      icon: "fas fa-check-circle",
    },
    {
      name: "Mestre do Conhecimento",
      description: "Alcançar nível 3",
      condition: (player: any) => player.level >= 3,
      icon: "fas fa-graduation-cap",
    },
    {
      name: "Pontuação Máxima",
      description: "Alcançar 1000 pontos",
      condition: (player: any) => player.score >= 1000,
      icon: "fas fa-star",
    },
  ]

  // Load questions
  const loadQuestions = async (difficulty: string) => {
    try {
      const response = await fetch("/api/questions")
      const data = await response.json()
      if (data && data[difficulty]) {
        // Shuffle questions and limit to 10
        currentQuestions = [...data[difficulty]].sort(() => Math.random() - 0.5).slice(0, 10)

        if (currentQuestions.length > 0) {
          options.onQuestionLoad(currentQuestions[0])
        }
      }
    } catch (error) {
      console.error("Error loading questions:", error)
    }
  }

  // Check answer
  const checkAnswer = (selectedAnswerIndex: number, question: any) => {
    const isCorrect = selectedAnswerIndex === question.respostaCorreta

    // Update player stats
    if (isCorrect) {
      player.correctAnswers++
      player.lastErrors = 0
      player.answeredCorrectly.push(question)

      // Calculate points based on difficulty
      const pointsPerQuestion = {
        facil: 100,
        medio: 200,
        dificil: 300,
      }

      const difficulty = question.difficulty || "facil"
      player.score += pointsPerQuestion[difficulty as keyof typeof pointsPerQuestion]

      // Update level
      player.level = Math.floor(player.score / 1000) + 1
    } else {
      player.wrongAnswers++
      player.lastErrors++
      player.answeredIncorrectly.push(question)
    }

    player.questionsAnswered++

    // Check for achievements
    checkAchievements()

    // Provide feedback
    options.onAnswerCheck(isCorrect, question.explicacao)

    // Check if quiz is complete
    if (currentQuestionIndex >= currentQuestions.length - 1) {
      options.onGameComplete()
    }
  }

  // Check achievements
  const checkAchievements = () => {
    achievements.forEach((achievement) => {
      if (!player.achievements.includes(achievement.name) && achievement.condition(player)) {
        player.achievements.push(achievement.name)
        options.onAchievementUnlock(achievement.name)
      }
    })
  }

  // Load next question
  const loadNextQuestion = () => {
    currentQuestionIndex++
    if (currentQuestionIndex < currentQuestions.length) {
      options.onQuestionLoad(currentQuestions[currentQuestionIndex])
    } else {
      options.onGameComplete()
    }
  }

  // Reset game
  const resetGame = (playerName: string, difficulty: string) => {
    player = {
      name: playerName,
      score: 0,
      level: 1,
      correctAnswers: 0,
      wrongAnswers: 0,
      questionsAnswered: 0,
      answeredCorrectly: [],
      answeredIncorrectly: [],
      lastErrors: 0,
      achievements: [],
    }

    currentQuestionIndex = 0
    loadQuestions(difficulty)
  }

  // Return public API
  return {
    loadQuestions,
    checkAnswer,
    loadNextQuestion,
    resetGame,
  }
}
