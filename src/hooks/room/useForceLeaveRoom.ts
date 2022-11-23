import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { TeacherForceLeaveRoomRequest } from '@service/room/types';

export function useForceLeaveRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: TeacherForceLeaveRoomRequest) =>
      roomService.forceLeaveRoom(req),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
