import withAuth from '@hoc/withAuth';
import ExamsTable from '@layout/pages/teachers/exams/list';
import ViewExam from '@layout/pages/teachers/exams/list/view-exam';
import SlideLayout from '@layout/utils/slide-layout';
import { RoleEnum } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Button } from 'antd';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const TeacherExams = () => {
  const { push } = useRouter();

  const [openView, setOpenView] = useState(false);
  const [focusExamId, setFocusExamId] = useState('');

  const handleFocusView = (id: string) => {
    setFocusExamId(id);
    setOpenView(true);
  };

  return (
    <div className="w-full relative p-5 flex flex-col gap-3">
      <div className="w-fit h-fit relative">
        <Button type="primary" onClick={() => push(ROUTES.TEACHER_NEW_EXAM)}>
          Thêm
        </Button>
      </div>
      <ExamsTable onFocus={handleFocusView} />
      <ViewExam
        open={openView}
        onClose={() => setOpenView(false)}
        id={focusExamId}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async () => ({ props: {} }),
  RoleEnum.teacher
);

TeacherExams.layout = SlideLayout;

export default TeacherExams;
