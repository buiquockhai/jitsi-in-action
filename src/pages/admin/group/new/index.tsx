import withAuth from '@hoc/withAuth';
import difference from 'lodash/difference';
import { GenderEnum, RoleEnum } from '@util/constant';
import { Button, Input, Table, Tag, Transfer, message } from 'antd';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useFetchUserFreeze } from '@hook/user/useFetchUserFreeze';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import { useNewGroup } from '@hook/group/useNewGroup';
import {
  GET_USER_DETAIL,
  GET_USER_FREEZE_LIST,
  GET_USER_LIST,
} from '@hook/user/keys';
import { useFetchGroupDetail } from '@hook/group/useFetchGroupDetail';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { useUpdateGroup } from '@hook/group/useUpdateGroup';

const columns = [
  {
    dataIndex: 'code',
    title: 'Mã học sinh',
    width: '20%',
  },
  {
    dataIndex: 'name',
    title: 'Tên đầy đủ',
    width: '40%',
    sorter: (a, b) => a.name?.length - b.name?.length,
  },
  {
    dataIndex: 'gender',
    title: 'Giới tính',
    render: (gender) => <Tag>{GenderEnum[gender]}</Tag>,
    sorter: (a, b) => a.gender?.length - b.gender?.length,
    width: '20%',
  },
  {
    dataIndex: 'phone',
    title: 'Số điện thoại',
    width: '20%',
  },
];

const NewGroup: NextPage = () => {
  const { push, query } = useRouter();

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [targetKeys, setTargetKeys] = useState<any[]>([]);

  const newGroupMutation = useNewGroup([GET_USER_LIST, GET_USER_FREEZE_LIST]);
  const updateGroupMutation = useUpdateGroup([
    GET_USER_LIST,
    GET_USER_DETAIL,
    GET_USER_FREEZE_LIST,
  ]);

  const userFreeze = useFetchUserFreeze();
  const userByGroup = useFetchUsers({ group_id: query.id as string });
  const groupDetail = useFetchGroupDetail(query.id as string);

  const source = query.id
    ? [...(userByGroup ?? []), ...(userFreeze ?? [])]
    : userFreeze;

  const sourceWithKey = source?.map((item) => ({ ...item, key: item.id }));

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleSave = async () => {
    if (title.trim().length <= 0 || targetKeys.length <= 0) {
      return message.warn('Vui lòng điền thông tin');
    }

    if (query.id) {
      await updateGroupMutation.mutate({
        id: query.id as string,
        title: title,
        users: targetKeys,
      });
    } else {
      await newGroupMutation.mutate({
        code: new Date().getTime().toString(),
        title: title,
        users: targetKeys,
      });

      setTargetKeys([]);
      setTitle('');
    }
  };

  useEffect(() => {
    if (query.id && Array.isArray(groupDetail?.tb_users)) {
      setTitle(groupDetail?.title ?? '');
      setCode(groupDetail?.code ?? '');
      setTargetKeys((groupDetail?.tb_users ?? []).map((item) => item.id));
    }
  }, [query, groupDetail]);

  return (
    <div className="w-full p-5 flex flex-col gap-3">
      <div className="w-full flex gap-2 items-end justify-end">
        <Button onClick={() => push(ROUTES.ADMIN_GROUP_LIST)}>Huỷ</Button>
        <Button type="primary" onClick={handleSave}>
          Lưu
        </Button>
      </div>

      <div className="space-x-2">
        <Input
          value={code}
          allowClear
          placeholder="Mã nhóm"
          className="max-w-[300px]"
          disabled
        />
        <Input
          allowClear
          placeholder="Tên nhóm"
          className="max-w-[300px]"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <Transfer
        showSearch={false}
        targetKeys={targetKeys}
        onChange={onChange}
        dataSource={sourceWithKey}
      >
        {({
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
        }) => {
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
    </div>
  );
};

export const getServerSideProps = withAuth(
  async (_) => ({
    props: {},
  }),
  RoleEnum.admin
);

export default NewGroup;
