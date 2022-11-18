import { AntDesignOutlined } from '@ant-design/icons';
import { GetUserListResponse } from '@service/user/types';
import { GenderEnum } from '@util/constant';
import { Avatar, Descriptions, Drawer } from 'antd';
import moment from 'moment';
import React from 'react';

interface TeacherDetailProps {
  open: boolean;
  onClose: () => void;
  data: Partial<GetUserListResponse>;
}

const TeacherDetail: React.FC<TeacherDetailProps> = ({ open, data, onClose }) => {
  return (
    <Drawer
      title="Thông tin chi tiết"
      placement="right"
      width={500}
      onClose={onClose}
      open={open}
    >
      <div className="w-full flex flex-col gap-5">
        <Avatar icon={<AntDesignOutlined />} size={100} />

        <Descriptions size="small" column={1}>
          <Descriptions.Item label="Mã giáo viên">{data?.code}</Descriptions.Item>
          <Descriptions.Item label="Tên đầy đủ">{data?.name}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {GenderEnum[data?.gender ?? 'male']}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {moment(data?.date_of_birth).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{data?.phone}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{data?.address}</Descriptions.Item>
          <Descriptions.Item label="Liên hệ">
            <a href={data?.contact} target="_blank">
              {data?.contact}
            </a>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Drawer>
  );
};

export default TeacherDetail;
