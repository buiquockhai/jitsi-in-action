import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { NextPage } from 'next';
import moment from 'moment';
import withAuth from '@hoc/withAuth';
import { RoleEnum } from '@util/constant';
import { useFetchExams } from '@hook/exam/useFetchExams';
import { useFetchGroups } from '@hook/group/useFetchGroup';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { useNewRoom } from '@hook/room/useNewRoom';
import { GET_ROOMS } from '@hook/room/useFetchRooms';

type FormProps = {
  title: string;
  examId: string;
  teacherId: string;
  groupId: string;
  duration: number;
  startAt: any;
};

const initialValues: FormProps = {
  title: '',
  examId: '',
  teacherId: '',
  groupId: '',
  duration: 0,
  startAt: moment('01/01/2022 00:00:00', 'DD/MM/YYYY hh:mm:ss'),
};

const NewRoomPage: NextPage = () => {
  const [form] = Form.useForm<FormProps>();

  const exams = useFetchExams({ status: true });
  const groups = useFetchGroups();
  const teachers = useFetchUsers({ role: RoleEnum.teacher });

  const newRoomMutation = useNewRoom([GET_ROOMS]);

  const handleSubmit = async (values: FormProps) => {
    await newRoomMutation.mutate({
      title: values.title,
      exam_id: values.examId,
      exam_title: exams?.find((item) => item.id === values.examId)?.title ?? '',
      group_id: values.groupId,
      group_title: groups?.find((item) => item.id === values.groupId)?.title ?? '',
      proctor_id: values.teacherId,
      proctor_name:
        teachers?.find((item) => item.id === values.teacherId)?.name ?? '',
      start_date: moment(values.startAt).toDate(),
    });

    form.setFieldsValue(initialValues);
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
              name="title"
              label="Tên phòng thi"
              rules={[{ required: true, message: 'Vui lòng nhập tên phòng thi' }]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Thời gian làm bài"
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian làm bài' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              name="examId"
              label="Bài thi"
              rules={[{ required: true, message: 'Vui lòng chọn bài thi' }]}
            >
              <Select placeholder="Chọn bài thi" allowClear>
                {exams?.map((item) => (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="groupId"
              label="Nhóm"
              rules={[{ required: true, message: 'Vui lòng chọn nhóm thi' }]}
            >
              <Select placeholder="Chọn nhóm" allowClear>
                {groups?.map((item) => (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="teacherId"
              label="Người coi thi"
              rules={[{ required: true, message: 'Vui lòng chọn người coi thi' }]}
            >
              <Select placeholder="Chọn người coi thi" allowClear>
                {teachers?.map((item) => (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Ngày thi"
              name="startAt"
              rules={[{ required: true, message: 'Vui lòng chọn ngày thi' }]}
            >
              <DatePicker
                showTime
                style={{ width: '100%' }}
                format="DD-MM-YYYY hh:mm:ss"
              />
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
  async () => ({
    props: {},
  }),
  RoleEnum.admin
);

export default NewRoomPage;
