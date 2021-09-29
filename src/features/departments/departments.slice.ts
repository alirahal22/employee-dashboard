import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

import i18n from "&config/i18n";
import { DepartmentRecord, Departments } from "./index.d";
import { trackPromise } from "react-promise-tracker";

const { REACT_APP_BASE_URL = "" } = process.env;

const initialState: Departments = {
  data: [],
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

const getDepartments = createAsyncThunk(
  "departments/getDepartmentsStatus",
  async (_, { rejectWithValue }) => {
    try {
      const pathname = "/department";
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

const addDepartment = createAsyncThunk(
  "clients/addClientStatus",
  async (
    { name, description, ...clientBody }: DepartmentRecord,
    { rejectWithValue, dispatch }
  ) => {
    try {
      // const pathname = "/billing/client";
      // const headers = { Accept: REACT_APP_ACCEPT_BILLING_V2 };

      // /** Construct body */
      // const body = {
      //   firstName: firstName.trim(),
      //   lastName: lastName.trim(),
      //   email: email.toLowerCase().trim(),
      //   ...clientBody,
      // };

      // /** make api call */
      // await trackPromise(
      //   axios.post(REACT_APP_BASE_URL.concat(pathname), body, {
      //     headers,
      //   })
      // );

      return dispatch(getDepartments());
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);
const departmentsSlice = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setModalVisible: (state, { payload }) => {
      state.isModalVisible = payload;
    },
    setFormValues: (state, { payload }) => {
      state.initialValues = { ...payload };
    },
    resetFormValues: (state) => {
      state.initialValues = initialState.initialValues;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDepartments.rejected, (state) => {
        state.pending = false;
      })
      .addCase(getDepartments.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      });

    builder
      .addCase(addDepartment.fulfilled, (state) => {
        state.pending = false;
        message.success(i18n.t("departments:DEPARTMENT_ADDED"));
      })
      .addCase(addDepartment.rejected, (state) => {
        state.pending = false;
      })
      .addCase(addDepartment.pending, (state, { payload }) => {
        state.pending = true;
      });
  },
});

export const departmentsReducer = departmentsSlice.reducer;

export const departmentsActions = {
  ...departmentsSlice.actions,
  getDepartments,
  addDepartment,
};
