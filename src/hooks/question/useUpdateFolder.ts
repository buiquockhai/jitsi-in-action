import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { message } from 'antd';
import { UpdateFolderRequest } from '@service/question/types';

export function useUpdateFolder(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateFolderRequest) => questionService.updateFolder(data),
    onSuccess: () => {
      message.success('Cập nhật folder thành công');
    },
    onError: () => {
      message.error('Cập nhật folder không thành công');
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
