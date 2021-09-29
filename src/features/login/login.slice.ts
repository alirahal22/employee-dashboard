import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

import { Login } from ".";
import { departmentsActions } from "&features/departments/departments.slice";

const initialState: Login = {
  username: undefined,
  token: undefined,
  isLoggedIn: false,
  timestamp: undefined,
};

const logIn = createAsyncThunk(
  "login/loginStatus",
  async ({ username, password }: any, { rejectWithValue }) => {
    try {
      /** make api call */
      if (username !== "admin" || password !== "admin") throw new Error();
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);

const logOut = createAsyncThunk(
  "login/logoutStatus",
  async (_, { dispatch }) => {
    // Dispatch all reset actions needed here
    dispatch(loginActions.reset());
    dispatch(departmentsActions.reset());
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.rejected, (state) => {
        state.isLoggedIn = false;
        message.error(
          "Wrong username or password! Please check your credentials and try again."
        );
      })
      .addCase(logIn.fulfilled, (state, { payload, meta: { arg } }) => {
        const { username } = arg;

        state.username = username;
        state.isLoggedIn = true;
        state.timestamp = new Date().getTime();
      });
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const loginReducer = loginSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const loginActions = {
  ...loginSlice.actions,
  logIn,
  logOut,
};
