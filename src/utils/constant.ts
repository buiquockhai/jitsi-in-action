import { QuestionLevelType, QuestionType } from '@schema/questions';

export const __token = '__token';

export const __avatar = '__avatar';

export const __username = '__username';

export const __role = '__role';

export const __fullname = '__fullname';

export const roles = {
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
};

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

export const GENDER = {
  male: 'Nam',
  female: 'Nữ',
};

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

export const QUESTION_TYPE_ENUM: Record<string, QuestionType> = {
  CONTENT: 'content',
  MULTIPLE: 'multiple',
  SINGLE: 'single',
};

export const QUESTION_LEVEL_ENUM: Record<string, QuestionLevelType> = {
  EASY: 0,
  NORMAL: 1,
  MEDIUM: 2,
  HIGH: 3,
  HARD: 4,
};

export const QUESTION_LEVEL_LABEL_ENUM: Record<QuestionLevelType, string> = {
  0: 'Dễ',
  1: 'Trung bình',
  2: 'Khá',
  3: 'Nâng cao',
  4: 'Khó',
};
