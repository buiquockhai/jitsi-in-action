import { createContext } from '@util/createContext';
import { DataNode } from 'antd/lib/tree';
import { useState } from 'react';

interface PathNodeProps {
  key: string;
  title: string;
}

export interface QuestionListContextProps {
  path: PathNodeProps[];
  setPath: (path: PathNodeProps[]) => void;
  treeNode: DataNode[];
  setTreeNode: (treeNode: DataNode[]) => void;
}

const [Provider, useQuestionListContext] = createContext<QuestionListContextProps>({
  name: 'question-list',
});

export default function QuestionListContextProvider({ children }) {
  const [path, setPath] = useState<PathNodeProps[]>([]);
  const [treeNode, setTreeNode] = useState<DataNode[]>([]);

  return (
    <Provider value={{ path, setPath, treeNode, setTreeNode }}>{children}</Provider>
  );
}

export { useQuestionListContext };
