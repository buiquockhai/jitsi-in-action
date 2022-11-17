import withAuth from '@hoc/withAuth';
import { usePreview } from '@hook/system/usePreview';
import { roles } from '@util/constant';
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
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

const StudentUpdateInformation: NextPage = () => {
  const [form] = Form.useForm();
  const [onPreview] = usePreview();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const avatar = Form.useWatch('avatar', form);

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="w-full flex py-10 items-center justify-center">
      <div className="max-w-xl w-full rounded-sm bg-white p-5">
        <Form
          labelCol={{ span: 7 }}
          initialValues={initialValues}
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
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
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
  code: string;
  fullname: string;
  gender: number;
  dateOfBirth: any;
  class: string;
  phone: string;
  address: string;
  contact: string;
  avatar: UploadFile[];
} = {
  code: '1711726',
  fullname: 'Bùi Quốc Khải',
  gender: 0,
  dateOfBirth: moment('26/10/1999', 'DD/MMYYYY'),
  class: 'KHMT02',
  phone: '0898463002',
  address: 'Trường Thọ, Thủ Đức, Tp Hồ Chí Minh',
  contact: 'https://www.google.com.vn/?hl=vi',
  avatar: [],
};

export const getServerSideProps: GetServerSideProps = withAuth(async (_) => {
  return {
    props: {},
  };
}, roles.student);

export default StudentUpdateInformation;
