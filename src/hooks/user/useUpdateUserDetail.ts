import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@service/router';
import { UpdateUserDetailRequest } from '@service/user/types';
import { message } from 'antd';

export function useUpdateUserDetail(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

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
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
