import { useQuery } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { GetRoomRequest } from '@service/room/types';

export const GET_ROOMS = 'GET_ROOMS';

export function useFetchRooms(req: GetRoomRequest) {
  const res = useQuery([GET_ROOMS], () => roomService.getRooms(req));
  return res.data?.data;
}
