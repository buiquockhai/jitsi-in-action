import {
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { GROUPS_MOCK } from '@mock/groups';
import { Button, Popconfirm, Table } from 'antd';
import moment from 'moment';
import React, { useMemo } from 'react';

const GroupTable: React.FC<{ setStudents: (value: any[]) => void }> = ({
  setStudents,
}) => {
  const columns: any = useMemo(
    () => [
      {
        title: 'Mã nhóm',
        dataIndex: 'code',
        width: '10%',
      },
      {
        title: 'Tên nhóm',
        dataIndex: 'name',
        width: '30%',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        render: (value) => moment(value).format('LLL'),
        width: '30%',
      },
      {
        title: 'Chủ nhiệm',
        dataIndex: 'headTeacher',
        render: (value) => value?.fullname,
        width: '20%',
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
                onClick={setStudents.bind(null, row?.students)}
              />
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
      dataSource={GROUPS_MOCK}
      onChange={onChange}
    />
  );
};

export default GroupTable;
