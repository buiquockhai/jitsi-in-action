import { useQuery } from '@tanstack/react-query';
import { roomService } from '@service/router';

export const GET_ROOMS = 'GET_ROOMS';

export function useFetchRooms() {
  const res = useQuery([GET_ROOMS], () => roomService.getRooms());
  return res.data?.data;
}
