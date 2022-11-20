import { useQuestionListContext } from './context';
import { QuestionsTree } from './question-tree-view';
import { QuestionsFolderView } from './questions-folder-view';
import { QuestionListPath } from './questions-path-view';
import { useEffect } from 'react';
import { useFetchTree } from '@hook/question/useFetchTree';
import { GetTreeResponse } from '@service/question/types';

export const rawToDataNode = (raw?: GetTreeResponse) => {
  const markupParent =
    raw?.parents?.map(({ name, id, tb_questions }) => ({
      key: id,
      title: name,
      children: tb_questions.map(({ id, title }) => ({
        key: id,
        title: title,
        isLeaf: true,
      })),
    })) ?? [];

  const markupLeaf =
    raw?.aloneLeafs?.map(({ id, title }) => ({
      key: id,
      title: title,
      isLeaf: true,
    })) ?? [];

  return [...markupParent, ...markupLeaf];
};

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
