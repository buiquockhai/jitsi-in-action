import withAuth from '@hoc/withAuth';
import ExamsTable from '@layout/pages/admin/room/exam-list';
import ViewExam from '@layout/pages/admin/room/exam-list/view-exam';
import { RoleEnum } from '@util/constant';
import { NextPage } from 'next';
import { useState } from 'react';

const AdminExamList: NextPage = () => {
  const [examFocusId, setExamFocusId] = useState('');
  const [openView, setOpenView] = useState(false);

  const handleFocus = (id: string) => {
    setExamFocusId(id);
    setOpenView(true);
  };

  return (
    <div className="w-full relative p-5 flex flex-col gap-3">
      <ExamsTable onFocus={handleFocus} />
      <ViewExam
        open={openView}
        onClose={() => setOpenView(false)}
        id={examFocusId}
      />
    </div>
  );
};

export const getServerSideProps = withAuth(
  async () => ({
    props: {},
  }),
  RoleEnum.admin
);

export default AdminExamList;
