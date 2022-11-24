import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { CloseRoomRequest } from '@service/room/types';
import { message } from 'antd';

export function useCloseRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: CloseRoomRequest) => roomService.closeRoom(req),
    onSuccess: () => {
      message.success('Đóng phòng thi thành công');
    },
    onError: () => {
      message.error('Đóng phòng thi thi không thành công');
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
