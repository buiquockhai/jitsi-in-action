export const ROUTES = {
  //   Functional
  HOME: '/',
  LOGIN: '/login',
  404: '/404',

  //   Teacher
  TEACHER_NEW_QUESTION: '/teacher/questions/new',
  TEACHER_QUESTION_LIST: '/teacher/questions/list',
  TEACHER_SCHEDULE: '/teacher/schedule',
  TEACHER_EXAM_LIST: '/teacher/exams/list',
  TEACHER_NEW_EXAM: '/teacher/exams/new',
  TEACHER_INFORMATION: '/teacher/user/information',
  TEACHER_LOGOUT: '/teacher/notification/logout',
  TEACHER_NOTICE: '/teacher/notification/notice',
  TEACHER_CHANGE_PASSWORD: '/teacher/user/change-password',
  TEACHER_EDIT: '/teacher/user/edit',
  TEACHER_START: (roomId: string) => {
    return `/teacher/start/${roomId}`;
  },

  //   Student
  STUDENT_LOGOUT: '/student/notification/logout',
  STUDENT_NOTICE: '/student/notification/notice',
  STUDENT_CHANGE_PASSWORD: '/student/user/change-password',
  STUDENT_INFORMATION: '/student/user/information',
  STUDENT_SCHEDULE: '/student/schedule',
  STUDENT_EDIT: '/student/user/edit',
  STUDENT_START: (roomId: string) => {
    return `/student/start/${roomId}`;
  },

  //   Admin
  ADMIN_LOGOUT: '/admin/notification/logout',
  ADMIN_NOTICE: '/admin/notification/notice',
  ADMIN_NEW_ROOM: '/admin/room/new',
  ADMIN_EXAM_LIST: '/admin/room/exam-list',
  ADMIN_ROOM_LIST: '/admin/room/list',
  ADMIN_NEW_GROUP: '/admin/group/new',
  ADMIN_GROUP_LIST: '/admin/group/list',
  ADMIN_SPONSOR: '/admin/account/sponsor',
  ADMIN_ACCOUNT_LIST: '/admin/account/list',
};
