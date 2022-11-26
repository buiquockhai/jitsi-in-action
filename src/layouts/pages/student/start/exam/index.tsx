import { CheckCircleOutlined } from '@ant-design/icons';
import { useSystemContext } from '@context/system';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_RESULTS, useFetchResults } from '@hook/result/useFetchResult';
import { usePushResult } from '@hook/result/usePushResult';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { ALPHABET } from '@util/constant';
import { Button, Empty, message } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ExamPane = () => {
  const { query } = useRouter();
  const { userId } = useSystemContext();

  const [focusIndex, setFocusIndex] = useState(0);

  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');

  const submitted =
    (roomDetail?.member_status ?? '')?.length > 10
      ? JSON.parse(roomDetail?.member_status ?? '')
      : {};

  const questions = examDetail?.questionList ?? [];
  const focusQuestion = questions?.[focusIndex];

  const results = useFetchResults({
    room_id: query.id as string,
    created_id: userId,
  });

  const pushResultMutation = usePushResult([GET_RESULTS]);

  const handlePushAnswer = (answerId: string, label: string) => {
    if (submitted[userId] === '3') {
      return message.error('Bạn đã nộp bài. Không được phép chỉnh sửa');
    }

    const duration = parseInt(examDetail?.exam?.duration?.toString() || '0');
    const diffMinutes = moment(new Date()).diff(
      moment(roomDetail?.teacher_start_date),
      'minutes'
    );

    if (diffMinutes > duration) {
      return message.error('Đã hết thời gian làm bài');
    }

    pushResultMutation.mutate({
      room_id: query.id as string,
      question_id: focusQuestion?.id,
      selected_answer_id: answerId,
      selected_answer_label: label,
      proctor_id: roomDetail?.proctor_id,
    });
  };

  if ((roomDetail?.teacher_start_date ?? '')?.length <= 0) {
    return <Empty />;
  }

  return (
    <div className="space-y-5 h-[80vh]">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full grid grid-cols-12 gap-2">
          {questions?.map((item, index) => {
            const isActive = results?.some(
              (result) => result.question_id === item.id
            );

            return (
              <Button
                size="small"
                key={item.id}
                type={index === focusIndex ? 'primary' : 'default'}
                onClick={() => setFocusIndex(index)}
                icon={isActive ? <CheckCircleOutlined /> : null}
                className="!flex !gap-2 !items-center justify-center"
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-2">
        <Button
          size="small"
          type="primary"
          disabled={focusIndex <= 0}
          onClick={() => setFocusIndex(focusIndex - 1)}
        >
          Quay lại
        </Button>
        <span>
          {focusIndex + 1}/{questions?.length}
        </span>
        <Button
          size="small"
          type="primary"
          disabled={focusIndex >= questions.length - 1}
          onClick={() => setFocusIndex(focusIndex + 1)}
        >
          Tiếp theo
        </Button>
      </div>

      <div className="w-full flex flex-col flex-auto gap-2">
        <p className="font-semibold">
          Câu {focusIndex + 1}: {focusQuestion?.point ?? 0} điểm
        </p>
        <p>{focusQuestion?.content}</p>

        <ul className="flex gap-3 flex-wrap">
          {JSON.parse(focusQuestion?.images ?? '[]').map((item) => (
            <img
              key={item}
              className="rounded-sm object-cover w-[200px] h-[200px]"
              loading="lazy"
              src={item}
            />
          ))}
        </ul>

        <div className="w-full grid grid-cols-2 gap-3">
          {focusQuestion?.tb_answers?.map((item, index) => {
            const isActive = results?.some(
              (result) =>
                result.selected_answer_id === item.id &&
                result.question_id === focusQuestion?.id
            );
            return (
              <Button
                size="large"
                key={item?.id}
                className="px-4 py-1 border rounded-sm border-dashed cursor-pointer !text-left"
                type={isActive ? 'primary' : 'default'}
                onClick={() => handlePushAnswer(item?.id, ALPHABET[index])}
              >
                <span className="font-semibold">{ALPHABET[index]}.</span>{' '}
                {item?.content}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExamPane;
