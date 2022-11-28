import { GET_RESULTS } from '@hook/result/useFetchResult';
import { GET_ROOM_DETAIL } from '@hook/room/useFetchRoomDetail';
import { useForceLeaveRoom } from '@hook/room/useForceLeaveRoom';
import { GET_USER_IN_ROOM } from '@hook/user-room/useFetchUserRoom';
import { Input, message, Modal } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  studentId: string;
};

const GetOutDescription: FC<Props> = ({ open, studentId, onClose }) => {
  const { query } = useRouter();

  const forceLeaveMutation = useForceLeaveRoom([
    GET_ROOM_DETAIL,
    GET_USER_IN_ROOM,
    GET_RESULTS,
  ]);

  const [description, setDescription] = useState('');

  const handleForceLeave = async () => {
    if (description.trim().length <= 0) {
      return message.error('Vui lòng mô tả lí do.');
    }

    await forceLeaveMutation.mutate({
      room_id: query.id as string,
      student_id: studentId,
      description: description,
    });

    onClose();
  };

  useEffect(() => {
    setDescription('');
  }, [open]);

  return (
    <Modal title="Lí do" open={open} onOk={handleForceLeave} onCancel={onClose}>
      <p className="!mb-5">
        Bạn có chắc chắn bắt buộc thí sinh nộp bài. Thí sẽ đồng thời sẽ bị đuổi ra
        khỏi phòng thi.
      </p>
      <Input.TextArea
        allowClear
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Modal>
  );
};

export default GetOutDescription;
