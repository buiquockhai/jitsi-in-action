import withAuth from '@hoc/withAuth';
import GroupTable from '@layout/pages/admin/group/list/group-table';
import MemberTable from '@layout/pages/admin/group/list/member-table';
import { RoleEnum } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useState } from 'react';

const AdminGroupList: NextPage = () => {
  const [students, setStudents] = useState<any[]>([]);

  return (
    <div className="w-full p-5 grid grid-cols-2 gap-5">
      <GroupTable setStudents={setStudents} />
      <MemberTable students={students} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  RoleEnum.admin
);

export default AdminGroupList;
