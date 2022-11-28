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
import { Fragment, useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import ViewDetailModal from './view-detail';

type DetailProps = {
  open: boolean;
  roomId: string;
  examId: string;
  groupId: string;
};

const initialValues: DetailProps = {
  open: false,
  roomId: '',
  examId: '',
  groupId: '',
};

const RoomTable = ({}) => {
  const { push } = useRouter();

  const rooms = useFetchRooms({});
  const updateRoomMutation = useUpdateRoom([GET_ROOMS, GET_ROOM_DETAIL]);

  const [data, setData] = useState<DetailProps>(initialValues);

  const handleRemove = useCallback(
    (id: string) => {
      updateRoomMutation.mutate({
        id: id,
        deleted: 'Y',
      });
    },
    [updateRoomMutation]
  );

  const columns = useMemo(
    () => [
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '5%',
        render: (status) => <Tag>{RoomStatusEnum[status]}</Tag>,
        sorter: (a, b) => a.status - b.status,
      },
      {
        title: 'Phòng thi',
        dataIndex: 'title',
        width: '10%',
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
        title: 'Thời gian làm bài',
        dataIndex: 'tb_exam.duration',
        width: '10%',
        render: (_, record) => `${record?.tb_exam?.duration ?? 0} phút`,
        sorter: (a, b) =>
          parseInt(a?.tb_exam?.duration ?? '0') -
          parseInt(b?.tb_exam?.duration ?? '0'),
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
    [push, handleRemove]
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
