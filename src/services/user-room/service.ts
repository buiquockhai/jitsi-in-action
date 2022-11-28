import qs from 'query-string';
import { BaseResponse } from '@schema/system';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { uuidVerify } from '@util/functions';
import {
  AuthStudentInRoomRequest,
  GetUserRoomRequest,
  GetUserRoomResponse,
  KickOutRequest,
} from './types';

class UserRoomService extends Client {
  public getUserRooms(req: GetUserRoomRequest) {
    return fetcher<BaseResponse<GetUserRoomResponse[]>>(
      `${this.baseUrl}/v1/user-room?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public authStudent(req: AuthStudentInRoomRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/user-room/auth-student`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public kickOut(req: KickOutRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/user-room/kick-out`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }
}

const userRoomService = new UserRoomService();

export { userRoomService };
