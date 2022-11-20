import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { message } from 'antd';
import { UpdateQuestionRequest } from '@service/question/types';

export function useUpdateQuestion(invalidateKeys?: Array<string | string[]>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateQuestionRequest) =>
      questionService.updateQuestion(data),
    onSuccess: () => {
      message.success('Chỉnh sửa câu hỏi thành công');
    },
    onError: () => {
      message.error('Chỉnh sửa câu hỏi không thành công');
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
