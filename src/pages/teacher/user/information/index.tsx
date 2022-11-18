import withAuth from '@hoc/withAuth';
import TeacherInfomationCard from '@layout/pages/teachers/user/card';
import MarksTable from '@layout/pages/teachers/user/marks-table';
import { RoleEnum } from '@util/constant';
import { GetServerSideProps, NextPage } from 'next';

const TeacherInfomation: NextPage = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-5">
      <TeacherInfomationCard />
      <MarksTable />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async (_) => {
  return {
    props: {},
  };
}, RoleEnum.teacher);

export default TeacherInfomation;
