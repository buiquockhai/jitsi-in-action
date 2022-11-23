import withAuth from '@hoc/withAuth';
import ExamView from '@layout/pages/teachers/start/exam-view';
import TeacherStartManage from '@layout/pages/teachers/start/manage';
import MeetingPane from '@layout/pages/teachers/start/meeting';
import RoomInformation from '@layout/pages/teachers/start/room-info';
import { RoleEnum } from '@util/constant';
import { Tabs } from 'antd';
import { NextPage } from 'next';

const StartPage: NextPage = () => {
  return (
    <div className="w-full p-5 min-h-full">
      <div className="card-container min-h-full">
        <Tabs type="card">
          <Tabs.TabPane tab="Meeting" key="1">
            <MeetingPane />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chi tiết" key="2">
            <TeacherStartManage />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đề thi" key="3">
            <ExamView />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông tin phòng thi" key="4">
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
  RoleEnum.teacher
);

export default StartPage;
