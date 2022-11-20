import { DeleteFlagTypes } from '@util/constant';

export interface GetConfigurationRequest {
  key?: string;
  value?: string;
  deleted?: DeleteFlagTypes;
}

export interface GetConfigurationResponse {
  key: string;
  value: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
}

export interface UpdateConfigurationRequest {
  key: string;
  value?: string;
  deleted?: DeleteFlagTypes;
}

export interface NewConfigurationRequest {
  key: string;
  value: string;
}
