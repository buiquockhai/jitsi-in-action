import {
  QuestionCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useFetchRooms } from '@hook/room/useFetchRooms';
import { ROOM_STATUS } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import { useMemo } from 'react';

const RoomTable = ({}) => {
  const rooms = useFetchRooms();

  const columns = useMemo(
    () => [
      {
        title: 'Phòng thi',
        dataIndex: 'title',
        width: '20%',
      },
      {
        title: 'Tên đề thi',
        dataIndex: 'exam_title',
        width: '10%',
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
        title: 'Xáo trộn câu hỏi',
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
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '10%',
        sorter: (a, b) => a.status - b.status,
        render: (status) => (
          <Tag color={ROOM_STATUS[status]?.color}>{ROOM_STATUS[status]?.label}</Tag>
        ),
      },
      {
        title: 'Hoạt động',
        dataIndex: '',
        width: '10%',
        render: (row) => {
          return (
            <div className="flex flex-row gap-3 items-center">
              <Button icon={<EyeOutlined />} size="small" type="link" />

              <Button
                icon={<EditOutlined />}
                size="small"
                type="link"
                // onClick={() => push(ROUTES.ADMIN_UPDATE_GROUP(row.id))}
              />

              <Popconfirm
                title="Bạn có chắc chắn xoá đề thi?"
                icon={<QuestionCircleOutlined />}
              >
                <Button icon={<DeleteOutlined />} size="small" type="link" danger />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    []
  );

  return <Table size="small" columns={columns} dataSource={rooms ?? []} />;
};

export default RoomTable;
