import { useSystemContext } from '@context/system';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useFetchUserInRoom } from '@hook/user-room/useFetchUserRoom';
import { useFetchUserDetail } from '@hook/user/useFetchUserDetail';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { UserRoomVerifiedEnum } from '@util/constant';
import { Descriptions } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';

const RoomInformation = () => {
  const { query } = useRouter();
  const { userId } = useSystemContext();

  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');
  const userDetail = useFetchUserInRoom({ user_id: userId });
  const violatingRules = useFetchViolatingRules({
    user_id: userId,
    room_id: query.id as string,
  });

  const penaltyPoint = violatingRules?.reduce(
    (sum, item) => sum + parseFloat(item.minus_point),
    0
  );

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
      <Descriptions size="small" column={1} title="Thông tin sinh viên">
        <Descriptions.Item label="Tên đầy đủ">
          {userDetail?.[0]?.tb_user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Mã số">
          {userDetail?.[0]?.tb_user?.code}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái xác thực">
          {UserRoomVerifiedEnum[userDetail?.[0]?.verified ?? 'N']}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái nộp bài">
          Chưa nộp bài
        </Descriptions.Item>
        <Descriptions.Item label="Điểm trừ cảnh cáo" className="font-bold">
          {penaltyPoint}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default RoomInformation;
