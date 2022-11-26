import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import moment from 'moment';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useStudentSubmit } from '@hook/room/useStudentSubmit';
import { useSystemContext } from '@context/system';
import {
  GET_USER_IN_ROOM,
  useFetchUserInRoom,
} from '@hook/user-room/useFetchUserRoom';

const StudentCounter = () => {
  const { query } = useRouter();
  const { userId } = useSystemContext();

  const [timerText, setTimerText] = useState('');

  const studentSubmitMutation = useStudentSubmit([
    GET_ROOM_DETAIL,
    GET_USER_IN_ROOM,
  ]);
  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');
  const userInRoom = useFetchUserInRoom({
    user_id: userId,
    room_id: query.id as string,
  });

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

  const handelSubmit = () => {
    studentSubmitMutation.mutate({
      room_id: query.id as string,
    });
  };

  return (
    <Fragment>
      <span>{timerText}</span>
      <Popconfirm
        title="Bạn có chắc chắn nộp bài?"
        icon={<QuestionCircleOutlined />}
        disabled={timerText?.length <= 0 || userInRoom?.[0]?.status === '3'}
        onConfirm={handelSubmit}
      >
        <Button
          size="small"
          type="primary"
          disabled={timerText?.length <= 0 || userInRoom?.[0]?.status === '3'}
        >
          Nộp bài
        </Button>
      </Popconfirm>
    </Fragment>
  );
};

export default memo(StudentCounter);
