import { SocketEmitter, useSocketContext } from '@context/socket';
import { GET_EXAM_DETAIL, useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_EXAMS } from '@hook/exam/useFetchExams';
import { useUpdateExam } from '@hook/exam/useUpdateExam';
import { GET_NOTIFICATIONS } from '@hook/notification/useFetchNotification';
import { useNewNotification } from '@hook/notification/useNewNotification';
import { ALPHABET, LevelEnum, QuestionTypeEnum, __adminId } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Button, Descriptions, Drawer, Tag } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
};

const ViewExam: FC<Props> = ({ open, id, onClose }) => {
  const { push } = useRouter();
  const { socket } = useSocketContext();
  const examDetail = useFetchExamDetail(id);
  const updateExamMutation = useUpdateExam([GET_EXAMS, GET_EXAM_DETAIL]);
  const newNotificationMutation = useNewNotification([GET_NOTIFICATIONS]);

  const exam = examDetail?.exam;

  const handleSubmit = async () => {
    await updateExamMutation.mutate({
      id: id,
      submitted: 'Y',
    });
    onClose();

    await newNotificationMutation.mutate({
      user_id: __adminId,
      title: 'Giảng viên submit đề thi',
      content: exam?.title ?? '',
    });

    socket.emit(SocketEmitter.clientSendSubmitExam, {
      examTitle: exam?.title,
      examId: exam?.id,
    });
  };

  return (
    <Drawer
      title={exam?.title}
      width="50vw"
      onClose={onClose}
      open={open}
      extra={
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => push(ROUTES.TEACHER_UPDATE_EXAM(id))}
            disabled={exam?.submitted === 'Y'}
          >
            Chỉnh sửa
          </Button>
          <Button
            onClick={handleSubmit}
            type="primary"
            disabled={exam?.submitted === 'Y'}
          >
            Submit
          </Button>
        </div>
      }
    >
      <div className="w-full flex flex-col gap-5">
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Ngày tạo">
            {moment(exam?.created_date).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Mức độ">
            {LevelEnum[exam?.level ?? '']}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm tối đa">
            {exam?.max_point}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian làm bài">
            {exam?.duration} phút
          </Descriptions.Item>
          <Descriptions.Item label="Phê duyệt">
            {exam?.status === 'Y' ? 'Đã phê duyệt' : 'Chưa phê duyệt'}
          </Descriptions.Item>
          <Descriptions.Item label="Submit">
            {exam?.submitted === 'Y' ? 'Đã submit' : 'Chưa submit'}
          </Descriptions.Item>
        </Descriptions>

        {examDetail?.questionList?.map((question) => (
          <div
            className="w-full flex flex-col gap-2 border-b pb-5"
            key={question?.id}
          >
            <div className="flex flex-row gap-1">
              <Tag color="magenta">{QuestionTypeEnum[question?.type]}</Tag>
              <Tag color="green">{LevelEnum[question?.level]}</Tag>
              <Tag color="purple">Điểm: {question?.point}</Tag>
            </div>

            <p className="font-semibold">{question?.content}</p>

            <ul className="flex gap-3 flex-wrap">
              {JSON.parse(question?.images ?? '[]').map((item) => (
                <img
                  key={item}
                  className="rounded-sm object-cover w-[200px] h-[200px]"
                  loading="lazy"
                  src={item}
                />
              ))}
            </ul>

            <div className="w-full grid grid-cols-2 gap-3">
              {question?.tb_answers?.map((item, index) => {
                const isCorrect = parseInt(item.percent) > 0;
                return (
                  <div
                    key={item?.id}
                    className="px-4 py-1 border rounded-sm border-dashed"
                    style={
                      isCorrect
                        ? { borderColor: '#52c41a', backgroundColor: '#f0fdf4' }
                        : {}
                    }
                  >
                    <span className="font-semibold">{ALPHABET?.[index]}.</span>{' '}
                    {item?.content}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default ViewExam;
