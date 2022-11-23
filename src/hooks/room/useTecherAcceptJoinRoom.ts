import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { TeacherAcceptJoinRoomRequest } from '@service/room/types';

export function useTeacherAcceptJoinRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: TeacherAcceptJoinRoomRequest) =>
      roomService.teacherAcceptJoinRoom(req),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
