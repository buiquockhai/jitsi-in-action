import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { StudentCancelJoinRoomRequest } from '@service/room/types';

export function useStudentCancelJoinRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: StudentCancelJoinRoomRequest) =>
      roomService.studentCancelJoinRoom(req),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
