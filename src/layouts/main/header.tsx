import React, { useCallback, useMemo, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Dropdown, Menu, Tag } from 'antd';
import Container from './container';
import { useRouter } from 'next/router';
import { removeAuthentication } from '@util/functions';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';
import { RoleEnum } from '@util/constant';
import { adminMenu, studentMenu, teacherMenu } from '@util/menu';
import { v4 } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchNotification } from '@hook/notification/useFetchNotification';

const Header = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  const { role, avatar, userId } = useSystemContext();

  const [visible, setVisible] = useState(false);

  const notifications = useFetchNotification(userId);

  const handleLogout = useCallback(async () => {
    await removeAuthentication();
    queryClient.clear();
    push(ROUTES.LOGIN);
  }, [push, queryClient]);

  const menu = useMemo(() => {
    const menuData: any[] = [];
    const menuDataFlatten: any[] = [];
    let title = '';

    switch (role) {
      case RoleEnum.admin:
        title = 'Dành cho quản trị viên';
        adminMenu.forEach((element) => {
          const { key, label, icon, children } = element;
          menuData.push({
            key: key,
            label: label,
            icon: icon,
            onClick: () => children[0].onClick,
          });
          menuDataFlatten.push(...children);
        });
        break;
      case RoleEnum.student:
        title = 'Dành cho học sinh';
        studentMenu.forEach((element) => {
          const { key, label, icon, children, onClick } = element;
          menuData.push({
            key: key,
            label: label,
            icon: icon,
            onClick: children ? children[0]?.onClick : onClick,
          });
          if (children) menuDataFlatten.push(...children);
          else menuDataFlatten.push(element);
        });
        menuData.shift();
        break;
      default:
        title = 'Dành cho giảng viên';
        teacherMenu.forEach((element) => {
          const { key, label, icon, children, onClick } = element;
          menuData.push({
            key: key,
            label: label,
            icon: icon,
            onClick: children ? children[0]?.onClick : onClick,
          });
          if (children) menuDataFlatten.push(...children);
          else menuDataFlatten.push(element);
        });
        menuData.shift();
        break;
    }

    menuData.push({
      key: v4(),
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      label: 'Đăng xuất',
    });

    return { menu: <Menu items={menuData} />, title, menuDataFlatten };
  }, [role, handleLogout]);

  return (
    <nav className="w-full h-[50px] flex items-center justify-center border-b fixed inset-0 z-10 bg-white">
      <Container>
        <div className="w-full min-h-full flex items-center justify-between">
          <img src="/assets/__logo.svg" />
          <div className="flex flex-row items-center justify-center gap-8">
            <Dropdown
              overlay={menu.menu}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <div className="h-full flex flex-row gap-2 items-center">
                <button className="text-sm font-medium text-primary">
                  {menu.title}
                </button>
              </div>
            </Dropdown>
            <button onClick={setVisible.bind(null, true)} type="button">
              <Avatar src={avatar} />
            </button>

            <Drawer
              title="Công cụ"
              placement="right"
              width={500}
              onClose={setVisible.bind(null, false)}
              open={visible}
            >
              <div className="flex gap-2 flex-wrap items-center">
                {menu.menuDataFlatten?.map(({ key, label, onClick }) => (
                  <Tag key={key} onClick={onClick} className="cursor-pointer">
                    {label}
                  </Tag>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                {(notifications ?? []).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-sm bg-blue-50 border-blue-300 border p-5 flex flex-col"
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            </Drawer>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
