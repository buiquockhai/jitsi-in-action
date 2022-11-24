import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { removeAuthentication } from '@util/functions';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';
import { useQueryClient } from '@tanstack/react-query';

const TopBar = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { hideMenu, setHideMenu } = useSystemContext();

  const handleLogout = async () => {
    await removeAuthentication();
    queryClient.clear();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="w-full h-[50px] px-5 flex items-center justify-between absolute top-0 z-10 bg-white">
      <Button
        icon={hideMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        type="primary"
        onClick={() => setHideMenu(!hideMenu)}
      />

      <div className="flex gap-3">
        <Tooltip title="Đăng xuất">
          <Button icon={<LogoutOutlined />} onClick={handleLogout} />
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;
