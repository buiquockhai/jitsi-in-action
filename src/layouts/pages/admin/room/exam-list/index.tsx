import {
  QuestionCircleOutlined,
  EyeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { GET_EXAMS, useFetchExams } from '@hook/exam/useFetchExams';
import { LevelEnum } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { FC, useCallback, useMemo } from 'react';
import { useUpdateExam } from '@hook/exam/useUpdateExam';
import { GET_EXAM_DETAIL } from '@hook/exam/useFetchExamDetail';
import { useNewNotification } from '@hook/notification/useNewNotification';
import { GET_NOTIFICATIONS } from '@hook/notification/useFetchNotification';
import { SocketEmitter, useSocketContext } from '@context/socket';

type Props = {
  onFocus: (id: string) => void;
};

const ExamsTable: FC<Props> = ({ onFocus }) => {
  const newNotificationMutation = useNewNotification([GET_NOTIFICATIONS]);
  const updateExamMutation = useUpdateExam([GET_EXAMS, GET_EXAM_DETAIL]);
  const exams = useFetchExams({ submitted: 'Y' });

  const { socket } = useSocketContext();

  const handleReject = useCallback(
    async (row) => {
      await updateExamMutation.mutate({
        id: row?.id ?? '',
        submitted: 'N',
        status: 'N',
      });

      await newNotificationMutation.mutate({
        user_id: row?.created_id ?? '',
        content: row?.title ?? '',
        title: 'Đề thi bị quản trị viên từ chối',
      });

      socket.emit(SocketEmitter.clientSendRejectExam, {
        target: row?.created_id,
        examTitle: row?.title,
        examId: row?.id,
      });
    },
    [newNotificationMutation, updateExamMutation, socket]
  );

  const columns = useMemo(
    () => [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        width: '30%',
      },
      {
        title: 'Độ khó',
        dataIndex: 'level',
        width: '10%',
        sorter: (a, b) => a.level - b.level,
        render: (level) => <Tag color="green">{LevelEnum[level]}</Tag>,
        filters: Object.entries(LevelEnum).map(([key, value]) => ({
          text: value,
          value: key,
        })),
        onFilter: (value, record) => record?.level == parseInt(value),
      },
      {
        title: 'Điểm tối đa',
        dataIndex: 'max_point',
        width: '10%',
        sorter: (a, b) => a.max_point - b.max_point,
      },
      {
        title: 'Thời gian làm bài',
        dataIndex: 'duration',
        width: '10%',
        sorter: (a, b) => a.duration - b.duration,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: '15%',
        render: (status) => (
          <Tag color={status === 'Y' ? 'green' : 'red'}>
            {status === 'Y' ? 'Đã kiểm duyêt' : 'Chưa kiểm duyệt'}
          </Tag>
        ),
        filters: [
          { value: 'Y', text: 'Đã kiểm duyệt' },
          { value: 'N', text: 'Chưa kiểm duyệt' },
        ],
        sorter: (a, b) => a.status - b.status,
        onFilter: (value, record) => record?.status === value,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created_date',
        width: '15%',
        sorter: (a, b) =>
          moment(a.created_date).toDate().getTime() -
          moment(b.created_date).toDate().getTime(),
        render: (created_date) => moment(created_date).format('HH:mm DD/MM/YYYY'),
      },
      {
        title: 'Hoạt động',
        dataIndex: '',
        width: '20%',
        render: (row) => {
          return (
            <div className="flex flex-row gap-3 items-center">
              <Button
                icon={<EyeOutlined />}
                size="small"
                type="link"
                onClick={() => onFocus(row.id)}
              />
              <Popconfirm
                title="Bạn có chắc chắn từ chối đề thi?"
                icon={<QuestionCircleOutlined />}
                onConfirm={() => handleReject(row)}
              >
                <Button icon={<CloseOutlined />} size="small" type="link" danger />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    [onFocus, handleReject]
  );

  return <Table size="small" columns={columns} dataSource={exams ?? []} />;
};

export default ExamsTable;
