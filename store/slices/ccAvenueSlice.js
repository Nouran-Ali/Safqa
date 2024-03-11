import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosGlobal, AxiosJwt } from '../../lib/axios';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { NotifyMessage } from '../../comps/Messages';
import { generateFormData } from '../../lib/submitServices';

export const getProductionUrl = createAsyncThunk(
  'ccAvenue/encrypt',
  async (args, { rejectWithValue, getState }) => {
    try {
      const url = '/api/encrypt/wallet';
      const res = await AxiosJwt.post(url, args);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getInvoiceProductionUrl = createAsyncThunk(
  'ccAvenue_invoice/encrypt',
  async (args, { rejectWithValue, getState }) => {
    try {
      const url = `/api/encrypt/invoice/${args.id}`;
      const res = await AxiosGlobal.post(url, args);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  deleteLoading: false,
  api_errors: null,
  success: null,
  productionUrl: null,
  updateLoading: false,
};

export const productSlice = createSlice({
  name: 'ccavenue',
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },

  extraReducers: {
    // getProductionUrl thunk
    [getProductionUrl.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
    },
    [getProductionUrl.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.productionUrl = payload.production_url;
    },
    [getProductionUrl.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.products = null;
      state.api_errors = payload.response?.data || payload.response;
    },

    // getInvoiceProductionUrl thunk
    [getInvoiceProductionUrl.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
    },
    [getInvoiceProductionUrl.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      console.log(payload.production_url);
      state.productionUrl = payload.production_url;
    },
    [getInvoiceProductionUrl.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.products = null;
      state.api_errors = payload.response?.data || payload.response;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterProducts } = productSlice.actions;

export default productSlice.reducer;
