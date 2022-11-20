import { DeleteFlagTypes } from '@util/constant';

export type RoomResponse = {
  id: string;
  title: string;
  exam_id: string;
  exam_title: string;
  group_id: string;
  group_title: string;
  proctor_id: string;
  proctor_name: string;
  start_date: string;
  meeting: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface NewRoomRequest {
  title: string;
  exam_id: string;
  exam_title: string;
  group_id: string;
  group_title: string;
  proctor_id: string;
  proctor_name: string;
  start_date?: Date;
  meeting?: string;
}

export interface UpdateRoomRequest {
  id: string;
  title?: string;
  exam_id?: string;
  exam_title?: string;
  group_id?: string;
  group_title?: string;
  proctor_id?: string;
  proctor_name?: string;
  start_date?: Date;
  meeting?: string;
  deleted: DeleteFlagTypes;
}
