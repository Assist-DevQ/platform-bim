import { projectIdConstants } from '../_constants';

export function project(state = {}, action) {
  switch (action.type) {
    case projectIdConstants.GET_REQUEST:
      return {
        loading: true
      };
    case projectIdConstants.GET_SUCCESS:
      return action.project;
    case projectIdConstants.GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}