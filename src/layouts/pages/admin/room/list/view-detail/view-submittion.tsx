import { useFetchResults } from '@hook/result/useFetchResult';
import { FC } from 'react';
import { GetResultResponse } from '@service/result/types';

type Props = {
  roomId: string;
};

const ViewSubmittion: FC<Props> = ({ roomId }) => {
  const results = useFetchResults(roomId);

  const formatResult = (data?: GetResultResponse[]) => {
    const object = (data ?? []).reduce((obj, item: GetResultResponse) => {
      return {
        ...obj,
        [item.id]: obj[item.id] ? [...obj[item.id], item] : [item],
      };
    }, {} as any);

    return Object.values(object);
  };

  const data = formatResult(results);

  console.log({ data });

  return (
    <div className="space-y-5">
      {(data ?? []).map((item) => {
        const userData = item?.[0]?.tb_user;
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>{userData.name}</p>
              <p className="font-medium underline text-blue-500 cursor-pointer">
                Xem chi tiết
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewSubmittion;
