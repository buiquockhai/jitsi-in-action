import withAuth from '@hoc/withAuth';
import RoomTable from '@layout/pages/admin/room/list/room-table';
import { RoleEnum } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Button } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const AdminRoomList: NextPage = () => {
  const { push } = useRouter();

  return (
    <div className="space-y-3 p-5">
      <Button type="primary" onClick={() => push(ROUTES.ADMIN_NEW_ROOM)}>
        Thêm
      </Button>
      <RoomTable />
    </div>
  );
};

export const getServerSideProps = withAuth(
  async () => ({
    props: {},
  }),
  RoleEnum.admin
);

export default AdminRoomList;
