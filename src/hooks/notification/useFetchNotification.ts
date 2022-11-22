import { useQuery } from '@tanstack/react-query';
import { notificationService } from '@service/router';

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';

export function useFetchNotification(target: string) {
  const res = useQuery([GET_NOTIFICATIONS, target], () =>
    notificationService.getNotifications(target)
  );
  return res.data?.data;
}
