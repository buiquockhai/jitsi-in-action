import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { TeacherRejectJoinRoomRequest } from '@service/room/types';

export function useTeacherRejectJoinRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: TeacherRejectJoinRoomRequest) =>
      roomService.teacherRejectJoinRoom(req),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
