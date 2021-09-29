import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

import i18n from "&config/i18n";
import { EmployeeRecord, Employees } from "./index.d";
import { trackPromise } from "react-promise-tracker";

const { REACT_APP_BASE_URL = "" } = process.env;

const initialState: Employees = {
  data: [],
  countries: [],
  cities: [],
  initialValues: {},
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
const getCountries = createAsyncThunk(
  "employees/getCountriesStatus",
  async (_, { rejectWithValue }) => {
    try {
      /** make api call */
      const response = await trackPromise(
        axios.get("https://countriesnow.space/api/v0.1/countries/positions")
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);
const getCities = createAsyncThunk(
  "employees/getCitiesStatus",
  async ({ country }: any, { rejectWithValue, dispatch }) => {
    try {
      // /** Construct body */

      const body = {
        country,
      };

      // /** make api call */
      const response = await trackPromise(
        axios.post("https://countriesnow.space/api/v0.1/countries/cities", body)
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const addEmployee = createAsyncThunk(
  "clients/addClientStatus",
  async (
    { _id, ...employee }: EmployeeRecord,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const pathname = "/employee";

      // /** Construct body */
      const body = {
        ...employee,
      };

      // /** make api call */
      await trackPromise(
        axios.post(REACT_APP_BASE_URL.concat(pathname), body, {})
      );

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
      .addCase(getCountries.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCountries.rejected, (state) => {
        state.pending = false;
      })
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        state.pending = false;
        console.log(payload);
        state.countries = payload.data.map(({ name }: any) => name);
      });
    builder
      .addCase(getCities.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCities.rejected, (state) => {
        state.pending = false;
      })
      .addCase(getCities.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.cities = payload.data.map((name: any) => name);
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
  getCountries,
  getCities,
};
