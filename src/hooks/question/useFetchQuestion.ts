import { GetQuestionRequest } from '@schema/questions';
import { useQuery } from '@tanstack/react-query';
import { client } from '@util/apis';

const queryKey = 'GET_QUESTIONS';

export function useFetchQuestion(params?: GetQuestionRequest) {
  return useQuery([queryKey], () => client.getQuestions(params ?? {}));
}
