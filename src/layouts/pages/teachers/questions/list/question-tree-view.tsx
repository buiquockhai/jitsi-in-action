import { Button, Tree } from 'antd';
import { TreeProps } from 'antd/lib/tree';
import { useState } from 'react';
import { useQuestionListContext } from './context';
import MoveQuestion from './move-question';

export function QuestionsTree() {
  const { treeNode } = useQuestionListContext();

  const [selected, setSelected] = useState<string[]>([]);
  const [openChoose, setOpenChoose] = useState(false);

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setSelected(checkedKeys as string[]);
  };

  const handleClose = (clearable?: boolean) => {
    setOpenChoose(false);
    if (clearable) {
      setSelected([]);
    }
  };

  return (
    <div className="min-w-xs max-w-sm bg-white p-5 rounded-sm h-fit flex flex-col gap-5">
      <MoveQuestion questionIds={selected} open={openChoose} onClose={handleClose} />
      <Tree checkable checkedKeys={selected} treeData={treeNode} onCheck={onCheck} />
      <Button type="dashed" block onClick={() => setOpenChoose(true)}>
        Di chuyển
      </Button>
    </div>
  );
}
