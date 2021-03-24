import { combineReducers } from 'redux';
// Imports: Reducers
import todos from './todos'

// Redux: Root Reducer
const rootReducer = combineReducers({
    todos,
});
// Exports
export default rootReducer;