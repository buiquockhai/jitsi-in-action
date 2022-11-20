import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { useSystemContext } from '@context/system';
import { useFetchExams } from '@hook/exam/useFetchExams';
import { LevelEnum } from '@util/constant';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { useMemo, FC } from 'react';
import { ExamResponse } from '@service/exam/types';

type Props = {
  onFocus: (id) => void;
};

const ExamsTable: FC<Props> = ({ onFocus }) => {
  const { userId } = useSystemContext();

  const examList = useFetchExams({ created_id: 'abc' });

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
        sorter: (a, b) => a.range - b.range,
        render: (level) => <Tag color="green">{LevelEnum[level]}</Tag>,
        filters: Object.entries(LevelEnum).map(([key, value]) => ({
          text: value,
          value: key,
        })),
        onFilter: (value, record) => record?.range == parseInt(value),
      },
      {
        title: 'Điểm tối đa',
        dataIndex: 'max_point',
        width: '10%',
        sorter: (a, b) => a.maxPoint - b.maxPoint,
      },
      {
        title: 'Thời gian làm bài',
        dataIndex: 'duration',
        width: '10%',
        sorter: (a, b) => a.workingTime - b.workingTime,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created_date',
        width: '20%',
        sorter: (a, b) => a.created_date - b.created_date,
        render: (created_date) => moment(created_date).format('LLL'),
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
              <Button icon={<EditOutlined />} size="small" type="link" />
              <Popconfirm
                title="Bạn có chắc chắn xoá？"
                icon={<QuestionCircleOutlined />}
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
