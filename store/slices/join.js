import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const joinThunk = createAsyncThunk(
  "/auth/join",
  async (args, { rejectWithValue }) => {
    try {
      const url = "/api/register";
      const body = {
        country_id: getCookie("country_id"),
        business_type_id: getCookie("business_type_id"),
        ...args,
      }
      const res = await AxiosJwt.post(url, body);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  success: null,
  api_errors: null,

  companyInformation: {
    phone_number_code_id: "",
    category_id: "",
    phone_number: "",
    company_name: "",
    work_email: "",
    name_en: "",
    name_ar: "",
  },

  bankAccountDetails: {
    bank_account_name: "",
    bank_name: "",
    account_number: "",
    iban: "",
  },

  managerInformation: {
    full_name: "",
    phone_number_code_manager_id: "",
    phone_number_manager: "",
    nationality_id: "",
    email: "",
    password: "",
    password_confirmation: "",
  }
};

export const joinSlice = createSlice({
  name: "join",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
  },

  extraReducers: {
    [joinThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      NotifyMessage({
        type: "success",
        title: "Create New Account",
        description: payload.message
      })
    },
    [joinThunk.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [joinThunk.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      const { response } = payload;
      const { data, status } = response;
      if (data) {
        state.api_errors = data;
        NotifyMessage({
          type: "error",
          title: "Create New Account",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Create New Account",
          description: payload.message
        })
      }
    },
  },
});

export const { ResetSuccess } = joinSlice.actions;
// Action creators are generated for each case reducer function
export default joinSlice.reducer;
