import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';

export const GET_USER_DETAIL = 'GET_USER_DETAIL';

export function useFetchUserDetail() {
  const res = useQuery([GET_USER_DETAIL], () => userService.getUserDetail());
  return res.data?.data;
}
