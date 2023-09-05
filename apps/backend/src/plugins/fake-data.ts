import fp from "fastify-plugin";
import Enums from "shared-types";
import { FakeDB } from "../data/fake-db.js";
// import { FakeDB } from "../data/fake-db";
const { Difficulty } = Enums;


export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify) => {
  fastify.decorate(
    "db",
    new FakeDB([
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
    ])
  );
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    db: FakeDB;
  }
}
