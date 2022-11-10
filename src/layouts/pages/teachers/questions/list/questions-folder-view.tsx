import { DataNode } from 'antd/lib/tree';
import { useMemo } from 'react';
import { isArray } from 'lodash';
import { Button, Popconfirm, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EnterOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useQuestionListContext } from './context';

export function QuestionsFolderView() {
  const { treeNode, path, setPath } = useQuestionListContext();

  const getTreeView = (
    treeNode: DataNode[],
    path: Array<{
      key: string;
      title: string;
    }>
  ) => {
    if (isArray(path) && path?.length <= 0) return treeNode;
    const childNode: any = treeNode?.find((node) => node?.key == path[0]?.key);
    return getTreeView(childNode?.children, path.slice(1));
  };

  const currentTree: DataNode[] = useMemo(() => {
    return getTreeView(treeNode, path);
  }, [path, getTreeView]);

  const handleEnterNode = (node: DataNode) => {
    if (!node?.isLeaf && isArray(node?.children)) {
      const updatePath = [
        ...path,
        {
          key: node.key as string,
          title: node.title as string,
        },
      ];
      setPath(updatePath);
    }
  };

  return (
    <div className="w-full col-span-4 bg-white p-5 rounded-sm h-fit flex flex-col">
      {currentTree?.map((node) => {
        return (
          <div
            key={node?.key}
            className="w-full flex flex-row gap-3 items-center justify-between first:border-t border-b hover:bg-blue-50 p-1 cursor-pointer"
            onDoubleClick={() => handleEnterNode(node)}
          >
            <div className="flex flex-row gap-3 items-center">
              <img
                src={
                  node?.isLeaf ? '/assets/__file_ic.svg' : '/assets/__folder_ic.svg'
                }
                className="h-8"
              />
              <p className="text-xs font-semibold">{node?.title as string}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Tooltip title="Chỉnh sửa">
                <Button
                  icon={<EditOutlined />}
                  type="dashed"
                  shape="circle"
                  size="small"
                />
              </Tooltip>
              <Tooltip title="Di chuyển">
                <Button
                  icon={<EnterOutlined />}
                  type="dashed"
                  shape="circle"
                  size="small"
                />
              </Tooltip>
              <Popconfirm
                title="Bạn có chắc chắn？"
                icon={<QuestionCircleOutlined />}
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="dashed"
                  shape="circle"
                  size="small"
                  danger
                />
              </Popconfirm>
            </div>
          </div>
        );
      })}
    </div>
  );
}
