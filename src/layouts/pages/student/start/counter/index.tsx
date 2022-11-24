import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import moment from 'moment';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const StudentCounter = () => {
  const { query } = useRouter();

  const [timerText, setTimerText] = useState('');

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

  return (
    <Fragment>
      <span>{timerText}</span>
      <Popconfirm
        title="Bạn có chắc chắn nộp bài?"
        icon={<QuestionCircleOutlined />}
      >
        <Button size="small" type="primary">
          Nộp bài
        </Button>
      </Popconfirm>
    </Fragment>
  );
};

export default memo(StudentCounter);
