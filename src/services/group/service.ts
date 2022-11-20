import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import {
  GetGroupDetailResponse,
  GetGroupsResponse,
  NewGroupRequest,
  UpdateGroupRequest,
} from './types';

class Group extends Client {
  public getGroups() {
    return fetcher<BaseResponse<GetGroupsResponse[]>>(`${this.baseUrl}/v1/group`, {
      headers: this.privateHeaders,
    });
  }

  public getGroupDetail(id: string) {
    return fetcher<BaseResponse<GetGroupDetailResponse>>(
      `${this.baseUrl}/v1/group/${id}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public newGroup(req: NewGroupRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/group`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public updateFolder(req: UpdateGroupRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/group`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const groupService = new Group();

export { groupService };
