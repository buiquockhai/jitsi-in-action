import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { STUDENTS_MOCK } from '@mock/students';
import { Button, Popconfirm, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import StudentDetail from './student-detail';

const StudentAccountTable: React.FC<any> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const handleBindingData = (row) => {
    setData(row);
    setOpen(true);
  };

  const columns: any = useMemo(
    () => [
      {
        title: 'Tên đầy đủ',
        dataIndex: 'fullname',
        width: '50%',
      },
      {
        title: 'Mã học sinh',
        dataIndex: 'code',
        width: '20%',
      },
      {
        title: 'Nhóm',
        dataIndex: 'class',
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
                onClick={handleBindingData.bind(null, row)}
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
    <div className="w-full col-span-2 bg-white rounded-sm">
      <StudentDetail open={open} data={data} onClose={setOpen.bind(null, false)} />
      <Table
        size="small"
        columns={columns}
        dataSource={STUDENTS_MOCK}
        onChange={onChange}
      />
    </div>
  );
};

export default StudentAccountTable;
