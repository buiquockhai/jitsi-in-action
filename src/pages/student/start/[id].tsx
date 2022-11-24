import withAuth from '@hoc/withAuth';
import StudentCounter from '@layout/pages/student/start/counter';
import ExamPane from '@layout/pages/student/start/exam';
import MeetingPane from '@layout/pages/student/start/meeting';
import RoomInformation from '@layout/pages/student/start/room-info';
import { RoleEnum } from '@util/constant';
import { Tabs } from 'antd';
import { NextPage } from 'next';

const StartPage: NextPage = () => {
  return (
    <div className="w-full p-5 min-h-full relative">
      <div className="absolute right-5 top-5 flex items-end gap-5 z-10">
        <StudentCounter />
      </div>
      <div className="card-container min-h-full">
        <Tabs type="card">
          <Tabs.TabPane tab="Meeting" key="1">
            <MeetingPane />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bài thi" key="2">
            <ExamPane />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông tin phòng thi" key="3">
            <RoomInformation />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(
  () => ({
    props: {},
  }),
  RoleEnum.student
);

export default StartPage;
