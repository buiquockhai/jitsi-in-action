import { uuid } from 'uuidv4';

export const TEACHERS_MOCK = Array(20)
  .fill(null)
  .map(() => ({
    id: uuid(),
    code: 'GV1001',
    fullname: 'Bùi Quốc Khải',
    gender: 0,
    dateOfBirth: new Date(),
    phone: '0898463002',
    address: 'Trường Thọ, Thủ Đức, Tp Hồ Chí Minh',
    contact: 'https://www.google.com.vn/?hl=vi',
    avatar:
      'https://mymodernmet.com/wp/wp-content/uploads/archive/9YPBjDyXBmK6zd25PAM1_gesichtermix14.jpg',
  }));
