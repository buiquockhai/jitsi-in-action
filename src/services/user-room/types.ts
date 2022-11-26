import {
  DeleteFlagTypes,
  RequestJoinRoomStatusTypes,
  UserRoomVerifiedTypes,
} from '@util/constant';
import { GetUserListResponse } from '@service/user/types';

export type UserRoomResponse = {
  id: string;
  user_id: string;
  room_id: string;
  status: RequestJoinRoomStatusTypes;
  verified: UserRoomVerifiedTypes;
  description: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface GetUserRoomRequest {
  id?: string;
  user_id?: string;
  room_id?: string;
  status?: RequestJoinRoomStatusTypes;
  verified?: UserRoomVerifiedTypes;
}

export interface GetUserRoomResponse extends UserRoomResponse {
  tb_user: GetUserListResponse;
}
