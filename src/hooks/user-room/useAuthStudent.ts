import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRoomService } from '@service/router';
import { message } from 'antd';
import { AuthStudentInRoomRequest } from '@service/user-room/types';

export function useAuthStudent(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: AuthStudentInRoomRequest) => userRoomService.authStudent(req),
    onSuccess: () => {
      message.success('Cập nhật xác thực thành công');
    },
    onError: () => {
      message.error('Cập nhật xác thực không thành công');
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
