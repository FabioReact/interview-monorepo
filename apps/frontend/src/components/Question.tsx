import { Difficulty } from 'shared-types'

type DifficultyLabelProps = {
  difficulty: Difficulty
}

const DifficultyLabel = ({ difficulty }: DifficultyLabelProps) => {
  let specificStyle
  switch (difficulty) {
    case Difficulty.EASY:
      specificStyle = 'bg-lime-50 border-lime-700 text-lime-700'
      break;
    case Difficulty.MODERATE:
      specificStyle = 'bg-orange-50 border-orange-600 text-orange-600'
      break;
    case Difficulty.EXPERT:
      specificStyle = 'bg-red-50 border-red-700 text-red-700'
      break;
    default:
      break;
  }
  return (
    <div className={`rounded-xl px-2 border capitalize text-sm ${specificStyle}`}>{difficulty}</div>
  )
}

type QuestionProps = {
  difficulty: Difficulty
  language: string
  text: string
  bg: string
}

const Question = ({ difficulty, language, text, bg }: QuestionProps) => {
  console.log(bg)
  return (
    <div className="flex">
      <DifficultyLabel difficulty={difficulty} />
      <span className={`rounded-xl px-2 border capitalize text-sm text-white ${bg}`}>{language}</span>
      <p>{text}</p>
    </div>
  )
}

export default Question