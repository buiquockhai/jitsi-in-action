import { useQuery } from '@tanstack/react-query';
import { questionService } from '@service/router';
import { GET_FOLDER } from './keys';
import { GetFolderRequest } from '@service/question/types';

export function useFetchFolder(req: GetFolderRequest) {
  const res = useQuery([GET_FOLDER], () => questionService.getFolder(req));
  return res.data?.data;
}
