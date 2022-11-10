import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';

const TeacherInfomationCard: React.FC<any> = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-white rounded-sm p-5 flex flex-col gap-3 h-fit">
      <div className="w-full flex flex-row gap-5 justify-between items-end mb-5">
        <Avatar icon={<AntDesignOutlined />} size={100} />
        <div className="flex flex-row gap-2">
          <Button
            size="small"
            onClick={() => router.push(ROUTES.TEACHER_CHANGE_PASSWORD)}
          >
            Đổi mật khẩu
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => router.push(ROUTES.TEACHER_EDIT)}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <Descriptions size="small" column={1}>
        <Descriptions.Item label="Mã học sinh">1711726</Descriptions.Item>
        <Descriptions.Item label="Tên đầy đủ">Bùi Quốc Khải</Descriptions.Item>
        <Descriptions.Item label="Giới tính">Nam</Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">26/10/1999</Descriptions.Item>
        <Descriptions.Item label="Lớp chủ nhiệm">KHMT02</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">0123456789</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          Trường Thọ, Thủ Đức, Tp Hồ Chí Minh
        </Descriptions.Item>
        <Descriptions.Item label="Liên hệ">
          <a href="https://www.google.com.vn/?hl=vi" target="_blank">
            https://www.google.com.vn/?hl=vi
          </a>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default TeacherInfomationCard;
