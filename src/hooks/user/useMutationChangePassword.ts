import { useMutation } from '@tanstack/react-query';
import { userService } from '@service/router';
import { UpdateUserPasswordRequest } from '@service/user/types';
import { message } from 'antd';

export function userMutationUserChangePassword() {
  return useMutation({
    mutationFn: (data: UpdateUserPasswordRequest) =>
      userService.updateUserPassword(data),
    onSuccess: () => {
      message.success('Thay đổi mật khẩu thành công');
    },
    onError: () => {
      message.error('Thay đổi mật khẩu không thành công');
    },
  });
}
