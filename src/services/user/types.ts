import { RoleTypes } from '@schema/system';
import { DeleteFlagTypes, GenderTypes } from '@util/constant';

export interface GetUserListRequest {
  role?: RoleTypes;
  code?: string;
  gender?: GenderTypes;
  group_id?: string;
  phone?: string;
}

export interface GetUserListResponse {
  id: string;
  role: RoleTypes;
  name: string;
  code: string;
  gender: GenderTypes;
  date_of_birth: string;
  group_id: string;
  group_title: string;
  phone: string;
  address: string;
  contact: string;
  avatar: string;
  username: string;
  password: string;
  created_date: Date;
  created_id: string;
  updated_date: Date;
  updated_id: string;
  deleted: DeleteFlagTypes;
}

export interface GetUserDetailResponse {
  id: string;
  role: RoleTypes;
  name: string;
  code: string;
  gender: GenderTypes;
  date_of_birth: string;
  group_id?: string;
  group_title?: string;
  phone: string;
  address: string;
  contact: string;
  avatar: string;
  username: string;
  password: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
}

export interface UpdateUserDetailRequest {
  id: string;
  role?: RoleTypes;
  name?: string;
  code?: string;
  gender?: GenderTypes;
  date_of_birth?: string;
  group_id?: string;
  group_title?: string;
  phone?: string;
  address?: string;
  contact?: string;
  avatar?: string;
  username?: string;
  password?: string;
  deleted?: DeleteFlagTypes;
}

export interface UpdateUserPasswordRequest {
  old_password: string;
  new_password: string;
}

export interface NewUserRequest {
  username: string;
  name: string;
  gender: GenderTypes;
  date_of_birth: string;
  phone: string;
  address: string;
  contact: string;
  avatar: string;
  password: string;
  secret_key: string;
}
