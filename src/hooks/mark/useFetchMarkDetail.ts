import { useQuery } from '@tanstack/react-query';
import { markService } from '@service/router';

export const GET_MARK_DETAIL = 'GET_MARK_DETAIL';

export function useFetchMarkDetail(id: string) {
  const res = useQuery([GET_MARK_DETAIL, id], () => markService.getMarkDetail(id));
  return res.data?.data;
}
