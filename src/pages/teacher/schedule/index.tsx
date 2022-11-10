import withAuth from '@hoc/withAuth';
import TeacherCalendar from '@layout/pages/teachers/schedule';
import { roles } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const TeacherSchedule: NextPage = () => {
  return (
    <div className="w-full p-5">
      <div className="w-full p-5 rounded-sm bg-white">
        <TeacherCalendar />
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
  roles.teacher
);

export default TeacherSchedule;
