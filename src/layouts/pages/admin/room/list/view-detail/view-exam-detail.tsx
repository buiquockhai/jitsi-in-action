import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { ALPHABET, LevelEnum, QuestionTypeEnum } from '@util/constant';
import { Tag } from 'antd';
import { FC } from 'react';

type Props = {
  examId: string;
};

const ViewExamDetail: FC<Props> = ({ examId }) => {
  const examDetail = useFetchExamDetail(examId);

  console.log({ examDetail });

  return (
    <div className="flex flex-col gap-2">
      {examDetail?.questionList?.map((question) => (
        <div className="w-full flex flex-col gap-2 border-b pb-5" key={question?.id}>
          <div className="flex flex-row gap-1">
            <Tag color="magenta">{QuestionTypeEnum[question?.type]}</Tag>
            <Tag color="green">{LevelEnum[question?.level]}</Tag>
            <Tag color="purple">Điểm: {question?.point}</Tag>
          </div>

          <p className="font-semibold">{question?.content}</p>

          <div className="w-full grid grid-cols-2 gap-3 mt-5">
            {question?.tb_answers?.map((item, index) => {
              const isCorrect = item.percent > 0;
              return (
                <div
                  key={item?.id}
                  className="px-4 py-1 border rounded-sm border-dashed"
                  style={
                    isCorrect
                      ? { borderColor: '#52c41a', backgroundColor: '#f0fdf4' }
                      : {}
                  }
                >
                  <span className="font-semibold">{ALPHABET?.[index]}.</span>{' '}
                  {item?.content}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewExamDetail;
