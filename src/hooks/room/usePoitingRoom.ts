import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { PointingRoomRequest } from '@service/room/types';
import { message } from 'antd';

export function usePointingRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: PointingRoomRequest) => roomService.pointingRoom(req),
    onSuccess: () => {
      message.success('Chấm bài thi thành công');
    },
    onError: () => {
      message.error('Chấm bài thi không thành công');
    },
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
