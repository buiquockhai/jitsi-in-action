import { FC, useEffect, useState } from 'react';
import { Input, Modal, message } from 'antd';
import { useNewFolder } from '@hook/question/useNewFolder';
import { GET_FOLDER, GET_QUESTION } from '@hook/question/keys';

type NewFolderProps = {
  open: boolean;
  onClose: () => void;
};

const NewFolderModal: FC<NewFolderProps> = ({ open, onClose }) => {
  const [internalText, setInternalText] = useState('');

  const newFolderMutation = useNewFolder([GET_FOLDER, GET_QUESTION]);

  const handleSave = async () => {
    if (internalText.trim().length <= 0) {
      return message.warn('Vui lòng nhập tên folder');
    }
    await newFolderMutation.mutate({
      name: internalText,
    });

    onClose();
  };

  useEffect(() => {
    if (open) {
      setInternalText('');
    }
  }, [open]);

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

export default NewFolderModal;
