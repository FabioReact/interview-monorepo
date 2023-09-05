import { getQuestions } from '@/api/questions';
import Question from '@/components/Question';
import { useLoaderData } from 'react-router-dom';
import { QuestionType, Difficulty } from 'shared-types';

const generateQuestionColors = (questions: QuestionType[]) => {
  const colors = [
    'bg-red-600',
    'bg-orange-600',
    'bg-amber-600',
    'bg-yellow-600',
    'bg-lime-600',
    'bg-green-600',
    'bg-emerald-600',
    'bg-teal-600',
    'bg-cyan-600',
    'bg-lightblue-600',
    'bg-blue-600',
    'bg-indigo-600',
    'bg-violet-600',
    'bg-purple-600',
    'bg-fuchsia-600',
    'bg-pink-600',
    'bg-rose-600',
    'bg-rose-600',
  ];

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const languages = [...new Set(questions.map((q) => q.language))];
  const result = languages.reduce((acc, l) => {
    const colorIndex = getRandomInt(colors.length);
    const selectedColor = colors[colorIndex];
    colors.splice(colorIndex, 1);
    acc[l] = selectedColor;
    return acc;
  }, {} as {[key: string]: string});
  return result;
};

const Questions = (): React.ReactElement => {
  const questions = useLoaderData() as QuestionType[];
  // const questions: QuestionType[]  = []
  const colors = generateQuestionColors(questions);
  console.log(colors);
  return (
    <div>
      <h1 className="text-5xl text-center uppercase tracking-widest font-light my-10">
        Questions
      </h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Question
              difficulty={question.difficulty}
              text={question.text}
              language={question.language}
              bg={colors[question.language]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;

export const loader = async ({
  request,
}: {
  request: Request;
}): Promise<QuestionType[]> => {
  const difficultyList: string[] = Object.values(Difficulty);
  const searchParams = new URL(request.url).searchParams;
  const difficulty = difficultyList.find(
    (d) => d === searchParams.get('difficulty')
  ) as Difficulty;
  const params = {
    language: searchParams.get('language') || undefined,
    difficulty,
  };
  return getQuestions(params);
};
