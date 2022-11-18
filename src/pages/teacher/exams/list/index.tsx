import withAuth from '@hoc/withAuth';
import ExamsTable from '@layout/pages/teachers/exams/list';
import ViewExam from '@layout/pages/teachers/exams/list/view-exam';
import SlideLayout from '@layout/utils/slide-layout';
import { RoleEnum } from '@util/constant';
import { Button } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';

const TeacherExams = () => {
  const [openView, setOpenView] = useState<boolean>(false);
  const [examData, setExamData] = useState<any>({});

  const handleViewData = (data) => {
    setExamData(data);
    setOpenView(true);
  };

  return (
    <div className="w-full relative p-5 flex flex-col gap-3">
      <div className="w-fit h-fit relative">
        <Button type="primary">Thêm</Button>
      </div>
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
  RoleEnum.teacher
);

TeacherExams.layout = SlideLayout;

export default TeacherExams;
