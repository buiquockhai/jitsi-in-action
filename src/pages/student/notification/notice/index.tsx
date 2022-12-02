import { useSystemContext } from '@context/system';
import withAuth from '@hoc/withAuth';
import { useFetchNotification } from '@hook/notification/useFetchNotification';
import { RoleEnum } from '@util/constant';
import { Empty } from 'antd';
import moment from 'moment';
import { NextPage } from 'next';

const Notification: NextPage = () => {
  const { userId } = useSystemContext();

  const notifications = useFetchNotification(userId);

  if (!notifications || notifications.length <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <div className="w-full flex py-5 items-center justify-center">
      <div className="max-w-2xl w-full flex flex-col gap-2">
        {(notifications ?? []).map((item) => (
          <div
            key={item.id}
            className="rounded-sm bg-blue-50 border-blue-300 border p-5 flex flex-col"
          >
            <p className="font-semibold">{item.title}</p>
            <p>{item.content}</p>
            <p className="w-full text-right">
              {moment(item.created_date).format('HH:mm DD/MM/YYYY')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = withAuth(
  () => ({
    props: {},
  }),
  RoleEnum.student
);

export default Notification;
