import { SocketEmitter, useSocketContext } from '@context/socket';
import { useSystemContext } from '@context/system';
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
  const { userId } = useSystemContext();
  const { socket } = useSocketContext();

  const handleJoin = async (id: string, groupId: string) => {
    if (id && groupId) {
      const res = await roomService.joinRoomStudent({ id: id, group_id: groupId });
      if (res.data?.id) {
        socket.emit(SocketEmitter.clientSendJoinRoom, {
          roomId: res.data?.id,
          studentId: userId,
        });
        onClose();
      }
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
                onClick={() => handleJoin(item.id, item.group_id)}
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
