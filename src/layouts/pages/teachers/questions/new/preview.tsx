import { ANPHABET } from '@util/constant';
import { Empty, Form } from 'antd';
import { Fragment } from 'react';

const QuestionPreview = ({ form }) => {
  const questionContent = Form.useWatch('questionContent', form);
  const title = Form.useWatch('title', form);
  const answers = Form.useWatch('answers', form);
  const singleCorrect = Form.useWatch('singleCorrect', form);
  const multipleCorrect = Form.useWatch('multipleCorrect', form);

  const isEmpty =
    title?.length <= 0 && questionContent?.length <= 0 && answers?.length <= 0;

  if (isEmpty) {
    return (
      <div className="w-full rounded-sm bg-white p-5 h-fit flex flex-col gap-2">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div className="w-full rounded-sm bg-white p-5 h-fit flex flex-col gap-2">
      <Fragment>
        <p className="font-semibold">{title}</p>
        <p>{questionContent}</p>

        <div className="w-full grid grid-cols-2 gap-3 mt-5">
          {answers?.map((item, index) => {
            const correct =
              item?.id == singleCorrect || multipleCorrect?.includes(item?.id);
            return (
              <div
                key={item?.id}
                className="px-4 py-1 border rounded-sm border-dashed"
                style={
                  correct
                    ? { borderColor: '#52c41a', backgroundColor: '#f0fdf4' }
                    : {}
                }
              >
                <span className="font-semibold">{ANPHABET?.[index]}.</span>{' '}
                {item?.content}
              </div>
            );
          })}
        </div>
      </Fragment>
    </div>
  );
};

export default QuestionPreview;
