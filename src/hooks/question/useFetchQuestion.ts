import { GetQuestionRequest } from '@schema/questions';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';

const queryKey = 'GET_QUESTIONS';

export function useFetchQuestion(params?: GetQuestionRequest) {
  return useQuery([queryKey], () => userService.getQuestions(params ?? {}));
}
