import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { LevelEnum } from '@util/constant';
import { Descriptions } from 'antd';
import moment from 'moment';
import { FC } from 'react';

type Props = {
  roomId: string;
};

const RoomCommonInformation: FC<Props> = ({ roomId }) => {
  const roomDetail = useFetchRoomDetail(roomId);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');

  return (
    <Descriptions size="small" column={1}>
      <Descriptions.Item label="Tên bài thi">{roomDetail?.title}</Descriptions.Item>
      <Descriptions.Item label="Bài thi">{roomDetail?.exam_title}</Descriptions.Item>
      <Descriptions.Item label="Giám thị">
        {roomDetail?.proctor_name}
      </Descriptions.Item>
      <Descriptions.Item label="Ngày thi">
        {moment(roomDetail?.start_date).format('HH:mm DD/MM/YYYY')}
      </Descriptions.Item>
      <Descriptions.Item label="Thời gian làm bài">
        {examDetail?.exam?.duration} phút
      </Descriptions.Item>
      <Descriptions.Item label="Mức độ đề thi">
        {LevelEnum[examDetail?.exam?.level ?? '']}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default RoomCommonInformation;
