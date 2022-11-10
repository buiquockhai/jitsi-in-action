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
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { usePreview } from '@hook/system/usePreview';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ANPHABET, QUESTION_RANGE, QUESTION_TYPE } from '@util/constant';
import { isArray, isNil } from 'lodash';
import { v4  } from 'uuid';

const CreationQuestionConfiguration: React.FC<any> = ({ form }) => {
  const [onPreview] = usePreview();

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
      <Form.Item
        name="type"
        label="Loại câu hỏi"
        rules={[{ required: true, message: 'Vui lòng chọn loại câu hỏi' }]}
      >
        <Radio.Group>
          {Object.entries(QUESTION_TYPE)?.map(([key, value]) => (
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
        <Slider step={25} marks={QUESTION_RANGE} />
      </Form.Item>

      <Form.Item
        name="singleCorrect"
        label="Đáp án"
        rules={[{ required: type == '__1__', message: 'Vui lòng chọn đáp án' }]}
        hidden={type != '__1__'}
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
        rules={[{ required: type == '__2__', message: 'Vui lòng chọn đáp án' }]}
        hidden={type != '__2__'}
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

      <Form.Item label="Đáp án" hidden={!['__1__', '__2__'].includes(type)}>
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
