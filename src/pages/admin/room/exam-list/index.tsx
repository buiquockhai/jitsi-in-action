import withAuth from '@hoc/withAuth';
import ExamsTable from '@layout/pages/admin/room/exam-list';
import ViewExam from '@layout/pages/admin/room/exam-list/view-exam';
import { RoleEnum } from '@util/constant';
import { NextPage } from 'next';
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

export const getServerSideProps = withAuth(
  async (_) => ({
    props: {},
  }),
  RoleEnum.admin
);

export default AdminExamList;
