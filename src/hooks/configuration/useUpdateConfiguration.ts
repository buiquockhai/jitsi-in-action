import { useMutation, useQueryClient } from '@tanstack/react-query';
import { configurationService } from '@service/router';
import { message } from 'antd';
import { UpdateConfigurationRequest } from '@service/configuration/types';

export function userUpdateConfiguration(invalidateKeys?: string[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateConfigurationRequest) =>
      configurationService.updateConfiguration(data),
    onSuccess: () => {
      message.success('Cập nhật cấu hình thành công');
    },
    onError: () => {
      message.error('Cập nhật cấu hình không thành công');
    },
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }
    },
  });
}
