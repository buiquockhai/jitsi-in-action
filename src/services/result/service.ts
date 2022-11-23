import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import {
  GetResultRequest,
  GetResultResponse,
  NewResultRequest,
  PushResultRequest,
  UpdateResultRequest,
} from './types';
import { uuidVerify } from '@util/functions';

class Result extends Client {
  public getResults(req: GetResultRequest) {
    return fetcher<BaseResponse<GetResultResponse[]>>(
      `${this.baseUrl}/v1/result?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public newResult(req: NewResultRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/result`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public pushResult(req: PushResultRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/result/push-result`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public updateResult(req: UpdateResultRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/result`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const resultService = new Result();

export { resultService };
