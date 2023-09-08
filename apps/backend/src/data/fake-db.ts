import type {
  QuestionType,
  QuestionFilter,
  QuestionInputType,
} from "shared-types";
import { v4 as uuidv4 } from "uuid";

export class FakeDB {
  constructor(private db: QuestionType[] = []) {}
  getAll() {
    return this.db;
  }

  getByFilter(filter: QuestionFilter): QuestionType[] {
    const keys = Object.keys(filter);
    return this.db.filter((question) => {
      for (const key of keys) {
        const values = filter[key as keyof QuestionFilter] || [];
        for (const value of values) {
          if (
            question[key as keyof QuestionType] ===
            value
          )
            return true;
        }
      }
      return false;
    });
  }

  add(addend: QuestionInputType): QuestionType {
    const newQuestion = {
      id: uuidv4(),
      ...addend,
    };
    this.db.push(newQuestion);
    return newQuestion;
  }
}
