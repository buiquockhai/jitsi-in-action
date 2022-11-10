import { STUDENTS_MOCK } from '@mock/students';
import { GENDER } from '@util/constant';
import { Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
import React, { useState } from 'react';

const formatedDataSource = STUDENTS_MOCK?.map((item) => ({
  ...item,
  key: item?.id,
}));

const leftTableColumns: any = [
  {
    dataIndex: 'code',
    title: 'Mã học sinh',
    width: '20%',
  },
  {
    dataIndex: 'fullname',
    title: 'Tên đầy đủ',
    width: '40%',
  },
  {
    dataIndex: 'gender',
    title: 'Giới tính',
    render: (gender) => <Tag>{GENDER[gender]}</Tag>,
    width: '20%',
  },
  {
    dataIndex: 'phone',
    title: 'Số điện thoại',
    width: '20%',
  },
];

const rightTableColumns: any = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];

const TableTransfer: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<any[]>(formatedDataSource);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      showSearch={true}
      targetKeys={targetKeys}
      onChange={onChange}
      dataSource={formatedDataSource}
    >
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
      }) => {
        const columns = direction === 'left' ? leftTableColumns : rightTableColumns;

        const rowSelection = {
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows.map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect: ({ key }, selected) => {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            onRow={({ key }) => ({
              onClick: () => {
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
};

export default TableTransfer;
