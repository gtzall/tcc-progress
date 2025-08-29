"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, HelpCircle, Award, BookOpen, Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function TutorialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Sample question for the interactive demo
  const demoQuestion = {
    question: "What is the maximum score possible on the ENEM essay?",
    options: ["800 points", "1000 points", "900 points", "950 points"],
    correctAnswer: 1,
    explanation: "The ENEM essay can reach up to 1000 points, being evaluated on five different competencies.",
  }

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index)
    setShowFeedback(true)
  }

  const resetDemo = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Tutorials</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our quiz platform with these interactive examples before you dive in.
          </p>
        </motion.div>

        <Tabs defaultValue="gameplay" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="gameplay" className="text-lg py-3">
              <BookOpen className="mr-2 h-5 w-5" /> Gameplay
            </TabsTrigger>
            <TabsTrigger value="features" className="text-lg py-3">
              <Brain className="mr-2 h-5 w-5" /> Learning Features
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-lg py-3">
              <Award className="mr-2 h-5 w-5" /> Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gameplay" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gray-900/70 border-blue-900/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4 border-b border-blue-800/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                          <span className="font-bold">JD</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">
                            Player: <span className="text-white">John Doe</span>
                          </p>
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-300">
                              Level: <span className="text-blue-400">3</span>
                            </p>
                            <p className="text-sm text-gray-300">
                              Score: <span className="text-purple-400">750</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-right">
                        <p className="text-gray-300">
                          Question <span className="text-white">1</span> of <span className="text-white">10</span>
                        </p>
                        <p className="text-gray-300">
                          Topic: <span className="text-blue-400">ENEM</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <Progress
                        value={10}
                        className="h-2 bg-gray-800"
                        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-medium mb-6 text-center">{demoQuestion.question}</h3>
                      <div className="space-y-3">
                        {demoQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            disabled={showFeedback}
                            className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                              selectedAnswer === index
                                ? index === demoQuestion.correctAnswer
                                  ? "bg-green-900/30 border border-green-500"
                                  : "bg-red-900/30 border border-red-500"
                                : "bg-gray-800/50 border border-gray-700 hover:border-blue-500"
                            }`}
                          >
                            {showFeedback && index === demoQuestion.correctAnswer && (
                              <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                            )}
                            {showFeedback && selectedAnswer === index && index !== demoQuestion.correctAnswer && (
                              <XCircle className="h-5 w-5 mr-3 text-red-500 flex-shrink-0" />
                            )}
                            {(!showFeedback ||
                              (showFeedback && selectedAnswer !== index && index !== demoQuestion.correctAnswer)) && (
                              <div className="h-5 w-5 mr-3 rounded-full border border-gray-600 flex-shrink-0"></div>
                            )}
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg mb-6 ${
                          selectedAnswer === demoQuestion.correctAnswer
                            ? "bg-green-900/20 border-l-4 border-green-500"
                            : "bg-red-900/20 border-l-4 border-red-500"
                        }`}
                      >
                        <div className="flex items-start">
                          {selectedAnswer === demoQuestion.correctAnswer ? (
                            <CheckCircle className="h-6 w-6 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-6 w-6 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium mb-1">
                              {selectedAnswer === demoQuestion.correctAnswer ? "Correct!" : "Incorrect!"}
                            </p>
                            <p className="text-gray-300">{demoQuestion.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between">
                      {showFeedback ? (
                        <Button onClick={resetDemo} className="bg-blue-600 hover:bg-blue-700">
                          Try Again
                        </Button>
                      ) : (
                        <Button disabled className="bg-gray-700">
                          Previous
                        </Button>
                      )}
                      <Button disabled={!showFeedback} className="bg-blue-600 hover:bg-blue-700">
                        Next Question
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 bg-blue-900/20 p-6 rounded-lg border border-blue-900/50">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-blue-400" /> How to Play
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-blue-900/50 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>Read the question carefully and consider all options before selecting your answer.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-900/50 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span>Click on your chosen answer to submit it. You'll receive immediate feedback.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-900/50 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span>Read the explanation to learn more, even if you answered correctly.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-900/50 h-6 w-6 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                      4
                    </span>
                    <span>Click "Next Question" to continue or review your results at the end of the quiz.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="features">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card className="bg-gray-900/70 border-blue-900/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Adaptive Learning</h3>
                  <p className="text-gray-300 mb-4">
                    Our system adapts to your performance, focusing more on topics you find challenging and less on
                    those you've mastered.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mathematics</span>
                        <span className="text-blue-400">Advanced</span>
                      </div>
                      <Progress value={85} className="h-2 bg-gray-800" indicatorClassName="bg-blue-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Physics</span>
                        <span className="text-yellow-400">Intermediate</span>
                      </div>
                      <Progress value={60} className="h-2 bg-gray-800" indicatorClassName="bg-yellow-600" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Chemistry</span>
                        <span className="text-red-400">Beginner</span>
                      </div>
                      <Progress value={30} className="h-2 bg-gray-800" indicatorClassName="bg-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/70 border-blue-900/50 overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Performance Analytics</h3>
                  <p className="text-gray-300 mb-4">
                    Track your progress with detailed analytics that show your strengths and areas for improvement.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-1">87%</div>
                      <div className="text-sm text-gray-400">Accuracy</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">124</div>
                      <div className="text-sm text-gray-400">Questions</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">42h</div>
                      <div className="text-sm text-gray-400">Study Time</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">5</div>
                      <div className="text-sm text-gray-400">Achievements</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="achievements">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gray-900/70 border-blue-900/50 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-6 text-center">Unlock Achievements as You Learn</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-lg border border-blue-900/50 text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-yellow-900/30 flex items-center justify-center relative">
                        <Award className="h-8 w-8 text-yellow-500" />
                      </div>
                      <h4 className="font-medium mb-2">Beginner</h4>
                      <p className="text-sm text-gray-400">Answer your first 5 questions correctly</p>
                      <div className="mt-3">
                        <Progress value={60} className="h-2 bg-gray-800" indicatorClassName="bg-yellow-600" />
                        <p className="text-xs text-gray-500 mt-1">3/5 completed</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-lg border border-blue-900/50 text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-blue-900/30 flex items-center justify-center relative">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                      </div>
                      <h4 className="font-medium mb-2">ENEM Expert</h4>
                      <p className="text-sm text-gray-400">Answer 10 ENEM questions correctly</p>
                      <div className="mt-3">
                        <Progress value={40} className="h-2 bg-gray-800" indicatorClassName="bg-blue-600" />
                        <p className="text-xs text-gray-500 mt-1">4/10 completed</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-lg border border-blue-900/50 text-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-purple-900/30 flex items-center justify-center relative">
                        <CheckCircle className="h-8 w-8 text-purple-500" />
                      </div>
                      <h4 className="font-medium mb-2">Perfect Streak</h4>
                      <p className="text-sm text-gray-400">Answer 5 questions in a row without errors</p>
                      <div className="mt-3">
                        <Progress value={20} className="h-2 bg-gray-800" indicatorClassName="bg-purple-600" />
                        <p className="text-xs text-gray-500 mt-1">1/5 completed</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-900/50">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-yellow-500" /> Achievement Rewards
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Unlock special badges to showcase on your profile</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Gain access to exclusive question sets and study materials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Earn bonus points to climb the leaderboard faster</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Track your learning progress across different subjects</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
