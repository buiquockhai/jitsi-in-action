import withAuth from '@hoc/withAuth';
import { RoleEnum } from '@util/constant';
import { Form, Input, Button } from 'antd';
import { GetServerSideProps } from 'next';
import { message } from 'antd';
import { useUpdatePassword } from '@hook/user/useUpdatePassword';

type FormProps = {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
};

const ChangePassword = () => {
  const [form] = Form.useForm<FormProps>();

  const userChangePasswordMutation = useUpdatePassword();

  const handleSubmit = (values: FormProps) => {
    if (values?.newPassword !== values?.confirmationPassword) {
      return message.warn('Mật khẩu xác nhận không trùng khớp');
    }
    userChangePasswordMutation.mutate({
      old_password: values?.oldPassword,
      new_password: values?.newPassword,
    });
  };

  return (
    <div className="w-full flex py-10 items-center justify-center">
      <div className="max-w-xl w-full rounded-sm bg-white p-5">
        <Form
          labelCol={{ span: 9 }}
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
              <Button htmlType="submit" type="primary">
                Lưu
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
}, RoleEnum.student);

export default ChangePassword;
