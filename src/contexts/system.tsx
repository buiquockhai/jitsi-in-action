import { Router } from 'next/router';
import { useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext } from '@util/createContext';
import { JwtResponse, RoleTypes } from '@schema/system';
import { getCookie } from '@util/functions';
import { __token } from './../utils/constant';
import jwt_decode from 'jwt-decode';
import { notification } from 'antd';
import { NotificationInstance, NotificationPlacement } from 'antd/lib/notification';

type NotificationProps = {
  message: string;
  description: ReactNode;
  placement?: NotificationPlacement;
};

export interface SystemContextProps {
  toast: boolean;
  setToast: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  hideMenu: boolean;
  setHideMenu: Dispatch<SetStateAction<boolean>>;
  role: RoleTypes;
  setRole: Dispatch<SetStateAction<RoleTypes>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
  notification: NotificationInstance;
}

const [Provider, useSystemContext] = createContext<SystemContextProps>({
  name: 'system',
});

const SystemContextProvider = ({ children }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', setLoading.bind(null, true));
    Router.events.on('routeChangeComplete', setLoading.bind(null, false));
    Router.events.on('routeChangeError', setLoading.bind(null, false));

    return () => {
      Router.events.off('routeChangeStart', setLoading.bind(null, true));
      Router.events.off('routeChangeComplete', setLoading.bind(null, false));
      Router.events.off('routeChangeError', setLoading.bind(null, false));
    };
  }, []);

  useEffect(() => {
    const token = getCookie(__token, document.cookie);
    if (token) {
      const jwtDecode: JwtResponse = jwt_decode(token);
      setAvatar(jwtDecode.avatar);
      setRole(jwtDecode.role);
      setUserId(jwtDecode.id);
      setUsername(jwtDecode.username);
    }
  }, []);

  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [hideMenu, setHideMenu] = useState(true);
  const [role, setRole] = useState<RoleTypes>('student');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  const [api, contextHolder] = notification.useNotification();

  const context: SystemContextProps = {
    toast,
    setToast,
    loading,
    setLoading,
    userId,
    setUserId,
    hideMenu,
    setHideMenu,
    role,
    setRole,
    username,
    setUsername,
    avatar,
    setAvatar,
    notification: api,
  };

  return (
    <Provider value={context}>
      {contextHolder}
      {children}
    </Provider>
  );
};

export { useSystemContext };

export default SystemContextProvider;
