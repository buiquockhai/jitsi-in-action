import qs from 'query-string';
import fetcher from './fetcher';
import { __token } from './constant';
import { getCookie } from './functions';
import { BaseResponse, LoginResponse } from '@schema/system';
import {
  GetFolderRequest,
  GetQuestionRequest,
  GetQuestionResponse,
} from '@schema/questions';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Headers = Record<string, string>;

class Client {
  headers: Headers = {
    'Content-Type': 'application/json',
  };

  privateHeaders: Headers = {
    ...this.headers,
  };

  public setAuthToken(token) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  public login(data: { username: string; password: string }) {
    return fetcher<BaseResponse<LoginResponse>>(`${BASE_URL}/v1/user/login`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public getQuestions(params: GetQuestionRequest) {
    return fetcher<BaseResponse<GetQuestionResponse>>(
      `${BASE_URL}/v1/question?${qs.stringify(params)}`,
      {
        headers: this.privateHeaders,
      }
    );
  }
  public getFolders(params: GetFolderRequest) {
    return fetcher<BaseResponse<GetQuestionResponse>>(
      `${BASE_URL}/v1/question/folder?${qs.stringify(params)}`,
      {
        headers: this.privateHeaders,
      }
    );
  }
}

const client = new Client();

if (typeof window !== 'undefined') {
  const token = getCookie(__token, document.cookie);
  if (token) {
    client.setAuthToken(token);
  }
}

export { client };
