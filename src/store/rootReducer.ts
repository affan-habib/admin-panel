import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
