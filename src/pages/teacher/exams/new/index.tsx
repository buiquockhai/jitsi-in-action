import withAuth from '@hoc/withAuth';
import PageHeaderExamsCreation from '@layout/pages/teachers/exams/new/page-header';
import QuestionDefine from '@layout/pages/teachers/exams/new/question-define';
import QuestionTree from '@layout/pages/teachers/exams/new/question-tree';
import { ANSWER_MOCK } from '@mock/answers';
import { roles } from '@util/constant';
import { Form } from 'antd';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const treeData = ANSWER_MOCK;

const TeacherExams: NextPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      form={form}
    >
      <div className="w-full flex flex-col">
        <PageHeaderExamsCreation />
        <div className="p-5 w-full grid grid-cols-3 gap-5">
          <QuestionTree treeData={treeData} form={form} />
          <QuestionDefine form={form} />
        </div>
      </div>
    </Form>
  );
};

const initialValues: {
  title: string;
  range: number;
  maxPoint: number;
  workingTime: number;
  questions: Array<any>;
} = {
  title: '',
  range: 0,
  maxPoint: 0,
  workingTime: 0,
  questions: [],
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.teacher
);

export default TeacherExams;
