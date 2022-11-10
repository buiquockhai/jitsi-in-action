import { Breadcrumb, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuestionListContext } from './context';

export function QuestionListPath() {
  const { path, setPath } = useQuestionListContext();

  return (
    <div className="w-full flex flex-row gap-5 justify-between items-baseline">
      <Breadcrumb>
        <Breadcrumb.Item>
          <button onClick={setPath.bind(null, [])}>Danh sách câu hỏi</button>
        </Breadcrumb.Item>
        {path?.map((item) => (
          <Breadcrumb.Item key={item?.key}>{item?.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <div className="flex flex-row gap-2">
        <Button icon={<PlusOutlined />} type="primary">
          Câu hỏi
        </Button>
        <Button icon={<PlusOutlined />}>Thư mục</Button>
        <Input.Search placeholder="Tìm câu hỏi" allowClear style={{ width: 200 }} />
      </div>
    </div>
  );
}
