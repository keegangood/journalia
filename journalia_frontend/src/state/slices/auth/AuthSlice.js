import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null, // logged in user's current access token
  isAuthenticated: false, // boolean indicating if a user is logged in
  user: null, // object with auth user data
  status: "IDLE", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
  messages: [], // response messages
};

const BASE_URL = "http://localhost:8000/users";

// Axios config object
const headers = {
  "Content-Type": "application/json",
  // withCredentials: true, // required to set the refreshtoken cookie in the browser!!!
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

// export const register = async (formData) => {
//   await axios
//     .post(BASE_URL + "/", formData, config)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err.response));
// };

// export const requestAccessToken = async () => {
//   await axios
//     .get(BASE_URL + "/token/")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err));
// };

// export const logout = async (url) => {
//   await axios
//     .post(BASE_URL + "/logout/")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err));
// };

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
        messages: [...state.messages, action.payload],
      };
    },

    setUser(state, action) {
      return {
        user: action.payload,
      };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      if (state.status === "idle") {
      }
    },
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.messages = action.payload.messages;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.formData = {};
    },
    [login.rejected]: (state, action) => {
      state.messages = action.payload.messages;
      state.isAuthenticated = false;
    },

    [requestAccessToken.fulfilled]: (state,action) => {
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    [requestAccessToken.rejected]: (state,action) => {
      state.accessToken = null
      state.isAuthenticated = false
      state.user = null
      state.errors = action.payload
    }
  },
});

export const { setAccessToken, setUser, setErrors, setMessages } =
  AuthSlice.actions; //setMessages, setUser, setIsAuthenticated } =

export default AuthSlice.reducer;
