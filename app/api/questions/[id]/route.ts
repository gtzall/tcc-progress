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

function findQuestionById(questionsData: any, id: string) {
  const [dificuldade, index] = id.split('-')
  const questionIndex = parseInt(index)
  
  if (questionsData[dificuldade] && questionsData[dificuldade][questionIndex]) {
    return {
      question: questionsData[dificuldade][questionIndex],
      dificuldade,
      index: questionIndex
    }
  }
  
  return null
}

interface Params { id: string }

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const updatedQuestion = await request.json()
    const questionsData = await readQuestionsFile()
    const questionInfo = findQuestionById(questionsData, params.id)
    
    if (!questionInfo) {
      return NextResponse.json({ error: 'Questão não encontrada' }, { status: 404 })
    }
    
    const { dificuldade: oldDificuldade, index } = questionInfo
    const newDificuldade = updatedQuestion.dificuldade
    
    // Se a dificuldade mudou, remover da categoria antiga e adicionar na nova
    if (oldDificuldade !== newDificuldade) {
      // Remover da categoria antiga
      questionsData[oldDificuldade].splice(index, 1)
      
      // Adicionar na nova categoria
      if (!questionsData[newDificuldade]) {
        questionsData[newDificuldade] = []
      }
      questionsData[newDificuldade].push({
        enunciado: updatedQuestion.enunciado,
        alternativas: updatedQuestion.alternativas,
        respostaCorreta: updatedQuestion.respostaCorreta,
        tema: updatedQuestion.tema,
        explicacao: updatedQuestion.explicacao
      })
    } else {
      // Atualizar na mesma categoria
      questionsData[oldDificuldade][index] = {
        enunciado: updatedQuestion.enunciado,
        alternativas: updatedQuestion.alternativas,
        respostaCorreta: updatedQuestion.respostaCorreta,
        tema: updatedQuestion.tema,
        explicacao: updatedQuestion.explicacao
      }
    }
    
    const success = await writeQuestionsFile(questionsData)
    
    if (success) {
      return NextResponse.json({ message: 'Questão atualizada com sucesso' })
    } else {
      return NextResponse.json({ error: 'Erro ao salvar questão' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  try {
    const questionsData = await readQuestionsFile()
    const questionInfo = findQuestionById(questionsData, params.id)
    
    if (!questionInfo) {
      return NextResponse.json({ error: 'Questão não encontrada' }, { status: 404 })
    }
    
    const { dificuldade, index } = questionInfo
    
    // Remover a questão
    questionsData[dificuldade].splice(index, 1)
    
    const success = await writeQuestionsFile(questionsData)
    
    if (success) {
      return NextResponse.json({ message: 'Questão excluída com sucesso' })
    } else {
      return NextResponse.json({ error: 'Erro ao excluir questão' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

