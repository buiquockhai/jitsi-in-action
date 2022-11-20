import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';
import { GET_USER_FREEZE_LIST, GET_USER_LIST } from './keys';

export function useFetchUserFreeze() {
  const res = useQuery([GET_USER_FREEZE_LIST, GET_USER_LIST], () =>
    userService.getUserFreeze()
  );
  return res.data?.data;
}
