import {
  Button,
  Form,
  Input,
  InputNumber,
  PageHeader,
  Popconfirm,
  Select,
} from 'antd';
import { useRouter } from 'next/router';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { EXAM_RANGE } from '@util/constant';

const PageHeaderExamsCreation = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      <PageHeader
        onBack={() => {
          router.back();
        }}
        title="Đề thi"
        subTitle="Tạo mới đề thi"
        extra={[
          <Popconfirm
            key=""
            title="Bạn có chắc chắn muốn thoát?"
            icon={<QuestionCircleOutlined />}
          >
            <Button key="cancel">Thoát</Button>
          </Popconfirm>,
          <Button key="submit" type="primary" htmlType="submit">
            Lưu
          </Button>,
        ]}
      />

      <div className="w-full px-5">
        <div className="w-full px-5 pt-1 rounded-sm bg-white grid grid-cols-4 gap-3">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input allowClear showCount />
          </Form.Item>

          <Form.Item label="Điểm tối đa">
            <Form.Item
              name="maxPoint"
              noStyle
              rules={[{ required: true, message: 'Vui lòng nhập điểm tối đa' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Thời gian làm bài">
            <Form.Item
              name="workingTime"
              noStyle
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian làm bài' },
              ]}
            >
              <InputNumber min={0} style={{ width: '100%' }} addonAfter="phút" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="range"
            label="Mức độ đề thi"
            rules={[{ required: true, message: 'Vui lòng chọn mức độ đề thi' }]}
          >
            <Select placeholder="Chọn đáp án đúng" allowClear>
              {Object.entries(EXAM_RANGE)?.map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default PageHeaderExamsCreation;
