import { uuid } from 'uuidv4';

export const ROOMS_DETAIL_MOCK = {
  id: uuid(),
  title: 'Phòng thi số 7',
  workingTime: 100,
  shuffle: true,
  createdAt: new Date(),
  startAt: new Date(),
  teacher: {
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
  exam: {
    id: uuid(),
    title: 'It is a long established fact that a reader will be distracted',
    range: 2,
    maxPoint: 10,
    workingTime: 100,
    verified: true,
    createdAt: new Date(),
    createdBy: {
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
    questions: Array(10)
      .fill(null)
      .map(() => ({
        id: uuid(),
        type: '__1__',
        title: 'Tiêu đề câu hỏi',
        range: 50,
        point: 0.25,
        questionContent:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English',
        questionImages: [],
        answers: [
          {
            id: '__anwser_1',
            content:
              'It is a long established fact that a reader will be distracted by the readable content',
          },
          {
            id: '__anwser_2',
            content:
              'It is a long established fact that a reader will be distracted by the readable content',
          },
          {
            id: '__anwser_3',
            content:
              'It is a long established fact that a reader will be distracted by the readable content',
          },
          {
            id: '__anwser_4',
            content:
              'It is a long established fact that a reader will be distracted by the readable content',
          },
        ],
        singleCorrect: '__anwser_1',
        multipleCorrect: [],
      })),
  },
};

export const ROOMS_MOCK = Array(50)
  .fill(null)
  .map(() => ROOMS_DETAIL_MOCK);
