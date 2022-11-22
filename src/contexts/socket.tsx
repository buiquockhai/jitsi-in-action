import { RoleEnum } from '@util/constant';
import { createContext } from '@util/createContext';
import { notification } from 'antd';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSystemContext } from './system';

type SocketContextProps = {
  socket: Socket;
};

export const SocketListener = {
  connect: 'connect',
  disconnect: 'disconnect',

  serverFeedbackSubmitExam: 'server-feedback-submit-exam',
  serverFeedbackRejectExam: 'server-feedback-reject-exam',
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

    return () => {
      Object.values(SocketListener).forEach((item) => {
        socket.off(item);
      });
    };
  }, [api, role, userId]);

  const context: SocketContextProps = {
    socket,
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
