import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

import i18n from "&config/i18n";
import { EmployeeRecord, Employees } from "./index.d";
import { trackPromise } from "react-promise-tracker";

const { REACT_APP_BASE_URL = "" } = process.env;

const initialState: Employees = {
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

const getEmployees = createAsyncThunk(
  "employees/getEmployeesStatus",
  async (_, { rejectWithValue }) => {
    try {
      const pathname = "/employee";
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

const addEmployee = createAsyncThunk(
  "clients/addClientStatus",
  async (
    { firstName, lastName, ...clientBody }: EmployeeRecord,
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

      return dispatch(getEmployees());
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);
const employeesSlice = createSlice({
  name: "employees",
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
      .addCase(getEmployees.pending, (state) => {
        state.pending = true;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.pending = false;
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      });

    builder
      .addCase(addEmployee.fulfilled, (state) => {
        state.pending = false;
        message.success(i18n.t("employees:EMPLOYEE_ADDED"));
      })
      .addCase(addEmployee.rejected, (state) => {
        state.pending = false;
      })
      .addCase(addEmployee.pending, (state, { payload }) => {
        state.pending = true;
      });
  },
});

export const employeesReducer = employeesSlice.reducer;

export const employeesActions = {
  ...employeesSlice.actions,
  getEmployees,
  addEmployee,
};
