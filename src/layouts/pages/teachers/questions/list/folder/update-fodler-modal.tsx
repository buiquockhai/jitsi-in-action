import { FC, useEffect, useState } from 'react';
import { Input, Modal, message } from 'antd';
import { useUpdateFolder } from '@hook/question/useUpdateFolder';
import { GET_FOLDER, GET_QUESTION } from '@hook/question/keys';

type UpdateFolderProps = {
  open: boolean;
  data: string;
  id: string;
  onClose: () => void;
};

const UpdateFolderModal: FC<UpdateFolderProps> = ({ open, id, data, onClose }) => {
  const [internalText, setInternalText] = useState('');

  const updateFolderMutation = useUpdateFolder([GET_FOLDER, GET_QUESTION]);

  const handleSave = async () => {
    if (internalText.trim().length <= 0) {
      return message.warn('Vui lòng nhập tên folder');
    }
    await updateFolderMutation.mutate({
      id: id,
      name: internalText,
    });

    onClose();
  };

  useEffect(() => {
    if (open && data.length > 0) {
      setInternalText(data);
    } else {
      setInternalText('');
    }
  }, [open, data]);

  return (
    <Modal title="Tạo mới folder" open={open} onOk={handleSave} onCancel={onClose}>
      <Input
        allowClear
        placeholder="Nhãn"
        value={internalText}
        onChange={(event) => setInternalText(event.target.value)}
      />
    </Modal>
  );
};

export default UpdateFolderModal;
