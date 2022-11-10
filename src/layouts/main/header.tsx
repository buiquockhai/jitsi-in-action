import React, { useMemo, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Badge, Drawer, Dropdown, Menu, Tag } from 'antd';
import Container from './container';
import { useRouter } from 'next/router';
import { removeAuthentication } from '@util/functions';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';
import { roles } from '@util/constant';
import { adminMenu, studentMenu, teacherMenu } from '@util/menu';
import { v4  } from 'uuid';

const Header = () => {
  const { push } = useRouter();
  const { role, avatar } = useSystemContext();

  const [visible, setVisible] = useState(false);

  const handleLogout = async () => {
    await removeAuthentication();
    push(ROUTES.LOGIN);
  };

  const menu = useMemo(() => {
    const menuData: any[] = [];
    const menuDataFlatten: any[] = [];
    let title = '';

    switch (role) {
      case roles.admin:
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
      case roles.student:
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
              <Badge count={5}>
                <Avatar src={avatar} />
              </Badge>
            </button>

            <Drawer
              title="Công cụ"
              placement="right"
              width={500}
              onClose={setVisible.bind(null, false)}
              visible={visible}
            >
              <div className="flex gap-2 flex-wrap items-center">
                {menu.menuDataFlatten?.map(({ key, label, onClick }) => (
                  <Tag key={key} onClick={onClick}>
                    {label}
                  </Tag>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                {Array.from({ length: 10 }).map(() => (
                  <div
                    key={v4()}
                    className="rounded-sm bg-blue-50 border-blue-300 border p-5 flex flex-col"
                  >
                    <p className="font-semibold">Tiêu đề thông báo</p>
                    <p>Nội dung thông báo ...</p>
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
