import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { NewRoomRequest, RoomResponse, UpdateRoomRequest } from './types';

class Room extends Client {
  public getRooms() {
    return fetcher<BaseResponse<RoomResponse[]>>(`${this.baseUrl}/v1/room`, {
      headers: this.privateHeaders,
    });
  }

  public getRoomDetail(id: string) {
    return fetcher<BaseResponse<RoomResponse>>(`${this.baseUrl}/v1/room/${id}`, {
      headers: this.privateHeaders,
    });
  }

  public newRoom(req: NewRoomRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/room`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public updateRoom(req: UpdateRoomRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/room`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const roomService = new Room();

export { roomService };
