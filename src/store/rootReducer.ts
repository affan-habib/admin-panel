import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";

const rootReducer = combineReducers({
  // products: productsSlice.reducer,
  auth: authSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
