import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useTeacherAcceptJoinRoom } from '@hook/room/useTecherAcceptJoinRoom';
import { useTeacherRejectJoinRoom } from '@hook/room/useTecherRejectJoinRoom';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { RequestJoinRoomStatusEnum } from '@util/constant';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import cx from 'classnames';

const ManagePanel = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query?.id as string);
  const users = useFetchUsers({ group_id: roomDetail?.group_id });
  const acceptMutation = useTeacherAcceptJoinRoom([GET_ROOM_DETAIL]);
  const rejectMutation = useTeacherRejectJoinRoom([GET_ROOM_DETAIL]);

  const roomMemberStatus = roomDetail?.member_status
    ? JSON.parse(roomDetail?.member_status)
    : {};

  console.log(roomMemberStatus);

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
      {users?.map((item) => {
        const status = roomMemberStatus[item?.id] ?? '0';
        console.log(roomMemberStatus[item?.id], item?.id);

        return (
          <div
            key={item.id}
            className="p-2 rounded-sm bg-slate-100 flex flex-col gap-1"
          >
            <p className="font-semibold">{item.name}</p>
            {status === '1' ? (
              <Fragment>
                <p className="text-sm text-gray-500 text-right">
                  {RequestJoinRoomStatusEnum[status]}
                </p>
                <div className="flex flex-1 justify-end gap-2">
                  <Button size="small" onClick={() => handleReject(item.id)}>
                    Từ chối
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleAccept(item.id)}
                  >
                    Đồng ý
                  </Button>
                </div>
              </Fragment>
            ) : (
              <p
                className={cx('text-sm text-gray-500 text-right', {
                  'text-green-600': status === '2',
                })}
              >
                {RequestJoinRoomStatusEnum[status]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManagePanel;
