// src/store/index.js

import { createStore, combineReducers } from 'redux';
import notificationsReducer, {NotificationsState} from './notifications';
import userReducer, { UserState } from './user'

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;