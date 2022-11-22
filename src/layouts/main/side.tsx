import { useMemo } from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';
import { adminMenu, studentMenu, teacherMenu } from '@util/menu';
import Cookies from 'js-cookie';
import { RoleEnum, __role } from '@util/constant';
import { useSystemContext } from '@context/system';

const MenuSlide = () => {
  const router = useRouter();

  const { hideMenu } = useSystemContext();

  const menu = useMemo(() => {
    const role = Cookies.get(__role);
    let result = studentMenu;
    switch (role) {
      case RoleEnum.admin:
        result = adminMenu;
        break;
      case RoleEnum.teacher:
        result = teacherMenu;
        break;
      default:
    }
    return result;
  }, []);

  const selectedKeys = useMemo(() => {
    const keys = menu?.flatMap((item: any) =>
      isArray(item?.children) ? [item, ...item?.children] : [item]
    );
    return keys?.flatMap((item) => (item?.href == router?.asPath ? item?.key : []));
  }, [router?.asPath, menu]);

  return (
    <Menu
      mode="inline"
      inlineCollapsed={hideMenu}
      style={{ height: '100%', borderRight: 0 }}
      items={menu}
      selectedKeys={selectedKeys}
    />
  );
};

export default MenuSlide;
