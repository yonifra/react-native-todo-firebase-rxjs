import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(persistedReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {store, persistor};
export default store;
