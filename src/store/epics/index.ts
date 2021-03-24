import { combineEpics } from 'redux-observable';

import {getTodosEpic, addTodoEpic, editTodoEpic, deleteTodoEpic} from './todos'

export const rootEpic = combineEpics(
    getTodosEpic,
    addTodoEpic,
    editTodoEpic,
    deleteTodoEpic
);

export default rootEpic;