import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getAdminCommissions = createAsyncThunk(
    "adminCommissions",
    async (_, { rejectWithValue }) => {
        try {
            const url = '/admin/commission';
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateAdminCommission = createAsyncThunk(
    "adminCommission/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/commission/update`;
            const res = await AxiosJwt.post(url, {...args, _method: "PUT"});
            dispatch(getAdminCommissions())
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
    adminCommissions: [],
};

export const adminCommissionSlice = createSlice({
    name: "adminCommission",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAdminCommissions.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAdminCommissions.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.adminCommissions = [payload.data];
        },
        [getAdminCommissions.rejected]: (state, { payload }) => {
            state.success = null;
            state.urlFile = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Payment Methods",
                description: payload.message,
            })
        },

        // update PaymentMethod
        [updateAdminCommission.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateAdminCommission.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Admin Commission",
                description: payload.message
            })
        },
        [updateAdminCommission.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Admin Commission",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Admin Commission",
                    description: payload.message
                })
            }
        },

    },
});

export const { ResetSuccess } = adminCommissionSlice.actions;
// Action creators are generated for each case reducer function
export default adminCommissionSlice.reducer;
