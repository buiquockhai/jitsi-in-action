import {
  DeleteFlagTypes,
  RequestJoinRoomStatusTypes,
  RoleTypes,
  UserRoomVerifiedTypes,
} from '@util/constant';
import { GetUserListResponse } from '@service/user/types';
import { RoomResponse } from '@service/room/types';

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
  tb_room: RoomResponse;
}

export interface AuthStudentInRoomRequest {
  user_id: string;
  room_id: string;
  verified: UserRoomVerifiedTypes;
}

export interface KickOutRequest {
  user_id: string;
  room_id: string;
}

export interface VerifyJoinRoomRequest {
  room_id: string;
  role: RoleTypes;
}
