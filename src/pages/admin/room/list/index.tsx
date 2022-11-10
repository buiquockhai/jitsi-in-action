import withAuth from '@hoc/withAuth';
import RoomTable from '@layout/pages/admin/room/list/room-table';
import { roles } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const AdminRoomList: NextPage = () => {
  return (
    <div className="w-full relative p-5 flex flex-col gap-3">
      <RoomTable />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.admin
);

export default AdminRoomList;
