import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { TEACHERS_MOCK } from '@mock/teachers';
import { Button, Popconfirm, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import TeacherDetail from './teacher-detail';

const TeacherAccountTable: React.FC<any> = () => {
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
        title: 'Mã giáo viên',
        dataIndex: 'code',
        width: '20%',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
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
      <TeacherDetail open={open} data={data} onClose={setOpen.bind(null, false)} />
      <Table
        size="small"
        columns={columns}
        dataSource={TEACHERS_MOCK}
        onChange={onChange}
      />
    </div>
  );
};

export default TeacherAccountTable;
