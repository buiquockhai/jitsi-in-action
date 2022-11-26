import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { ALPHABET, LevelEnum, QuestionTypeEnum } from '@util/constant';
import { Tag } from 'antd';
import { useRouter } from 'next/router';

const ExamView = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query.id as string);
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');

  return (
    <ul className="space-y-5">
      {examDetail?.questionList?.map((question) => (
        <div className="w-full flex flex-col gap-2 border-b pb-5" key={question?.id}>
          <div className="flex flex-row gap-1">
            <Tag color="magenta">{QuestionTypeEnum[question?.type]}</Tag>
            <Tag color="green">{LevelEnum[question?.level]}</Tag>
            <Tag color="purple">Điểm: {question?.point}</Tag>
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
            {question?.tb_answers?.map((item, index) => {
              return (
                <div
                  key={item?.id}
                  className="px-4 py-1 border rounded-sm border-dashed"
                >
                  <span className="font-semibold">{ALPHABET?.[index]}.</span>{' '}
                  {item?.content}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </ul>
  );
};

export default ExamView;
