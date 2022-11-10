import { DataNode } from 'antd/lib/tree';
import { useQuestionListContext } from './context';
import { QuestionsTree } from './question-tree-view';
import { QuestionsFolderView } from './questions-folder-view';
import { QuestionListPath } from './questions-path-view';
import { useEffect } from 'react';
import { useFetchQuestion } from '@hook/question/useFetchQuestion';
import { useFetchFolder } from '@hook/question/useFetchFolder';

const treeData: DataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
  { title: 'parent 2', key: '0-2', isLeaf: true },
  { title: 'parent 3', key: '0-3', isLeaf: true },
];

export function QuestionView() {
  const { setTreeNode } = useQuestionListContext();
  const { data: questions } = useFetchQuestion();
  const { data: folders } = useFetchFolder();

  useEffect(() => {
    setTreeNode(treeData);
  }, [setTreeNode]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

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
