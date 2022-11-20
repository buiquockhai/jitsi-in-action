import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { message } from 'antd';
import { NewQuestionRequest } from '@service/question/types';

export function useNewQuestion(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewQuestionRequest) => questionService.newQuestion(data),
    onSuccess: () => {
      message.success('Tạo mới câu hỏi thành công');
    },
    onError: () => {
      message.error('Tạo mới câu hỏi không thành công');
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
