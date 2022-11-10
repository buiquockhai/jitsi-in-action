import withAuth from '@hoc/withAuth';
import { roles } from '@util/constant';
import QuestionListContextProvider from '@layout/pages/teachers/questions/list/context';
import { useEffect } from 'react';
import { QuestionView } from '@layout/pages/teachers/questions/list/questions-view';

export default function QuestionList() {
  useEffect(() => {}, []);

  return (
    <QuestionListContextProvider>
      <QuestionView />
    </QuestionListContextProvider>
  );
}

export const getServerSideProps = withAuth(
  async () => ({ props: {} }),
  roles.teacher
);
