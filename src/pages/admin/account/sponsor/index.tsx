import {
  RetweetOutlined,
  QuestionCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import withAuth from '@hoc/withAuth';
import {
  GET_CONFIGURATION_LIST,
  useFetchConfiguration,
} from '@hook/configuration/useFetchConfiguration';
import { RoleEnum } from '@util/constant';
import { copy } from '@util/functions';
import { Button, Form, Input, message, Popconfirm } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { v4 } from 'uuid';
import { useEffect } from 'react';
import { userUpdateConfiguration } from '@hook/configuration/useUpdateConfiguration';

type FormProps = {
  forStudent: string;
  forTeacher: string;
};

const SponsorSetting: NextPage = () => {
  const [form] = Form.useForm<FormProps>();

  const configuration = useFetchConfiguration({});
  const updateConfiguration = userUpdateConfiguration([GET_CONFIGURATION_LIST]);

  const forStudent = Form.useWatch('forStudent', form);
  const forTeacher = Form.useWatch('forTeacher', form);

  const handleSubmit = async (values: FormProps) => {
    const mappingConfiguration: Record<string, string> =
      configuration?.reduce(
        (obj, item) => ({ ...obj, [item?.key]: item?.value }),
        {}
      ) ?? {};

    if (values.forStudent !== mappingConfiguration.student_registry_code) {
      await updateConfiguration.mutate({
        key: 'student_registry_code',
        value: values.forStudent,
      });
    }

    if (values.forTeacher !== mappingConfiguration.teacher_registry_code) {
      await updateConfiguration.mutate({
        key: 'teacher_registry_code',
        value: values.forTeacher,
      });
    }
  };

  useEffect(() => {
    if (configuration) {
      const mappingConfiguration: Record<string, string> =
        configuration?.reduce(
          (obj, item) => ({ ...obj, [item?.key]: item?.value }),
          {}
        ) ?? {};

      form.setFieldsValue({
        forStudent: mappingConfiguration?.student_registry_code ?? '',
        forTeacher: mappingConfiguration?.teacher_registry_code ?? '',
      });
    }
  }, [configuration]);

  return (
    <div className="w-full flex py-10 items-center justify-center">
      <div className="max-w-xl w-full rounded-sm bg-white p-5">
        <Form
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

export const getServerSideProps: GetServerSideProps = withAuth(async (_) => {
  return {
    props: {},
  };
}, RoleEnum.admin);

export default SponsorSetting;
