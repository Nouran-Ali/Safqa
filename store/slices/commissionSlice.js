import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getCommission = createAsyncThunk(
    "commission",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/commission_forms";
            const res = await AxiosJwt.get(url);
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
    commissions_from: [],
};

export const commissionSlice = createSlice({
    name: "commission",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getCommission.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getCommission.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.commissions_from = payload.data;
        },
        [getCommission.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Commissions",
                description: payload.message,
            })
        },
    },
});

export const { ResetSuccess } = commissionSlice.actions;
// Action creators are generated for each case reducer function
export default commissionSlice.reducer;
