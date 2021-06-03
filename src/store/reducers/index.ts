import {combineReducers} from 'redux';
// Imports: Reducers
import apps from './apps';
import todos from './todos';
import auth from './auth';

// Redux: Root Reducer
const rootReducer = combineReducers({
  apps,
  auth,
  todos,
});
// Exports
export default rootReducer;
