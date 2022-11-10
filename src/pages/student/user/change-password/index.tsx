import withAuth from '@hoc/withAuth';
import { roles } from '@util/constant';
import { Form, Input, Button } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

const ChangePassword: React.FC<any> = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <div className="w-full flex py-10 items-center justify-center">
      <div className="max-w-xl w-full rounded-sm bg-white p-5">
        <Form
          labelCol={{ span: 9 }}
          initialValues={initialValues}
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <div className="w-full flex flex-col">
            <Form.Item
              name="oldPassword"
              label="Mật khẩu cũ"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item
              name="confirmationPassword"
              label="Xác nhận mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập xác nhận mật khẩu' },
              ]}
            >
              <Input.Password allowClear />
            </Form.Item>

            <div className="w-full flex items-end justify-end">
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

const initialValues: {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
} = {
  oldPassword: '',
  newPassword: '',
  confirmationPassword: '',
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.student
);

export default ChangePassword;
