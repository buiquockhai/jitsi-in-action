import {
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { GET_USER_LIST, useFetchUserList } from '@hook/user/useFetchUserList';
import { userMutationUserDetail } from '@hook/user/useMutationUserDetail';
import { GetUserListResponse } from '@service/user/types';
import { DeleteFlagEnum, RoleEnum } from '@util/constant';
import { Button, Popconfirm, Table } from 'antd';
import { useMemo, useState } from 'react';
import TeacherDetail from './teacher-detail';

const TeacherAccountTable = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Partial<GetUserListResponse>>({});

  const userList = useFetchUserList({
    role: RoleEnum.teacher,
  });

  const mutationUser = userMutationUserDetail([GET_USER_LIST]);

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
      <TeacherDetail open={open} data={data} onClose={setOpen.bind(null, false)} />
      <Table size="small" columns={columns} dataSource={userList} />
    </div>
  );
};

export default TeacherAccountTable;
