import { useQuery } from '@tanstack/react-query';
import { userRoomService } from '@service/router';
import { GetUserRoomRequest } from '@service/user-room/types';

export const GET_USER_IN_ROOM = 'GET_USER_IN_ROOM';

export function useFetchUserInRoom(req: GetUserRoomRequest) {
  const res = useQuery([GET_USER_IN_ROOM, JSON.stringify(req)], () =>
    userRoomService.getUserRooms(req)
  );
  return res.data?.data;
}
