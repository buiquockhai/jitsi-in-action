import withAuth from '@hoc/withAuth';
import { GET_EXAM_DETAIL } from '@hook/exam/useFetchExamDetail';
import { GET_EXAMS } from '@hook/exam/useFetchExams';
import { useNewExam } from '@hook/exam/useNewExam';
import { useUpdateExam } from '@hook/exam/useUpdateExam';
import PageHeaderExamsCreation from '@layout/pages/teachers/exams/new/page-header';
import QuestionDefine from '@layout/pages/teachers/exams/new/question-define';
import QuestionTree from '@layout/pages/teachers/exams/new/question-tree';
import { ExamLevelRangeTypes, RoleEnum } from '@util/constant';
import { Form } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

type FormProps = {
  title: string;
  range: ExamLevelRangeTypes;
  maxPoint: number;
  workingTime: number;
  status: string;
  submitted: string;
  questions: string[];
};

const initialValues: FormProps = {
  title: '',
  range: 0,
  maxPoint: 0,
  workingTime: 0,
  status: '',
  submitted: '',
  questions: [],
};

const TeacherExams: NextPage = () => {
  const { query } = useRouter();

  const [form] = Form.useForm<FormProps>();

  const newExamMutation = useNewExam([GET_EXAMS, GET_EXAM_DETAIL]);
  const updateExamMutation = useUpdateExam([GET_EXAMS, GET_EXAM_DETAIL]);

  const handleSubmit = async (values: FormProps) => {
    const object = {
      max_point: values.maxPoint,
      duration: values.workingTime,
      level: values.range,
      status: values.status,
      submitted: values.submitted,
      title: values.title,
      questions: values.questions,
    };

    if ((query.id ?? '').length > 0) {
      await updateExamMutation.mutate({
        id: query.id as string,
        ...object,
      });
    } else {
      await newExamMutation.mutate({ ...object, status: 'N', submitted: 'N' });
      form.setFieldsValue(initialValues);
    }
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
          <QuestionTree form={form} />
          <QuestionDefine form={form} />
        </div>
      </div>
    </Form>
  );
};

export const getServerSideProps = withAuth(
  () => ({
    props: {},
  }),
  RoleEnum.teacher
);

export default TeacherExams;
