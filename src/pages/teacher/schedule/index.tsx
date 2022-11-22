import withAuth from '@hoc/withAuth';
import TeacherCalendar from '@layout/pages/teachers/schedule';
import { RoleEnum } from '@util/constant';
import { NextPage } from 'next';

const TeacherSchedule: NextPage = () => {
  return (
    <div className="w-full p-5">
      <div className="w-full p-5 rounded-sm bg-white">
        <TeacherCalendar />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(
  async () => ({
    props: {},
  }),
  RoleEnum.teacher
);

export default TeacherSchedule;
