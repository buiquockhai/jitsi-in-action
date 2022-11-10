import { getCookie } from '@util/functions';
import { __fullname, __role, __token, __username } from '@util/constant';
import { GetServerSidePropsContext } from 'next';
import { ROUTES } from '@util/routes';

const withAuth = (gssp: any, requiredRole?: string) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res }: any = context;
    const cookie = req.headers.cookie;
    const token = getCookie(__token, cookie);
    const username = getCookie(__username, cookie);
    const role = getCookie(__role, cookie);
    const fullname = getCookie(__fullname, cookie);

    if (!token || !username || !role || !fullname) {
      res.writeHead(302, { Location: ROUTES.LOGIN });
      res.end();
      return { props: {} };
    }

    if (requiredRole && role != requiredRole) {
      res.writeHead(302, { Location: ROUTES[404] });
      res.end();
      return { props: {} };
    }

    return await gssp?.({ ...context, token });
  };
};

export default withAuth;
