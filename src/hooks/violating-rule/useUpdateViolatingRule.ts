import { useMutation, useQueryClient } from '@tanstack/react-query';
import { violatingService } from '@service/router';
import { message } from 'antd';
import { UpdateViolatingRuleRequest } from '@service/violating-rule/types';

export function useUpdateViolatingRule(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: UpdateViolatingRuleRequest) =>
      violatingService.updateViolatingRule(req),
    onSuccess: () => {
      message.success('Cập nhật cảnh cáo thành công');
    },
    onError: () => {
      message.error('Cập nhật cảnh cáo không thành công');
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
