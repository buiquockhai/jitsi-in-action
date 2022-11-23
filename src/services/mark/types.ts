import { DeleteFlagTypes } from '@util/constant';

export type MarkResponse = {
  id: string;
  user_id: string;
  room_id: string;
  mark: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface GetMarkRequest {
  user_id?: string;
  room_id?: string;
}

export interface GetMarkResponse extends MarkResponse {}
