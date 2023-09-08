import { getQuestions } from "@/api/questions";
import Filters from "@/components/Filter";
import Question from "@/components/Question";
import { useLoaderData, useSearchParams } from "react-router-dom";
import {
  QuestionType,
  difficultyList,
  languageList,
} from "shared-types";

const generateQuestionColors = (questions: QuestionType[]) => {
  const colors = [
    "bg-red-600",
    "bg-orange-600",
    "bg-amber-600",
    "bg-yellow-600",
    "bg-lime-600",
    "bg-green-600",
    "bg-emerald-600",
    "bg-teal-600",
    "bg-cyan-600",
    "bg-sky-600",
    "bg-blue-600",
    "bg-indigo-600",
    "bg-violet-600",
    "bg-purple-600",
    "bg-fuchsia-600",
    "bg-pink-600",
    "bg-rose-600",
  ];

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  if (!questions || questions.length === 0) return {};

  const languages = [...new Set(questions.map((q) => q.language))];
  const result = languages.reduce((acc, l) => {
    const colorIndex = getRandomInt(colors.length);
    const selectedColor = colors[colorIndex];
    colors.splice(colorIndex, 1);
    acc[l] = selectedColor;
    return acc;
  }, {} as { [key: string]: string });
  return result;
};


const Questions = (): React.ReactElement => {
  const questions = useLoaderData() as Awaited<QuestionType[]>;
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams)
  // const questions: QuestionType[] = []
  const colors = generateQuestionColors(questions);
  return (
    <div>
      <h1 className="text-5xl text-center uppercase tracking-widest font-light my-10">
        Questions
      </h1>
      <div className="flex">
        <form className="">
          <Filters label="difficulty" options={difficultyList} callback={setSearchParams} />
          <Filters label="language" options={languageList} callback={setSearchParams} />
        </form>
        <div>
          {!questions || !questions.length ? (
            <p>No Data!</p>
          ) : (
            <ul title="Filtered Questions">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;

export const loader = async ({
  request,
}: {
  request: Request;
}): Promise<QuestionType[]> => {
  // const difficultyList: string[] = Object.values(Difficulty);
  const searchParams = new URL(request.url).searchParams;
  // const difficulty = difficultyList.filter(
  //   (d) => d === searchParams.get("difficulty")
  // ) as Difficulty;
  const params = {
    language: searchParams.get("language") || undefined,
    difficulty: searchParams.get("difficulty") || undefined,
  };
  return getQuestions(params);
};
