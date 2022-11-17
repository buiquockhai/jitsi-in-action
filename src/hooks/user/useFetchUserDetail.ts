import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';

const queryKey = 'GET_USER_DETAIL';

export function useFetchUserDetail() {
  const res = useQuery([queryKey], () => userService.getUserDetail());
  return res.data?.data;
}
