import qs from 'query-string';
import { BaseResponse } from '@schema/system';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { uuidVerify } from '@util/functions';
import { GetUserRoomRequest, GetUserRoomResponse } from './types';

class UserRoomService extends Client {
  public getUserRooms(req: GetUserRoomRequest) {
    return fetcher<BaseResponse<GetUserRoomResponse[]>>(
      `${this.baseUrl}/v1/user-room?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }
}

const userRoomService = new UserRoomService();

export { userRoomService };
