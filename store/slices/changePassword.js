import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const changePasswordThunk = createAsyncThunk(
  "/changePassword",
  async (
    args,
    { rejectWithValue }
  ) => {
    try {
      const url = "/api/changePassword";
      const body = {token, ...args}
      const res = await AxiosJwt.post(url, body);
      return res.data;
    } catch (err) {
console.log(err)
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  token: getCookie("token"),
  isLoading: false,
  api_errors: null,
  success: null,

  changePassword: {
     old_password: "",
      new_password: "",
       new_password_confirmation:"", 
      }
};

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: {
    [changePasswordThunk.pending]: (state) => {
        state.isLoading = true;
        state.success = null;
        state.api_errors = null;
    },
    [changePasswordThunk.fulfilled]: (state,{payload}) => {
      state.isLoading = false;
      state.success = payload.message;
    },
    [changePasswordThunk.rejected]: (state, {payload}) => {
      state.isLoading = false;
        state.api_errors = payload.response?.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ResetSuccess,
 } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
