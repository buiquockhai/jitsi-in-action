import { Button, Form, Tag, InputNumber, Popconfirm } from 'antd';
import { ALPHABET, LevelEnum, QuestionTypeEnum } from '@util/constant';
import { v4 } from 'uuid';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form/Form';
import { useFetchQuestion } from '@hook/question/useFetchQuestion';
import { useRouter } from 'next/router';
import { useEffect, FC, useRef } from 'react';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';

type Props = {
  form: FormInstance;
};

const QuestionDefine: FC<Props> = ({ form }) => {
  const { query } = useRouter();

  const questions = Form.useWatch('questions', form);

  const examDetail = useFetchExamDetail(query.id as string);
  const questionList = useFetchQuestion({
    id: questions ?? undefined,
  });

  const exam = examDetail?.exam;

  const questionRender = questions?.length > 0 ? questionList : [];

  useEffect(() => {
    if (query.id && examDetail) {
      form.setFieldsValue({
        title: exam?.title,
        range: exam?.level,
        maxPoint: exam?.max_point,
        workingTime: exam?.duration,
        questions: examDetail?.questionList?.map((item) => item.id),
      });
    }
  }, [query, examDetail]);

  return (
    <div className="w-full flex flex-col gap-3 col-span-2">
      {questionRender?.map((node) => {
        return (
          <div
            key={v4()}
            className="w-full p-5 bg-white rounded-sm flex flex-col gap-3"
          >
            <div className="w-full flex flex-row gap-5 justify-between items-center">
              <div className="flex flex-row">
                <Tag color="green">{QuestionTypeEnum?.[node?.type]}</Tag>
                <Tag color="magenta">{LevelEnum?.[node?.level]}</Tag>
              </div>
              <div className="flex flex-row items-center gap-2">
                <InputNumber
                  min={0}
                  size="small"
                  placeholder="Điểm"
                  value={node?.point}
                />
                <Popconfirm
                  placement="left"
                  title="Bạn có muốn xoá?"
                  icon={<QuestionCircleOutlined />}
                >
                  <Button icon={<CloseOutlined />} size="small" type="link" danger />
                </Popconfirm>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p className="font-semibold">{node?.title}</p>
              <p>{node?.content}</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-5">
              {node?.tb_answers?.map((item, index) => {
                const correct = parseInt(item.percent) > 0;
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
                    <span className="font-semibold">{ALPHABET?.[index]}.</span>{' '}
                    {item?.content}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionDefine;
