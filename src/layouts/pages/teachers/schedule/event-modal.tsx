import { SocketEmitter, useSocketContext } from '@context/socket';
import { RoomResponse } from '@service/room/types';
import { roomService } from '@service/router';
import { ROUTES } from '@util/routes';
import { Button, List, Modal } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  data: RoomResponse[];
  open: boolean;
  onClose: () => void;
};

const EventModal: FC<Props> = ({ data, open, onClose }) => {
  const { socket } = useSocketContext();
  const { push } = useRouter();

  const handleJoin = async (id: string) => {
    const res = await roomService.joinRoomTeacher(id);
    if (res.data?.id) {
      socket.emit(SocketEmitter.clientSendCreateRoom, res.data?.id);
      push(ROUTES.TEACHER_START(res.data?.id));
      onClose();
    }
  };

  return (
    <Modal
      width="50vw"
      title={`Lịch thi ngày ${moment(data?.[0]?.start_date).format('DD/MM/YYYY')}`}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={item.id}
                type="primary"
                onClick={() => handleJoin(item.id)}
              >
                Tham gia
              </Button>,
            ]}
          >
            {moment(item?.start_date).format('HH:mm DD/MM/YYYY')} - {item?.title}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default EventModal;
