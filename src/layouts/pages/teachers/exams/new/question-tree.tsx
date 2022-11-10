import { flattenAnswer, getAnswersFromKeys } from '@util/functions';
import { Form, Input, Tree, TreeProps } from 'antd';
import React from 'react';

const QuestionTree: React.FC<any> = ({ form, treeData }) => {
  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    const flattenAnswers = flattenAnswer(treeData);
    const checkedMappingNode = getAnswersFromKeys(checkedKeys, flattenAnswers);
    form.setFieldValue(['questions'], checkedMappingNode);
  };

  return (
    <div className="w-full flex flex-col gap-3 bg-white p-3 rounded-sm h-fit">
      <Input.Search allowClear placeholder="Tìm kiếm câu hỏi" />
      <Form.Item name="questions">
        <Tree checkable onCheck={onCheck} treeData={treeData} />
      </Form.Item>
    </div>
  );
};

export default QuestionTree;
