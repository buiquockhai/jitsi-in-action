import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  ANPHABET,
  EXAM_RANGE,
  QUESTION_RANGE,
  QUESTION_TYPE,
  VERIFY_STATUS,
} from '@util/constant';
import { Button, Descriptions, Drawer, Popconfirm, Tag } from 'antd';
import moment from 'moment';
import React, { useCallback } from 'react';

const ViewExam: React.FC<{
  open: boolean;
  data: any;
  onClose: () => void;
}> = ({ open, data, onClose }) => {
  console.log({ data });

  const Overview = useCallback(
    () => (
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Ngày tạo">
          {moment(data?.createdAt).format('L')}
        </Descriptions.Item>
        <Descriptions.Item label="Mức độ">
          {EXAM_RANGE?.[data?.range]}
        </Descriptions.Item>
        <Descriptions.Item label="Điểm tối đa">{data?.maxPoint}</Descriptions.Item>
        <Descriptions.Item label="Thời gian làm bài">
          {data?.workingTime} phút
        </Descriptions.Item>
        <Descriptions.Item label="Người cho đề">
          {data?.createdBy?.fullname}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {VERIFY_STATUS[data?.verified ? '1' : '0']}
        </Descriptions.Item>
      </Descriptions>
    ),
    [data, open]
  );

  const QuestionDetail = useCallback((question) => {
    return (
      <div className="w-full flex flex-col gap-2 border-b pb-5" key={question?.id}>
        <div className="flex flex-row gap-1">
          <Tag color="magenta">{QUESTION_TYPE[question?.type]}</Tag>
          <Tag color="green">{QUESTION_RANGE[question?.range]}</Tag>
          <Tag color="purple">Điểm: {question?.point}</Tag>
        </div>

        <p className="font-semibold">{question?.questionContent}</p>

        <div className="w-full grid grid-cols-2 gap-3 mt-5">
          {question?.answers?.map((item, index) => {
            const correct =
              item?.id == question?.singleCorrect ||
              question?.multipleCorrect?.includes(item?.id);
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
  }, []);

  return (
    <Drawer
      title={data?.title}
      width="50vw"
      onClose={onClose}
      visible={open}
      extra={
        data?.verified ? (
          <div className="flex flex-row gap-2">
            <Popconfirm
              title="Bạn có chắc chắn bỏ phê duyệt đề thi?"
              icon={<QuestionCircleOutlined />}
            >
              <Button>Bỏ phê duyệt</Button>
            </Popconfirm>
            <Button onClick={onClose} type="primary">
              Tạo phòng thi
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <Popconfirm
              title="Bạn có chắc chắn loại bỏ đề thi?"
              icon={<QuestionCircleOutlined />}
            >
              <Button>Từ chối</Button>
            </Popconfirm>
            <Button onClick={onClose} type="primary">
              Phê duyệt
            </Button>
          </div>
        )
      }
    >
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
