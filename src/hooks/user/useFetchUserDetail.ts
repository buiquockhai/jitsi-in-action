import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';
import { GET_USER_DETAIL, GET_USER_LIST } from './keys';

export function useFetchUserDetail() {
  const res = useQuery([GET_USER_DETAIL, GET_USER_LIST], () =>
    userService.getUserDetail()
  );
  return res.data?.data;
}
