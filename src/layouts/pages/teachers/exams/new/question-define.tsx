import { Button, Form, Tag, InputNumber, Popconfirm } from 'antd';
import React from 'react';
import { ANPHABET, QUESTION_RANGE, QUESTION_TYPE } from '@util/constant';
import { v4  } from 'uuid';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const QuestionDefine: React.FC<any> = ({ form }) => {
  const questions = Form.useWatch('questions', form);

  console.log({ questions });

  return (
    <div className="w-full flex flex-col gap-3 col-span-2">
      {questions?.map((node, index) => {
        return (
          <div
            key={v4()}
            className="w-full p-5 bg-white rounded-sm flex flex-col gap-3"
          >
            <div className="w-full flex flex-row gap-5 justify-between items-center">
              <div className="flex flex-row">
                <Tag color="green">{QUESTION_TYPE?.[node?.type]}</Tag>
                <Tag color="magenta">{QUESTION_RANGE?.[node?.range]}</Tag>
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
              <p>{node?.questionContent}</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-5">
              {node?.answers?.map((item, index) => {
                const correct =
                  item?.id == node?.singleCorrect ||
                  node?.multipleCorrect?.includes(item?.id);
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
          </div>
        );
      })}
    </div>
  );
};

export default QuestionDefine;
