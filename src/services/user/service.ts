import qs from 'query-string';
import { BaseResponse, LoginResponse } from '@schema/system';
import {
  GetFolderRequest,
  GetQuestionRequest,
  GetQuestionResponse,
} from '@schema/questions';
import fetcher from '@util/fetcher';
import { __token } from '@util/constant';
import { Client } from '@util/apis';
import { GetUserDetailResponse } from './types';

class UserService extends Client {
  public login(data: { username: string; password: string }) {
    return fetcher<BaseResponse<LoginResponse>>(`${this.baseUrl}/v1/user/login`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public getUserDetail() {
    return fetcher<BaseResponse<GetUserDetailResponse>>(
      `${this.baseUrl}/v1/user/detail`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getQuestions(params: GetQuestionRequest) {
    return fetcher<BaseResponse<GetQuestionResponse>>(
      `${this.baseUrl}/v1/question?${qs.stringify(params)}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getFolders(params: GetFolderRequest) {
    return fetcher<BaseResponse<GetQuestionResponse>>(
      `${this.baseUrl}/v1/question/folder?${qs.stringify(params)}`,
      {
        headers: this.privateHeaders,
      }
    );
  }
}

const userService = new UserService();

export { userService };
