import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions } from 'antd';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import { useFetchUserDetail } from '@hook/user/useFetchUserDetail';
import { GenderEnum } from '@util/constant';
import moment from 'moment';
import { useSystemContext } from '@context/system';

const TeacherInformationCard = () => {
  const { push } = useRouter();
  const { userId } = useSystemContext();

  const user = useFetchUserDetail(userId);

  return (
    <div className="w-full bg-white rounded-sm p-5 flex flex-col gap-3 h-fit">
      <div className="w-full flex flex-row gap-5 justify-between items-end mb-5">
        <Avatar icon={<AntDesignOutlined />} size={100} src={user?.avatar} />
        <div className="flex flex-row gap-2">
          <Button size="small" onClick={() => push(ROUTES.TEACHER_CHANGE_PASSWORD)}>
            Đổi mật khẩu
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => push(ROUTES.TEACHER_EDIT)}
          >
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <Descriptions size="small" column={1}>
        <Descriptions.Item label="Mã học sinh">{user?.code}</Descriptions.Item>
        <Descriptions.Item label="Tên đầy đủ">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          {GenderEnum[user?.gender ?? 'male']}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {moment(user?.date_of_birth ?? '').format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Lớp chủ nhiệm">
          {user?.group_title}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{user?.phone}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{user?.address}</Descriptions.Item>
        <Descriptions.Item label="Liên hệ">
          <a href={user?.contact}>{user?.contact}</a>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default TeacherInformationCard;
