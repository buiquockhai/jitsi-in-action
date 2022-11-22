import { QuestionCircleOutlined } from '@ant-design/icons';
import { SocketEmitter, useSocketContext } from '@context/socket';
import { GET_EXAM_DETAIL, useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { GET_EXAMS } from '@hook/exam/useFetchExams';
import { useUpdateExam } from '@hook/exam/useUpdateExam';
import { GET_NOTIFICATIONS } from '@hook/notification/useFetchNotification';
import { useNewNotification } from '@hook/notification/useNewNotification';
import { ALPHABET, LevelEnum, QuestionTypeEnum } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Button, Descriptions, Drawer, Popconfirm, Tag } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  open: boolean;
  id: string;
  onClose: () => void;
};

const ViewExam: FC<Props> = ({ open, id, onClose }) => {
  const { push } = useRouter();

  const { socket } = useSocketContext();

  const newNotificationMutation = useNewNotification([GET_NOTIFICATIONS]);
  const updateExamMutation = useUpdateExam([GET_EXAMS, GET_EXAM_DETAIL]);
  const examDetail = useFetchExamDetail(id);
  const exams = examDetail?.exam;

  const handleToggle = () => {
    updateExamMutation.mutate({
      id: exams?.id ?? '',
      status: exams?.status === 'Y' ? 'N' : 'Y',
    });
  };

  const handleRejectExam = async () => {
    await updateExamMutation.mutate({
      id: exams?.id ?? '',
      submitted: 'N',
      status: 'N',
    });
    onClose();

    await newNotificationMutation.mutate({
      user_id: exams?.created_id ?? '',
      content: exams?.title ?? '',
      title: 'Đề thi bị quản trị viên từ chối',
    });

    socket.emit(SocketEmitter.clientSendRejectExam, {
      target: exams?.created_id,
      examTitle: exams?.title,
      examId: exams?.id,
    });
  };

  return (
    <Drawer
      title={exams?.title}
      width="50vw"
      onClose={onClose}
      open={open}
      extra={
        <div className="flex flex-row gap-2">
          <Popconfirm
            title={`Bạn có chắc chắn ${
              exams?.status === 'Y' ? 'bỏ' : ''
            } phê duyệt đề thi?`}
            icon={<QuestionCircleOutlined />}
            onConfirm={handleToggle}
          >
            <Button>{exams?.status === 'Y' ? 'Bỏ phê duyệt' : 'Phê duyệt'}</Button>
          </Popconfirm>
          <Popconfirm
            title="Bạn có chắc chắn muốn trả đề trở lại người cho đề?"
            disabled={exams?.status === 'Y'}
            icon={<QuestionCircleOutlined />}
            onConfirm={handleRejectExam}
          >
            <Button disabled={exams?.status === 'Y'}>Trả đề</Button>
          </Popconfirm>
          <Button onClick={() => push(ROUTES.ADMIN_NEW_ROOM)} type="primary">
            Tạo phòng thi
          </Button>
        </div>
      }
    >
      <div className="w-full flex flex-col gap-5">
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Ngày tạo">
            {moment(exams?.created_date).format('HH:mm DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Mức độ">
            {LevelEnum?.[exams?.level ?? '']}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm tối đa">
            {exams?.max_point}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian làm bài">
            {exams?.duration} phút
          </Descriptions.Item>
          <Descriptions.Item label="Phê duyệt">
            {exams?.status === 'Y' ? 'Đã phê duyệt' : 'Chưa phê duyệt'}
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

            <div className="w-full grid grid-cols-2 gap-3 mt-5">
              {question?.tb_answers?.map((item, index) => {
                const isCorrect = item.percent > 0;
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
