import { test } from "tap";
import { FakeDB } from "../../src/data/fake-db.js";
import { Difficulty } from "shared-types";

const jsEasy = {
  id: "3",
  text: "Question JS, Easy",
  difficulty: Difficulty.EASY,
  language: "Javascript",
};
const jsExpert = {
  id: "2",
  text: "Question JS, Expert",
  difficulty: Difficulty.EXPERT,
  language: "Javascript",
};
const rustModerate = {
  id: "1",
  text: "Question Rust, Moderate",
  difficulty: Difficulty.MODERATE,
  language: "Rust",
};
const rustExpert = {
  id: "4",
  text: "Question Rust, Expert",
  difficulty: Difficulty.EXPERT,
  language: "Rust",
};

test("getByFilter should return resuls according to given filter", async (t) => {
  const db = new FakeDB([jsEasy, jsExpert, rustModerate, rustExpert]);

  const result = db.getByFilter({
    difficulty: [Difficulty.EASY, Difficulty.EXPERT],
  });
  void result;
  t.same(result, [jsEasy, jsExpert, rustExpert]);
});
