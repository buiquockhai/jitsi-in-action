import {
  RetweetOutlined,
  QuestionCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import withAuth from '@hoc/withAuth';
import { roles } from '@util/constant';
import { copy } from '@util/functions';
import { Button, Form, Input, message, Popconfirm } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { v4  } from 'uuid';

const initialValues = {
  forStudent: v4(),
  forTeacher: v4(),
};

const SponsorSetting: NextPage = () => {
  const [form] = Form.useForm();

  const forStudent = Form.useWatch('forStudent', form);
  const forTeacher = Form.useWatch('forTeacher', form);

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <div className="w-full flex py-10 items-center justify-center">
      <div className="max-w-xl w-full rounded-sm bg-white p-5">
        <Form
          initialValues={initialValues}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <div className="w-full flex flex-col">
            <Form.Item
              name="forStudent"
              label="Sponsor học sinh"
              rules={[{ required: true, message: 'Vui lòng chọn sponsor!' }]}
            >
              <Input.Password
                readOnly
                addonAfter={
                  <div className="flex flex-row gap-2">
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      type="link"
                      onClick={copy.bind(null, forStudent, message)}
                    />
                    <Popconfirm
                      title="Bạn có chắc chắn muốn tạo mới?"
                      icon={<QuestionCircleOutlined />}
                      onConfirm={() => form.setFieldValue('forStudent', v4())}
                    >
                      <Button size="small" icon={<RetweetOutlined />} type="link" />
                    </Popconfirm>
                  </div>
                }
              />
            </Form.Item>

            <Form.Item
              name="forTeacher"
              label="Sponsor giáo viên"
              rules={[{ required: true, message: 'Vui lòng chọn sponsor!' }]}
            >
              <Input.Password
                readOnly
                addonAfter={
                  <div className="flex flex-row gap-2">
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      type="link"
                      onClick={copy.bind(null, forTeacher, message)}
                    />
                    <Popconfirm
                      title="Bạn có chắc chắn muốn tạo mới?"
                      icon={<QuestionCircleOutlined />}
                      onConfirm={() => form.setFieldValue('forTeacher', v4())}
                    >
                      <Button size="small" icon={<RetweetOutlined />} type="link" />
                    </Popconfirm>
                  </div>
                }
              />
            </Form.Item>

            <div className="w-full flex flex-row gap-2 items-end justify-end">
              <Button key="button">Huỷ</Button>
              <Button key="submit" type="primary">
                Lưu
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.admin
);

export default SponsorSetting;
