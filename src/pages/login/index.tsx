import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BlankLayout from '@layout/utils/blank-layout';
import Registration from '@layout/pages/login/registration';
import { ErrorHandler, getCookie, setAuthentication } from '@util/functions';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { __fullname, __role, __token, __username } from '@util/constant';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';
import { userService } from '@service/router';

interface LoginFormProps {
  username: string;
  password: string;
  remember: boolean;
}

const initialValues: LoginFormProps = {
  username: '',
  password: '',
  remember: false,
};

const statusMessage = {
  success: 'Đăng nhập thành công',
  fail: 'Đăng nhập không thành công',
};

const Login = () => {
  const { replace } = useRouter();
  const { setRole, setUserId, setUsername, setAvatar } = useSystemContext();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ username, password }: LoginFormProps) => {
    const res = await ErrorHandler(
      () => userService.login({ username, password }),
      setLoading
    );
    if (res.data) {
      message.success(statusMessage.success);
      const jwtData = setAuthentication(res?.data);
      setRole(jwtData.role);
      setUserId(jwtData.id);
      setUsername(jwtData.username);
      setAvatar(jwtData.avatar);
      replace(ROUTES.HOME).then(() => {
        window.location.reload();
      });
    } else {
      message.error(statusMessage.fail);
    }
  };

  return (
    <div className="overflow-hidden relative">
      <Registration open={open} onClose={() => setOpen(false)} />
      <div className="w-screen overflow-hidden h-screen fixed top-0 left-0 flex">
        <img
          src="/assets/__bg_login.png"
          className="w-full object-contain object-bottom"
        />
      </div>

      <div className="w-full min-h-full flex flex-col gap-5 items-center justify-center fixed">
        <img src="/assets/__logo.svg" />
        <p className="text-xl font-bold">Đăng nhập</p>
        <Form
          name="login"
          className="flex flex-col max-w-sm w-full"
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập người dùng!',
              },
            ]}
          >
            <Input
              allowClear
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div className="w-full flex flex-col gap-3">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox defaultChecked={true}>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Đăng nhập
            </Button>
            <p className="text-center">
              Bạn chưa có tài khoản?{' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={setOpen.bind(null, true)}
              >
                Đăng ký
              </button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;
  const cookie = req.headers.cookie;

  const token = getCookie(__token, cookie);
  const username = getCookie(__username, cookie);
  const role = getCookie(__role, cookie);
  const fullname = getCookie(__fullname, cookie);

  if (token && username && role && fullname) {
    res.writeHead(302, { Location: ROUTES.HOME });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
};

Login.layout = BlankLayout;

export default Login;
