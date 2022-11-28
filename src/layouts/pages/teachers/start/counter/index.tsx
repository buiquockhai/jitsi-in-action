import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import moment from 'moment';
import { Button, message, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useCloseRoom } from '@hook/room/useCloseRoom';
import { ROUTES } from '@util/routes';
import { useOpenRoom } from '@hook/room/useOpenRoom';
import {
  GET_USER_IN_ROOM,
  useFetchUserInRoom,
} from '@hook/user-room/useFetchUserRoom';

const TeacherCounter = () => {
  const { query, replace } = useRouter();

  const [timerText, setTimerText] = useState('');

  const openRoomMutation = useOpenRoom([GET_ROOM_DETAIL, GET_USER_IN_ROOM]);
  const closeRoomMutation = useCloseRoom([GET_ROOM_DETAIL, GET_USER_IN_ROOM]);
  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');
  const memberInRoom = useFetchUserInRoom({ room_id: query.id as string });

  const getTimer = useCallback(() => {
    const duration = parseInt(examDetail?.exam?.duration?.toString() || '0');
    const expire = moment(roomDetail?.teacher_start_date).add(duration, 'minutes');

    const diffSeconds = expire.diff(moment(new Date()), 'seconds');
    if (diffSeconds > 0) {
      setTimerText(moment.utc(diffSeconds * 1000).format('HH : mm : ss'));
    } else {
      setTimerText('');
    }
  }, [examDetail?.exam?.duration, roomDetail?.teacher_start_date]);

  useEffect(() => {
    if (examDetail?.exam && roomDetail?.teacher_start_date) {
      const interval = setInterval(getTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [examDetail, roomDetail, getTimer]);

  const handleCloseRoom = async () => {
    await closeRoomMutation.mutate({
      room_id: query.id as string,
    });
    replace(ROUTES.TEACHER_SCHEDULE);
  };

  const handleOpenRoom = () => {
    const exitedUnAuth = memberInRoom?.some(
      (item) => item.status === '2' && item.verified === 'N'
    );

    if (exitedUnAuth) {
      return message.error(
        'Còn thí sinh đã tham gia nhưng chưa xác thực. Vui lòng xác thực trước khi mở phòng thi'
      );
    }
    openRoomMutation.mutate({
      room_id: query.id as string,
    });
  };

  return (
    <Fragment>
      <span>{timerText}</span>
      {roomDetail?.teacher_start_date ? (
        <Popconfirm
          title="Bạn có chắc chắn đóng phòng thi?"
          icon={<QuestionCircleOutlined />}
          onConfirm={handleCloseRoom}
        >
          <Button size="small" type="primary" danger>
            Đóng
          </Button>
        </Popconfirm>
      ) : (
        <Popconfirm
          title="Bạn có chắc chắn bắt đầu phòng thi?"
          icon={<QuestionCircleOutlined />}
          onConfirm={handleOpenRoom}
        >
          <Button size="small" type="primary">
            Mở phòng thi
          </Button>
        </Popconfirm>
      )}
    </Fragment>
  );
};

export default memo(TeacherCounter);
