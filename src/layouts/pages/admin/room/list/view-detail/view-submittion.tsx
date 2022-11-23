import { GET_RESULTS, useFetchResults } from '@hook/result/useFetchResult';
import { FC } from 'react';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { Button, Popconfirm } from 'antd';
import cx from 'classnames';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { usePointingRoom } from '@hook/room/usePoitingRoom';
import { GET_MARKS, useFetchMarks } from '@hook/mark/useFetchMarks';

type Props = {
  roomId: string;
  groupId: string;
  examId: string;
};

const ViewSubmission: FC<Props> = ({ roomId, groupId, examId }) => {
  const results = useFetchResults({ room_id: roomId });
  const members = useFetchUsers({ group_id: groupId });
  const examDetail = useFetchExamDetail(examId);
  const violatingRules = useFetchViolatingRules({ room_id: roomId });
  const roomDetail = useFetchRoomDetail(roomId);
  const marks = useFetchMarks({
    room_id: roomId,
  });

  console.log({ marks });

  const pointingMutation = usePointingRoom([GET_ROOM_DETAIL, GET_MARKS]);

  const handlePointing = () => {
    pointingMutation.mutate({
      room_id: roomId,
      group_id: groupId,
      exam_id: examId,
    });
  };

  return (
    <div className="space-y-5">
      <Popconfirm
        title="Bạn có chắc chắn chấm bài cho ?phòng thi"
        icon={<QuestionCircleOutlined />}
        onConfirm={handlePointing}
      >
        <Button type="primary" disabled={roomDetail?.marked === 'Y'}>
          Chấm bài
        </Button>
      </Popconfirm>

      <ul className="space-y-5">
        {(members ?? []).map((user) => {
          const penaltyPoint =
            violatingRules?.reduce(
              (sum, item) =>
                item.user_id === user.id ? sum + parseFloat(item.minus_point) : sum,
              0
            ) ?? 0;

          const point = (marks ?? [])?.find((item) => item.user_id === user.id);

          return (
            <div className="space-y-5" key={user.id}>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <p className="w-52 truncate">
                    <b>Tên</b>: {user?.name}
                  </p>
                  <p className="w-40 truncate">
                    <b>Mã</b>: {user?.code}
                  </p>
                  <p
                    className={cx('w-40 truncate', {
                      'text-red-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm trừ</b>: {penaltyPoint}
                  </p>
                  <p
                    className={cx('w-40 truncate', {
                      'text-green-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm</b>: {point?.mark || ''}
                  </p>
                  <p
                    className={cx('w-40 truncate', {
                      'text-blue-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm chính thức</b>:{' '}
                    {Math.max(0, parseFloat(point?.mark ?? '0') - penaltyPoint)}
                  </p>
                </div>
                <Button size="small" type="link">
                  Xem bài làm
                </Button>
              </div>

              <ul className="flex overflow-x-auto border">
                {(examDetail?.questionList ?? []).map((question, index) => {
                  const resultBelongToQuestion = (results ?? []).filter(
                    (item) =>
                      item.question_id === question?.id &&
                      item.created_id === user.id
                  );

                  const correctAnswers = (question?.tb_answers ?? []).flatMap(
                    (item) =>
                      parseInt(item?.percent.toString()) > 0 ? [item.id] : []
                  );

                  const isCorrect =
                    resultBelongToQuestion.length === correctAnswers.length &&
                    resultBelongToQuestion.every((item) =>
                      correctAnswers.includes(item.id)
                    );

                  const showAnswerLabel = resultBelongToQuestion
                    .map((item) => item.selected_answer_label)
                    .join(' - ');

                  return (
                    <div
                      key={question.id}
                      className="flex flex-col border-l last:border-r"
                    >
                      <div className="w-16 h-16 bg-slate-100 flex items-center justify-center border-b">
                        ({question.point})
                      </div>
                      <div
                        className={cx('w-16 h-16 flex items-center justify-center', {
                          'bg-red-50': roomDetail?.marked === 'Y' && !isCorrect,
                          'bg-green-50': roomDetail?.marked === 'Y' && isCorrect,
                        })}
                      >
                        {showAnswerLabel ?? ''}
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewSubmission;
