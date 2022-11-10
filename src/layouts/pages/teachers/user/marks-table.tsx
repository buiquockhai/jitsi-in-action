import { EyeOutlined } from '@ant-design/icons';
import { MARKS_STUDENT_MOCK } from '@mock/marks';
import { Button, Table } from 'antd';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import ViewExam from './view-exam';

const MarksTable: React.FC<any> = () => {
  const [data, setData] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);

  const handleSetData = (data) => {
    setData(data);
    setOpen(true);
  };

  const columns: any = useMemo(
    () => [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        width: '40%',
      },
      {
        title: 'Điểm thi',
        dataIndex: 'mark',
        width: '10%',
        render: (mark, record) => `${mark}/${record.maxPoint}`,
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
        width: '20%',
        sorter: (a, b) => a.workingTime - b.workingTime,
      },
      {
        title: 'Ngày thi',
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
            <Button
              icon={<EyeOutlined />}
              size="small"
              type="link"
              onClick={handleSetData.bind(null, row)}
            />
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
    <div className="w-full col-span-2 bg-white rounded-sm p-5">
      <ViewExam data={data} open={open} onClose={setOpen.bind(null, false)} />
      <Table
        size="small"
        columns={columns}
        dataSource={MARKS_STUDENT_MOCK}
        onChange={onChange}
      />
    </div>
  );
};

export default MarksTable;
