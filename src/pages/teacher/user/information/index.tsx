import withAuth from '@hoc/withAuth';
import TeacherInformationCard from '@layout/pages/teachers/user/card';
import { RoleEnum } from '@util/constant';
import { NextPage } from 'next';

const TeacherInformation: NextPage = () => {
  return (
    <div className="w-full gap-5 p-5">
      <TeacherInformationCard />
    </div>
  );
};

export const getServerSideProps = withAuth(async (_) => {
  return {
    props: {},
  };
}, RoleEnum.teacher);

export default TeacherInformation;
