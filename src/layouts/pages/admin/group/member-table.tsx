import { useFetchGroupDetail } from '@hook/group/useFetchGroupDetail';
import { Empty, Table } from 'antd';
import { useMemo, FC } from 'react';

type Props = {
  groupFocusId: string;
};

const MemberTable: FC<Props> = ({ groupFocusId }) => {
  const groupDetail = useFetchGroupDetail(groupFocusId ?? '');

  const userList = groupDetail?.tb_users ?? [];

  const columns = useMemo(
    () => [
      {
        title: 'Tên đầy đủ',
        dataIndex: 'name',
        width: '50%',
      },
      {
        title: 'Mã học sinh',
        dataIndex: 'code',
        width: '20%',
      },
      {
        title: 'Nhóm',
        dataIndex: 'group_title',
        width: '20%',
      },
    ],
    []
  );

  if (userList.length < 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return <Table size="small" columns={columns} dataSource={userList} />;
};

export default MemberTable;
