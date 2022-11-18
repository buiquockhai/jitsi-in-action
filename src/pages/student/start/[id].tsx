import withAuth from '@hoc/withAuth';
import ExamPane from '@layout/pages/student/start/exam';
import MeetingPane from '@layout/pages/student/start/meeting';
import { RoleEnum } from '@util/constant';
import { Tabs } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const StartPage: NextPage = () => {
  return (
    <div className="w-full p-5 min-h-full">
      <div className="card-container min-h-full">
        <Tabs type="card">
          <Tabs.TabPane tab="Phòng họp" key="1">
            <MeetingPane />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bài thi" key="2">
            <ExamPane />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  RoleEnum.student
);

export default StartPage;
