import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "../utils/test-utils";
import QuestionsPage from "../../src/pages/Questions";
// import { it, describe, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { Difficulty } from "shared-types";

const questions = [
  {
    id: "1",
    text: "Question Rust, Moderate",
    difficulty: Difficulty.MODERATE,
    language: "Rust",
  },
  {
    id: "2",
    text: "Question JS, Expert",
    difficulty: Difficulty.EXPERT,
    language: "Javascript",
  },
  {
    id: "3",
    text: "Question JS, Easy",
    difficulty: Difficulty.EASY,
    language: "Javascript",
  },
  {
    id: "4",
    text: "Question Rust, Expert",
    difficulty: Difficulty.EXPERT,
    language: "Rust",
  },
];

const server = setupServer(
  rest.post("/questions", (req, res, ctx) => {
    return res(ctx.json(questions));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("testing Question Page", () => {
  it("should render Question page", async () => {
    render(<QuestionsPage />);

    const title = await screen.findByRole("heading");
    expect(title).toHaveTextContent('Questions')
  });

  it("should render an empty list", async () => {
    render(<QuestionsPage />);

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
  });

  // it("should render an list with 4 questions", async () => {
  //   render(<QuestionsPage />);

  //   const list = await screen.findByRole("list");
  //   expect(list).toBeInTheDocument();
  //   expect(list).not.toBeEmptyDOMElement();
  // });
});
