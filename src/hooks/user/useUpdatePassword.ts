import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@service/router';
import { UpdateUserPasswordRequest } from '@service/user/types';
import { message } from 'antd';

export function useUpdatePassword(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserPasswordRequest) =>
      userService.updateUserPassword(data),
    onSuccess: () => {
      message.success('Thay đổi mật khẩu thành công');
    },
    onError: () => {
      message.error('Thay đổi mật khẩu không thành công');
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
