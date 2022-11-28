import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { Descriptions } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';

const RoomInformation = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');

  return (
    <div className="w-full min-h-full flex gap-10">
      <Descriptions size="small" column={1} title="Thông tin phòng thi">
        <Descriptions.Item label="Tên phòng thi">
          {roomDetail?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian bắt đầu">
          {moment(roomDetail?.start_date).format('HH:mm DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian làm bài">
          {examDetail?.exam?.duration} phút
        </Descriptions.Item>
        <Descriptions.Item label="Giảng viên coi thi">
          {roomDetail?.proctor_name}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default RoomInformation;
