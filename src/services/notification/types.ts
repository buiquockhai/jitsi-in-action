import { DeleteFlagTypes } from '@util/constant';

export interface GetNotificationResponse {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
}
