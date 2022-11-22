import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';
import { GET_USER_DETAIL } from './keys';

export function useFetchUserDetail(id: string) {
  const res = useQuery([GET_USER_DETAIL, id], () => userService.getUserDetail(id));
  return res.data?.data;
}
