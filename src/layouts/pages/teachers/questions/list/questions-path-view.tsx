import { Breadcrumb, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuestionListContext } from './context';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import NewFolderModal from './folder/new-folder-modal';
import UpdateFolderModal from './folder/update-fodler-modal';

export function QuestionListPath() {
  const { push } = useRouter();
  const {
    path,
    setPath,
    newFolderOpen,
    setNewFodlerOpen,
    updateFolderData,
    setUpdateFolderData,
  } = useQuestionListContext();

  return (
    <div className="w-full flex flex-row gap-5 justify-between items-baseline">
      <NewFolderModal open={newFolderOpen} onClose={() => setNewFodlerOpen(false)} />
      <UpdateFolderModal
        open={updateFolderData.open}
        data={updateFolderData.data}
        id={updateFolderData.id}
        onClose={() => setUpdateFolderData({ open: false, data: '', id: '' })}
      />
      <Breadcrumb>
        <Breadcrumb.Item>
          <button onClick={setPath.bind(null, [])}>Danh sách câu hỏi</button>
        </Breadcrumb.Item>
        {path?.map((item) => (
          <Breadcrumb.Item key={item?.key}>{item?.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <div className="flex flex-row gap-2">
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => push(ROUTES.TEACHER_NEW_QUESTION)}
        >
          Câu hỏi
        </Button>
        <Button icon={<PlusOutlined />} onClick={() => setNewFodlerOpen(true)}>
          Thư mục
        </Button>
      </div>
    </div>
  );
}
