import withAuth from '@hoc/withAuth';
import StudentAccountTable from '@layout/pages/admin/account/student-table';
import TeacherAccountTable from '@layout/pages/admin/account/teacher-table';
import { roles } from '@util/constant';
import { Tabs } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const AccountList: NextPage = () => {
  return (
    <div className="w-full p-5">
      <div className="card-container">
        <Tabs type="card">
          <Tabs.TabPane tab="Học sinh" key="1">
            <StudentAccountTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Giảng viên" key="2">
            <TeacherAccountTable />
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
  roles.admin
);

export default AccountList;
