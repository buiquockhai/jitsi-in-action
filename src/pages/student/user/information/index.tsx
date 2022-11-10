import withAuth from '@hoc/withAuth';
import StudentInfomationCard from '@layout/pages/student/user/card';
import MarksTable from '@layout/pages/student/user/marks-table';
import { roles } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const StudentInfomation: NextPage = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-5">
      <StudentInfomationCard />
      <MarksTable />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.student
);

export default StudentInfomation;
