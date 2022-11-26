import cx from 'classnames';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_RESULTS, useFetchResults } from '@hook/result/useFetchResult';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { RequestJoinRoomStatusEnum } from '@util/constant';
import { useRouter } from 'next/router';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useForceLeaveRoom } from '@hook/room/useForceLeaveRoom';
import { useNewViolatingRule } from '@hook/violating-rule/useNewViolatingRule';
import {
  GET_VIOLATING_RULES,
  useFetchViolatingRules,
} from '@hook/violating-rule/useFetchViolatingRules';
import {
  GET_USER_IN_ROOM,
  useFetchUserInRoom,
} from '@hook/user-room/useFetchUserRoom';

const TeacherStartManage = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query.id as string);
  const memberInRoom = useFetchUserInRoom({ room_id: query.id as string });
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');
  const results = useFetchResults({
    room_id: query.id as string,
  });
  const forceLeaveMutation = useForceLeaveRoom([
    GET_ROOM_DETAIL,
    GET_USER_IN_ROOM,
    GET_RESULTS,
  ]);
  const newViolatingRuleMutation = useNewViolatingRule([GET_VIOLATING_RULES]);
  const violatingRules = useFetchViolatingRules({ room_id: query.id as string });

  const handleForceLeave = (studentId: string) => {
    forceLeaveMutation.mutate({
      room_id: query.id as string,
      student_id: studentId,
    });
  };

  const handlePenalty = (studentId: string) => {
    newViolatingRuleMutation.mutate({
      room_id: query.id as string,
      user_id: studentId,
      minus_point: '0.5',
    });
  };

  return (
    <ul className="space-y-5">
      {(memberInRoom ?? []).map((user) => {
        const penaltyPoint =
          violatingRules?.reduce(
            (sum, item) =>
              item.user_id === user.user_id
                ? sum + parseFloat(item.minus_point)
                : sum,
            0
          ) ?? 0;

        return (
          <div className="space-y-5" key={user.id}>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <p className="w-52 truncate">
                  <b>Tên</b>: {user?.tb_user.name}
                </p>
                <p className="w-40 truncate">
                  <b>Mã</b>: {user?.tb_user.code}
                </p>
                <p
                  className={cx('w-40 truncate', {
                    'text-red-500': penaltyPoint > 0,
                  })}
                >
                  <b>Điểm trừ</b>: {penaltyPoint}
                </p>
                <p>
                  <b>Trạng thái</b>:{' '}
                  <span
                    className={cx('text-gray-500', {
                      'text-green-500': user.status === '2',
                    })}
                  >
                    {RequestJoinRoomStatusEnum[user.status]}
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <Popconfirm
                  title="Bạn có chắc chắn muốn trừ điểm cảnh cáo vi phạm. Mỗi lần cảnh cáo thí sinh sẽ bị trừ 0.5 điểm vào kết quả thi."
                  icon={<QuestionCircleOutlined />}
                  onConfirm={() => handlePenalty(user.user_id)}
                >
                  <Button size="small" danger disabled={user.status !== '2'}>
                    Trừ điểm cảnh cáo
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="Bạn có chắc chắn bắt buộc thí sinh nộp bài. Thí sẽ đồng thời sẽ bị đuổi ra khỏi phòng thi."
                  icon={<QuestionCircleOutlined />}
                  onConfirm={() => handleForceLeave(user.user_id)}
                >
                  <Button size="small" danger disabled={user.status !== '2'}>
                    Buộc nộp bài
                  </Button>
                </Popconfirm>
              </div>
            </div>

            <ul className="flex overflow-x-auto border">
              {(examDetail?.questionList ?? []).map((question, index) => {
                const answer = results?.find(
                  (item) =>
                    item.question_id === question.id &&
                    item.created_id === user.user_id
                );

                return (
                  <div
                    key={question.id}
                    className="flex flex-col border-l last:border-r"
                  >
                    <div className="w-16 h-16 bg-slate-100 flex items-center justify-center border-b">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center">
                      {answer?.selected_answer_label ?? ''}
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        );
      })}
    </ul>
  );
};

export default TeacherStartManage;
