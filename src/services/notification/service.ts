import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { GetNotificationResponse } from './types';

class Notification extends Client {
  public getNotifications(userTarget: string) {
    if (userTarget?.length <= 0) return;
    return fetcher<BaseResponse<GetNotificationResponse[]>>(
      `${this.baseUrl}/v1/notification`,
      {
        headers: this.privateHeaders,
      }
    );
  }
}

const notificationService = new Notification();

export { notificationService };
