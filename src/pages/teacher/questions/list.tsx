import withAuth from '@hoc/withAuth';
import { RoleEnum } from '@util/constant';
import QuestionListContextProvider from '@layout/pages/teachers/questions/list/context';
import { QuestionView } from '@layout/pages/teachers/questions/list/questions-view';

export default function QuestionList() {
  return (
    <QuestionListContextProvider>
      <QuestionView />
    </QuestionListContextProvider>
  );
}

export const getServerSideProps = withAuth(() => ({ props: {} }), RoleEnum.teacher);
