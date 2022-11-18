import withAuth from '@hoc/withAuth';
import TableTransfer from '@layout/pages/admin/group/new/transfer-table';
import { RoleEnum } from '@util/constant';
import { Button } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const NewGroup: NextPage = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-3">
      <div className="w-full flex flex-row gap-2 items-end justify-end">
        <Button>Huỷ</Button>
        <Button type="primary">Lưu</Button>
      </div>
      <TableTransfer />
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

export default NewGroup;
