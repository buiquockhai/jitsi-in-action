import { DeleteFlagTypes } from '@util/constant';
import { RoomResponse } from '@service/room/types';

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
  tb_room?: RoomResponse;
};

export interface GetMarkRequest {
  user_id?: string;
  room_id?: string;
}

export interface GetMarkResponse extends MarkResponse {}
