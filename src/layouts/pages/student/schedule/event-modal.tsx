import moment from 'moment';
import { useSocketContext } from '@context/socket';
import { roomService } from '@service/router';
import { GetUserRoomResponse } from '@service/user-room/types';
import { Button, List, Modal } from 'antd';
import { FC, Fragment, useState } from 'react';
import RequestModal from './request-modal';

type Props = {
  data: GetUserRoomResponse[];
  open: boolean;
  onClose: () => void;
};

const EventModal: FC<Props> = ({ data, open, onClose }) => {
  const { setOpenWaiting } = useSocketContext();

  const [controlRoomId, setControlRoomId] = useState('');

  const handleJoin = async (roomId: string) => {
    if (roomId) {
      const res = await roomService.joinRoomStudent({
        room_id: roomId,
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
        title={`Lịch thi ngày ${moment(data?.[0]?.tb_room?.start_date).format(
          'DD/MM/YYYY'
        )}`}
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
                  onClick={() => handleJoin(item?.room_id)}
                >
                  Tham gia
                </Button>,
              ]}
            >
              {moment(item?.tb_room?.start_date).format('HH:mm DD/MM/YYYY')} -{' '}
              {item?.tb_room?.title}
            </List.Item>
          )}
        />
      </Modal>
      <RequestModal roomId={controlRoomId} />
    </Fragment>
  );
};

export default EventModal;
