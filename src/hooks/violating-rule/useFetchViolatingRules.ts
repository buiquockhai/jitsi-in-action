import { useQuery } from '@tanstack/react-query';
import { violatingService } from '@service/router';
import { GetViolatingRuleRequest } from '@service/violating-rule/types';

export const GET_VIOLATING_RULES = 'GET_VIOLATING_RULES';

export function useFetchViolatingRules(req: GetViolatingRuleRequest) {
  const res = useQuery([GET_VIOLATING_RULES, JSON.stringify(req)], () =>
    violatingService.getViolatingRules(req)
  );
  return res.data?.data;
}
