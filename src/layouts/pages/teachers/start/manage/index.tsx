import cx from 'classnames';
import { useState, Fragment } from 'react';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchResults } from '@hook/result/useFetchResult';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { RequestJoinRoomStatusEnum } from '@util/constant';
import { useRouter } from 'next/router';
import { Button, Modal, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { useFetchUserInRoom } from '@hook/user-room/useFetchUserRoom';
import GetOutDescription from './get-out-description';
import PenaltyDescription from './penalty.description';

type GetOutProps = {
  open: boolean;
  studentId: string;
};

const initialGetOut: GetOutProps = {
  open: false,
  studentId: '',
};

const TeacherStartManage = () => {
  const { query } = useRouter();

  const roomDetail = useFetchRoomDetail(query.id as string);
  const memberInRoom = useFetchUserInRoom({ room_id: query.id as string });
  const examDetail = useFetchExamDetail(roomDetail?.exam_id ?? '');
  const results = useFetchResults({
    room_id: query.id as string,
  });
  const violatingRules = useFetchViolatingRules({ room_id: query.id as string });

  const [getOut, setGetOut] = useState<GetOutProps>(initialGetOut);
  const [penalty, setPenalty] = useState<GetOutProps>(initialGetOut);

  const handleViewDetailPenalty = (userId: string, name: string) => {
    const penalties = violatingRules?.filter((item) => item.user_id === userId);
    Modal.info({
      title: name,
      content: (
        <ul className="list-disc">
          {penalties?.map((item) => (
            <li key={item.id}>{item.description || '__'}</li>
          ))}
        </ul>
      ),
    });
  };

  const handleViewGetOut = (description: string, name: string) => {
    Modal.info({
      title: name,
      content: <p>{description}</p>,
    });
  };

  return (
    <Fragment>
      <GetOutDescription {...getOut} onClose={() => setGetOut(initialGetOut)} />
      <PenaltyDescription {...penalty} onClose={() => setPenalty(initialGetOut)} />
      <ul className="space-y-5">
        {(memberInRoom ?? []).map((user) => {
          const penaltyPoint =
            violatingRules?.reduce(
              (sum, item) =>
                item.user_id === user.user_id
                  ? sum + parseFloat(item.minus_point)
                  : sum,
              0
            ) ?? 0;

          return (
            <div className="space-y-5" key={user.id}>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <p className="w-52 truncate">
                    <b>Tên</b>: {user?.tb_user.name}
                  </p>
                  <p className="w-40 truncate">
                    <b>Mã</b>: {user?.tb_user.code}
                  </p>
                  <p
                    className={cx('w-52 truncate', {
                      'text-red-500': penaltyPoint > 0,
                    })}
                  >
                    <b>Điểm trừ</b>: {penaltyPoint}{' '}
                    <a
                      className={cx({
                        hidden: penaltyPoint <= 0,
                      })}
                      onClick={() =>
                        handleViewDetailPenalty(user.user_id, user.tb_user.name)
                      }
                    >
                      (Xem lí do)
                    </a>
                  </p>
                  <p>
                    <b>Trạng thái</b>:{' '}
                    <span
                      className={cx('text-gray-500', {
                        'text-green-500': user.status === '2',
                      })}
                    >
                      {RequestJoinRoomStatusEnum[user.status]}
                    </span>{' '}
                    <a
                      className={cx({
                        hidden: user.description?.length <= 0,
                      })}
                      onClick={() =>
                        handleViewGetOut(user.description, user.tb_user.name)
                      }
                    >
                      (Xem lí do bị buộc rời)
                    </a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <Popconfirm
                    title="Bạn có chắc chắn muốn trừ điểm cảnh cáo vi phạm. Mỗi lần cảnh cáo thí sinh sẽ bị trừ 0.5 điểm vào kết quả thi."
                    icon={<QuestionCircleOutlined />}
                    onConfirm={() =>
                      setPenalty({
                        open: true,
                        studentId: user.user_id,
                      })
                    }
                  >
                    <Button size="small" danger disabled={user.status !== '2'}>
                      Trừ điểm cảnh cáo
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có chắc chắn bắt buộc thí sinh nộp bài. Thí sẽ đồng thời sẽ bị đuổi ra khỏi phòng thi."
                    icon={<QuestionCircleOutlined />}
                    onConfirm={() =>
                      setGetOut({
                        open: true,
                        studentId: user.user_id,
                      })
                    }
                  >
                    <Button size="small" danger disabled={user.status !== '2'}>
                      Buộc nộp bài
                    </Button>
                  </Popconfirm>
                </div>
              </div>

              <ul className="flex overflow-x-auto border">
                {(examDetail?.questionList ?? []).map((question, index) => {
                  const answer = results?.find(
                    (item) =>
                      item.question_id === question.id &&
                      item.created_id === user.user_id
                  );

                  return (
                    <div
                      key={question.id}
                      className="flex flex-col border-l last:border-r"
                    >
                      <div className="w-16 h-16 bg-slate-100 flex items-center justify-center border-b">
                        {index + 1}
                      </div>
                      <div className="w-16 h-16 flex items-center justify-center">
                        {answer?.selected_answer_label ?? ''}
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default TeacherStartManage;
