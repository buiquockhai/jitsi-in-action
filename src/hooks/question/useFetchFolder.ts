import { GetFolderRequest } from '@schema/questions';
import { useQuery } from '@tanstack/react-query';
import { client } from '@util/apis';

const queryKey = 'GET_FOLDER';

export function useFetchFolder(params?: GetFolderRequest) {
  return useQuery([queryKey], () => client.getFolders(params ?? {}));
}
