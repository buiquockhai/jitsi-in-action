import CreationQuestionConfiguration from '@layout/pages/teachers/questions/new/config';
import PageHeaderQuestionCreation from '@layout/pages/teachers/questions/new/page-header';
import { Form, UploadFile } from 'antd';
import QuestionPreview from '@layout/pages/teachers/questions/new/preview';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import withAuth from '@hoc/withAuth';
import { roles } from '@util/constant';

const TeacherQuestions = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <Form
      labelCol={{ span: 5 }}
      initialValues={initialValues}
      onFinish={handleSubmit}
      autoComplete="off"
      form={form}
    >
      <div className="w-full flex flex-col gap-3">
        <PageHeaderQuestionCreation form={form} />
        <div className="p-5 w-full grid grid-cols-2 gap-5">
          <CreationQuestionConfiguration form={form} />
          <QuestionPreview form={form} />
        </div>
      </div>
    </Form>
  );
};

const initialValues: {
  type: string;
  title: string;
  range: number;
  point: number;
  questionContent: string;
  singleCorrect: string;
  multipleCorrect: string[];
  questionImages: UploadFile[];
  answers: Array<{
    id: string;
    label: string;
    content: string;
  }>;
} = {
  type: '__1__',
  title: '',
  range: 0,
  point: 0.25,
  questionContent: '',
  questionImages: [],
  answers: [],
  singleCorrect: '',
  multipleCorrect: [],
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  },
  roles.teacher
);

export default TeacherQuestions;
