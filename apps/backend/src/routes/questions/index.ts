import { FastifyPluginAsync } from "fastify";
import {
  Question,
  QuestionInput,
  QuestionType,
  QuestionInputType,
} from "shared-types";

interface IQuerystring {
  language: string;
  difficulty: string;
}

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{ Querystring: IQuerystring }>("/", async (request) => {
    const filterKeys = Object.keys(request.query)
    if (filterKeys.length) {
      const query: any = {}
      filterKeys.forEach(k => {
        query[k] = request.query[k as keyof IQuerystring].split(',');
      });
      console.log(query)
      return fastify.db.getByFilter(query);
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
