import withAuth from '@hoc/withAuth';
import StudentCalendar from '@layout/pages/student/schedule';
import { RoleEnum } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const StudentSchedule: NextPage = () => {
  return (
    <div className="w-full p-5">
      <div className="w-full p-5 rounded-sm bg-white">
        <StudentCalendar />
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

export default StudentSchedule;
