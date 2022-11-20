import { useFetchTree } from '@hook/question/useFetchTree';
import { rawToDataNode } from '@util/functions';
import { Form, Input, Tree, TreeProps } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React from 'react';

type Props = {
  form: FormInstance;
};

const QuestionTree: React.FC<Props> = ({ form }) => {
  const tree = useFetchTree();

  const questions = Form.useWatch('questions', form);

  const treeData = rawToDataNode(tree);

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    form.setFieldValue(['questions'], checkedKeys);
  };

  return (
    <div className="w-full flex flex-col gap-3 bg-white p-3 rounded-sm h-fit">
      <Input.Search allowClear placeholder="Tìm kiếm câu hỏi" />
      <Form.Item name="questions">
        <Tree
          checkable
          checkedKeys={questions}
          onCheck={onCheck}
          treeData={treeData}
        />
      </Form.Item>
    </div>
  );
};

export default QuestionTree;
