import { createSlice } from "@reduxjs/toolkit";

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const accountSlice = createSlice({
  /**
   * Unique feature name
   */
  name: "account",

  /**
   * Initial state object
   */
  initialState: {},

  /**
   * Reducers are functions that determine changes to an application's state.
   */
  reducers: {
    setAccount: (state, action) => {
      return { ...state, ...action.payload };
    },

    reset: () => {},
    // Add here reducers
    // ...
  },

  extraReducers: (builder) => {},
});

/**
 * Reducers are exported so they could be added to store
 */
export const accountReducer = accountSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const accountActions = { ...accountSlice.actions };
