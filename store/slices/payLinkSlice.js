import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { AxiosGlobal } from "../../lib/axios";
import { getDate, getTime, getTomorrowDate } from "../../lib/dates";


let lang = getCookie("language") || "en";
let token = getCookie("token");


export const getPayLink = createAsyncThunk(
  "payLink/get",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/PayPayment/Details/${id}`;
      const res = await AxiosGlobal.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const checkoutPayLink = createAsyncThunk(
  "payLink/checkout",
  async (args, { rejectWithValue }) => {
    try {
      const url = `/api/store/payment_invoice/${args.id}`;
      const res = await AxiosGlobal.post(url, { ...args });
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
  products: null,
  profile: null,
  pay_link: null,
  url_id: null,
  invoice_id: null,
  checkout_info: {
    customer_name: "",
    customer_mobile: "",
    customer_email: "",
    comment: "",
    civil_id: "",
  }
};

export const payLinkSlice = createSlice({
  name: "payLink",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },

  extraReducers: {
    [getPayLink.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.pay_link = null;
    },
    [getPayLink.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.api_errors = null;
      state.pay_link = payload.data
      state.profile = payload.data?.profile;
    },
    [getPayLink.rejected]: (state) => {
      state.pay_link = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },

    // checkoutPayLink
    [checkoutPayLink.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.invoice_id = null;
    },
    [checkoutPayLink.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.api_errors = null;
      state.invoice_id = payload.invoice;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Pay Link",
        description: payload.message
      })
    },
    [checkoutPayLink.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.invoice_id = null;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Pay Link",
          description: "Please Check The Fields"
        })

      } else {
        NotifyMessage({
          type: "error",
          title: "Pay Link",
          description: payload.message
        })
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ResetSuccess,
} = payLinkSlice.actions;

export default payLinkSlice.reducer;
