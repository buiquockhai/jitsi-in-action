import { useQuestionListContext } from './context';
import { QuestionsTree } from './question-tree-view';
import { QuestionsFolderView } from './questions-folder-view';
import { QuestionListPath } from './questions-path-view';
import { useEffect } from 'react';
import { useFetchTree } from '@hook/question/useFetchTree';
import { rawToDataNode } from '@util/functions';

export function QuestionView() {
  const { setTreeNode } = useQuestionListContext();

  const tree = useFetchTree();

  useEffect(() => {
    if (tree) {
      setTreeNode(rawToDataNode(tree));
    }
  }, [tree]);

  return (
    <div className="w-full flex flex-col gap-3 p-5">
      <QuestionListPath />
      <div className="w-full grid grid-cols-5 gap-5">
        <QuestionsFolderView />
        <QuestionsTree />
      </div>
    </div>
  );
}
