import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithRouter, screen } from "../utils/test-utils";
import QuestionsPage, { loader } from "../../src/pages/Questions";
// import { it, describe, expect, beforeAll, afterEach, afterAll } from 'vitest'
// import { Difficulty } from "shared-types";

const jsEasy = {
  id: "3",
  text: "Question JS, Easy",
  difficulty: "easy",
  language: "Javascript",
};
const jsExpert = {
  id: "2",
  text: "Question JS, Expert",
  difficulty: "expert",
  language: "Javascript",
};
const rustModerate = {
  id: "1",
  text: "Question Rust, Moderate",
  difficulty: "moderate",
  language: "Rust",
};
const rustExpert = {
  id: "4",
  text: "Question Rust, Expert",
  difficulty: "expert",
  language: "Rust",
};

const questions = [jsEasy, jsExpert, rustModerate, rustExpert];

const server = setupServer(
  rest.get("/questions", (req, res, ctx) => {
    const language = req.url.searchParams.get("language");
    const difficulty = req.url.searchParams.get("difficulty");
    let response = [...questions];
    if (language) {
      response = response.filter((q) => {
        const languages = language.split(',')
        for (const l of languages) {
          if (q.language === l) return true
        }
      });
    }
    if (difficulty) {
      response = response.filter((q) => {
        const difficulties = difficulty.split(',')
        for (const d of difficulties) {
          if (q.difficulty === d) return true
        }
      });
    }
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("testing Question Page", () => {
  it("should render Question page", async () => {
    renderWithRouter(<QuestionsPage />);

    const title = await screen.findByRole("heading", {
      name: /questions/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("should render 'No Data' message if no results", async () => {
    server.use(
      rest.get("/questions", (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    renderWithRouter(<QuestionsPage />, { loader });

    const noData = await screen.findByText(/no data/i);
    expect(noData).toBeInTheDocument();
  });

  it("should render a list with 4 questions", async () => {
    renderWithRouter(<QuestionsPage />, { loader });

    const list = await screen.findByRole("list", {
      name: /filtered questions/i,
    });
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toBe(4);
  });

  it("should render a filter with 1 difficulty", async () => {
    const { user } = renderWithRouter(<QuestionsPage />, { loader });
    const easyCheckbox = await screen.findByRole("checkbox", {
      name: /easy/i,
    });
    const list = await screen.findByRole("list", {
      name: /filtered questions/i,
    });

    // Act
    await user.click(easyCheckbox);

    // Assert
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toBe(1);
    screen.findAllByText(jsEasy.text);
  });

  it("should render a filter with 2 difficulty", async () => {
    const { user } = renderWithRouter(<QuestionsPage />, { loader });
    const easyCheckbox = await screen.findByRole("checkbox", {
      name: /easy/i,
    });
    const expertCheckbox = await screen.findByRole("checkbox", {
      name: /expert/i,
    });
    const list = await screen.findByRole("list", {
      name: /filtered questions/i,
    });

    // Act
    await user.click(easyCheckbox);
    await user.click(expertCheckbox);

    // Assert
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toBe(3);
    screen.findAllByText(jsEasy.text);
  });

  it("should render an unfiltered list if unchecking filters", async () => {
    const { user } = renderWithRouter(<QuestionsPage />, { loader });
    const easyCheckbox = await screen.findByRole("checkbox", {
      name: /easy/i,
    });
    const list = await screen.findByRole("list", {
      name: /filtered questions/i,
    });

    // Act
    await user.click(easyCheckbox);
    await user.click(easyCheckbox);

    // Assert
    expect(easyCheckbox).not.toBeChecked();
    expect(list.childElementCount).toBe(4);
  });

  it("should render a filter with 1 language", async () => {
    const { user } = renderWithRouter(<QuestionsPage />, { loader });
    const checkbox = await screen.findByRole("checkbox", {
      name: /javascript/i,
    });
    const list = await screen.findByRole("list", {
      name: /filtered questions/i,
    });
    
    // Act
    await user.click(checkbox);

    // Assert
    expect(list).toBeInTheDocument();
    expect(list.childElementCount).toBe(2);
    screen.findAllByText(jsEasy.text);
    screen.findAllByText(jsExpert.text);
  });
});
