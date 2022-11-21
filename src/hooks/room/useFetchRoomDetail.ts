import { useQuery } from '@tanstack/react-query';
import { roomService } from '@service/router';

export const GET_ROOM_DETAIL = 'GET_ROOM_DETAIL';

export function useFetchRoomDetail(id: string) {
  const res = useQuery([GET_ROOM_DETAIL, id], () => roomService.getRoomDetail(id));
  return res.data?.data;
}
