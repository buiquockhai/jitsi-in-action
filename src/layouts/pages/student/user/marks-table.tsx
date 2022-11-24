import { EyeOutlined } from '@ant-design/icons';
import { useSystemContext } from '@context/system';
import { useFetchFullMarks } from '@hook/mark/useFetchFullMarks';
import { Button, Table } from 'antd';
import moment from 'moment';
import { useMemo, useState } from 'react';
import ViewExam from './view-exam';

type DetailProps = {
  open: boolean;
  roomId: string;
  examId: string;
  markId: string;
};

const detailInitialValues = {
  open: false,
  roomId: '',
  examId: '',
  markId: '',
};

const MarksTable = () => {
  const { userId } = useSystemContext();

  const [detail, setDetail] = useState<DetailProps>(detailInitialValues);

  const marks = useFetchFullMarks({ user_id: userId });

  const handleViewDetail = (examId: string, roomId: string, markId: string) => {
    setDetail({
      open: true,
      roomId: roomId,
      examId: examId,
      markId: markId,
    });
  };

  const columns = useMemo(
    () => [
      {
        title: 'Tiêu đề',
        dataIndex: 'tb_room.title',
        width: '40%',
        render: (_, record) => record?.tb_room?.title,
      },
      {
        title: 'Điểm thi',
        dataIndex: 'mark',
        width: '10%',
      },
      {
        title: 'Điểm tối đa',
        dataIndex: 'tb_room.tb_exam.max_point',
        width: '10%',
        render: (_, record) => record.tb_room?.tb_exam?.max_point,
        sorter: (a, b) =>
          parseFloat(a.tb_room?.tb_exam?.max_point) -
          parseFloat(b.tb_room?.tb_exam?.max_point),
      },
      {
        title: 'Thời gian làm bài',
        dataIndex: 'tb_room.tb_exam.duration',
        width: '20%',
        render: (_, record) => `${record.tb_room?.tb_exam?.duration} phút`,
        sorter: (a, b) =>
          parseFloat(a.tb_room?.tb_exam?.duration) -
          parseFloat(b.tb_room?.tb_exam?.duration),
      },
      {
        title: 'Ngày thi',
        dataIndex: 'tb_room.start_date',
        width: '20%',
        sorter: (a, b) =>
          moment(a.tb_room?.start_date).toDate().getTime() -
          moment(b.tb_room?.start_date).toDate().getTime(),
        render: (_, record) =>
          moment(record?.tb_room?.start_date).format('HH:mm DD/MM/YYYY'),
      },
      {
        title: 'Hoạt động',
        dataIndex: 'action',
        width: '10%',
        render: (_, row) => {
          return (
            <Button
              icon={<EyeOutlined />}
              size="small"
              type="link"
              disabled={row.tb_room?.marked === 'N'}
              onClick={() =>
                handleViewDetail(row.tb_room?.exam_id, row.tb_room?.id, row.id)
              }
            />
          );
        },
      },
    ],
    []
  );

  return (
    <div className="w-full col-span-2 bg-white rounded-sm p-5">
      <ViewExam {...detail} onClose={() => setDetail(detailInitialValues)} />
      <Table size="small" columns={columns} dataSource={marks ?? []} />
    </div>
  );
};

export default MarksTable;
