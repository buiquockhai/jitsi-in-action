import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRoomService } from '@service/router';
import { message } from 'antd';
import { KickOutRequest } from '@service/user-room/types';

export function useKickOutStudent(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: KickOutRequest) => userRoomService.kickOut(req),
    onSuccess: () => {
      message.success('Thành công');
    },
    onError: () => {
      message.error('Không thành công');
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
