import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@service/router';
import { NewNotificationRequest } from '@service/notification/types';

export function useNewNotification(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewNotificationRequest) =>
      notificationService.newNotification(data),
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
