import { DeleteFlagTypes } from '@util/constant';

export type ViolatingRuleResponse = {
  id: string;
  room_id: string;
  user_id: string;
  minus_point: string;
  description: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface GetViolatingRuleResponse extends ViolatingRuleResponse {}

export interface GetViolatingRuleRequest {
  room_id?: string;
  user_id?: string;
}

export interface NewViolatingRuleRequest {
  room_id: string;
  user_id: string;
  minus_point: string;
  description?: string;
}

export interface UpdateViolatingRuleRequest {
  id: string;
  room_id?: string;
  user_id?: string;
  minus_point?: string;
  deleted?: DeleteFlagTypes;
}
