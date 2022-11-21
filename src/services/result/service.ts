import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { GetResultResponse } from './types';

class Result extends Client {
  public getResults(roomId: string) {
    return fetcher<BaseResponse<GetResultResponse[]>>(
      `${this.baseUrl}/v1/result?${qs.stringify({
        room_id: roomId,
      })}`,
      {
        headers: this.privateHeaders,
      }
    );
  }
}

const resutlService = new Result();

export { resutlService };
