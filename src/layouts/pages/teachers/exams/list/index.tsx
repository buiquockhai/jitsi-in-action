import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { useSystemContext } from '@context/system';
import { GET_EXAMS, useFetchExams } from '@hook/exam/useFetchExams';
import { LevelEnum } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { useMemo, FC } from 'react';
import { ExamResponse } from '@service/exam/types';
import { ROUTES } from '@util/routes';
import { useRouter } from 'next/router';
import { useUpdateExam } from '@hook/exam/useUpdateExam';
import { GET_EXAM_DETAIL } from '@hook/exam/useFetchExamDetail';

type Props = {
  onFocus: (id) => void;
};

const ExamsTable: FC<Props> = ({ onFocus }) => {
  const { userId } = useSystemContext();
  const { push } = useRouter();

  const examList = useFetchExams({ created_id: userId });
  const updateExamMutation = useUpdateExam([GET_EXAMS, GET_EXAM_DETAIL]);

  const handleRemove = (id: string) => {
    updateExamMutation.mutate({
      id: id,
      deleted: 'Y',
    });
  };

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
        width: '20%',
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
        title: 'Ngày tạo',
        dataIndex: 'created_date',
        width: '20%',
        sorter: (a, b) =>
          moment(a.created_date).toDate().getTime() -
          moment(b.created_date).toDate().getTime(),
        render: (created_date) => moment(created_date).format('DD/MM/YYYY'),
      },
      {
        title: 'Hoạt động',
        dataIndex: '',
        width: '10%',
        render: (row: ExamResponse) => {
          return (
            <div className="flex flex-row gap-3 items-center">
              <Button
                icon={<EyeOutlined />}
                size="small"
                type="link"
                onClick={() => onFocus(row.id)}
              />
              <Button
                icon={<EditOutlined />}
                size="small"
                type="link"
                onClick={() => push(ROUTES.TEACHER_UPDATE_EXAM(row.id))}
              />
              <Popconfirm
                title="Bạn có chắc chắn xoá？"
                icon={<QuestionCircleOutlined />}
                onConfirm={() => handleRemove(row.id)}
              >
                <Button icon={<DeleteOutlined />} size="small" type="link" danger />
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    []
  );

  return <Table size="small" columns={columns} dataSource={examList} />;
};

export default ExamsTable;
