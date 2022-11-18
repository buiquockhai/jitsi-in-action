import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';
import { GetUserListRequest } from '@service/user/types';

export const GET_USER_LIST = 'GET_USER_LIST';

export function useFetchUserList(req: GetUserListRequest) {
  const res = useQuery([GET_USER_LIST, JSON.stringify(req)], () =>
    userService.getUserList(req)
  );
  return res.data?.data;
}
