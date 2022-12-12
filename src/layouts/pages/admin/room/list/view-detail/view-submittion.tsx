import cx from 'classnames';
import { useFetchResults } from '@hook/result/useFetchResult';
import { FC, useState } from 'react';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { Button, Modal, Popconfirm } from 'antd';
import { GET_ROOM_DETAIL, useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { usePointingRoom } from '@hook/room/usePointingRoom';
import { GET_MARKS, useFetchMarks } from '@hook/mark/useFetchMarks';
import { useFetchUserInRoom } from '@hook/user-room/useFetchUserRoom';
import ViewSubmissionDetail from './view-submission-detail';
import { GET_ROOMS } from '@hook/room/useFetchRooms';

type Props = {
  roomId: string;
  groupId: string;
  examId: string;
};

type SubmissionProps = {
  open: boolean;
  roomId: string;
  examId: string;
  markId: string;
  userId: string;
  userName: string;
};

const submissionDetailInitialValues: SubmissionProps = {
  open: false,
  roomId: '',
  examId: '',
  markId: '',
  userId: '',
  userName: '',
};

const ViewSubmission: FC<Props> = ({ roomId, groupId, examId }) => {
  const results = useFetchResults({ room_id: roomId });
  const memberInRooms = useFetchUserInRoom({ room_id: roomId });
  const examDetail = useFetchExamDetail(examId);
  const violatingRules = useFetchViolatingRules({ room_id: roomId });
  const roomDetail = useFetchRoomDetail(roomId);
  const marks = useFetchMarks({
    room_id: roomId,
  });

  const pointingMutation = usePointingRoom([GET_ROOM_DETAIL, GET_MARKS, GET_ROOMS]);

  const handlePointing = () => {
    pointingMutation.mutate({
      room_id: roomId,
      group_id: groupId,
      exam_id: examId,
    });
  };

  const [detail, setDetail] = useState<SubmissionProps>(
    submissionDetailInitialValues
  );

  const handleShowDetail = (markId: string, userId: string, userName: string) => {
    setDetail({
      open: true,
      markId: markId,
      roomId: roomId,
      examId: examId,
      userId: userId,
      userName: userName,
    });
  };

  const handleViewDetailPenalty = (userId: string, name: string) => {
    const penalties = violatingRules?.filter((item) => item.user_id === userId);
    Modal.info({
      title: name,
      content: (
        <ul className="list-disc">
          {penalties?.map((item) => (
            <li key={item.id}>{item.description || '__'}</li>
          ))}
        </ul>
      ),
    });
  };

  const handleViewGetOut = (description: string, name: string) => {
    Modal.info({
      title: name,
      content: <p>{description}</p>,
    });
  };

  return (
    <div className="space-y-5">
      <ViewSubmissionDetail
        {...detail}
        onClose={() => setDetail(submissionDetailInitialValues)}
      />
      <Popconfirm
        title="Bạn có chắc chắn chấm bài cho phòng thi?"
        icon={<QuestionCircleOutlined />}
        onConfirm={handlePointing}
      >
        <Button type="primary" disabled={roomDetail?.marked === 'Y'}>
          Chấm bài
        </Button>
      </Popconfirm>

      <ul className="space-y-5">
        {(memberInRooms ?? []).map((user) => {
          const penaltyPoint =
            violatingRules?.reduce(
              (sum, item) =>
                item.user_id === user.user_id
                  ? sum + parseFloat(item.minus_point)
                  : sum,
              0
            ) ?? 0;

          const markDetail = (marks ?? [])?.find(
            (item) => item.user_id === user.user_id
          );

          return (
            <div className="space-y-5" key={user.user_id}>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <p className="w-52 truncate">
                    <b>Tên</b>: {user?.tb_user.name}
                  </p>
                  <p className="w-40 truncate">
                    <b>Mã</b>: {user?.tb_user.code}
                  </p>
                  <p
                    className={cx('w-52 truncate', {
                      'text-red-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm trừ</b>: {penaltyPoint}{' '}
                    <a
                      className={cx({
                        hidden: penaltyPoint <= 0,
                      })}
                      onClick={() =>
                        handleViewDetailPenalty(user.user_id, user.tb_user.name)
                      }
                    >
                      (Xem lí do)
                    </a>
                  </p>
                  <p
                    className={cx('w-40 truncate', {
                      'text-green-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm</b>: {markDetail?.mark || ''}
                  </p>
                  <p
                    className={cx('w-56 truncate', {
                      'text-blue-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm chính thức</b>:{' '}
                    {Math.max(
                      0,
                      parseFloat(markDetail?.mark ?? '0') - (penaltyPoint ?? 0)
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="small"
                    type="link"
                    danger
                    className={cx({
                      '!hidden': user.description?.length <= 0,
                    })}
                    onClick={() =>
                      handleViewGetOut(user.description, user.tb_user.name)
                    }
                  >
                    (Xem lí do bị buộc rời)
                  </Button>
                  <Button
                    size="small"
                    type="link"
                    onClick={() =>
                      handleShowDetail(
                        markDetail?.id ?? '',
                        user.user_id,
                        user.tb_user.name
                      )
                    }
                  >
                    Xem bài làm
                  </Button>
                </div>
              </div>

              <ul className="flex overflow-x-auto border">
                {(examDetail?.questionList ?? []).map((question) => {
                  const resultBelongToQuestion = (results ?? []).filter(
                    (item) =>
                      item.question_id === question?.id &&
                      item.created_id === user.user_id
                  );

                  const correctAnswers = (question?.tb_answers ?? []).flatMap(
                    (item) =>
                      parseInt(item?.percent.toString()) > 0 ? [item.id] : []
                  );

                  const isCorrect =
                    resultBelongToQuestion.length === correctAnswers.length &&
                    resultBelongToQuestion.every((item) =>
                      correctAnswers.includes(item.selected_answer_id)
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
