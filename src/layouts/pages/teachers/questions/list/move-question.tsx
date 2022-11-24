import { useSystemContext } from '@context/system';
import { GET_QUESTION, GET_QUESTION_DETAIL } from '@hook/question/keys';
import { useFetchFolder } from '@hook/question/useFetchFolder';
import { useUpdateQuestion } from '@hook/question/useUpdateQuestion';
import { message, Modal, Radio, Space } from 'antd';
import { FC, useEffect, useState } from 'react';

type Props = {
  open: boolean;
  questionIds: string[];
  onClose: (clearable?: boolean) => void;
};

const MoveQuestion: FC<Props> = ({ open, questionIds, onClose }) => {
  const { userId } = useSystemContext();

  const folderList = useFetchFolder({ created_id: userId });
  const updateQuestionMutation = useUpdateQuestion([
    GET_QUESTION,
    GET_QUESTION_DETAIL,
  ]);

  const [selected, setSelected] = useState('');

  const handleMove = () => {
    if (selected.length > 0) {
      updateQuestionMutation.mutate({
        id: questionIds,
        folder_id: selected,
      });
      onClose(true);
    } else {
      message.warning('Vui lòng chọn thư mục');
    }
  };

  useEffect(() => {
    if (open) {
      setSelected('none');
    }
  }, [open]);

  return (
    <Modal
      title="Chọn thư mục"
      onCancel={() => onClose()}
      onOk={handleMove}
      open={open}
    >
      <Radio.Group value={selected} onChange={(e) => setSelected(e.target.value)}>
        <Space direction="vertical">
          {folderList?.map((item) => (
            <Radio key={item.id} value={item.id}>
              {item.name}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Modal>
  );
};

export default MoveQuestion;
