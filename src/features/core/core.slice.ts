import { createSlice } from "@reduxjs/toolkit";

import { Core } from ".";

const initialState: Core = {
  isMenuCollapsed: false,
};

const coreSlice = createSlice({
  name: "core",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    toggleMenu: (state) => {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
  },
});

export const coreReducer = coreSlice.reducer;
export const coreActions = { ...coreSlice.actions };
