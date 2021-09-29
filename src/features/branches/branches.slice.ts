import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

import i18n from "&config/i18n";
import { BranchRecord, Branches } from "./index.d";
import { trackPromise } from "react-promise-tracker";

const { REACT_APP_BASE_URL = "" } = process.env;

const initialState: Branches = {
  data: [],
  selectedCountry: "",
  initialValues: {
    id: undefined,
    email: "",
    firstName: "",
    lastName: "",
    phone: { code: "961", number: "" },
    customField1: undefined,
    customField2: undefined,
  },
  pending: false,
  isModalVisible: false,
};

const getBranches = createAsyncThunk(
  "branches/getBranchesStatus",
  async (_, { rejectWithValue }) => {
    try {
      const pathname = "/branch";
      // const headers = { Accept: REACT_APP_ACCEPT_BILLING_V2 };

      /** make api call */
      console.log("making api call");
      const response = await trackPromise(
        axios.get(REACT_APP_BASE_URL.concat(pathname))
      );
      console.log("making api call");

      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const addBranch = createAsyncThunk(
  "clients/addClientStatus",
  async (
    { name, country, city }: BranchRecord,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const pathname = "/branch";

      // /** Construct body */
      const body = {
        name,
        country,
        city,
      };

      // /** make api call */
      await trackPromise(axios.post(REACT_APP_BASE_URL.concat(pathname), body));

      return dispatch(getBranches());
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);
const branchesSlice = createSlice({
  name: "branches",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setModalVisible: (state, { payload }) => {
      state.isModalVisible = payload;
    },
    setFormValues: (state, { payload }) => {
      state.initialValues = { ...payload };
    },
    setSelectedCountry: (state, { payload }) => {
      state.selectedCountry = payload;
    },
    resetFormValues: (state) => {
      state.initialValues = initialState.initialValues;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state) => {
        state.pending = true;
      })
      .addCase(getBranches.rejected, (state) => {
        state.pending = false;
      })
      .addCase(getBranches.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      });

    builder
      .addCase(addBranch.fulfilled, (state) => {
        state.pending = false;
        message.success(i18n.t("branches:BRANCH_ADDED"));
      })
      .addCase(addBranch.rejected, (state) => {
        state.pending = false;
      })
      .addCase(addBranch.pending, (state, { payload }) => {
        state.pending = true;
      });
  },
});

export const branchesReducer = branchesSlice.reducer;

export const branchesActions = {
  ...branchesSlice.actions,
  getBranches,
  addBranch,
};
