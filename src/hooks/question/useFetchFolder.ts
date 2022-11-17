import { GetFolderRequest } from '@schema/questions';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@service/router';

const queryKey = 'GET_FOLDER';

export function useFetchFolder(params?: GetFolderRequest) {
  return useQuery([queryKey], () => userService.getFolders(params ?? {}));
}
