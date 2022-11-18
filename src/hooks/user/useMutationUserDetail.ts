import { QueryClient, useMutation } from '@tanstack/react-query';
import { userService } from '@service/router';
import { UpdateUserDetailRequest } from '@service/user/types';
import { message } from 'antd';

const queryClient = new QueryClient();

export function userMutationUserDetail(invalidateKeys?: string[]) {
  return useMutation({
    mutationFn: (data: UpdateUserDetailRequest) =>
      userService.updateUserDetail(data),
    onSuccess: () => {
      message.success('Cập nhật thông tin thành công');
    },
    onError: () => {
      message.error('Cập nhật thông tin không thành công');
    },
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }
    },
  });
}
