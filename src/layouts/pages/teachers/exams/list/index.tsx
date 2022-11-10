import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { EXAMS_MOCK } from '@mock/exams';
import { EXAM_RANGE } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useMemo } from 'react';

const ExamsTable: React.FC<{ setData: (data: any) => void }> = ({ setData }) => {
  const columns: any = useMemo(
    () => [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        width: '30%',
      },
      {
        title: 'Độ khó',
        dataIndex: 'range',
        width: '20%',
        sorter: (a, b) => a.range - b.range,
        render: (range) => <Tag color="green">{EXAM_RANGE[range]}</Tag>,
        filters: Object.entries(EXAM_RANGE).map(([key, value]) => ({
          text: value,
          value: key,
        })),
        onFilter: (value, record) => record?.range == parseInt(value),
      },
      {
        title: 'Điểm tối đa',
        dataIndex: 'maxPoint',
        width: '10%',
        sorter: (a, b) => a.maxPoint - b.maxPoint,
      },
      {
        title: 'Thời gian làm bài',
        dataIndex: 'workingTime',
        width: '10%',
        sorter: (a, b) => a.workingTime - b.workingTime,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        width: '20%',
        sorter: (a, b) => a.createdAt - b.createdAt,
        render: (createdAt) => moment(createdAt).format('LLL'),
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
                onClick={setData.bind(null, row)}
              />
              <Button icon={<EditOutlined />} size="small" type="link" />
              <Popconfirm
                title="Bạn có chắc chắn xoá？"
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={EXAMS_MOCK}
      onChange={onChange}
    />
  );
};

export default ExamsTable;
