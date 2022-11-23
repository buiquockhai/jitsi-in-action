import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resultService } from '@service/router';
import { UpdateResultRequest } from '@service/result/types';

export function useUpdateResult(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateResultRequest) => resultService.updateResult(data),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
