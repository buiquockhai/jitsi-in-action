import { useQuery } from '@tanstack/react-query';
import { markService } from '@service/router';
import { GetMarkRequest } from '@service/mark/types';

export const GET_FULL_MARKS = 'GET_FULL_MARKS';

export function useFetchFullMarks(req: GetMarkRequest) {
  const res = useQuery([GET_FULL_MARKS, JSON.stringify(req)], () =>
    markService.getFullMarks(req)
  );
  return res.data?.data;
}
