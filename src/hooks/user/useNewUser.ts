import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@service/router';
import { NewUserRequest } from '@service/user/types';
import { message } from 'antd';

export function useNewUser(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewUserRequest) => userService.newUser(data),
    onSuccess: () => {
      message.success('Đăng ký thành công');
    },
    onError: () => {
      message.error('Đăng ký không thành công');
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
