import { useSocketContext } from '@context/socket';
import { useSystemContext } from '@context/system';
import { RoomResponse } from '@service/room/types';
import { roomService } from '@service/router';
import { Button, List, Modal } from 'antd';
import moment from 'moment';
import { FC, Fragment, useState } from 'react';
import RequestModal from './request-modal';

type Props = {
  data: RoomResponse[];
  open: boolean;
  onClose: () => void;
};

const EventModal: FC<Props> = ({ data, open, onClose }) => {
  const { userId } = useSystemContext();
  const { setOpenWaiting } = useSocketContext();

  const [controlRoomId, setControlRoomId] = useState('');

  const handleJoin = async (roomId: string, groupId: string) => {
    if (roomId && groupId) {
      const res = await roomService.joinRoomStudent({
        room_id: roomId,
        group_id: groupId,
      });
      if (res.data?.id) {
        onClose();
        setControlRoomId(roomId);
        setOpenWaiting(true);
      }
    }
  };

  return (
    <Fragment>
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
      <RequestModal roomId={controlRoomId} />
    </Fragment>
  );
};

export default EventModal;
