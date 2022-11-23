import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { uuidVerify } from '@util/functions';
import {
  GetViolatingRuleRequest,
  GetViolatingRuleResponse,
  NewViolatingRuleRequest,
  UpdateViolatingRuleRequest,
} from './types';

class ViolatingRule extends Client {
  public getViolatingRules(req: GetViolatingRuleRequest) {
    return fetcher<BaseResponse<GetViolatingRuleResponse[]>>(
      `${this.baseUrl}/v1/violating?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public newViolatingRule(req: NewViolatingRuleRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/violating`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public updateViolatingRule(req: UpdateViolatingRuleRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/violating`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const violatingService = new ViolatingRule();

export { violatingService };
