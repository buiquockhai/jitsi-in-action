import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { message } from 'antd';
import { UpdateRoomRequest } from '@service/room/types';

export function useUpdateRoom(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoomRequest) => roomService.updateRoom(data),
    onSuccess: () => {
      message.success('Cập nhật phòng thi thành công');
    },
    onError: () => {
      message.error('Cập nhật phòng thi không thành công');
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
