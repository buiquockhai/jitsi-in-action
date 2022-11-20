import { useQuery } from '@tanstack/react-query';
import { configurationService } from '@service/router';
import { GetConfigurationRequest } from '@service/configuration/types';

export const GET_CONFIGURATION_LIST = 'GET_CONFIGURATION_LIST';

export function useFetchConfiguration(req: GetConfigurationRequest) {
  const res = useQuery([GET_CONFIGURATION_LIST, JSON.stringify(req)], () =>
    configurationService.getConfigurationList(req)
  );
  return res.data?.data;
}
