import { Static, Type } from "@sinclair/typebox";

export enum Difficulty {
  EASY = "easy",
  MODERATE = "moderate",
  EXPERT = "expert",
}
export enum Languages {
  Javascript = "Javascript",
  Python = "Python",
  Go = "Go",
  Java = "Java",
  Kotlin = "Kotlin",
  PHP = "PHP",
  CSharp = "C#",
  Swift = "Swift",
  R = "R",
  Ruby = "Ruby",
  C = "C",
  CPP = "C++",
  Git = "Git",
  TypeScript = "TypeScript",
  Scala = "Scala",
  SQL = "SQL",
  HTML = "HTML",
  CSS = "CSS",
  NoSQL = "NoSQL",
  Rust = "Rust",
  Perl = "Perl",
  Shell = "Shell",
}

export const difficultyList = Object.values(Difficulty);
export const languageList = Object.values(Languages);

export const Question = Type.Object({
  id: Type.String(),
  text: Type.String(),
  language: Type.String(),
  difficulty: Type.Enum(Difficulty),
});

export const QuestionInput = Type.Omit(Question, ["id"]);

export type QuestionType = Static<typeof Question>;
export type QuestionInputType = Static<typeof QuestionInput>;
export type QuestionFilter = {
  language?: string[];
  difficulty?: Difficulty[];
}
