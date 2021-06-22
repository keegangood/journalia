import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  accessToken: null, // logged in user's current access token
  isAuthenticated: false, // boolean indicating if a user is logged in
  user: null, // object with auth user data
  status: "IDLE", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
  messages: [], // response messages
  errors: [], // response errors
};

const BASE_URL = "http://localhost:8000/users";
const headers = {
  "Content-Type": "application/json",
};

export const login = createAsyncThunk(
  "users/login",
  async (formData, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/login/", {
      method: "POST",
      headers: headers,
      credentials: "include", // to set cookies
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (formData, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/token/", {
      method: "POST",
      headers: headers,
      credentials: "include", // to set cookies
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const requestAccessToken = createAsyncThunk(
  "users/requestAccessToken",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/token/", {
      method: "GET",
      headers: headers,
      credentials: "include", // to set cookies
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

export const logout = createAsyncThunk(
  "users/requestAccessToken",
  async (user, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/logout/", {
      method: "POST",
      headers: headers,
      credentials: "include", // to set cookies
      body: JSON.stringify({user})
    });

    const data = await response.json();

    console.log(data)

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken(state, action) {
      return {
        accessToken: action.payload,
      };
    },
    setMessages(state, action) {
      return {
        messages: [...state.messages, ...action.payload],
      };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      if (state.status === "IDLE") {
        state.status = "PENDING";
      }
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.messages = [...state.messages, ...action.payload.messages];
        state.formData = {};
        state.status = "IDLE";
      }
    },
    [login.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.messages = [...state.messages, ...action.payload.messages];
      state.formData = {};
      state.status = "IDLE";
    },

    [requestAccessToken.pending]: (state, action) => {
      state.status = "PENDING";
    },
    [requestAccessToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.status = "IDLE";
    },
    [requestAccessToken.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.errors = [...state.errors, "loading token failed"];
      state.status = "IDLE";
    },

    [logout.pending]: (state,action) => {
      state.pending = "PENDING";
    },
    [logout.fulfilled]: (state,action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.status =  "IDLE";
    },
    [logout.rejected]: (state,action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.status =  "IDLE";
    }
  },
});

export const { setAccessToken, setErrors, setMessages } = AuthSlice.actions;

export default AuthSlice.reducer;
