import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import {
  GetConfigurationRequest,
  GetConfigurationResponse,
  UpdateConfigurationRequest,
} from './types';
import { BaseResponse } from '@schema/system';

class Configuration extends Client {
  public getConfigurationList(req: GetConfigurationRequest) {
    return fetcher<BaseResponse<GetConfigurationResponse[]>>(
      `${this.baseUrl}/v1/configuration?${qs.stringify(req)}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public updateConfiguration(req: UpdateConfigurationRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/configuration`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }

  public newConfiguration(req: UpdateConfigurationRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/configuration`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }
}

const configurationService = new Configuration();

export { configurationService };
