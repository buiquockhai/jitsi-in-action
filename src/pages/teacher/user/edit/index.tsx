import { useSystemContext } from '@context/system';
import withAuth from '@hoc/withAuth';
import { GET_USER_DETAIL, GET_USER_LIST } from '@hook/user/keys';
import { useFetchUserDetail } from '@hook/user/useFetchUserDetail';
import { useUpdateUserDetail } from '@hook/user/useUpdateUserDetail';
import { GenderEnum, GenderTypes, RoleEnum } from '@util/constant';
import { upload } from '@util/upload';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import moment from 'moment';
import { NextPage } from 'next';
import { ChangeEvent, createRef, useEffect } from 'react';

type FormProps = {
  code: string;
  fullname: string;
  gender: GenderTypes;
  dateOfBirth: any;
  class: string;
  phone: string;
  address: string;
  contact: string;
  avatar: string;
};

const TeacherUpdateInformation: NextPage = () => {
  const ref = createRef<HTMLInputElement>();

  const [form] = Form.useForm<FormProps>();

  const { userId } = useSystemContext();

  const user = useFetchUserDetail(userId);
  const userMutation = useUpdateUserDetail([GET_USER_DETAIL, GET_USER_LIST]);

  const avatar = Form.useWatch('avatar', form);

  const handleClickAvatar = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = await upload(event.target.files[0], 'avatar/');
      form.setFieldsValue({
        avatar: url,
      });
    }
  };

  const handleSubmit = (values: FormProps) => {
    userMutation.mutate({
      id: user?.id ?? '',
      address: values?.address,
      group_title: values?.class,
      code: values?.code,
      contact: values?.contact,
      date_of_birth: values?.dateOfBirth?.toISOString(),
      name: values?.fullname,
      gender: values?.gender,
      phone: values?.phone,
      avatar: values?.avatar,
    });
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        code: user?.code ?? '',
        fullname: user?.name ?? '',
        gender: user?.gender ?? 'male',
        dateOfBirth: moment(
          moment(user.date_of_birth).format('DD/MM/YYYY'),
          'DD/MM/YYYY'
        ),
        class: user?.group_title ?? '',
        phone: user?.phone ?? '',
        address: user?.address ?? '',
        contact: user?.contact ?? '',
        avatar: user?.avatar ?? '',
      });
    }
  }, [user, form]);

  return (
    <div className="w-full flex py-10 items-center justify-center">
      <div className="max-w-xl w-full rounded-sm bg-white p-5">
        <Form
          labelCol={{ span: 7 }}
          onFinish={handleSubmit}
          autoComplete="off"
          form={form}
        >
          <div className="w-full flex flex-col">
            <Form.Item
              name="avatar"
              label="Ảnh đại diện"
              rules={[{ required: true, message: 'Vui lòng nhập mã học sinh' }]}
            >
              <div className="relative">
                <input
                  className="absolute inset-0 !hidden"
                  type="file"
                  ref={ref}
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  className="hover:opacity-75"
                  onClick={handleClickAvatar}
                >
                  <img
                    className="rounded-sm h-[100px] min-h-[100px] w-[100px] min-w-[100px] object-cover"
                    src={avatar}
                  />
                </button>
              </div>
            </Form.Item>

            <Form.Item
              name="code"
              label="Mã học sinh"
              rules={[{ required: true, message: 'Vui lòng nhập mã học sinh' }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="fullname"
              label="Tên đầy đủ"
              rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ' }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới tính"
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
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
            >
              <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item name="class" label="Lớp chủ nhiệm">
              <Input allowClear disabled />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            >
              <Input.TextArea allowClear />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Liên hệ"
              rules={[{ required: true, message: 'Vui lòng nhập liên hệ' }]}
            >
              <Input allowClear />
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

export const getServerSideProps = withAuth(
  async () => ({ props: {} }),
  RoleEnum.teacher
);

export default TeacherUpdateInformation;
