import { test } from "tap";
import { build } from "../helper.js";
import { FastifyInstance } from "fastify";

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

test("GET/questions should load all questions", async (t) => {
  // Act
  const app = await build(t);

  const res = await app.inject({
    url: "/questions",
  });

  // Arrange
  const questions = [rustModerate, jsExpert, jsEasy, rustExpert];

  // Assert
  t.same(JSON.parse(res.payload), questions);
});

test("GET/questions?difficulty should load all questions with selected difficulty", async (t) => {
  // Act
  const app: FastifyInstance = await build(t);

  const res = await app.inject({
    url: "/questions",
    query: {
      difficulty: "expert"
    }
  });

  // Arrange
  const questions = [jsExpert, rustExpert];

  // Assert
  t.same(JSON.parse(res.payload), questions);
});
