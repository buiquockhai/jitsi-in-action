import { useQuery } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { GET_QUESTION_DETAIL } from './keys';

export function useFetchQuestionDetail(id?: string) {
  const res = useQuery([GET_QUESTION_DETAIL, id], () =>
    questionService.getQuestionDetail(id ?? '')
  );
  return res.data?.data;
}
