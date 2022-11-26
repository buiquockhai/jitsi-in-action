import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchMarkDetail } from '@hook/mark/useFetchMarkDetail';
import { useFetchResults } from '@hook/result/useFetchResult';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { ALPHABET, ExamLevelRangeEnum, LevelEnum } from '@util/constant';
import { Descriptions, Modal, Tag } from 'antd';
import moment from 'moment';
import cx from 'classnames';
import { FC } from 'react';

type Props = {
  open: boolean;
  roomId: string;
  examId: string;
  markId: string;
  userId: string;
  onClose: () => void;
};

const ViewSubmissionDetail: FC<Props> = ({
  open,
  roomId,
  examId,
  markId,
  userId,
  onClose,
}) => {
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
  const penaltyPoint = violating?.reduce(
    (sum, item) => sum + parseFloat(item.minus_point),
    0
  );

  return (
    <Modal
      title={roomDetail?.title}
      width="75vw"
      onCancel={onClose}
      open={open}
      footer={null}
    >
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
          <Descriptions.Item label="Điểm trừ">{penaltyPoint || 0}</Descriptions.Item>
          <Descriptions.Item label="Điểm chính thức">
            {Math.max(0, parseFloat(markDetail?.mark ?? '0') - (penaltyPoint || 0))}
          </Descriptions.Item>
        </Descriptions>

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
    </Modal>
  );
};

export default ViewSubmissionDetail;
