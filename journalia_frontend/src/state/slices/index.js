import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import CalendarSlice from "./CalendarSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  calendar: CalendarSlice
});

export default rootReducer;
