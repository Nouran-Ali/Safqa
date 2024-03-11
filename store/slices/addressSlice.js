import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from '../../comps/Messages'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getAddresses = createAsyncThunk(
  "addresses",
  async (args, { rejectWithValue }) => {
    try {
      const url = "/api/addresses";
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const getAddress = createAsyncThunk(
  "address",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/admin/addresse/show/${id}`;
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/create",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      const url = "/api/addresse/store";
      const res = await AxiosJwt.post(url, args);
      dispatch(getAddresses())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      const url = `/api/addresse/update/${args.id}`;
      const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
      dispatch(getAddresses())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const url = `/api/addresse/delete/${id}`;
      const res = await AxiosJwt.post(url, { _method: "Delete" });
      dispatch(getAddresses())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);




const initialState = {
  user: null,
  isLoading: false,
  deleteLoading: false,
  error: null,
  success: null,
  api_errors: null,
  addresses: [],
  address: null,
  filtered_addresses: [],

  addressInfo: {
    addressType_id: "",
    city_id: "",
    area_id: "",
    block: "",
    avenue: "",
    street: "",
    bldgNo: "",
    appartment: "",
    floor: "",
    instructions: "",
  },

  searchInfo: {

  }
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null
    }
  },
  extraReducers: {
    // get address
    [getAddresses.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [getAddresses.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.addresses = payload.data;
      state.filtered_addresses = payload.data;
    },
    [getAddresses.rejected]: (state, { payload }) => {
      state.isLoading = false;
      NotifyMessage({
        type: "error",
        title: "get addresses",
        description: payload.message
      })
    },

    [getAddress.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.address = null;
    },
    [getAddress.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.address = payload.data;
    },
    [getAddress.rejected]: (state) => {
      state.address = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },


    // create address
    [createAddress.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [createAddress.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = true
      NotifyMessage({
        type: "success",
        title: "create New address",
        description: payload.message
      })
    },
    [createAddress.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Create New Address",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Create New Address",
          description: payload.message
        })
      }
    },

    // update address
    [updateAddress.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [updateAddress.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = true
      NotifyMessage({
        type: "success",
        title: "Update address",
        description: payload.message
      })
    },
    [updateAddress.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Update Address",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Update Address",
          description: payload.message
        })
      }
    },

    // delete address
    [deleteAddress.pending]: (state) => {
      state.deleteLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [deleteAddress.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.api_errors = null;
      state.success = true
      NotifyMessage({
        type: "success",
        title: "Delete address",
        description: payload.message
      })
    },
    [deleteAddress.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.api_errors = payload.response?.data;
      NotifyMessage({
        type: "error",
        title: "Delete address",
        description: payload.message
      })
    },
  },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = addressSlice.actions;

export default addressSlice.reducer;
