import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosGlobal} from "../../lib/axios";

export const getGlobalData = createAsyncThunk(
  "/globalData",
  async (_, { rejectWithValue }) => {
    try {
      const url = "/api/globalData";
      const res = await AxiosGlobal.get(url);
      // const { data } = res;
      return res;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  data: {}
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: {
    [getGlobalData.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.data.languages = payload.data.language;
    },
  },
});

// export const { } = globalSlice.actions;
// Action creators are generated for each case reducer function
export default globalSlice.reducer;
