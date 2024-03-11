import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

const initialState = {
  isActive: getCookie("nav_active"),
};

export const sideNavSlice = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    toggleNavActive(state) {
      setCookie("nav_active", !state.isActive);
      state.isActive = !state.isActive;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleNavActive } = sideNavSlice.actions;

export default sideNavSlice.reducer;
