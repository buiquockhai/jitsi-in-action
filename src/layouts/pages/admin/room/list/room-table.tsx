import {
  QuestionCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { GET_ROOM_DETAIL } from '@hook/room/useFetchRoomDetail';
import { GET_ROOMS, useFetchRooms } from '@hook/room/useFetchRooms';
import { useUpdateRoom } from '@hook/room/useUpdateRoom';
import { RoomStatusEnum } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { useRouter } from 'next/router';
import { Fragment, useMemo, useState } from 'react';
import moment from 'moment';
import ViewDetailModal from './view-detail';

type DetaiProps = {
  open: boolean;
  roomId: string;
  examId: string;
  groupId: string;
};

const initialValues: DetaiProps = {
  open: false,
  roomId: '',
  examId: '',
  groupId: '',
};

const RoomTable = ({}) => {
  const { push } = useRouter();

  const rooms = useFetchRooms({});
  const updateRoomMutation = useUpdateRoom([GET_ROOMS, GET_ROOM_DETAIL]);

  const [data, setData] = useState<DetaiProps>(initialValues);

  const handleRemove = (id: string) => {
    updateRoomMutation.mutate({
      id: id,
      deleted: 'Y',
    });
  };

  const columns = useMemo(
    () => [
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '10%',
        render: (status) => <Tag>{RoomStatusEnum[status]}</Tag>,
        sorter: (a, b) => a.status - b.status,
      },
      {
        title: 'Phòng thi',
        dataIndex: 'title',
        width: '15%',
      },
      {
        title: 'Tên đề thi',
        dataIndex: 'exam_title',
        width: '15%',
      },
      {
        title: 'Nhóm thi',
        dataIndex: 'group_title',
        width: '10%',
      },
      {
        title: 'Giám thị',
        dataIndex: 'proctor_name',
        width: '10%',
      },
      {
        title: 'Xáo trộn',
        dataIndex: 'shuffle',
        width: '10%',
        render: (shuffle) => <Tag>{shuffle ? 'Có' : 'Không'}</Tag>,
        sorter: (a, b) => a.shuffle - b.shuffle,
      },
      {
        title: 'Thời gian bắt đầu',
        dataIndex: 'start_date',
        width: '10%',
        sorter: (a, b) =>
          moment(a.start_date).toDate().getTime() -
          moment(b.start_date).toDate().getTime(),
        render: (start_date) => moment(start_date).format('HH:mm DD/MM/YYYY'),
      },
      {
        title: 'Hoạt động',
        dataIndex: '',
        width: '10%',
        render: (row) => {
          return (
            <div className="flex flex-row gap-3 items-center">
              <Button
                icon={<EyeOutlined />}
                size="small"
                type="link"
                onClick={() =>
                  setData({
                    open: true,
                    roomId: row?.id,
                    examId: row?.exam_id,
                    groupId: row?.group_id,
                  })
                }
              />

              <Button
                icon={<EditOutlined />}
                size="small"
                type="link"
                onClick={() => push(ROUTES.ADMIN_UPDATE_ROOM(row.id))}
                disabled={row.status === '2'}
              />

              <Popconfirm
                title="Bạn có chắc chắn xoá đề thi?"
                icon={<QuestionCircleOutlined />}
                onConfirm={() => handleRemove(row.id)}
                disabled={row.status === '2'}
              >
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  type="link"
                  danger
                  disabled={row.status === '2'}
                />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Fragment>
      <ViewDetailModal
        open={data.open}
        onClose={() => setData(initialValues)}
        examId={data.examId}
        groupId={data.groupId}
        roomId={data.roomId}
      />
      <Table size="small" columns={columns} dataSource={rooms ?? []} />
    </Fragment>
  );
};

export default RoomTable;
