import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { projects } from './projects.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { scenarios } from './scenarios.reducer';
import { project } from './projectId.reducer';
import {scenario} from './scenarioId.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  projects,
  project,
  scenarios,
  scenario,
  users,
  alert
});
export default rootReducer;