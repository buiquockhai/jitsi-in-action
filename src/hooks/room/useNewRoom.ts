import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { message } from 'antd';
import { NewRoomRequest } from '@service/room/types';

export function useNewRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewRoomRequest) => roomService.newRoom(data),
    onSuccess: () => {
      message.success('Tạo mới phòng thi thành công');
    },
    onError: () => {
      message.error('Tạo mới phòng thi không thành công');
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
