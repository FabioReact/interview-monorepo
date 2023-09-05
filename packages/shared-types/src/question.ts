import { Static, Type } from '@sinclair/typebox'

export enum Difficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  EXPERT = 'expert',
}

export const Question = Type.Object({
  id: Type.String(),
  text: Type.String(),
  language: Type.String(),
  difficulty: Type.Enum(Difficulty),
})

export const QuestionInput = Type.Omit(Question, ['id'])

export type QuestionType = Static<typeof Question>
export type QuestionInputType = Static<typeof QuestionInput>
export type QuestionFilter = Partial<Pick<QuestionType, "language" | "difficulty">>
