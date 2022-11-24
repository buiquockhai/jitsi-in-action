import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomService } from '@service/router';
import { StudentSubmitRequest } from '@service/room/types';
import { message } from 'antd';

export function useStudentSubmit(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: StudentSubmitRequest) => roomService.studentSubmit(req),
    onSuccess: () => {
      message.success('Nộp bài thành công');
    },
    onError: () => {
      message.error('Nộp bài không thành công');
    },
    onSettled: () => {
      if ((invalidateKeys ?? []).length > 0) {
        invalidateKeys?.forEach((item) =>
          queryClient.invalidateQueries({ queryKey: [item].flat() })
        );
      }
    },
  });
}
