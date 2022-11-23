import { useQuery } from '@tanstack/react-query';
import { resultService } from '@service/router';
import { GetResultRequest } from '@service/result/types';

export const GET_RESULTS = 'GET_RESULTS';

export function useFetchResults(req: GetResultRequest) {
  const res = useQuery([GET_RESULTS, JSON.stringify(req)], () =>
    resultService.getResults(req)
  );
  return res.data?.data;
}
