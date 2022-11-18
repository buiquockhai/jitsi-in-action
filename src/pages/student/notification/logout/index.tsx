import { LogoutOutlined } from '@ant-design/icons';
import withAuth from '@hoc/withAuth';
import { RoleEnum } from '@util/constant';
import { Button } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { v4  } from 'uuid';

const Logout: NextPage = () => {
  return (
    <div className="w-full flex py-5 items-center justify-center">
      <div
        key={v4()}
        className="max-w-2xl w-full rounded-sm bg-white p-5 flex flex-col gap-3"
      >
        <div className="flex flex-row gap-3 items-center">
          <LogoutOutlined />
          <p className="font-semibold">Đăng xuất</p>
        </div>
        <p>Bạn có muốn đăng xuất khỏi hệ thống?</p>

        <div className="w-full flex items-center justify-end">
          <Button danger>Đăng xuất</Button>
        </div>
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
  RoleEnum.student
);

export default Logout;
