import { NextResponse } from "next/server"
import { promises as fs } from 'fs'
import path from 'path'

const questionsFilePath = path.join(process.cwd(), 'lib', 'questions.json')

async function readQuestionsFile() {
  try {
    const fileContents = await fs.readFile(questionsFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading questions file:', error)
    return { facil: [], medio: [], dificil: [] }
  }
}

async function writeQuestionsFile(data: any) {
  try {
    await fs.writeFile(questionsFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing questions file:', error)
    return false
  }
}

export async function GET() {
  const questionsData = await readQuestionsFile()
  return NextResponse.json(questionsData)
}

export async function POST(request: Request) {
  try {
    const newQuestion = await request.json()
    const questionsData = await readQuestionsFile()
    
    // Adicionar nova questão na categoria de dificuldade apropriada
    if (!questionsData[newQuestion.dificuldade]) {
      questionsData[newQuestion.dificuldade] = []
    }
    
    questionsData[newQuestion.dificuldade].push({
      enunciado: newQuestion.enunciado,
      alternativas: newQuestion.alternativas,
      respostaCorreta: newQuestion.respostaCorreta,
      tema: newQuestion.tema,
      explicacao: newQuestion.explicacao
    })
    
    const success = await writeQuestionsFile(questionsData)
    
    if (success) {
      return NextResponse.json({ message: 'Questão criada com sucesso' }, { status: 201 })
    } else {
      return NextResponse.json({ error: 'Erro ao salvar questão' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}


