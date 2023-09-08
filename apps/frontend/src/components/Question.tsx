import { Difficulty } from 'shared-types'

type DifficultyLabelProps = {
  difficulty: Difficulty
}

const DifficultyLabel = ({ difficulty }: DifficultyLabelProps) => {
  let specificStyle
  switch (difficulty) {
    case Difficulty.EASY:
      specificStyle = 'bg-lime-100 border-lime-800 text-lime-800'
      break;
    case Difficulty.MODERATE:
      specificStyle = 'bg-orange-100 border-orange-600 text-orange-600'
      break;
    case Difficulty.EXPERT:
      specificStyle = 'bg-red-100 border-red-800 text-red-800'
      break;
    default:
      break;
  }
  return (
    <div className={`w-32 capitalize`}>
      <span className={`rounded px-2.5 py-0.5 border capitalize text-sm ${specificStyle}`}>{difficulty}</span>
    </div>
  )
}

type QuestionProps = {
  difficulty: Difficulty
  language: string
  text: string
  bg: string
}

const Question = ({ difficulty, language, text, bg }: QuestionProps) => {
  return (
    <div className="flex">
      <DifficultyLabel difficulty={difficulty} />
      <div className="w-32">
        <span className={`rounded-full px-2.5 py-0.5 border capitalize text-sm text-white ${bg}`}>{language}</span>
      </div>
      <p>{text}</p>
    </div>
  )
}

export default Question