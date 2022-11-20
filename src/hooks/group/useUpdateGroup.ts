import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupService } from '@service/router';
import { message } from 'antd';
import { UpdateGroupRequest } from '@service/group/types';

export function useUpdateGroup(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateGroupRequest) => groupService.updateFolder(data),
    onSuccess: () => {
      message.success('Cập nhật nhóm thành công');
    },
    onError: () => {
      message.error('Cập nhật nhóm không thành công');
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
