import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resultService } from '@service/router';
import { NewResultRequest } from '@service/result/types';

export function useNewResult(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewResultRequest) => resultService.newResult(data),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
