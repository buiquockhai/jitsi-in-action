import { LogoutOutlined } from '@ant-design/icons';
import withAuth from '@hoc/withAuth';
import { useQueryClient } from '@tanstack/react-query';
import { RoleEnum } from '@util/constant';
import { removeAuthentication } from '@util/functions';
import { ROUTES } from '@util/routes';
import { Button } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Logout: NextPage = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const handleLogout = async () => {
    await removeAuthentication();
    queryClient.clear();
    push(ROUTES.LOGIN);
  };

  return (
    <div className="w-full flex py-5 items-center justify-center">
      <div className="max-w-2xl w-full rounded-sm bg-white p-5 flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center">
          <LogoutOutlined />
          <p className="font-semibold">Đăng xuất</p>
        </div>
        <p>Bạn có muốn đăng xuất khỏi hệ thống?</p>

        <div className="w-full flex items-center justify-end">
          <Button danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(
  async () => ({
    props: {},
  }),
  RoleEnum.teacher
);

export default Logout;
