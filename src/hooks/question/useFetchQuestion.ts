import { useQuery } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { GET_QUESTION } from './keys';
import { GetQuestionRequest } from '@service/question/types';

export function useFetchQuestion(req: GetQuestionRequest) {
  const res = useQuery([GET_QUESTION, JSON.stringify(req)], () => questionService.getQuestion(req));
  return res.data?.data;
}
