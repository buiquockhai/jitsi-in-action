import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';
import { GetUserListRequest } from '@service/user/types';
import { GET_USER_LIST } from './keys';

export function useFetchUsers(req: GetUserListRequest) {
  const res = useQuery([GET_USER_LIST, JSON.stringify(req)], () =>
    userService.getUserList(req)
  );
  return res.data?.data;
}
