import { CalendarOutlined } from '@ant-design/icons';
import Container from '@layout/main/container';
import Landing from '@layout/pages/homepage/landing';
import HomeLayout from '@layout/utils/home-layout';
import StudentCalendar from '@layout/pages/student/schedule';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import withAuth from '@hoc/withAuth';
import { RoleEnum, __role } from '@util/constant';
import { ROUTES } from '@util/routes';

const Home = () => {
  return (
    <div className="w-full flex flex-col h-screen overflow-auto">
      <Landing />
      <Container>
        <div className="w-full p-10 flex flex-col items-center justify-center gap-3">
          <button className="h-10 w-10 rounded-full bg-blue-100 text-primary flex items-center justify-center">
            <CalendarOutlined />
          </button>
          <p className="font-bold text-xl">Lịch thi online</p>
          <p className="text-lg max-w-md text-center">
            Theo dõi lịch thi của bạn đảm bảo tham gia đúng giờ thì và đạt thành tích
            tốt nhất
          </p>
        </div>
      </Container>
      <div className="p-10">
        <StudentCalendar />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    if (context.req.cookies?.__role === RoleEnum.admin) {
      context.res.writeHead(302, { Location: ROUTES.ADMIN_ACCOUNT_LIST });
      context.res.end();
      return { props: {} };
    }
    return {
      props: {},
    };
  }
);

Home.layout = HomeLayout;

export default Home;
