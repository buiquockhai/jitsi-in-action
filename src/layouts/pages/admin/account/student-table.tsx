import {
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { GET_USER_LIST } from '@hook/user/keys';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { userUpdateUserDetail } from '@hook/user/useUpdateUserDetail';
import { GetUserListResponse } from '@service/user/types';
import { DeleteFlagEnum, RoleEnum } from '@util/constant';
import { Button, Popconfirm, Table } from 'antd';
import { useMemo, useState } from 'react';
import StudentDetail from './student-detail';

const StudentAccountTable = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Partial<GetUserListResponse>>({});

  const userList = useFetchUsers({
    role: RoleEnum.student,
  });

  const mutationUser = userUpdateUserDetail([GET_USER_LIST]);

  const handleBindingData = (row: GetUserListResponse) => {
    setData(row);
    setOpen(true);
  };

  const handleRemove = (id: string) => {
    mutationUser.mutate({
      id: id,
      deleted: DeleteFlagEnum.Y,
    });
  };

  const columns: any = useMemo(
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
      {
        title: 'Hoạt động',
        dataIndex: '',
        width: '10%',
        render: (row: GetUserListResponse) => {
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

  return (
    <div className="w-full col-span-2 bg-white rounded-sm">
      <StudentDetail open={open} data={data} onClose={setOpen.bind(null, false)} />
      <Table size="small" columns={columns} dataSource={userList} />
    </div>
  );
};

export default StudentAccountTable;
