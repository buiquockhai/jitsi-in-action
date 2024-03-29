import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSystemContext } from '@context/system';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchMarkDetail } from '@hook/mark/useFetchMarkDetail';
import { useFetchResults } from '@hook/result/useFetchResult';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { ALPHABET, ExamLevelRangeEnum, LevelEnum } from '@util/constant';
import { Button, Descriptions, Drawer, Modal, Tag } from 'antd';
import moment from 'moment';
import cx from 'classnames';
import { FC } from 'react';
import { useFetchUserInRoom } from '@hook/user-room/useFetchUserRoom';

type Props = {
  open: boolean;
  roomId: string;
  examId: string;
  markId: string;
  onClose: () => void;
};

const ViewExam: FC<Props> = ({ open, roomId, examId, markId, onClose }) => {
  const { userId } = useSystemContext();

  const userRoom = useFetchUserInRoom({ user_id: userId });
  const roomDetail = useFetchRoomDetail(roomId);
  const markDetail = useFetchMarkDetail(markId);
  const examDetail = useFetchExamDetail(examId);
  const results = useFetchResults({
    room_id: roomId,
    created_id: userId,
  });
  const violating = useFetchViolatingRules({
    user_id: userId,
    room_id: roomId,
  });

  const exam = examDetail?.exam;
  const questions = examDetail?.questionList ?? [];
  const penaltyPoint =
    violating?.reduce((sum, item) => sum + parseFloat(item.minus_point), 0) ?? 0;

  const handleViewDetailPenalty = (userId: string) => {
    const penalties = violating?.filter((item) => item.user_id === userId);
    Modal.info({
      title: 'Lí do bị trừ điểm',
      content: (
        <ul className="list-disc">
          {penalties?.map((item) => (
            <li key={item.id}>{item.description || '__'}</li>
          ))}
        </ul>
      ),
    });
  };

  const handleViewGetOut = (description: string) => {
    Modal.info({
      title: 'Lí do bị đuổi khỏi phòng thi',
      content: <p>{description}</p>,
    });
  };

  return (
    <Drawer title={roomDetail?.title} width="75vw" onClose={onClose} open={open}>
      <div className="w-full flex flex-col gap-5">
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Ngày thi">
            {moment(roomDetail?.start_date).format('HH:mm DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Độ khó">
            {ExamLevelRangeEnum[exam?.level ?? '']}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian làm bài">
            {exam?.duration} phút
          </Descriptions.Item>
          <Descriptions.Item label="Điểm thi">
            {markDetail?.mark ?? 0}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm trừ">{penaltyPoint}</Descriptions.Item>
          <Descriptions.Item label="Điểm chính thức">
            {Math.max(0, parseFloat(markDetail?.mark ?? '0') - penaltyPoint)}
          </Descriptions.Item>
        </Descriptions>

        <div className="flex gap-3 justify-end">
          <Button
            size="small"
            danger
            className={cx({
              hidden: penaltyPoint <= 0,
            })}
            onClick={() => handleViewDetailPenalty(userId)}
          >
            Lí do trừ điểm
          </Button>
          <Button
            size="small"
            danger
            type="primary"
            className={cx({
              '!hidden': (userRoom?.[0]?.description ?? '').length <= 0,
            })}
            onClick={() => handleViewGetOut(userRoom?.[0]?.description ?? '')}
          >
            Lí do buộc rời phòng
          </Button>
        </div>

        {questions?.map((question) => {
          const correctAnswerIds = question.tb_answers.flatMap((item) =>
            parseFloat(item.percent) > 0 ? [item.id] : []
          );

          const selectedAnswerIds = results?.flatMap((item) =>
            item.question_id === question.id ? [item.selected_answer_id] : []
          );

          const isCorrectTotal =
            correctAnswerIds.length === selectedAnswerIds?.length &&
            correctAnswerIds.every((item) => selectedAnswerIds.includes(item));

          return (
            <div
              className="w-full flex flex-col gap-2 border-b pb-5"
              key={question.id}
            >
              <div className="flex flex-row">
                <Tag>Điểm: {question?.point}</Tag>
                <Tag> {LevelEnum[question.level]}</Tag>
                <Tag color={!isCorrectTotal ? 'red' : 'green'}>
                  {!isCorrectTotal ? <CloseOutlined /> : <CheckOutlined />}
                </Tag>
              </div>

              <p className="font-semibold">{question?.content}</p>

              <ul className="flex gap-3 flex-wrap">
                {JSON.parse(question?.images ?? '[]').map((item) => (
                  <img
                    key={item}
                    className="rounded-sm object-cover w-[200px] h-[200px]"
                    loading="lazy"
                    src={item}
                  />
                ))}
              </ul>

              <div className="w-full grid grid-cols-2 gap-3">
                {question?.tb_answers?.map((answer, index) => {
                  const isCorrect = parseInt(answer?.percent.toString()) > 0;

                  return (
                    <div
                      key={answer?.id}
                      className={cx('px-4 py-1 border rounded-sm border-dashed', {
                        'border-red-500 bg-red-100':
                          isCorrect && correctAnswerIds.includes(answer.id),
                        '!border-green-500 !bg-green-100':
                          selectedAnswerIds?.includes(answer.id),
                      })}
                    >
                      <span className="font-semibold">{ALPHABET?.[index]}.</span>{' '}
                      {answer?.content}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default ViewExam;
