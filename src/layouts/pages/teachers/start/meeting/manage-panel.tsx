import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useTeacherAcceptJoinRoom } from '@hook/room/useTecherAcceptJoinRoom';
import { useTeacherRejectJoinRoom } from '@hook/room/useTecherRejectJoinRoom';
import { RequestJoinRoomStatusEnum } from '@util/constant';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import cx from 'classnames';
import {
  GET_USER_IN_ROOM,
  useFetchUserInRoom,
} from '@hook/user-room/useFetchUserRoom';

const ManagePanel = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query?.id as string);
  const userInRooms = useFetchUserInRoom({ room_id: query.id as string });
  const acceptMutation = useTeacherAcceptJoinRoom([
    GET_ROOM_DETAIL,
    GET_USER_IN_ROOM,
  ]);
  const rejectMutation = useTeacherRejectJoinRoom([
    GET_ROOM_DETAIL,
    GET_USER_IN_ROOM,
  ]);

  const handleAccept = (studentId: string) => {
    acceptMutation.mutate({
      student_id: studentId,
      room_id: roomDetail?.id ?? '',
    });
  };

  const handleReject = (studentId: string) => {
    rejectMutation.mutate({
      student_id: studentId,
      room_id: roomDetail?.id ?? '',
    });
  };

  return (
    <div className="w-full min-h-full p-3 flex flex-col gap-2">
      {userInRooms?.map((item) => {
        return (
          <div
            key={item.id}
            className="p-2 rounded-sm bg-slate-100 flex flex-col gap-1"
          >
            <p className="font-semibold">{item.tb_user.name}</p>
            {item.status === '1' ? (
              <Fragment>
                <p className="text-sm text-gray-500 text-right">
                  {RequestJoinRoomStatusEnum[item.status]}
                </p>
                <div className="flex flex-1 justify-end gap-2">
                  <Button size="small" onClick={() => handleReject(item.user_id)}>
                    Từ chối
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleAccept(item.user_id)}
                  >
                    Đồng ý
                  </Button>
                </div>
              </Fragment>
            ) : (
              <p
                className={cx('text-sm text-gray-500 text-right', {
                  'text-green-600': item.status === '2',
                })}
              >
                {RequestJoinRoomStatusEnum[item.status]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManagePanel;
