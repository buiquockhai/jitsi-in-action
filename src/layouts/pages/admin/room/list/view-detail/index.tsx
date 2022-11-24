import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { Modal, Tabs } from 'antd';
import { FC } from 'react';
import RoomCommonInformation from './common-information';
import ViewExamDetail from './view-exam-detail';
import ViewSubmission from './view-submittion';

type Props = {
  open: boolean;
  onClose: () => void;
  examId: string;
  groupId: string;
  roomId: string;
};

const ViewDetailModal: FC<Props> = ({ open, examId, roomId, groupId, onClose }) => {
  const roomDetail = useFetchRoomDetail(roomId);

  return (
    <Modal
      width="95vw"
      footer={null}
      title={roomDetail?.title}
      onCancel={onClose}
      open={open}
    >
      <Tabs
        type="card"
        items={[
          {
            label: 'Thông tin chung',
            key: 'common-information',
            children: <RoomCommonInformation roomId={roomId} />,
          },
          {
            label: 'Bài thi',
            key: 'exams-detail',
            children: <ViewExamDetail examId={examId} />,
          },
          {
            label: 'Bài nộp',
            key: 'submit-detail',
            disabled: roomDetail?.status !== '2',
            children: (
              <ViewSubmission roomId={roomId} groupId={groupId} examId={examId} />
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default ViewDetailModal;
