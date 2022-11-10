import { uuid } from 'uuidv4';
import {
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  CloudOutlined,
  NumberOutlined,
  RocketOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import router from 'next/router';
import { ROUTES } from './routes';

export const adminMenu = [
  {
    key: uuid(),
    label: 'Người dùng',
    icon: <TeamOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Danh sách người dùng',
        href: ROUTES.ADMIN_ACCOUNT_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_ACCOUNT_LIST);
        },
      },
      {
        key: uuid(),
        label: 'Cài đặt sponsor',
        href: ROUTES.ADMIN_SPONSOR,
        onClick: () => {
          router.push(ROUTES.ADMIN_SPONSOR);
        },
      },
      {
        key: uuid(),
        label: 'Nhóm',
        href: ROUTES.ADMIN_GROUP_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_GROUP_LIST);
        },
      },
      {
        key: uuid(),
        label: 'Thêm nhóm',
        href: ROUTES.ADMIN_NEW_GROUP,
        onClick: () => {
          router.push(ROUTES.ADMIN_NEW_GROUP);
        },
      },
    ],
  },
  {
    key: uuid(),
    label: 'Phòng thi',
    icon: <NumberOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Danh sách phòng thi',
        href: ROUTES.ADMIN_ROOM_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_ROOM_LIST);
        },
      },
      {
        key: uuid(),
        label: 'Danh sách đề',
        href: ROUTES.ADMIN_EXAM_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_EXAM_LIST);
        },
      },
      {
        key: uuid(),
        label: 'Tạo phòng thi',
        href: ROUTES.ADMIN_NEW_ROOM,
        onClick: () => {
          router.push(ROUTES.ADMIN_NEW_ROOM);
        },
      },
    ],
  },
  {
    key: uuid(),
    label: 'Hoạt động',
    icon: <BellOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Thông báo',
        href: ROUTES.ADMIN_NOTICE,
        onClick: () => {
          router.push(ROUTES.ADMIN_NOTICE);
        },
      },
      {
        key: uuid(),
        href: ROUTES.ADMIN_LOGOUT,
        onClick: () => {
          router.push(ROUTES.ADMIN_LOGOUT);
        },
        label: 'Đăng xuất',
      },
    ],
  },
];

export const studentMenu = [
  {
    key: uuid(),
    label: 'Tham gia',
    icon: <RocketOutlined />,
    onClick: () => {
      router.push(ROUTES.STUDENT_START('__room_1'));
    },
  },
  {
    key: uuid(),
    label: 'Lịch thi',
    icon: <CalendarOutlined />,
    href: ROUTES.STUDENT_SCHEDULE,
    onClick: () => {
      router.push(ROUTES.STUDENT_SCHEDULE);
    },
  },
  {
    key: uuid(),
    label: 'Người dùng',
    icon: <UserOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Thông tin',
        href: ROUTES.STUDENT_INFORMATION,
        onClick: () => {
          router.push(ROUTES.STUDENT_INFORMATION);
        },
      },
      {
        key: uuid(),
        label: 'Chỉnh sửa thông tin',
        href: ROUTES.STUDENT_EDIT,
        onClick: () => {
          router.push(ROUTES.STUDENT_EDIT);
        },
      },
      {
        key: uuid(),
        label: 'Đổi mật khẩu',
        href: ROUTES.STUDENT_CHANGE_PASSWORD,
        onClick: () => {
          router.push(ROUTES.STUDENT_CHANGE_PASSWORD);
        },
      },
    ],
  },
  {
    key: uuid(),
    label: 'Hoạt động',
    icon: <BellOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Thông báo',
        href: ROUTES.STUDENT_NOTICE,
        onClick: () => {
          router.push(ROUTES.STUDENT_NOTICE);
        },
      },
      {
        key: uuid(),
        href: ROUTES.STUDENT_LOGOUT,
        onClick: () => {
          router.push(ROUTES.STUDENT_LOGOUT);
        },
        label: 'Đăng xuất',
      },
    ],
  },
];

export const teacherMenu = [
  {
    key: uuid(),
    label: 'Tham gia',
    icon: <RocketOutlined />,
    onClick: () => {
      router.push(ROUTES.TEACHER_START('__room_1'));
    },
  },
  {
    key: uuid(),
    label: 'Lịch thi',
    icon: <CalendarOutlined />,
    href: ROUTES.TEACHER_SCHEDULE,
    onClick: () => {
      router.push(ROUTES.TEACHER_SCHEDULE);
    },
  },
  {
    key: uuid(),
    label: 'Bài thi',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Danh sách bài thi',
        href: ROUTES.TEACHER_EXAM_LIST,
        onClick: () => {
          router.push(ROUTES.TEACHER_EXAM_LIST);
        },
      },
      {
        key: uuid(),
        label: 'Thêm bài thi',
        href: ROUTES.TEACHER_NEW_EXAM,
        onClick: () => {
          router.push(ROUTES.TEACHER_NEW_EXAM);
        },
      },
    ],
  },
  {
    key: uuid(),
    label: 'Ngân hàng câu hỏi',
    icon: <CloudOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Danh sách câu hỏi',
        href: ROUTES.TEACHER_QUESTION_LIST,
        onClick: () => {
          router.push(ROUTES.TEACHER_QUESTION_LIST);
        },
      },
      {
        key: uuid(),
        label: 'Thêm câu hỏi',
        href: ROUTES.TEACHER_NEW_QUESTION,
        onClick: () => {
          router.push(ROUTES.TEACHER_NEW_QUESTION);
        },
      },
    ],
  },
  {
    key: uuid(),
    label: 'Người dùng',
    icon: <UserOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Thông tin',
        href: ROUTES.TEACHER_INFORMATION,
        onClick: () => {
          router.push(ROUTES.TEACHER_INFORMATION);
        },
      },
      {
        key: uuid(),
        label: 'Chỉnh sửa thông tin',
        href: ROUTES.TEACHER_EDIT,
        onClick: () => {
          router.push(ROUTES.TEACHER_EDIT);
        },
      },
      {
        key: uuid(),
        label: 'Đổi mật khẩu',
        href: ROUTES.TEACHER_CHANGE_PASSWORD,
        onClick: () => {
          router.push(ROUTES.TEACHER_CHANGE_PASSWORD);
        },
      },
    ],
  },
  {
    key: uuid(),
    label: 'Hoạt động',
    icon: <BellOutlined />,
    children: [
      {
        key: uuid(),
        label: 'Thông báo',
        href: ROUTES.TEACHER_NOTICE,
        onClick: () => {
          router.push(ROUTES.TEACHER_NOTICE);
        },
      },
      {
        key: uuid(),
        href: ROUTES.TEACHER_LOGOUT,
        onClick: () => {
          router.push(ROUTES.TEACHER_LOGOUT);
        },
        label: 'Đăng xuất',
      },
    ],
  },
];
