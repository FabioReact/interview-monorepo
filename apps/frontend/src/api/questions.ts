import { Difficulty } from 'shared-types';
import axios from 'axios';

export const getQuestions = async (params?: {
  language?: string;
  difficulty?: string;
}) => {
  try {
    const response = await axios.get('http://localhost:3000/questions', {
      params,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
