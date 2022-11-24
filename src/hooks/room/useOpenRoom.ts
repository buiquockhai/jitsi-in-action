import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { OpenRoomRequest } from '@service/room/types';
import { message } from 'antd';

export function useOpenRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: OpenRoomRequest) => roomService.openRoom(req),
    onSuccess: () => {
      message.success('Mở phòng thi thành công');
    },
    onError: () => {
      message.error('Mở phòng thi thi không thành công');
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
