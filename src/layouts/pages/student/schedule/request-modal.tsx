import { useSocketContext } from '@context/socket';
import { useSystemContext } from '@context/system';
import { GET_ROOM_DETAIL } from '@hook/room/useFetchRoomDetail';
import { useStudentCancelJoinRoom } from '@hook/room/useStudentCancelJoinRoom ';
import { Modal, Spin } from 'antd';
import { FC } from 'react';

type Props = {
  roomId: string;
};

const RequestModal: FC<Props> = ({ roomId }) => {
  const { openWaiting, setOpenWaiting } = useSocketContext();
  const { userId } = useSystemContext();

  const cancelMutation = useStudentCancelJoinRoom([GET_ROOM_DETAIL]);

  const handleCancel = async () => {
    await cancelMutation.mutate({
      student_id: userId,
      room_id: roomId,
    });
    setOpenWaiting(false);
  };

  return (
    <Modal
      okText="Huỷ"
      centered={true}
      closable={false}
      open={openWaiting}
      onOk={handleCancel}
      cancelButtonProps={{
        style: {
          display: 'none',
        },
      }}
    >
      <div className="flex items-center justify-center">
        <Spin tip="Vui lòng đợi quản trị viên chấp nhận..." />
      </div>
    </Modal>
  );
};

export default RequestModal;
