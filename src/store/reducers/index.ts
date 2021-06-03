import { combineReducers } from 'redux';
// Imports: Reducers
import apps, {IRSapps} from './apps'
import todos, {IRStodos} from './todos'
import auth, {IRSauth} from './auth'

export interface IRState {
    apps: IRSapps,
    auth: IRSauth,
    todos: IRStodos,
}

// Redux: Root Reducer
const rootReducer = combineReducers({
    apps,
    auth,
    todos,
});
// Exports
export default rootReducer;