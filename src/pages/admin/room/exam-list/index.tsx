import withAuth from '@hoc/withAuth';
import ExamsTable from '@layout/pages/admin/room/exam-list';
import ViewExam from '@layout/pages/admin/room/exam-list/view-exam';
import { roles } from '@util/constant';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useState } from 'react';

const AdminExamList: NextPage = () => {
  const [openView, setOpenView] = useState<boolean>(false);
  const [examData, setExamData] = useState<any>({});

  const handleViewData = (data) => {
    setExamData(data);
    setOpenView(true);
  };

  return (
    <div className="w-full relative p-5 flex flex-col gap-3">
      <ExamsTable setData={handleViewData} />
      <ViewExam
        open={openView}
        onClose={setOpenView.bind(null, false)}
        data={examData}
      />
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

export default AdminExamList;
