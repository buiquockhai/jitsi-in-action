import { createContext } from '@util/createContext';
import { DataNode } from 'antd/lib/tree';
import { useState, Dispatch, SetStateAction } from 'react';

type PathNodeProps = {
  key: string;
  title: string;
};

type UpdateFolderData = {
  open: boolean;
  data: string;
  id: string;
};

export interface QuestionListContextProps {
  path: PathNodeProps[];
  setPath: (path: PathNodeProps[]) => void;
  treeNode: DataNode[];
  setTreeNode: (treeNode: DataNode[]) => void;
  newFolderOpen: boolean;
  setNewFodlerOpen: Dispatch<SetStateAction<boolean>>;
  updateFolderData: UpdateFolderData;
  setUpdateFolderData: Dispatch<SetStateAction<UpdateFolderData>>;
}

const [Provider, useQuestionListContext] = createContext<QuestionListContextProps>({
  name: 'question-list',
});

export default function QuestionListContextProvider({ children }) {
  const [path, setPath] = useState<PathNodeProps[]>([]);
  const [treeNode, setTreeNode] = useState<DataNode[]>([]);
  const [newFolderOpen, setNewFodlerOpen] = useState(false);
  const [updateFolderData, setUpdateFolderData] = useState<UpdateFolderData>({
    open: false,
    data: '',
    id: '',
  });

  return (
    <Provider
      value={{
        path,
        setPath,
        treeNode,
        setTreeNode,
        newFolderOpen,
        setNewFodlerOpen,
        updateFolderData,
        setUpdateFolderData,
      }}
    >
      {children}
    </Provider>
  );
}

export { useQuestionListContext };
