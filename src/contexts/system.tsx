import { Router } from 'next/router';
import { useState, useEffect } from 'react';
import { createContext } from '@util/createContext';
import { JwtResponse, RoleTypes } from '@schema/system';
import { getCookie } from '@util/functions';
import { __token } from './../utils/constant';
import jwt_decode from 'jwt-decode';

export interface SystemContextProps {
  toast: boolean;
  setToast: (status: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userId: string;
  setUserId: (userId: string) => void;
  hideMenu: boolean;
  setHideMenu: (value: boolean) => void;
  role: RoleTypes;
  setRole: (role: RoleTypes) => void;
  username: string;
  setUsername: (username: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
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
  };

  return <Provider value={context}>{children}</Provider>;
};

export { useSystemContext };

export default SystemContextProvider;