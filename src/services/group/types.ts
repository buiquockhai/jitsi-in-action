import { DeleteFlagTypes } from '@util/constant';
import { GetUserListResponse } from '@service/user/types';

export type GroupResponse = {
  id: string;
  code: string;
  title: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface GetGroupsResponse extends GroupResponse {}

export interface GetGroupDetailResponse extends GroupResponse {
  tb_users: GetUserListResponse[];
}

export interface NewGroupRequest {
  code: string;
  title: string;
  users: string[];
}

export interface UpdateGroupRequest {
  id: string;
  title?: string;
  users?: string[];
  deleted?: DeleteFlagTypes;
}
