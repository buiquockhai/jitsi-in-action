import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { removeAuthentication } from '@util/functions';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';

const Topbar: React.FC<any> = () => {
  const router = useRouter();

  const { hideMenu, setHideMenu } = useSystemContext();

  const handleLogout = async () => {
    await removeAuthentication();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="w-full h-[50px] px-5 flex flex-row items-center justify-between absolute top-0 z-10 bg-white">
      <Button
        icon={hideMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        type="primary"
        onClick={setHideMenu.bind(null, !hideMenu)}
      />

      <div className="flex flex-row gap-3">
        <Tooltip title="Đăng xuất">
          <Button icon={<LogoutOutlined />} onClick={handleLogout} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Topbar;
