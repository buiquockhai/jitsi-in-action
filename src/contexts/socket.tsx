import { RequestJoinRoomStatusTypes, RoleEnum } from '@util/constant';
import { createContext } from '@util/createContext';
import { ROUTES } from '@util/routes';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSystemContext } from './system';

type SocketContextProps = {
  socket: Socket;
  requestJoinRoom: Record<string, RequestJoinRoomStatusTypes>;
  setRequestJoinRoom: Dispatch<
    SetStateAction<Record<string, RequestJoinRoomStatusTypes>>
  >;
};

export const SocketListener = {
  connect: 'connect',
  disconnect: 'disconnect',

  serverFeedbackSubmitExam: 'server-feedback-submit-exam',
  serverFeedbackRejectExam: 'server-feedback-reject-exam',
  serverFeedbackJoinRoom: 'server-feedback-join-room',
  serverFeedbackAcceptJoinRoom: 'server-feedback-accept-join-room',
} as const;

export const SocketEmitter = {
  clientSendSubmitExam: 'client-send-submit-exam',
  clientSendRejectExam: 'client-send-reject-exam',
  clientSendCreateRoom: 'client-send-create-room',
  clientSendJoinRoom: 'client-send-join-room',
  clientAcceptJoinRoom: 'client-accept-join-room',
} as const;

const socket = io(process.env.NEXT_PUBLIC_BASE_URL ?? '');

const [Provider, useSocketContext] = createContext<SocketContextProps>({
  name: 'socket',
});

const SocketContextProvider = ({ children }) => {
  const { push } = useRouter();

  const { role, userId } = useSystemContext();

  const [requestJoinRoom, setRequestJoinRoom] = useState<
    Record<string, RequestJoinRoomStatusTypes>
  >({});

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
      setRequestJoinRoom((state) => ({
        ...state,
        [data.studentId]: '1',
      }));
    });

    socket.on(SocketListener.serverFeedbackAcceptJoinRoom, (data) => {
      setRequestJoinRoom((state) => ({
        ...state,
        [data.userId]: '2',
      }));

      if (userId === data.userId) {
        push(ROUTES.STUDENT_START(data.roomId));
      }
    });

    return () => {
      Object.values(SocketListener).forEach((item) => {
        socket.off(item);
      });
    };
  }, [api, role, userId, setRequestJoinRoom, push]);

  const context: SocketContextProps = {
    socket,
    requestJoinRoom,
    setRequestJoinRoom,
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
