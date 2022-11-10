import withAuth from '@hoc/withAuth';
import { roles } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { uuid } from 'uuidv4';

const Notification: NextPage = () => {
  return (
    <div className="w-full flex py-5 items-center justify-center">
      <div className="max-w-2xl w-full flex flex-col gap-2">
        {Array(30)
          .fill(null)
          .map(() => (
            <div
              key={uuid()}
              className="rounded-sm bg-blue-50 border-blue-300 border p-5 flex flex-col"
            >
              <p className="font-semibold">Tiêu đề thông báo</p>
              <p>Nội dung thông báo ...</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.admin
);

export default Notification;
