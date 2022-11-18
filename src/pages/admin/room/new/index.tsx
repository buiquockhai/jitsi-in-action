import { EXAMS_MOCK } from '@mock/exams';
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
} from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useState } from 'react';
import { debounce } from 'lodash';
import { GROUPS_MOCK } from '@mock/groups';
import { TEACHERS_MOCK } from '@mock/teachers';
import moment from 'moment';
import withAuth from '@hoc/withAuth';
import { RoleEnum } from '@util/constant';

const NewRoomPage: NextPage = () => {
  const [form] = Form.useForm();

  const [examList, setExamList] = useState(EXAMS_MOCK);
  const [groupList, setGroupList] = useState(GROUPS_MOCK);
  const [teacherList, setTeacherList] = useState(TEACHERS_MOCK);

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  const handleSearchExam = (value: string) => {
    const searchExam = EXAMS_MOCK?.filter(
      (item) => !value || item?.title?.toLowerCase().includes(value?.toLowerCase())
    );
    setExamList(searchExam);
  };

  const handleSearchGroup = (value: string) => {
    const searchGroup = GROUPS_MOCK?.filter(
      (item) => !value || item?.name?.toLowerCase().includes(value?.toLowerCase())
    );
    setGroupList(searchGroup);
  };

  const handleSearchTeacher = (value: string) => {
    const searchTeacher = TEACHERS_MOCK?.filter(
      (item) =>
        !value || item?.fullname?.toLowerCase().includes(value?.toLowerCase())
    );
    setTeacherList(searchTeacher);
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
              name="workingTime"
              label="Thời gian làm bài"
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian làm bài' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              name="exam"
              label="Bài thi"
              rules={[{ required: true, message: 'Vui lòng chọn bài thi' }]}
            >
              <AutoComplete onSearch={debounce(handleSearchExam, 500)}>
                {examList.map((exam) => (
                  <AutoComplete.Option key={exam?.id} value={exam?.title}>
                    {exam?.title}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="group"
              label="Nhóm"
              rules={[{ required: true, message: 'Vui lòng chọn nhóm thi' }]}
            >
              <AutoComplete onSearch={debounce(handleSearchGroup, 500)}>
                {groupList.map((group) => (
                  <AutoComplete.Option key={group?.id} value={group?.name}>
                    {group?.name}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="teacher"
              label="Người coi thi"
              rules={[{ required: true, message: 'Vui lòng chọn người coi thi' }]}
            >
              <AutoComplete onSearch={debounce(handleSearchTeacher, 500)}>
                {teacherList.map((teacher) => (
                  <AutoComplete.Option key={teacher?.id} value={teacher?.fullname}>
                    {teacher?.fullname}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
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

            <Form.Item
              label="Xáo trộn câu hỏi"
              name="shuffle"
              valuePropName="checked"
            >
              <Checkbox />
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
  title: string;
  exam: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
  };
  warkingTime: number;
  shuffle: boolean;
  startAt: any;
} = {
  title: '',
  exam: {
    id: '',
    name: '',
  },
  teacher: {
    id: '',
    name: '',
  },
  group: {
    id: '',
    name: '',
  },
  warkingTime: 0,
  shuffle: false,
  startAt: moment('01/01/2022 00:00:00', 'DD/MM/YYYY hh:mm:ss'),
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  RoleEnum.admin
);

export default NewRoomPage;
