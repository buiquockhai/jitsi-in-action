import {
  QuestionCircleOutlined,
  EyeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { ROOMS_MOCK } from '@mock/rooms';
import { EXAM_RANGE, ROOM_STATUS } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useMemo } from 'react';

const RoomTable: React.FC<any> = ({}) => {
  const columns: any = useMemo(
    () => [
      {
        title: 'Phòng thi',
        dataIndex: 'title',
        width: '20%',
      },
      {
        title: 'Độ khó',
        dataIndex: 'exam',
        width: '10%',
        sorter: (a, b) => a.range - b.range,
        render: (exam) => <Tag color="green">{EXAM_RANGE[exam?.range]}</Tag>,
        filters: Object.entries(EXAM_RANGE).map(([key, value]) => ({
          text: value,
          value: key,
        })),
        onFilter: (value, record) => record?.exam?.range == parseInt(value),
      },
      {
        title: 'Điểm tối đa',
        dataIndex: 'exam',
        width: '10%',
        sorter: (a, b) => a.maxPoint - b.maxPoint,
        render: (exam) => exam?.maxPoint,
      },
      {
        title: 'Thời gian làm bài',
        dataIndex: 'workingTime',
        width: '10%',
        sorter: (a, b) => a.workingTime - b.workingTime,
      },
      {
        title: 'Người cho đề',
        dataIndex: 'teacher',
        width: '10%',
        render: (teacher) => teacher?.fullname,
      },
      {
        title: 'Xáo trộn câu hỏi',
        dataIndex: 'shuffle',
        width: '10%',
        render: (shuffle) => <Tag>{shuffle ? 'Có' : 'Không'}</Tag>,
        sorter: (a, b) => a.shuffle - b.shuffle,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        width: '10%',
        sorter: (a, b) => a.createdAt - b.createdAt,
        render: (createdAt) => moment(createdAt).format('L'),
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
              <Popconfirm
                title="Bạn có chắc chắn từ chối đề thi?"
                icon={<QuestionCircleOutlined />}
              >
                <Button icon={<CloseOutlined />} size="small" type="link" danger />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    []
  );

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const resource = ROOMS_MOCK?.map((item) => {
    const current = new Date();
    if (item?.startAt > current) {
      return { ...item, status: 3 };
    } else if (
      item?.startAt < new Date(current.getTime() + item?.workingTime * 60000)
    ) {
      return { ...item, status: 0 };
    }
    return { ...item, status: 1 };
  });

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={resource}
      onChange={onChange}
    />
  );
};

export default RoomTable;
