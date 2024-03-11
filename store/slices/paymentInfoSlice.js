import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosGlobal, AxiosJwt } from '../../lib/axios';
import { NotifyMessage } from '../../comps/Messages';


export const getPaymentType = createAsyncThunk(
  'payment_type',
  async (_, { rejectWithValue }) => {
    try {
      const url = '/api/paymentInformation/checkType';
      const res = await AxiosGlobal.get(url);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getPaymentInformation = createAsyncThunk(
  'paymentInfo',
  async (_, { rejectWithValue }) => {
    try {
      const url = '/admin/paymentInformation';
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const updatePaymentInformation = createAsyncThunk(
  'paymentInfo/update',
  async (args, { rejectWithValue, dispatch }) => {
    try {
      const url = `/admin/paymentInformation/update`;
      const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
      dispatch(getPaymentInformation());
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  success: null,
  api_errors: null,
  paymentInfo: null,
  payment_type: null,
};

export const paymentInformationSlice = createSlice({
  name: 'paymentInfo',
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },

  extraReducers: {
    [getPaymentType.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [getPaymentType.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.payment_type = payload.data.payment_type;
    },
    [getPaymentType.rejected]: (state, { payload }) => {
      state.success = null;
      state.urlFile = null;
      state.isLoading = false;
      NotifyMessage({
        type: 'error',
        title: 'get Payment Type',
        description: payload.message,
      });
    },

    [getPaymentInformation.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [getPaymentInformation.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.paymentInfo = payload.data;
    },
    [getPaymentInformation.rejected]: (state, { payload }) => {
      state.success = null;
      state.urlFile = null;
      state.isLoading = false;
      NotifyMessage({
        type: 'error',
        title: 'get Payment Information',
        description: payload.message,
      });
    },

    // update PaymentInformation
    [updatePaymentInformation.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [updatePaymentInformation.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = true;
      NotifyMessage({
        type: 'success',
        title: 'Update Payment Information',
        description: payload.message,
      });
    },
    [updatePaymentInformation.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors =
        payload.response?.data?.message ||
        payload.response?.data ||
        payload.message;
      NotifyMessage({
        type: 'error',
        title: 'Update Payment Information',
        description: state.api_errors,
      });
    },
  },
});

export const { ResetSuccess } = paymentInformationSlice.actions;
// Action creators are generated for each case reducer function
export default paymentInformationSlice.reducer;
