import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Button, Popconfirm, Table } from 'antd';
import { useMemo, FC } from 'react';
import { GET_GROUPS, useFetchGroups } from '@hook/group/useFetchGroup';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import { useUpdateGroup } from '@hook/group/useUpdateGroup';
import {
  GET_USER_DETAIL,
  GET_USER_FREEZE_LIST,
  GET_USER_LIST,
} from '@hook/user/keys';

type Props = {
  setGroupFocusId: (id: string) => void;
};

const GroupTable: FC<Props> = ({ setGroupFocusId }) => {
  const { push } = useRouter();

  const groups = useFetchGroups();

  const updateGroupMutation = useUpdateGroup([
    GET_USER_LIST,
    GET_USER_DETAIL,
    GET_USER_FREEZE_LIST,
    GET_GROUPS,
  ]);

  const handleRemove = (id: string) => {
    updateGroupMutation.mutate({
      id: id,
      deleted: 'Y',
      users: [],
    });
  };

  const columns = useMemo(
    () => [
      {
        title: 'Mã nhóm',
        dataIndex: 'code',
        width: '20%',
      },
      {
        title: 'Tên nhóm',
        dataIndex: 'title',
        width: '40%',
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created_date',
        sorter: (a, b) =>
          moment(a.created_date).toDate().getTime() -
          moment(b.created_date).toDate().getTime(),
        render: (created_date) => moment(created_date).format('DD/MM/YYYY'),
        width: '20%',
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
                onClick={() => setGroupFocusId(row.id)}
              />
              <Button
                icon={<EditOutlined />}
                size="small"
                type="link"
                onClick={() => push(ROUTES.ADMIN_UPDATE_GROUP(row.id))}
              />
              <Popconfirm
                title="Bạn có chắc chắn xoá？"
                icon={<QuestionCircleOutlined />}
                onConfirm={() => handleRemove(row.id)}
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

  return <Table size="small" columns={columns} dataSource={groups} />;
};

export default GroupTable;
