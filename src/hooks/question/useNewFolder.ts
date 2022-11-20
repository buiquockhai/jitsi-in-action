import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { message } from 'antd';
import { NewFolderRequest } from '@service/question/types';

export function useNewFolder(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewFolderRequest) => questionService.newFolder(data),
    onSuccess: () => {
      message.success('Tạo mới folder thành công');
    },
    onError: () => {
      message.error('Tạo mới folder không thành công');
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
