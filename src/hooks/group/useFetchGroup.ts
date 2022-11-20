import { useQuery } from '@tanstack/react-query';
import { groupService } from '@service/router';

export const GET_GROUPS = 'GET_GROUPS';

export function useFetchGroups() {
  const res = useQuery([GET_GROUPS], () => groupService.getGroups());
  return res.data?.data;
}
