import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null, // logged in user's current access token
  isAuthenticated: false, // boolean indicating if a user is logged in
  user: null, // object with auth user data
  status: "idle", // status of async operation
  messages: [], // response messages
};

const BASE_URL = "http://localhost:8000/users";

// Axios config object
const headers = {
  "Content-Type": "application/json",
  // withCredentials: true, // required to set the refreshtoken cookie in the browser!!!
};

export const login = createAsyncThunk(
  "users/loginStatus",
  async (formData, { rejectWithValue }) => {
    // const { accessToken, loading } = getState().auth
    // if (loading !== 'pending' || accessToken) {
    //   return
    // }
    try {
      const response = await fetch(BASE_URL + "/login/", {
        method: "POST",
        headers: headers,
        credentials: "include", // to set cookies
        body: JSON.stringify(formData),
      });

      return response.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "users/loadUserStatus",
  async (accessToken, thunkAPI) => {
    const response = await fetch(BASE_URL + "/auth/", {
      method: "GET",
      credentials: "include", // to set cookies
      headers: { ...headers, authorization: `Token ${accessToken}` },
    });

    return response.json();
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
      state.formData = action.meta.arg;
    },
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.messages = action.payload.messages;
      state.isAuthenticated = true;
      state.formData = {};
    },
    [login.rejected]: (state, action) => {
      state.messages = action.payload.messages;
      state.isAuthenticated = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [loadUser.rejected]: (state, action) => {
      state.messages = action.payload.messages;
    },
  },
});

export const { setAccessToken, setUser, setErrors, setMessages } =
  AuthSlice.actions; //setMessages, setUser, setIsAuthenticated } =

export default AuthSlice.reducer;
