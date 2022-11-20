import {
  QuestionCircleOutlined,
  EyeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { ADMIN_EXAMS_MOCK } from '@mock/exams';
import { EXAM_RANGE, VERIFY_STATUS } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useMemo } from 'react';

const ExamsTable = ({ setData }) => {
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
        width: '10%',
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
        title: 'Người cho đề',
        dataIndex: 'createdBy',
        width: '10%',
        render: (createdBy) => createdBy?.fullname,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'verified',
        width: '10%',
        render: (verified) => (
          <Tag color={verified ? 'green' : 'red'}>
            {VERIFY_STATUS[verified ? '1' : '0']}
          </Tag>
        ),
        filters: Object.entries(VERIFY_STATUS).map(([key, value]) => ({
          text: value,
          value: key,
        })),
        onFilter: (value, record) => (record?.verified ? value == 1 : value == 0),
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        width: '10%',
        sorter: (a, b) => a.createdAt - b.createdAt,
        render: (createdAt) => moment(createdAt).format('L'),
      },
      {
        title: 'Hoạt động',
        dataIndex: '',
        width: '20%',
        render: (row) => {
          return (
            <div className="flex flex-row gap-3 items-center">
              <Button
                icon={<EyeOutlined />}
                size="small"
                type="link"
                onClick={setData.bind(null, row)}
              />
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

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={ADMIN_EXAMS_MOCK}
      onChange={onChange}
    />
  );
};

export default ExamsTable;
