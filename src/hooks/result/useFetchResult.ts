import { useQuery } from '@tanstack/react-query';
import { resutlService } from '@service/router';

export const GET_RESULTS = 'GET_RESULTS';

export function useFetchResults(roomId: string) {
  const res = useQuery([GET_RESULTS], () => resutlService.getResults(roomId));
  return res.data?.data;
}
