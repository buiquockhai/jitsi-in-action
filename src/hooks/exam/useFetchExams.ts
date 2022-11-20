import { useQuery } from '@tanstack/react-query';
import { examService } from '@service/router';
import { GetExamRequest } from '@service/exam/types';

const GET_EXAMS = 'GET_EXAMS';

export function useFetchExams(req: GetExamRequest) {
  const res = useQuery([GET_EXAMS], () => examService.getExams(req));
  return res.data?.data;
}
