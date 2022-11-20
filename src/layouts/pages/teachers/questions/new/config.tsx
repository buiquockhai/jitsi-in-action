import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Upload,
  UploadFile,
  UploadProps,
  FormInstance,
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { usePreview } from '@hook/system/usePreview';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ANPHABET, LevelEnum, QuestionTypeEnum } from '@util/constant';
import { isArray, isNil } from 'lodash';
import { v4 } from 'uuid';
import { useSystemContext } from '@context/system';
import { useFetchFolder } from '@hook/question/useFetchFolder';

type FormProps = {
  form: FormInstance;
};

const CreationQuestionConfiguration: React.FC<FormProps> = ({ form }) => {
  const [onPreview] = usePreview();

  const { userId } = useSystemContext();

  const folderList = useFetchFolder({ created_id: userId });

  const answers = Form.useWatch('answers', form);
  const type = Form.useWatch('type', form);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (isArray(answers)) {
      const formatAnswers = answers?.map((item, index) =>
        isNil(item) ? { content: '', id: v4(), label: ANPHABET[index] } : item
      );
      form.setFieldValue('answers', formatAnswers);
    }
  }, [answers]);

  return (
    <div className="w-full rounded-sm bg-white p-5">
      <Form.Item name="folderId" label="Thư mục">
        <Select placeholder="Chọn thư mục" allowClear>
          {folderList?.map((item) => (
            <Select.Option value={item?.id}>{item.name}</Select.Option>
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
            <Radio.Button value={key}>{value}</Radio.Button>
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
            <Select.Option value={item?.id}>{item?.label}</Select.Option>
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
            <Select.Option value={item?.id}>{item?.label}</Select.Option>
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
        <ImgCrop rotate>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList?.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
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
                    <div className="w-full flex flex-row gap-3 items-baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'content']}
                        rules={[{ required: true, message: 'Vui lòng điền đáp án' }]}
                      >
                        <Input addonBefore={ANPHABET[index % 26]} />
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
