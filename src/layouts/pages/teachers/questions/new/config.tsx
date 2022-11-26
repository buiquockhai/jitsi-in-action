import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  FormInstance,
} from 'antd';
import { Fragment, useEffect, FC, createRef, ChangeEvent } from 'react';
import {
  CloseCircleTwoTone,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ALPHABET, LevelEnum, QuestionTypeEnum } from '@util/constant';
import { isArray, isNil } from 'lodash';
import { v4 } from 'uuid';
import { useSystemContext } from '@context/system';
import { useFetchFolder } from '@hook/question/useFetchFolder';
import { upload } from '@util/upload';

type FormProps = {
  form: FormInstance;
};

const CreationQuestionConfiguration: FC<FormProps> = ({ form }) => {
  const ref = createRef<HTMLInputElement>();
  const { userId } = useSystemContext();

  const folderList = useFetchFolder({ created_id: userId });

  const answers = Form.useWatch('answers', form);
  const type = Form.useWatch('type', form);
  const images = Form.useWatch('questionImages', form);

  useEffect(() => {
    if (isArray(answers)) {
      const formatAnswers = answers?.map((item, index) =>
        isNil(item) ? { content: '', id: v4(), label: ALPHABET[index] } : item
      );
      form.setFieldValue('answers', formatAnswers);
    }
  }, [answers, form]);

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const url = await upload(event.target.files?.[0], 'questions/');
      form.setFieldsValue({
        questionImages: [...(images ?? []), url],
      });
    }
  };

  return (
    <div className="w-full rounded-sm bg-white p-5">
      <input
        type="file"
        ref={ref}
        hidden
        accept="image/*"
        onChange={handleChangeFile}
      />
      <Form.Item
        name="folderId"
        label="Thư mục"
        rules={[{ required: true, message: 'Vui lòng chọn thư mục' }]}
      >
        <Select placeholder="Chọn thư mục" allowClear>
          {folderList?.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="type"
        label="Loại câu hỏi"
        rules={[{ required: true, message: 'Vui lòng chọn loại câu hỏi' }]}
      >
        <Radio.Group>
          {Object.entries(QuestionTypeEnum)?.map(([key, value]) => (
            <Radio.Button key={key} value={key}>
              {value}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Điểm">
        <Form.Item name="point" noStyle>
          <InputNumber min={0} max={10} />
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="range"
        label="Mức độ khó"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
      >
        <Slider max={4} step={1} marks={LevelEnum} />
      </Form.Item>

      <Form.Item
        name="singleCorrect"
        label="Đáp án"
        rules={[{ required: type == 'single', message: 'Vui lòng chọn đáp án' }]}
        hidden={type != 'single'}
      >
        <Select placeholder="Chọn đáp án đúng" allowClear>
          {answers?.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="multipleCorrect"
        label="Đáp án"
        rules={[{ required: type == 'multiple', message: 'Vui lòng chọn đáp án' }]}
        hidden={type != 'multiple'}
      >
        <Select placeholder="Chọn đáp án đúng" mode="multiple" allowClear>
          {answers?.map((item) => (
            <Select.Option key={item?.id} value={item?.id}>
              {item?.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>

      <Form.Item
        name="questionContent"
        label="Nội dung câu hỏi"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <Form.List name="questionImages">
          {(fields, { remove }) => {
            return (
              <div className="flex gap-2 flex-wrap">
                {fields.map((filed, index) => {
                  return (
                    <div {...filed} className="relative">
                      <img
                        className="rounded-sm w-[100px] h-[100px] object-cover"
                        src={images[index]}
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2"
                        onClick={() => remove(index)}
                      >
                        <CloseCircleTwoTone />
                      </button>
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="w-[100px] h-[100px] bg-slate-100 rounded-sm hover:opacity-75"
                  onClick={() => ref.current?.click()}
                >
                  <PlusOutlined />
                </button>
              </div>
            );
          }}
        </Form.List>
      </Form.Item>

      <Form.Item label="Đáp án">
        <Form.List name="answers">
          {(fields, { add, remove }) => {
            const handleRemove = (name) => {
              remove(name);
              form.setFieldValue('singleCorrect', '');
              form.setFieldValue('multipleCorrect', []);
            };

            return (
              <Fragment>
                {fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <div key={key} className="w-full flex gap-3 items-baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'content']}
                        rules={[{ required: true, message: 'Vui lòng điền đáp án' }]}
                      >
                        <Input addonBefore={ALPHABET[index % 26]} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => handleRemove(name)} />
                    </div>
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm đáp án
                  </Button>
                </Form.Item>
              </Fragment>
            );
          }}
        </Form.List>
      </Form.Item>
    </div>
  );
};

export default CreationQuestionConfiguration;
