import { uuid } from 'uuidv4';

export const GROUPS_MOCK = Array(50)
  .fill(null)
  .map((_, index) => ({
    id: uuid(),
    code: `MTKH${index}`,
    name: 'Chuyên Toán 01',
    createdAt: new Date(),
    headTeacher: {
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
    },
    students: Array(20)
      .fill(null)
      .map((_, subIndex) => ({
        id: uuid(),
        code: `1711726${subIndex}`,
        fullname: 'Bùi Quốc Khải',
        gender: 0,
        dateOfBirth: new Date(),
        class: `MTKH${index}`,
        phone: '0898463002',
        address: 'Trường Thọ, Thủ Đức, Tp Hồ Chí Minh',
        contact: 'https://www.google.com.vn/?hl=vi',
        avatar:
          'https://mymodernmet.com/wp/wp-content/uploads/archive/9YPBjDyXBmK6zd25PAM1_gesichtermix14.jpg',
      })),
  }));
