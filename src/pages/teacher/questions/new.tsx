import CreationQuestionConfiguration from '@layout/pages/teachers/questions/new/config';
import PageHeaderQuestionCreation from '@layout/pages/teachers/questions/new/page-header';
import { Form } from 'antd';
import QuestionPreview from '@layout/pages/teachers/questions/new/preview';
import withAuth from '@hoc/withAuth';
import { RoleEnum, QuestionTypes, LevelTypes, ALPHABET } from '@util/constant';
import { useNewQuestion } from '@hook/question/useNewQuestion';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GET_QUESTION } from '@hook/question/keys';
import { useFetchQuestionDetail } from '@hook/question/useFetchQuestionDetail';
import { useUpdateQuestion } from '@hook/question/useUpdateQuestion';
import { NewQuestionRequest } from '@service/question/types';

type FormProps = {
  type: QuestionTypes;
  title: string;
  range: LevelTypes;
  point: number;
  folderId: string;
  questionContent: string;
  singleCorrect: string;
  multipleCorrect: string[];
  questionImages: string[];
  answers: Array<{
    id: string;
    label: string;
    content: string;
  }>;
};

const initialValues: FormProps = {
  type: 'single',
  title: '',
  range: 0,
  point: 0.25,
  folderId: '',
  questionContent: '',
  questionImages: [],
  answers: [],
  singleCorrect: '',
  multipleCorrect: [],
};

const TeacherQuestions = () => {
  const { query } = useRouter();
  const isEdit = useRef(false);

  const [form] = Form.useForm<FormProps>();

  const questionDetail = useFetchQuestionDetail(query?.id as string);

  const newQuestionMutation = useNewQuestion([GET_QUESTION]);
  const updateQuestionMutation = useUpdateQuestion([GET_QUESTION]);

  const handleCalculatePercent = (id: string, values: FormProps) => {
    if (values.type === 'single') {
      return id === values.singleCorrect ? 100 : 0;
    }
    return values.multipleCorrect.includes(id)
      ? Math.round(100 / values.multipleCorrect.length)
      : 0;
  };

  const handleSubmit = async (values: FormProps) => {
    const object: NewQuestionRequest = {
      type: values.type,
      level: values.range,
      point: values.point,
      title: values.title,
      folder_id: values.folderId,
      content: values.questionContent,
      images:
        values.questionImages?.length > 0
          ? JSON.stringify(values.questionImages)
          : undefined,
      answer: values.answers.map((item) => ({
        content: item.content,
        percent: handleCalculatePercent(item.id, values),
      })),
    };

    if (!isEdit.current) {
      await newQuestionMutation.mutate(object);
      form.setFieldsValue(initialValues);
    } else {
      await updateQuestionMutation.mutate({
        id: questionDetail?.id ?? '',
        ...object,
      });
    }
  };

  useEffect(() => {
    if (query?.id && questionDetail) {
      isEdit.current = true;

      form.setFieldsValue({
        type: questionDetail.type,
        title: questionDetail.title,
        range: questionDetail.level,
        point: questionDetail.point,
        folderId: questionDetail.folder_id,
        questionContent: questionDetail.content,
        questionImages:
          (questionDetail.images ?? [])?.length > 0
            ? JSON.parse(questionDetail?.images ?? '')
            : [],
        answers: questionDetail.tb_answers.map((item, index) => ({
          id: item.id,
          content: item.content,
          label: ALPHABET[index % 26],
        })),
        singleCorrect:
          questionDetail.type === 'single'
            ? questionDetail.tb_answers.find((item) => parseInt(item.percent) > 0)
                ?.id
            : '',
        multipleCorrect:
          questionDetail.type === 'multiple'
            ? questionDetail.tb_answers.flatMap((item) =>
                parseInt(item.percent) > 0 ? item.id : []
              )
            : [],
      });
    } else {
      isEdit.current = false;
    }
  }, [query, questionDetail, form]);

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

export const getServerSideProps = withAuth(
  async () => ({
    props: {},
  }),
  RoleEnum.teacher
);

export default TeacherQuestions;
