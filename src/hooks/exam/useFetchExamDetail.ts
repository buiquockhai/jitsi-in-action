import { useQuery } from '@tanstack/react-query';
import { examService } from '@service/router';

const GET_EXAM_DETAIL = 'GET_EXAM_DETAIL';

export function useFetchExamDetail(id: string) {
  const res = useQuery([GET_EXAM_DETAIL, id], () => examService.getExamDetail(id));
  return res.data?.data;
}
