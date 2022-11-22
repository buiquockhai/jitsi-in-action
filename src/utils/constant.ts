export const __token = '__token';

export const __avatar = '__avatar';

export const __username = '__username';

export const __role = '__role';

export const __fullname = '__fullname';

export const __adminId = '88785352-c404-4546-8bd9-8efedbe9182f';

export const ANPHABET = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'J',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T',
  20: 'U',
  21: 'V',
  22: 'W',
  23: 'X',
  24: 'W',
  25: 'Z',
};

export const QUESTION_TYPE = {
  __1__: 'Trắc nghiệm',
  __2__: 'TN nhiều đáp án',
  __3__: 'Tự luận',
};

export const QUESTION_RANGE = {
  0: 'Dễ',
  25: 'Trung bình',
  50: 'Vận dụng',
  75: 'Nâng cao',
  100: 'Khó',
};

export const EXAM_RANGE = {
  0: 'Dễ',
  1: 'Trung bình',
  2: 'Nâng cao',
  3: 'Khó',
};

export const GenderEnum = {
  male: 'Nam',
  female: 'Nữ',
} as const;

export type GenderTypes = keyof typeof GenderEnum;

export const RoleEnum = {
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
} as const;

export type RoleTypes = keyof typeof RoleEnum;

export const DeleteFlagEnum = {
  Y: 'Y',
  N: 'N',
} as const;

export type DeleteFlagTypes = keyof typeof DeleteFlagEnum;

export const LevelEnum = {
  0: 'Dễ',
  1: 'Trung bình',
  2: 'Khá',
  3: 'Khó',
  4: 'Nâng cao',
} as const;

export type LevelTypes = keyof typeof LevelEnum;

export const QuestionTypeEnum = {
  single: 'Trắc nghiệm',
  multiple: 'TN nhiều đáp án',
} as const;

export type QuestionTypes = keyof typeof QuestionTypeEnum;

export const RoomStatusEnum = {
  '0': 'Chưa bắt đầu',
  '1': 'Đang diễn ra',
  '2': 'Kết thúc',
} as const;

export type RoomStatusTypes = keyof typeof RoomStatusEnum;

export const VERIFY_STATUS = {
  0: 'Chưa kiểm duyệt',
  1: 'Đã kiểm duyệt',
};

export const ROOM_STATUS = {
  0: {
    label: 'Đã kết thúc',
    color: 'default',
  },
  1: {
    label: 'Đang diễn ra',
    color: 'green',
  },
  2: {
    label: 'Sắp diễn ra',
    color: 'purple',
  },
};
