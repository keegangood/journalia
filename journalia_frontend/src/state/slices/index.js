import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
});

export default rootReducer;
