import { SocketEmitter, useSocketContext } from '@context/socket';
import { useFetchRoomDetail } from '@hook/room/useFetchRoomDetail';
import { useFetchUsers } from '@hook/user/useFetchUsers';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const ManagePanel = () => {
  const { query } = useRouter();

  const { requestJoinRoom, socket } = useSocketContext();

  const roomDetail = useFetchRoomDetail(query?.id as string);
  const users = useFetchUsers({ group_id: roomDetail?.group_id });

  const handleAccept = (userId: string) => {
    socket.emit(SocketEmitter.clientAcceptJoinRoom, {
      userId: userId,
      roomId: query?.id,
    });
  };

  return (
    <div className="w-full min-h-full p-3 flex flex-col gap-2">
      {users?.map((item) => {
        const status = requestJoinRoom[item.id] ?? '0';

        console.log(status);

        return (
          <div
            key={item.id}
            className="p-2 rounded-sm bg-slate-100 flex flex-col gap-1"
          >
            <p className="font-semibold">{item.name}</p>
            {status === '0' && (
              <p className="text-sm text-gray-500 text-right">Chưa hoạt động</p>
            )}
            {status === '1' && (
              <Fragment>
                <p className="text-sm text-gray-500 text-right">
                  Yêu cầu tham gia...
                </p>
                <div className="flex flex-1 justify-end gap-2">
                  <Button size="small">Từ chối</Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleAccept(item.id)}
                  >
                    Đồng ý
                  </Button>
                </div>
              </Fragment>
            )}
            {status === '2' && (
              <p className="text-sm text-green-600 text-right">Đã tham gia</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManagePanel;
