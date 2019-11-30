import { scenarioConstants } from '../_constants';

export function scenarios(state = {}, action) {
  switch (action.type) {
    //get
    case scenarioConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case scenarioConstants.GETALL_SUCCESS:
      return {
        items: action.scenarios
      }
    case scenarioConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    //add
    case scenarioConstants.ADD_REQUEST:
      return { ...state, adding: true };
    case scenarioConstants.ADD_SUCCESS:
      action.scenario.id = Number(action.scenario.id);
      return {
        ...state,
        items: [...state.items, action.scenario]
      };
    case scenarioConstants.ADD_FAILURE:
      return {};
    default:
      return state
  }
}