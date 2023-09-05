import { FastifyPluginAsync } from "fastify";
import {
  Difficulty,
  Question,
  QuestionInput,
  QuestionType,
  QuestionInputType,
} from "shared-types";

interface IQuerystring {
  language: string;
  difficulty: Difficulty;
}

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{ Querystring: IQuerystring }>("/", async (request) => {
    if (Object.keys(request.query).length) {
      return fastify.db.getByFilter(request.query);
    }
    return fastify.db.getAll();
  });

  fastify.post<{ Body: QuestionInputType; Reply: QuestionType }>(
    "/",
    {
      schema: {
        body: QuestionInput,
        response: {
          201: Question,
        },
      },
    },
    async (request) => {
      return fastify.db.add(request.body);
    }
  );
};

export default root;
