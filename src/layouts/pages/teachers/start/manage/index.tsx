import cx from 'classnames';
import { Fragment } from 'react';
import { useFetchExamDetail } from '@hook/exam/useFetchExamDetail';
import { useFetchResults } from '@hook/result/useFetchResult';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { RequestJoinRoomStatusEnum } from '@util/constant';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { useFetchViolatingRules } from '@hook/violating-rule/useFetchViolatingRules';
import { useFetchUserInRoom } from '@hook/user-room/useFetchUserRoom';
import { DownCircleTwoTone } from '@ant-design/icons';

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
                {user.verified === 'Y' ? (
                  <div className="flex gap-2 text-green-600 items-center">
                    <DownCircleTwoTone twoToneColor="#68B984" />
                    <p>Đã xác thực</p>
                  </div>
                ) : null}
                {user.verified === 'N' && user.status === '2' ? (
                  <p className="text-gray-400">Chưa xác thực</p>
                ) : null}
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
