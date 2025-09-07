import { NextResponse } from "next/server"
import questionsData from "../../../lib/questions.json"

export async function GET() {
  return NextResponse.json(questionsData)
}


