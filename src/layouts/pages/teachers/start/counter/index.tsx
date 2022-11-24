import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import moment from 'moment';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useCloseRoom } from '@hook/room/useCloseRoom';
import { ROUTES } from '@util/routes';

const TeacherCounter = () => {
  const { query, replace } = useRouter();

  const [timerText, setTimerText] = useState('');

  const closeRoomMutation = useCloseRoom([GET_ROOM_DETAIL]);
  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');

  const getTimer = useCallback(() => {
    const duration =
      parseInt(examDetail?.exam?.duration?.toString() || '0') + 60 * 8;
    const expire = moment(roomDetail?.start_date).add(duration, 'minutes');

    const diffSeconds = expire.diff(moment(new Date()), 'seconds');
    if (diffSeconds > 0) {
      setTimerText(moment.utc(diffSeconds * 1000).format('HH : mm : ss'));
    } else {
      setTimerText('');
    }
  }, [examDetail?.exam?.duration, roomDetail?.start_date]);

  useEffect(() => {
    if (examDetail?.exam && roomDetail?.start_date) {
      const interval = setInterval(getTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [examDetail, roomDetail, getTimer]);

  const handleCloseRoom = () => {
    closeRoomMutation.mutate({
      room_id: query.id as string,
    });
    replace(ROUTES.TEACHER_SCHEDULE);
  };

  return (
    <Fragment>
      <span>{timerText}</span>
      <Popconfirm
        title="Bạn có chắc chắn đóng phòng thi?"
        icon={<QuestionCircleOutlined />}
        onConfirm={handleCloseRoom}
      >
        <Button size="small" type="primary" danger>
          Đóng
        </Button>
      </Popconfirm>
    </Fragment>
  );
};

export default memo(TeacherCounter);
