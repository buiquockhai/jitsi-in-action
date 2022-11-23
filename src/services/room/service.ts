import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import {
  GetRoomRequest,
  NewRoomRequest,
  PenaltyPointRequest,
  PointingRoomRequest,
  RoomResponse,
  StudentCancelJoinRoomRequest,
  StudentJoinRoomRequest,
  TeacherAcceptJoinRoomRequest,
  TeacherForceLeaveRoomRequest,
  UpdateRoomRequest,
} from './types';
import { uuidVerify } from '@util/functions';

class Room extends Client {
  public getRooms(req: GetRoomRequest) {
    return fetcher<BaseResponse<RoomResponse[]>>(
      `${this.baseUrl}/v1/room?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
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

  public joinRoomTeacher(roomId: string) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/room/teacher-join`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify({
        id: roomId,
      }),
    });
  }

  public joinRoomStudent(req: StudentJoinRoomRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/room/student-join`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public teacherAcceptJoinRoom(req: TeacherAcceptJoinRoomRequest) {
    return fetcher<BaseResponse<any>>(
      `${this.baseUrl}/v1/room/teacher-accept-request`,
      {
        headers: this.privateHeaders,
        method: 'POST',
        body: JSON.stringify(req),
      }
    );
  }

  public teacherRejectJoinRoom(req: TeacherAcceptJoinRoomRequest) {
    return fetcher<BaseResponse<any>>(
      `${this.baseUrl}/v1/room/teacher-reject-request`,
      {
        headers: this.privateHeaders,
        method: 'POST',
        body: JSON.stringify(req),
      }
    );
  }

  public studentCancelJoinRoom(req: StudentCancelJoinRoomRequest) {
    return fetcher<BaseResponse<any>>(
      `${this.baseUrl}/v1/room/student-cancel-request`,
      {
        headers: this.privateHeaders,
        method: 'POST',
        body: JSON.stringify(req),
      }
    );
  }

  public forceLeaveRoom(req: TeacherForceLeaveRoomRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/room/force-leave`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public pointingRoom(req: PointingRoomRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/room/pointing-room`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }
}

const roomService = new Room();

export { roomService };
