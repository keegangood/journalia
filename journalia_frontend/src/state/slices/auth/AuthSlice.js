import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null, // logged in user's current access token
  isAuthenticated: false, // boolean indicating if a user is logged in
  messages: null, // response messages
  user: null, // object with auth user data
  // loading: true, // no response yet from api (move to appSlice)
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken(state, action) {
      return {
        accessToken: action.payload
      };
    },
    setMessages(state, action) {
      return {
        messages: [...messages, action.payload]
      };
    },
    setUser(state, action) {
      return {
        user: action.payload
      };
    },
    setIsAuthenticated(state, action) {
      return {
        isAuthenticated: action.payload,
      };
    },
  },
});

export const {
  setSunTimes,
  setCoords,
  setLocation,
  toggleForm,
} = authSlice.actions;

export default sunClockSlice.reducer;