import withAuth from '@hoc/withAuth';
import MeetingPane from '@layout/pages/teachers/start/meeting';
import { RoleEnum } from '@util/constant';
import { Tabs } from 'antd';
import { NextPage } from 'next';

const StartPage: NextPage = () => {
  return (
    <div className="w-full p-5 min-h-full">
      <div className="card-container min-h-full">
        <Tabs type="card">
          <Tabs.TabPane tab="Phòng họp" key="1">
            <MeetingPane />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bài thi" key="2">
            abc
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
