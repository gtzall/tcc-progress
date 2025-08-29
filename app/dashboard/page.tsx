"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy, BarChart3, Users, Settings, LogOut, Menu, X, Play, Clock, Star, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMediaQuery } from "@/hooks/use-media-query"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    progress: 68,
    icon: <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">M</div>,
  },
  {
    id: 2,
    name: "Physics",
    progress: 42,
    icon: <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">P</div>,
  },
  {
    id: 3,
    name: "Chemistry",
    progress: 75,
    icon: <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">C</div>,
  },
  {
    id: 4,
    name: "Biology",
    progress: 30,
    icon: <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center">B</div>,
  },
  {
    id: 5,
    name: "History",
    progress: 55,
    icon: <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">H</div>,
  },
  {
    id: 6,
    name: "Geography",
    progress: 62,
    icon: <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">G</div>,
  },
]

const recentQuizzes = [
  { id: 1, title: "ENEM Math Practice", questions: 20, score: 85, date: "2 days ago" },
  { id: 2, title: "Physics Mechanics", questions: 15, score: 73, date: "4 days ago" },
  { id: 3, title: "Chemistry Organic Compounds", questions: 25, score: 92, date: "1 week ago" },
]

const recommendedQuizzes = [
  {
    id: 1,
    title: "ENEM Math Formulas",
    description: "Master the essential formulas for the ENEM exam",
    difficulty: "Medium",
    questions: 30,
    estimatedTime: "45 min",
    category: "Mathematics",
  },
  {
    id: 2,
    title: "Physics: Electricity & Magnetism",
    description: "Comprehensive review of electricity and magnetism concepts",
    difficulty: "Hard",
    questions: 25,
    estimatedTime: "40 min",
    category: "Physics",
  },
  {
    id: 3,
    title: "Biology: Cell Structure",
    description: "Learn about cell components and their functions",
    difficulty: "Easy",
    questions: 20,
    estimatedTime: "30 min",
    category: "Biology",
  },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }, [isDesktop])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-blue-950 text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-blue-900/50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-blue-900/50">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                QuizMaster
              </h1>
              <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-blue-900/50">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-400">Student</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-900/30 text-blue-400"
            >
              <BookOpen className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/quizzes"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>Quizzes</span>
            </Link>
            <Link
              href="/achievements"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Trophy className="h-5 w-5" />
              <span>Achievements</span>
            </Link>
            <Link
              href="/statistics"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Statistics</span>
            </Link>
            <Link
              href="/friends"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Friends</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-blue-900/50">
            <div className="space-y-1">
              <Link
                href="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <Link
                href="/logout"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-sm border-b border-blue-900/50 p-4">
          <div className="flex items-center">
            <button className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950">
                <Zap className="mr-2 h-4 w-4" />
                Quick Quiz
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="grid gap-6">
            {/* Welcome section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-900/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
                      <p className="text-gray-300">
                        Continue your learning journey. You've completed 24 quizzes this month.
                      </p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Start New Quiz</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Stats overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-900/70 border-blue-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-blue-900/30 p-2">
                        <BookOpen className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">124</div>
                        <div className="text-xs text-green-400">+12% from last month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/70 border-blue-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-purple-900/30 p-2">
                        <Star className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">78%</div>
                        <div className="text-xs text-green-400">+5% from last month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/70 border-blue-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Study Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-cyan-900/30 p-2">
                        <Clock className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">42h</div>
                        <div className="text-xs text-green-400">+8h from last month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* Subject progress */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Subject Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="bg-gray-900/70 border-blue-900/50 hover:border-blue-700/50 transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        {subject.icon}
                        <div className="ml-3">
                          <h3 className="font-medium">{subject.name}</h3>
                          <p className="text-sm text-gray-400">{subject.progress}% complete</p>
                        </div>
                      </div>
                      <Progress
                        value={subject.progress}
                        className="h-2 bg-gray-700"
                        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* Recent and recommended quizzes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent quizzes */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Recent Quizzes</h2>
                <Card className="bg-gray-900/70 border-blue-900/50">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {recentQuizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg font-bold">
                            {quiz.score}%
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="font-medium">{quiz.title}</h3>
                            <p className="text-sm text-gray-400">
                              {quiz.questions} questions • {quiz.date}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          >
                            Review
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>

              {/* Recommended quizzes */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
                <div className="space-y-4">
                  {recommendedQuizzes.map((quiz) => (
                    <Card
                      key={quiz.id}
                      className="bg-gray-900/70 border-blue-900/50 hover:border-blue-700/50 transition-all"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{quiz.title}</CardTitle>
                            <CardDescription className="text-gray-400">{quiz.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">{quiz.category}</span>
                          <span className="px-2 py-1 rounded-full bg-purple-900/30 text-purple-400">
                            {quiz.difficulty}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-gray-800">{quiz.questions} questions</span>
                          <span className="px-2 py-1 rounded-full bg-gray-800">{quiz.estimatedTime}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Quiz</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
