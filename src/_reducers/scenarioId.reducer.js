import { scenarioIdConstants } from '../_constants';

export function scenario(state = {}, action) {
  switch (action.type) {
    case scenarioIdConstants.GET_REQUEST:
      return {
        loading: true
      };
    case scenarioIdConstants.GET_SUCCESS:
      return action.scenario;
    case scenarioIdConstants.GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}