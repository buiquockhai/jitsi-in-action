import { v4 } from 'uuid';
import {
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  CloudOutlined,
  NumberOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import router from 'next/router';
import { ROUTES } from './routes';

export const adminMenu = [
  {
    key: v4(),
    label: 'Người dùng',
    icon: <TeamOutlined />,
    children: [
      {
        key: v4(),
        label: 'Danh sách người dùng',
        href: ROUTES.ADMIN_ACCOUNT_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_ACCOUNT_LIST);
        },
      },
      {
        key: v4(),
        label: 'Cài đặt sponsor',
        href: ROUTES.ADMIN_SPONSOR,
        onClick: () => {
          router.push(ROUTES.ADMIN_SPONSOR);
        },
      },
      {
        key: v4(),
        label: 'Nhóm',
        href: ROUTES.ADMIN_GROUP_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_GROUP_LIST);
        },
      },
      {
        key: v4(),
        label: 'Thêm nhóm',
        href: ROUTES.ADMIN_NEW_GROUP,
        onClick: () => {
          router.push(ROUTES.ADMIN_NEW_GROUP);
        },
      },
    ],
  },
  {
    key: v4(),
    label: 'Phòng thi',
    icon: <NumberOutlined />,
    children: [
      {
        key: v4(),
        label: 'Danh sách phòng thi',
        href: ROUTES.ADMIN_ROOM_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_ROOM_LIST);
        },
      },
      {
        key: v4(),
        label: 'Danh sách đề',
        href: ROUTES.ADMIN_EXAM_LIST,
        onClick: () => {
          router.push(ROUTES.ADMIN_EXAM_LIST);
        },
      },
      {
        key: v4(),
        label: 'Tạo phòng thi',
        href: ROUTES.ADMIN_NEW_ROOM,
        onClick: () => {
          router.push(ROUTES.ADMIN_NEW_ROOM);
        },
      },
    ],
  },
  {
    key: v4(),
    label: 'Hoạt động',
    icon: <BellOutlined />,
    children: [
      {
        key: v4(),
        label: 'Thông báo',
        href: ROUTES.ADMIN_NOTICE,
        onClick: () => {
          router.push(ROUTES.ADMIN_NOTICE);
        },
      },
      {
        key: v4(),
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
    key: v4(),
    label: 'Lịch thi',
    icon: <CalendarOutlined />,
    href: ROUTES.STUDENT_SCHEDULE,
    onClick: () => {
      router.push(ROUTES.STUDENT_SCHEDULE);
    },
  },
  {
    key: v4(),
    label: 'Người dùng',
    icon: <UserOutlined />,
    children: [
      {
        key: v4(),
        label: 'Thông tin',
        href: ROUTES.STUDENT_INFORMATION,
        onClick: () => {
          router.push(ROUTES.STUDENT_INFORMATION);
        },
      },
      {
        key: v4(),
        label: 'Chỉnh sửa thông tin',
        href: ROUTES.STUDENT_EDIT,
        onClick: () => {
          router.push(ROUTES.STUDENT_EDIT);
        },
      },
      {
        key: v4(),
        label: 'Đổi mật khẩu',
        href: ROUTES.STUDENT_CHANGE_PASSWORD,
        onClick: () => {
          router.push(ROUTES.STUDENT_CHANGE_PASSWORD);
        },
      },
    ],
  },
  {
    key: v4(),
    label: 'Hoạt động',
    icon: <BellOutlined />,
    children: [
      {
        key: v4(),
        label: 'Thông báo',
        href: ROUTES.STUDENT_NOTICE,
        onClick: () => {
          router.push(ROUTES.STUDENT_NOTICE);
        },
      },
      {
        key: v4(),
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
    key: v4(),
    label: 'Lịch thi',
    icon: <CalendarOutlined />,
    href: ROUTES.TEACHER_SCHEDULE,
    onClick: () => {
      router.push(ROUTES.TEACHER_SCHEDULE);
    },
  },
  {
    key: v4(),
    label: 'Bài thi',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: v4(),
        label: 'Danh sách bài thi',
        href: ROUTES.TEACHER_EXAM_LIST,
        onClick: () => {
          router.push(ROUTES.TEACHER_EXAM_LIST);
        },
      },
      {
        key: v4(),
        label: 'Thêm bài thi',
        href: ROUTES.TEACHER_NEW_EXAM,
        onClick: () => {
          router.push(ROUTES.TEACHER_NEW_EXAM);
        },
      },
    ],
  },
  {
    key: v4(),
    label: 'Ngân hàng câu hỏi',
    icon: <CloudOutlined />,
    children: [
      {
        key: v4(),
        label: 'Danh sách câu hỏi',
        href: ROUTES.TEACHER_QUESTION_LIST,
        onClick: () => {
          router.push(ROUTES.TEACHER_QUESTION_LIST);
        },
      },
      {
        key: v4(),
        label: 'Thêm câu hỏi',
        href: ROUTES.TEACHER_NEW_QUESTION,
        onClick: () => {
          router.push(ROUTES.TEACHER_NEW_QUESTION);
        },
      },
    ],
  },
  {
    key: v4(),
    label: 'Người dùng',
    icon: <UserOutlined />,
    children: [
      {
        key: v4(),
        label: 'Thông tin',
        href: ROUTES.TEACHER_INFORMATION,
        onClick: () => {
          router.push(ROUTES.TEACHER_INFORMATION);
        },
      },
      {
        key: v4(),
        label: 'Chỉnh sửa thông tin',
        href: ROUTES.TEACHER_EDIT,
        onClick: () => {
          router.push(ROUTES.TEACHER_EDIT);
        },
      },
      {
        key: v4(),
        label: 'Đổi mật khẩu',
        href: ROUTES.TEACHER_CHANGE_PASSWORD,
        onClick: () => {
          router.push(ROUTES.TEACHER_CHANGE_PASSWORD);
        },
      },
    ],
  },
  {
    key: v4(),
    label: 'Hoạt động',
    icon: <BellOutlined />,
    children: [
      {
        key: v4(),
        label: 'Thông báo',
        href: ROUTES.TEACHER_NOTICE,
        onClick: () => {
          router.push(ROUTES.TEACHER_NOTICE);
        },
      },
      {
        key: v4(),
        href: ROUTES.TEACHER_LOGOUT,
        onClick: () => {
          router.push(ROUTES.TEACHER_LOGOUT);
        },
        label: 'Đăng xuất',
      },
    ],
  },
];
