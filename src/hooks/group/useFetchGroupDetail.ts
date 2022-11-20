import { useQuery } from '@tanstack/react-query';
import { groupService } from '@service/router';

export const GET_GROUP_DETAIL = 'GET_GROUP_DETAIL';

export function useFetchGroupDetail(id: string) {
  const res = useQuery([GET_GROUP_DETAIL, id], () =>
    groupService.getGroupDetail(id)
  );
  return res.data?.data;
}
