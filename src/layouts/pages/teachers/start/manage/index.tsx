import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_RESULTS, useFetchResults } from '@hook/result/useFetchResult';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { RequestJoinRoomStatusEnum } from '@util/constant';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useForceLeaveRoom } from '@hook/room/useForceLeaveRoom';

const TeacherStartManage = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query.id as string);
  const members = useFetchUsers({ group_id: roomDetail?.group_id });
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');
  const results = useFetchResults({
    room_id: query.id as string,
  });
  const forceLeaveMutation = useForceLeaveRoom([GET_ROOM_DETAIL, GET_RESULTS]);

  const roomMemberStatus = roomDetail?.member_status
    ? JSON.parse(roomDetail?.member_status)
    : {};

  const handleForceLeave = (studentId: string) => {
    forceLeaveMutation.mutate({
      room_id: query.id as string,
      student_id: studentId,
    });
  };

  return (
    <ul className="space-y-5">
      {(members ?? []).map((user) => {
        const status = roomMemberStatus[user?.id] ?? '0';

        return (
          <div className="space-y-5" key={user.id}>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <p className="w-64 truncate">
                  <b>Tên</b>: {user?.name}
                </p>
                <p>
                  <b>Trạng thái</b>:{' '}
                  <span
                    className={cx('text-gray-500', {
                      'text-green-500': status === '2',
                    })}
                  >
                    {RequestJoinRoomStatusEnum[status]}
                  </span>
                </p>
              </div>
              <Popconfirm
                title="Bạn có chắc chắn bắt buộc thí sinh nộp bài. Thí sẽ đồng thời sẽ bị đuổi ra khỏi phòng thi."
                icon={<QuestionCircleOutlined />}
                onConfirm={() => handleForceLeave(user.id)}
              >
                <Button size="small" danger disabled={status !== '2'}>
                  Buộc nộp bài
                </Button>
              </Popconfirm>
            </div>

            <ul className="flex overflow-x-auto border">
              {(examDetail?.questionList ?? []).map((question, index) => {
                const answer = results?.find(
                  (item) =>
                    item.question_id === question.id && item.created_id === user.id
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
