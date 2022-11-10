import { v4  } from 'uuid';

export const MARKS_STUDENT_MOCK = Array(100)
  .fill(null)
  .map((_, index) => ({
    id: v4(),
    title: 'It is a long established fact that a reader will be distracted',
    range: index % 4,
    maxPoint: 10,
    workingTime: index,
    createdAt: new Date(),
    mark: index % 10,
    questions: Array(10)
      .fill(null)
      .map((_, subIndex) => ({
        id: v4(),
        type: '__1__',
        title: 'Tiêu đề câu hỏi',
        range: 50,
        point: subIndex % 3 == 0 ? 0.25 : 0,
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
        singleChoosen: subIndex % 3 == 0 ? '__anwser_1' : '__anwser_2',
        multipleChoosen: [],
      })),
  }));
