import { Empty, Table } from 'antd';
import React, { Fragment, useMemo } from 'react';

const MemberTable: React.FC<{ students: Array<any> }> = ({ students }) => {
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
    ],
    []
  );

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Fragment>
      {students?.length > 0 ? (
        <Table
          size="small"
          columns={columns}
          dataSource={students}
          onChange={onChange}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Fragment>
  );
};

export default MemberTable;
