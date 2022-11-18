import withAuth from '@hoc/withAuth';
import StudentInformationCard from '@layout/pages/student/user/card';
import MarksTable from '@layout/pages/student/user/marks-table';
import { RoleEnum } from '@util/constant';
import { GetServerSideProps, NextPage } from 'next';

const StudentInformation: NextPage = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-5 p-5">
      <StudentInformationCard />
      <MarksTable />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async (_) => {
  return {
    props: {},
  };
}, RoleEnum.student);

export default StudentInformation;
