import cx from 'classnames';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useTeacherAcceptJoinRoom } from '@hook/room/useTecherAcceptJoinRoom';
import { useTeacherRejectJoinRoom } from '@hook/room/useTecherRejectJoinRoom';
import { useAuthStudent } from '@hook/user-room/useAuthStudent';
import { RequestJoinRoomStatusEnum, UserRoomVerifiedTypes } from '@util/constant';
import { Button, Dropdown, Menu, Modal, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import {
  GET_USER_IN_ROOM,
  useFetchUserInRoom,
} from '@hook/user-room/useFetchUserRoom';
import { CheckCircleTwoTone, MoreOutlined, WarningTwoTone } from '@ant-design/icons';
import GetOutDescription from './get-out-description';
import PenaltyDescription from './penalty.description';
import { useKickOutStudent } from '@hook/user-room/useKickOutStudent';

type GetOutProps = {
  open: boolean;
  studentId: string;
};

const initialGetOut: GetOutProps = {
  open: false,
  studentId: '',
};

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
  const authMutation = useAuthStudent([GET_ROOM_DETAIL, GET_USER_IN_ROOM]);
  const kickOutMutation = useKickOutStudent([GET_ROOM_DETAIL, GET_USER_IN_ROOM]);

  const [getOut, setGetOut] = useState<GetOutProps>(initialGetOut);
  const [penalty, setPenalty] = useState<GetOutProps>(initialGetOut);

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

  const handleAuth = (studentId: string, verified: UserRoomVerifiedTypes) => {
    Modal.info({
      title: 'Xác nhận',
      content: `Bạn có chắc chắn ${
        verified === 'N' ? 'huỷ' : ''
      } xác thực thí sinh này?`,
      onOk: () => {
        authMutation.mutate({
          user_id: studentId,
          room_id: roomDetail?.id ?? '',
          verified: verified,
        });
      },
    });
  };

  const handleKickOut = (studentId: string) => {
    Modal.info({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn muốn mời thí sinh rời khỏi phòng thi bây giờ?',
      onOk: () => {
        kickOutMutation.mutate({
          user_id: studentId,
          room_id: roomDetail?.id ?? '',
        });
      },
    });
  };

  return (
    <Fragment>
      <GetOutDescription {...getOut} onClose={() => setGetOut(initialGetOut)} />
      <PenaltyDescription {...penalty} onClose={() => setPenalty(initialGetOut)} />
      <div className="w-full min-h-full p-3 flex flex-col gap-3">
        {userInRooms?.map((item) => {
          const joined = item.status === '2';
          const submitted = item.status === '3';
          const verified = item.verified === 'Y';
          const presentRoom = roomDetail?.status === '1';
          const alreadyStart = (roomDetail?.teacher_start_date ?? '').length > 0;

          return (
            <div
              key={item.id}
              className="p-2 rounded-sm bg-slate-100 flex flex-col gap-3"
            >
              <div className="flex gap-3 justify-between items-center">
                <p className="font-semibold">{item.tb_user.name}</p>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        disabled={!joined || verified}
                        onClick={() => handleAuth(item.user_id, 'Y')}
                      >
                        Xác thực
                      </Menu.Item>
                      <Menu.Item
                        disabled={!joined || !verified}
                        onClick={() => handleAuth(item.user_id, 'N')}
                      >
                        Huỷ xác thực
                      </Menu.Item>
                      <Menu.Item
                        disabled={!joined || !verified || !presentRoom}
                        onClick={() =>
                          setPenalty({
                            open: true,
                            studentId: item.user_id,
                          })
                        }
                      >
                        Trừ điểm
                      </Menu.Item>
                      <Menu.Item
                        disabled={
                          !joined ||
                          !verified ||
                          !presentRoom ||
                          submitted ||
                          !alreadyStart
                        }
                        danger={
                          joined &&
                          verified &&
                          presentRoom &&
                          !submitted &&
                          alreadyStart
                        }
                        onClick={() =>
                          setGetOut({
                            open: true,
                            studentId: item.user_id,
                          })
                        }
                      >
                        Buộc nộp bài
                      </Menu.Item>
                      {(joined && !verified) || submitted ? (
                        <Menu.Item onClick={() => handleKickOut(item.user_id)}>
                          Mời rời phòng
                        </Menu.Item>
                      ) : null}
                    </Menu>
                  }
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Button size="small" icon={<MoreOutlined />} />
                </Dropdown>
              </div>
              <div className="flex gap-3 justify-between items-center">
                {verified ? (
                  <Tooltip placement="bottom" title="Đã xác thực">
                    <CheckCircleTwoTone twoToneColor="#68B984" />
                  </Tooltip>
                ) : null}
                {joined && !verified ? (
                  <Tooltip placement="bottom" title="Chưa xác thực">
                    <WarningTwoTone twoToneColor="#FED049" />
                  </Tooltip>
                ) : null}
                {item.status === '1' ? (
                  <Fragment>
                    <p className="text-sm text-gray-500 text-right">
                      {RequestJoinRoomStatusEnum[item.status]}
                    </p>
                    <div className="flex flex-1 justify-end gap-2">
                      <Button
                        size="small"
                        onClick={() => handleReject(item.user_id)}
                      >
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
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ManagePanel;
