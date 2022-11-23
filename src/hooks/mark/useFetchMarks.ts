import { useQuery } from '@tanstack/react-query';
import { markService } from '@service/router';
import { GetMarkRequest } from '@service/mark/types';

export const GET_MARKS = 'GET_MARKS';

export function useFetchMarks(req: GetMarkRequest) {
  const res = useQuery([GET_MARKS, JSON.stringify(req)], () =>
    markService.getMarks(req)
  );
  return res.data?.data;
}
