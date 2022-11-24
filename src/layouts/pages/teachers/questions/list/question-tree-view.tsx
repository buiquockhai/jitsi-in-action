import { Button, Tree } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { TreeProps } from 'antd/lib/tree';
import { useState } from 'react';
import { useQuestionListContext } from './context';

export function QuestionsTree() {
  const { treeNode } = useQuestionListContext();

  const [selected, setSelected] = useState<Key[]>([]);

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setSelected(checkedKeys as Key[]);
  };

  return (
    <div className="min-w-xs max-w-sm bg-white p-5 rounded-sm h-fit flex flex-col gap-5">
      <Tree checkable checkedKeys={selected} treeData={treeNode} onCheck={onCheck} />
      <Button type="dashed" block>
        Di chuyển
      </Button>
    </div>
  );
}
