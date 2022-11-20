import { useQuery } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { GET_FOLDER, GET_QUESTION } from './keys';

export function useFetchTree() {
  const res = useQuery([GET_QUESTION, GET_FOLDER], () => questionService.getTree());
  return res.data?.data;
}
