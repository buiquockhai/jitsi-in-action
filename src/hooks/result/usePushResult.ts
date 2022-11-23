import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resultService } from '@service/router';
import { PushResultRequest } from '@service/result/types';

export function usePushResult(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PushResultRequest) => resultService.pushResult(data),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
