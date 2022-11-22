import { Descriptions } from 'antd';

const StudentList = () => {
  return (
    <div className="w-full min-h-full flex flex-col gap-3">
      <Descriptions size="small" column={1} title="Thông tin phòng thi">
        <Descriptions.Item label="Tên phòng thi">
          Toán lớp 11 nâng cao học kì I
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian bắt đầu">
          11:00 20/08/2022
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian làm bài">45 phút</Descriptions.Item>
        <Descriptions.Item label="Số lượng tham gia">50</Descriptions.Item>
        <Descriptions.Item label="Giảng viên coi thi">
          Bùi Quốc Khải
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size="small" column={1} title="Thông tin sinh viên">
        <Descriptions.Item label="Tên đầy đủ">Bùi Quốc Khải</Descriptions.Item>
        <Descriptions.Item label="Mã số">1771726</Descriptions.Item>
        <Descriptions.Item label="Trạng thái điểm danh">
          Đã điểm danh
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái nộp bài">
          Chưa nộp bài
        </Descriptions.Item>
        <Descriptions.Item label="Số lần cảnh cáo">2</Descriptions.Item>
        <Descriptions.Item label="Điểm trừ cảnh cáo">0.25</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default StudentList;
