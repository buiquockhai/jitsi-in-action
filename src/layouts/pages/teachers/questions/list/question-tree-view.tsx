import { PlusOutlined } from '@ant-design/icons';
import { Button, Tree } from 'antd';
import { DirectoryTreeProps } from 'antd/lib/tree';
import { useQuestionListContext } from './context';

export function QuestionsTree() {
  const { treeNode } = useQuestionListContext();

  const onSelect: DirectoryTreeProps['onSelect'] = (keys) => {};

  return (
    <div className="min-w-xs max-w-sm bg-white p-5 rounded-sm h-fit flex flex-col gap-5">
      <Tree checkable treeData={treeNode} onSelect={onSelect} />
      <Button type="dashed" block icon={<PlusOutlined />}>
        Tạo đề thi
      </Button>
    </div>
  );
}
