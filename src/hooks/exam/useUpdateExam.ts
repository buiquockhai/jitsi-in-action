import { useMutation, useQueryClient } from '@tanstack/react-query';
import { examService } from '@service/router';
import { message } from 'antd';
import { UpdateExamRequest } from '@service/exam/types';

export function useUpdateExam(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateExamRequest) => examService.updateExam(data),
    onSuccess: () => {
      message.success('Cập nhật bài thi thành công');
    },
    onError: () => {
      message.error('Cập nhật bài thi không thành công');
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
