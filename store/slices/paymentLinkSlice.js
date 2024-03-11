import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

let lang = getCookie("language") || "en";
let token = getCookie("token");

export const getPayments = createAsyncThunk(
  "payments",
  async (args, { rejectWithValue }) => {
    try {
      const url = "/api/payments";
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const getPayment = createAsyncThunk(
  "payment",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/payment/show/${id}`;
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const createPaymentLink = createAsyncThunk(
  "payment/create",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = "/api/payment/store";

      if (args.open_amount == 0) {
        delete args.min_amount
        delete args.max_amount
      }

      const res = await AxiosJwt.post(url, { ...args });
      dispatch(getPayments())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const updatePaymentLink = createAsyncThunk(
  "payment/update",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `/api/payment/update/${args.id}`;

      if (args.open_amount == 0) {
        delete args.min_amount
        delete args.max_amount
      }

      const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
      dispatch(getPayments())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const deletePaymentLink = createAsyncThunk(
  "payment/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `/api/payment/delete/${id}`;
      const body = {
        token,
        _method: "DELETE",
      };
      const res = await AxiosJwt.post(url, body);
      dispatch(getPayments())
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
  payments: [],
  payment: null,
  filtered_payments: [],
  paymentLinkInfo: {
    currency_id: "",
    open_amount: "0",
    payment_amount: 0,
    is_terms: '0',
    payment_title: "",
    comment: "",
    terms_and_conditions: "",
  },
};

export const paymentLinkSlice = createSlice({
  name: "paymentLink",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: {
    [getPayments.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [getPayments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.payments = payload.data;
      state.filtered_payments = payload.data;
    },
    [getPayments.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      NotifyMessage({
        type: "error",
        title: "get Payment Links",
        description: payload.message,
      })
    },

    [getPayment.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.payment = null;
    },
    [getPayment.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.payment = payload.data;
    },
    [getPayment.rejected]: (state) => {
      state.payment = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },


    // createInvoice thunk
    [createPaymentLink.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [createPaymentLink.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = true;
      NotifyMessage({
        type: "success",
        title: "create Payment Link",
        description: payload.message
      })
    },
    [createPaymentLink.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Create Payment Link",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Create Payment Link",
          description: payload.message
        })
      }
    },

    // update payment link
    [updatePaymentLink.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [updatePaymentLink.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = true;
      NotifyMessage({
        type: "success",
        title: "Update Payment Link",
        description: payload.message
      })
    },
    [updatePaymentLink.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Update Payment Link",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Update Payment Link",
          description: payload.message
        })
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = paymentLinkSlice.actions;

export default paymentLinkSlice.reducer;
