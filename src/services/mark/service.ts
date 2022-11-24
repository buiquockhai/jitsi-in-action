import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { uuidVerify } from '@util/functions';
import { GetMarkRequest, GetMarkResponse } from './types';

class Mark extends Client {
  public getMarks(req: GetMarkRequest) {
    return fetcher<BaseResponse<GetMarkResponse[]>>(
      `${this.baseUrl}/v1/mark?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getFullMarks(req: GetMarkRequest) {
    return fetcher<BaseResponse<GetMarkResponse[]>>(
      `${this.baseUrl}/v1/mark/full-marks?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getMarkDetail(id: string) {
    return fetcher<BaseResponse<GetMarkResponse>>(`${this.baseUrl}/v1/mark/${id}`, {
      headers: this.privateHeaders,
    });
  }
}

const markService = new Mark();

export { markService };
