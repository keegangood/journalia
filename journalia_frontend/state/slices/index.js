import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './auth/AuthSlice';

const rootReducer = combineReducers({
  AuthSlice
})

export default rootReducer;