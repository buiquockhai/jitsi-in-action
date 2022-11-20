import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupService } from '@service/router';
import { message } from 'antd';
import { NewGroupRequest } from '@service/group/types';

export function useNewGroup(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewGroupRequest) => groupService.newGroup(data),
    onSuccess: () => {
      message.success('Tạo nhóm thành công');
    },
    onError: () => {
      message.error('Tạo nhóm không thành công');
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
