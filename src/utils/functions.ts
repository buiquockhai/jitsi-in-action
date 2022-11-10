import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { __token, __username, __role, __avatar, __fullname } from '@util/constant';
import { JwtResponse } from '@schema/system';

export const flattenAnswer = (treeNode) => {
  return treeNode?.flatMap((node) => {
    if (node?.isLeaf) return [node];
    return [...flattenAnswer(node?.children)];
  });
};

export const getAnswersFromKeys = (keys, flattenNode) => {
  return flattenNode?.flatMap((node) =>
    keys?.includes(node?.key) ? node?.data : []
  );
};

export const getPreviousMonth = (month: number) => {
  return month > 1 ? month - 1 : 12;
};

export const getNextMonth = (month: number) => {
  return month < 12 ? month + 1 : 1;
};

export const copy = (value: string = '', message) => {
  navigator.clipboard.writeText(value);
  message.success(value);
};

export const getCookie = (cookieName: string, cookie: Cookies) => {
  const name = `${cookieName}=`;
  let ca = cookie?.split(';');
  for (let i = 0; i < ca?.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
};

export const setAuthentication = (token) => {
  const jwtDecode: JwtResponse = jwt_decode(token);
  Cookies.set(__token, token);
  Cookies.set(__username, jwtDecode?.username);
  Cookies.set(__avatar, jwtDecode?.avatar);
  Cookies.set(__role, jwtDecode?.role);
  Cookies.set(__fullname, jwtDecode?.name);
  return jwtDecode;
};

export const removeAuthentication = () => {
  Cookies.remove(__token);
  Cookies.remove(__username);
  Cookies.remove(__avatar);
  Cookies.remove(__role);
  Cookies.remove(__fullname);
};

export async function ErrorHanlder<T>(
  originalFunction: () => T,
  setLoading: (loading: boolean) => void
) {
  try {
    setLoading?.(true);
    return await originalFunction.call(null);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setLoading?.(false);
  }
}
