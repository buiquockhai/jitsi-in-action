import React from 'react';
import { Button, Descriptions, Form, PageHeader, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { QUESTION_RANGE, QUESTION_TYPE } from '@util/constant';
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const PageHeaderQuestionCreation: React.FC<any> = ({ form }) => {
  const router = useRouter();

  const point = Form.useWatch('point', form);
  const type = Form.useWatch('type', form);
  const range = Form.useWatch('range', form);

  return (
    <PageHeader
      onBack={() => {
        router.back();
      }}
      title="Câu hỏi"
      subTitle="Tạo mới câu hỏi bổ sung vào ngân hàng câu hỏi"
      extra={[
        <Popconfirm
          title="Bạn có chắc chắn muốn thoát?"
          icon={<QuestionCircleOutlined />}
        >
          <Button key="cancel">Thoát</Button>
        </Popconfirm>,
        <Button key="submit" type="primary" htmlType="submit">
          Lưu
        </Button>,
      ]}
    >
      <Descriptions size="small" column={4}>
        <Descriptions.Item label="Ngày tạo">
          {moment().format('LLL')}
        </Descriptions.Item>
        <Descriptions.Item label="Loại câu hỏi">
          {QUESTION_TYPE?.[type]}
        </Descriptions.Item>
        <Descriptions.Item label="Điểm">{point}</Descriptions.Item>
        <Descriptions.Item label="Mức độ">
          {QUESTION_RANGE?.[range]}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};

export default PageHeaderQuestionCreation;
