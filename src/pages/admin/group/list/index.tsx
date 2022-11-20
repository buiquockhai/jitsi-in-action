import withAuth from '@hoc/withAuth';
import GroupTable from '@layout/pages/admin/group/group-table';
import MemberTable from '@layout/pages/admin/group/member-table';
import { RoleEnum } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Button } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminGroupList: NextPage = () => {
  const { push } = useRouter();
  const [groupFocusId, setGroupFocusId] = useState('');

  return (
    <div className="space-y-3 p-5">
      <Button type="primary" onClick={() => push(ROUTES.ADMIN_NEW_GROUP)}>
        Thêm
      </Button>
      <div className="w-full grid grid-cols-2 gap-5">
        <GroupTable setGroupFocusId={setGroupFocusId} />
        <MemberTable groupFocusId={groupFocusId} />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(
  async (_) => ({
    props: {},
  }),
  RoleEnum.admin
);

export default AdminGroupList;
