import { GET_RESULTS } from '@hook/result/useFetchResult';
import { GET_ROOM_DETAIL } from '@hook/room/useFetchRoomDetail';
import { GET_USER_IN_ROOM } from '@hook/user-room/useFetchUserRoom';
import { GET_VIOLATING_RULES } from '@hook/violating-rule/useFetchViolatingRules';
import { useQueryClient } from '@tanstack/react-query';
import { RoleEnum } from '@util/constant';
import { createContext } from '@util/createContext';
import { ROUTES } from '@util/routes';
import { notification, message } from 'antd';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSystemContext } from './system';

type SocketContextProps = {
  socket: Socket;
  openWaiting: boolean;
  setOpenWaiting: Dispatch<SetStateAction<boolean>>;
};

export const SocketListener = {
  connect: 'connect',
  disconnect: 'disconnect',

  serverFeedbackSubmitExam: 'server-feedback-submit-exam',
  serverFeedbackRejectExam: 'server-feedback-reject-exam',
  serverFeedbackJoinRoom: 'server-feedback-join-room',
  serverFeedbackAcceptJoinRoom: 'server-feedback-accept-join-room',
  serverFeedbackRejectJoinRoom: 'server-feedback-reject-join-room',
  serverFeedbackCancelJoinRoom: 'server-feedback-cancel-join-room',
  serverFeedbackUpdateAnswer: 'server-feedback-update-answer',
  serverFeedbackForceLeave: 'server-feedback-force-leave',
  serverFeedbackPenalty: 'server-feedback-penalty',
  serverFeedbackCloseRoom: 'server-feedback-close-room',
  serverFeedbackOpenRoom: 'server-feedback-open-room',
  serverFeedbackStudentSubmit: 'server-feedback-student-submit',
  serverFeedbackTeacherAuth: 'server-feedback-teacher-auth',
  serverFeedbackKickOut: 'server-feedback-kick-out',
} as const;

export const SocketEmitter = {
  clientSendSubmitExam: 'client-send-submit-exam',
  clientSendRejectExam: 'client-send-reject-exam',
} as const;

const socket = io(process.env.NEXT_PUBLIC_BASE_URL ?? '');

const [Provider, useSocketContext] = createContext<SocketContextProps>({
  name: 'socket',
});

const SocketContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [openWaiting, setOpenWaiting] = useState(false);

  const { push, replace } = useRouter();

  const { role, userId } = useSystemContext();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    socket.on(SocketListener.connect, () => {
      console.log('Socket connect successful!');
    });

    socket.on(SocketListener.disconnect, () => {
      console.log('Socket disconnect successful!');
    });

    socket.on(SocketListener.serverFeedbackSubmitExam, (data) => {
      if (role === RoleEnum.admin) {
        api.info({
          placement: 'bottomRight',
          message: data.message,
          description: data.description,
        });
      }
    });

    socket.on(SocketListener.serverFeedbackRejectExam, (data) => {
      if (userId === data.target) {
        api.warning({
          placement: 'bottomRight',
          message: data.message,
          description: data.description,
        });
      }
    });

    socket.on(SocketListener.serverFeedbackJoinRoom, (data) => {
      if (userId === data.proctorId) {
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
      }
    });

    socket.on(SocketListener.serverFeedbackAcceptJoinRoom, (data) => {
      if (userId === data.studentId) {
        push(ROUTES.STUDENT_START(data.roomId));
        setOpenWaiting(false);
      }
    });

    socket.on(SocketListener.serverFeedbackRejectJoinRoom, (data) => {
      if (userId === data.studentId) {
        message.error('Bị từ chối tham gia phòng thi!');
        setOpenWaiting(false);
      }
    });

    socket.on(SocketListener.serverFeedbackCancelJoinRoom, (data) => {
      if (userId === data.proctorId) {
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_RESULTS]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
      }
    });

    socket.on(SocketListener.serverFeedbackUpdateAnswer, (data) => {
      if (userId === data.proctorId) {
        queryClient.invalidateQueries([GET_RESULTS]);
      }
    });

    socket.on(SocketListener.serverFeedbackForceLeave, (data) => {
      if (userId === data.studentId) {
        push(ROUTES.STUDENT_SCHEDULE);
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
        api.error({
          placement: 'bottomRight',
          message: 'Bị buộc rời khỏi phòng thi',
          description:
            'Bạn đã bị giám thị mời ra khỏi phòng thi. Vui lòng liên hệ với cán bộ xem thi để biết thêm chi tiết.',
        });
      }
    });

    socket.on(SocketListener.serverFeedbackPenalty, (data) => {
      if (userId === data.studentId) {
        api.warning({
          placement: 'bottomRight',
          message: 'Trừ điểm cảnh cáo',
          description:
            'Bạn bị giám thị cảnh cáo trừ 0.5 điểm. Hãy chú ý nghiêm túc tham gia bài kiểm tra.',
        });

        queryClient.invalidateQueries([GET_VIOLATING_RULES]);
      }
    });

    socket.on(SocketListener.serverFeedbackCloseRoom, (data) => {
      if (data.studentIds?.includes(userId)) {
        api.info({
          placement: 'bottomRight',
          message: 'Kết thúc thi',
          description: 'Giám thị đã đóng phòng thi.',
        });
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
        replace(ROUTES.STUDENT_SCHEDULE);
      }
    });

    socket.on(SocketListener.serverFeedbackOpenRoom, (data) => {
      if (data.studentIds?.includes(userId)) {
        api.success({
          placement: 'bottomRight',
          message: 'Bắt đầu thi',
          description: 'Giám thị đã mở phòng thi.',
        });
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
      }
    });

    socket.on(SocketListener.serverFeedbackStudentSubmit, (data) => {
      if (userId === data.proctorId) {
        api.info({
          placement: 'bottomRight',
          message: 'Bắt đầu thi',
          description: 'Sinh viên đã nộp bài. Vui lòng kiểm tra.',
        });
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
      }
    });

    socket.on(SocketListener.serverFeedbackTeacherAuth, (data) => {
      if (userId === data.studentId) {
        api.info({
          placement: 'bottomRight',
          message: 'Xác thực phòng thi',
          description: `Giáo viên đã ${data.verified === 'N' ? 'huỷ' : ''} xác thực`,
        });
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
      }
    });

    socket.on(SocketListener.serverFeedbackKickOut, (data) => {
      if (userId === data.studentId) {
        api.info({
          placement: 'bottomRight',
          message: 'Rời khỏi phòng thi',
          description: 'Bị bị giám thị mời rời khỏi phòng thi',
        });
        queryClient.invalidateQueries([GET_ROOM_DETAIL]);
        queryClient.invalidateQueries([GET_USER_IN_ROOM]);
        replace(ROUTES.STUDENT_SCHEDULE);
      }
    });

    return () => {
      Object.values(SocketListener).forEach((item) => {
        socket.off(item);
      });
    };
  }, [api, role, userId, push, replace, queryClient]);

  const context: SocketContextProps = {
    socket,
    openWaiting,
    setOpenWaiting,
  };

  return (
    <Provider value={context}>
      {contextHolder}
      {children}
    </Provider>
  );
};

export { useSocketContext };

export default SocketContextProvider;
