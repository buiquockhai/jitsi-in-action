import {
  ExclamationCircleOutlined,
  KeyOutlined,
  LockOutlined,
  RedoOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import React from 'react';

interface RegistrationProps {
  open: boolean;
  onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ open, onClose }) => {
  const handleSubmit = (value: any) => {
    console.log('login submit', value);
  };

  return (
    <Form
      name="registration"
      layout="vertical"
      className="flex flex-col max-w-sm w-full"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Modal
        title="Đăng ký"
        visible={open}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" loading={true}>
            Đăng ký
          </Button>,
        ]}
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
          <Input prefix={<UserOutlined />} placeholder="Username" allowClear />
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
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmationPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu!',
            },
          ]}
        >
          <Input.Password
            allowClear
            prefix={<RedoOutlined />}
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </Form.Item>

        <Form.Item
          name="fullname"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đầy đủ!',
            },
          ]}
        >
          <Input
            allowClear
            prefix={<ExclamationCircleOutlined />}
            placeholder="Tên đầy đủ"
          />
        </Form.Item>

        <Form.Item
          name="secretKey"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập định danh!',
            },
          ]}
        >
          <Input allowClear prefix={<KeyOutlined />} placeholder="Định danh" />
        </Form.Item>

        <Form.Item name="accept" valuePropName="checked" noStyle>
          <Checkbox>Chấp nhận điều khoản sử dụng</Checkbox>
        </Form.Item>
      </Modal>
    </Form>
  );
};

const initialValues: {
  username: string;
  password: string;
  confirmationPassword: string;
  fullname: string;
  secretKey: string;
  accept: boolean;
} = {
  username: '',
  password: '',
  confirmationPassword: '',
  fullname: '',
  secretKey: '',
  accept: false,
};

export default Registration;
