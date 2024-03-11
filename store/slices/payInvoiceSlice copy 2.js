import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { AxiosGlobal } from "../../lib/axios";
import { getDate, getTime, getTomorrowDate } from "../../lib/dates";


let lang = getCookie("language") || "en";
let token = getCookie("token");


export const getPayInvoice = createAsyncThunk(
  "payInvoice",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/PayInvoice/Details/${id}`;
      const res = await AxiosGlobal.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const chargeInvoice = createAsyncThunk(
  "payInvoice/create",
  async (args, { rejectWithValue }) => {
    try {
      const url = `/api/charge/invoice/${args.id}`;
      const res = await AxiosGlobal.post(url, args);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  api_errors: null,
  success: null,
  payInvoice: null,
  invoiceCheckoutInfo: {
    card_name: "",
    card_number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  },
};

export const payInvoiceSlice = createSlice({
  name: "payInvoice",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },

  extraReducers: {

    [getPayInvoice.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.payInvoice = null;
    },
    [getPayInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.api_errors = null;
      state.payInvoice = payload.data;
    },
    [getPayInvoice.rejected]: (state) => {
      state.payInvoice = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },

    // chargeInvoice
    [chargeInvoice.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [chargeInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Pay Invoice",
        description: payload.message
      })
    },
    [chargeInvoice.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Pay Invoice",
          description: "Please Check The Fields"
        })

      } else {
        NotifyMessage({
          type: "error",
          title: "Pay Invoice",
          description: payload.message
        })
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ResetSuccess,
} = payInvoiceSlice.actions;

export default payInvoiceSlice.reducer;
