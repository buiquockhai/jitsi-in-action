import {
  HomeOutlined,
  KeyOutlined,
  LinkOutlined,
  LockOutlined,
  PhoneOutlined,
  RedoOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  GET_USER_DETAIL,
  GET_USER_FREEZE_LIST,
  GET_USER_LIST,
} from '@hook/user/keys';
import { useNewUser } from '@hook/user/useNewUser';
import { GenderEnum, GenderTypes } from '@util/constant';
import { upload } from '@util/upload';
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
} from 'antd';
import { ChangeEvent, createRef, FC, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormProps = {
  username: string;
  name: string;
  gender: GenderTypes;
  phone: string;
  address: string;
  contact: string;
  password: string;
  reEnterPassword: string;
  dateOfBirth: string;
  secretKey: string;
  accept: boolean;
};

const initialValues: FormProps = {
  username: '',
  name: '',
  gender: 'male',
  phone: '',
  address: '',
  contact: '',
  password: '',
  reEnterPassword: '',
  dateOfBirth: '',
  secretKey: '',
  accept: false,
};

const Registration: FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm<FormProps>();
  const ref = createRef<HTMLInputElement>();

  const newUserMutation = useNewUser([
    GET_USER_LIST,
    GET_USER_DETAIL,
    GET_USER_FREEZE_LIST,
  ]);

  const [avatar, setAvatar] = useState('');

  const handleSubmit = (value: FormProps) => {
    if (!value.accept) {
      return message.error('Bạn phải chấp nhận điều khoản sử dụng');
    }

    if (value.password !== value.reEnterPassword) {
      return message.error('Nhập lại mật khẩu không chính xác!');
    }

    newUserMutation.mutate({
      username: value.username,
      name: value.name,
      gender: value.gender,
      date_of_birth: value.dateOfBirth,
      phone: value.phone,
      address: value.address,
      contact: value.contact,
      avatar: avatar,
      password: value.password,
      secret_key: value.secretKey,
    });
    form.setFieldsValue(initialValues);
    onClose();
  };

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = await upload(event.target.files[0], 'avatar/');
      setAvatar(url);
    }
  };

  const handleChoose = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <Modal title="Đăng ký" open={open} onCancel={onClose} footer={null}>
      <input ref={ref} type="file" hidden onChange={handleChangeFile} />
      <Form
        name="registration"
        layout="vertical"
        className="flex flex-col w-full"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              whitespace: false,
              message: 'Vui lòng nhập username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" allowClear />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập người dùng!',
            },
          ]}
        >
          <Input prefix={<TagOutlined />} placeholder="Tên đầy đủ" allowClear />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
          ]}
        >
          <Input
            type="phone"
            prefix={<PhoneOutlined />}
            placeholder="Số điện thoại"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="contact"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập liên hệ!',
            },
          ]}
        >
          <Input prefix={<LinkOutlined />} placeholder="Link liên kết" allowClear />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              whitespace: false,
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
          name="reEnterPassword"
          rules={[
            {
              required: true,
              whitespace: false,
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

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ',
            },
          ]}
        >
          <Input allowClear prefix={<HomeOutlined />} placeholder="Địa chỉ" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker
            showTime
            style={{ width: '100%' }}
            format="DD-MM-YYYY hh:mm:ss"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
        >
          <Radio.Group>
            {Object.entries(GenderEnum).map(([key, value]) => (
              <Radio key={key} value={key}>
                {value}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item name="avatar">
          <Avatar
            onClick={handleChoose}
            size={100}
            icon={<UserOutlined />}
            src={avatar}
          />
        </Form.Item>

        <Form.Item name="accept" valuePropName="checked" noStyle>
          <Checkbox>Chấp nhận điều khoản sử dụng</Checkbox>
        </Form.Item>

        <div className="flex gap-3 justify-end mt-5">
          <Button htmlType="submit" type="primary">
            ok
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default Registration;
