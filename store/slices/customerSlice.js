import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'


const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getCustomers = createAsyncThunk(
  "customers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const url = "/api/customers";
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const getCustomer = createAsyncThunk(
  "customer",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/customer/show/${id}`;
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const createCustomer = createAsyncThunk(
  "/customer/create",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = "/api/customer/store";
      const { first_name, last_name } = args;
      const body = {
        token,
        full_name: `${first_name.trim()} ${last_name.trim()}`,
        ...args
      }
      const res = await AxiosJwt.post(url, body);
      dispatch(getCustomers())

      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "/customer/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `/api/customer/delete/${id}`;
      const body = {
        token,
        _method: "DELETE",
      };
      const res = await AxiosJwt.post(url, body);
      dispatch(getCustomers())

      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "/customer/update",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `/api/customer/update/${args.id}`;
      const body = {
        token,
        _method: "PUT",
        ...args
      }
      const res = await AxiosJwt.post(url, body);
      dispatch(getCustomers())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  deleteLoading: false,
  api_errors: null,
  success: null,
  customers: [],
  customer: null,
  filtered_customers: [],

  searchInfo: {
    full_name: "",
    customer_reference: "",
    phone_number: "",
  },

  customerInfo: {
    first_name: "",
    last_name: "",
    phone_number: "",
    phone_number_code_id: "",
    email: "",
    customer_reference: "",
  },

  bankInfo: {
    bank_id: "",
    bank_account: "",
    iban: "",
  },

};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
    filterCustomers(state, { payload }) {
      const { full_name, customer_reference, phone_number } = payload;
      if (!full_name && !customer_reference && !phone_number) {
        state.filtered_customers = state.customers

      } else {

        state.filtered_customers = state.customers.filter(customer => {
          if (full_name && customer.full_name.toLowerCase().startsWith(full_name.trim().toLowerCase())) return customer
          if (customer_reference && customer.customer_reference &&
            customer.customer_reference.startsWith(customer_reference.trim())
          ) return customer
          if (phone_number && customer.phone_number.startsWith(phone_number.trim())) return customer
        })

      }

    }
  },

  extraReducers: {
    // getCustomers thunk
    [getCustomers.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getCustomers.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.customers = payload.data;
      state.filtered_customers = payload.data;
    },
    [getCustomers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response?.data || payload.response;
    },

    [getCustomer.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.customer = null;
    },
    [getCustomer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.customer = payload.data;
    },
    [getCustomer.rejected]: (state) => {
      state.customer = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },



    // createCustomer thunk
    [createCustomer.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [createCustomer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Create Customer",
        description: payload.message
      })
    },
    [createCustomer.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Create Customer",
          description: "Please Check The Fields"
        })

      } else {
        NotifyMessage({
          type: "error",
          title: "Create Customer",
          description: payload.message
        })
      }
    },


    // deleteCustomer thunk
    [deleteCustomer.pending]: (state) => {
      state.deleteLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [deleteCustomer.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Delete Customer",
        description: payload.message
      })
    },
    [deleteCustomer.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.success = null;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Delete Customer",
          description: "Please Check The Fields"
        })

      } else {
        NotifyMessage({
          type: "error",
          title: "Delete Customer",
          description: payload.message
        })
      }
    },

    // updateCustomer thunk
    [updateCustomer.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [updateCustomer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Update Customer",
        description: payload.message
      })
    },
    [updateCustomer.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.success = null;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Update Customer",
          description: "Please Check The Fields"
        })

      } else {
        NotifyMessage({
          type: "error",
          title: "Update Customer",
          description: payload.message
        })
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterCustomers } = customerSlice.actions;

export default customerSlice.reducer;
