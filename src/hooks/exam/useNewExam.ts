import { useMutation, useQueryClient } from '@tanstack/react-query';
import { examService } from '@service/router';
import { message } from 'antd';
import { NewExamRequest } from '@service/exam/types';

export function useNewExam(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewExamRequest) => examService.newExam(data),
    onSuccess: () => {
      message.success('Tạo mới bài thi thành công');
    },
    onError: () => {
      message.error('Tạo mới bài thi không thành công');
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
