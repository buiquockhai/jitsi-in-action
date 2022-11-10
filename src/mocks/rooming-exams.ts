import { v4  } from 'uuid';

export const ROOMING_EXAMS_MOCK = {
  id: v4(),
  title: 'It is a long established fact that a reader will be distracted',
  range: 4,
  maxPoint: 10,
  workingTime: 1,
  createdAt: new Date(),
  questions: Array(10)
    .fill(null)
    .map(() => ({
      id: v4(),
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
    })),
};
