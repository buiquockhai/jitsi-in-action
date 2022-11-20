import qs from 'query-string';
import { BaseResponse, LoginResponse } from '@schema/system';
import fetcher from '@util/fetcher';
import { __token } from '@util/constant';
import { Client } from '@util/apis';
import {
  GetUserDetailResponse,
  GetUserListRequest,
  GetUserListResponse,
  UpdateUserDetailRequest,
  UpdateUserPasswordRequest,
} from './types';
import { uuidVerify } from '@util/functions';

class UserService extends Client {
  public login(data: { username: string; password: string }) {
    return fetcher<BaseResponse<LoginResponse>>(`${this.baseUrl}/v1/user/login`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public getUserList(req: GetUserListRequest) {
    return fetcher<BaseResponse<GetUserListResponse[]>>(
      `${this.baseUrl}/v1/user?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getUserDetail() {
    return fetcher<BaseResponse<GetUserDetailResponse>>(
      `${this.baseUrl}/v1/user/detail`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public updateUserDetail(req: UpdateUserDetailRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/user`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }

  public updateUserPassword(req: UpdateUserPasswordRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/user/password`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const userService = new UserService();

export { userService };
