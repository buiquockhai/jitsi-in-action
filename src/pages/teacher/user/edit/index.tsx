import withAuth from '@hoc/withAuth';
import { usePreview } from '@hook/system/usePreview';
import { GET_USER_DETAIL, useFetchUserDetail } from '@hook/user/useFetchUserDetail';
import { userUpdateUserDetail } from '@hook/user/useUpdateUserDetail';
import { GenderEnum, GenderTypes, RoleEnum } from '@util/constant';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

type FormProps = {
  code: string;
  fullname: string;
  gender: GenderTypes;
  dateOfBirth: any;
  class: string;
  phone: string;
  address: string;
  contact: string;
  avatar: UploadFile[];
};

const TeacherUpdateInformation: NextPage = () => {
  const [form] = Form.useForm();
  const [onPreview] = usePreview();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const user = useFetchUserDetail();
  const userMutation = userUpdateUserDetail([GET_USER_DETAIL]);

  // const avatar = Form.useWatch('avatar', form);

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
    });
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
        avatar: [],
      });
    }
  }, [user]);

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
              name="code"
              label="Ảnh đại diện"
              rules={[{ required: true, message: 'Vui lòng nhập mã học sinh' }]}
            >
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList?.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
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
              rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ' }]}
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
            <Form.Item
              name="class"
              label="Lớp chủ nhiệm"
              rules={[{ required: true, message: 'Vui lòng nhập lớp chủ nhiệm' }]}
            >
              <Input allowClear />
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
