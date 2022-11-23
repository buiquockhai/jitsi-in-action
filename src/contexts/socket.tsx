import { GET_RESULTS } from '@hook/result/useFetchResult';
import { GET_ROOM_DETAIL } from '@hook/room/useFetchRoomDetail';
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

  const { push } = useRouter();

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
        queryClient.invalidateQueries([GET_ROOM_DETAIL, GET_RESULTS]);
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

    return () => {
      Object.values(SocketListener).forEach((item) => {
        socket.off(item);
      });
    };
  }, [api, role, userId, push, queryClient]);

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
