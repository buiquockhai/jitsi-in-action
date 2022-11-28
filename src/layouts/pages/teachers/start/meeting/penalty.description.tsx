import { GET_VIOLATING_RULES } from '@hook/violating-rule/useFetchViolatingRules';
import { useNewViolatingRule } from '@hook/violating-rule/useNewViolatingRule';
import { Input, message, Modal } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  studentId: string;
};

const PenaltyDescription: FC<Props> = ({ open, studentId, onClose }) => {
  const { query } = useRouter();

  const newViolatingRuleMutation = useNewViolatingRule([GET_VIOLATING_RULES]);

  const [description, setDescription] = useState('');

  const handlePenalty = async () => {
    if (description.trim().length <= 0) {
      return message.error('Vui lòng mô tả lí do.');
    }

    await newViolatingRuleMutation.mutate({
      room_id: query.id as string,
      user_id: studentId,
      minus_point: '0.5',
      description: description,
    });

    onClose();
  };

  useEffect(() => {
    setDescription('');
  }, [open]);

  return (
    <Modal title="Lí do" open={open} onOk={handlePenalty} onCancel={onClose}>
      <p className="!mb-5">
        Bạn có chắc chắn muốn trừ điểm cảnh cáo vi phạm. Mỗi lần cảnh cáo thí sinh sẽ
        bị trừ 0.5 điểm vào kết quả thi.
      </p>
      <Input.TextArea
        allowClear
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Modal>
  );
};

export default PenaltyDescription;
