import withAuth from '@hoc/withAuth';
import StudentCalendar from '@layout/pages/student/schedule';
import { RoleEnum } from '@util/constant';
import { NextPage } from 'next';

const StudentSchedule: NextPage = () => {
  return (
    <div className="w-full p-5">
      <div className="w-full p-5 rounded-sm bg-white">
        <StudentCalendar />
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

export default StudentSchedule;
