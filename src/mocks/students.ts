import { v4  } from 'uuid';

export const STUDENTS_MOCK = Array(100)
  .fill(null)
  .map(() => ({
    id: v4(),
    code: '1711726',
    fullname: 'Bùi Quốc Khải',
    gender: 0,
    dateOfBirth: new Date(),
    class: 'KHMT02',
    phone: '0898463002',
    address: 'Trường Thọ, Thủ Đức, Tp Hồ Chí Minh',
    contact: 'https://www.google.com.vn/?hl=vi',
    avatar:
      'https://mymodernmet.com/wp/wp-content/uploads/archive/9YPBjDyXBmK6zd25PAM1_gesichtermix14.jpg',
  }));
