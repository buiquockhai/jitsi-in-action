import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ALPHABET } from '@util/constant';
import { Button, Descriptions, Drawer, Tag } from 'antd';
import moment from 'moment';
import React, { useCallback } from 'react';

const ViewExam: React.FC<{
  open: boolean;
  data: any;
  onClose: () => void;
}> = ({ open, data, onClose }) => {
  const Overview = useCallback(
    () => (
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Ngày thi">
          {moment(data?.createdAt).format('LLL')}
        </Descriptions.Item>
        <Descriptions.Item label="Điểm thi">
          {data?.mark}/{data?.maxPoint}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian làm bài">
          {data?.workingTime} phút
        </Descriptions.Item>
      </Descriptions>
    ),
    [data, open]
  );

  const QuestionDetail = useCallback((question) => {
    return (
      <div className="w-full flex flex-col gap-2 border-b pb-5" key={question?.id}>
        <div className="flex flex-row">
          <Tag>Điểm: {question?.point}</Tag>
          <Tag color={question?.point == 0 ? 'red' : 'green'}>
            {question?.point == 0 ? <CloseOutlined /> : <CheckOutlined />}
          </Tag>
        </div>

        <p className="font-semibold">{question?.questionContent}</p>

        <div className="w-full grid grid-cols-2 gap-3 mt-5">
          {question?.answers?.map((item, index) => {
            const correct =
              item?.id == question?.singleCorrect ||
              question?.multipleCorrect?.includes(item?.id);

            const wrong =
              (item?.id == question?.singleChoosen ||
                question?.multipleChoosen?.includes(item?.id)) &&
              !correct;

            console.log({ correct, wrong });

            return (
              <div
                key={item?.id}
                className="px-4 py-1 border rounded-sm border-dashed"
                style={
                  correct || wrong
                    ? {
                        borderColor: wrong ? '#f5222d' : '#52c41a',
                        backgroundColor: wrong ? '#fef2f2' : '#f0fdf4',
                      }
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
  }, []);

  return (
    <Drawer title={data?.title} width="50vw" onClose={onClose} visible={open}>
      <div className="w-full flex flex-col gap-5">
        <Overview />

        {data?.questions?.map((question) => (
          <QuestionDetail {...question} />
        ))}
      </div>
    </Drawer>
  );
};

export default ViewExam;
