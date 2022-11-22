import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { GetNotificationResponse, NewNotificationRequest } from './types';

class Notification extends Client {
  public getNotifications(userTarget: string) {
    if (userTarget?.length <= 0) return;
    return fetcher<BaseResponse<GetNotificationResponse[]>>(
      `${this.baseUrl}/v1/notification?user_id=${userTarget}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public newNotification(req: NewNotificationRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/notification`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }
}

const notificationService = new Notification();

export { notificationService };
