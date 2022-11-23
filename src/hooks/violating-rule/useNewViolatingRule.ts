import { useMutation, useQueryClient } from '@tanstack/react-query';
import { violatingService } from '@service/router';
import { message } from 'antd';
import { NewViolatingRuleRequest } from '@service/violating-rule/types';

export function useNewViolatingRule(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: NewViolatingRuleRequest) =>
      violatingService.newViolatingRule(req),
    onSuccess: () => {
      message.success('Cảnh cáo thành công');
    },
    onError: () => {
      message.error('Cảnh cáo không thành công');
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
