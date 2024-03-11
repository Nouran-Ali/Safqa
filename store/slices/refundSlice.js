import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getRefunds = createAsyncThunk(
    "refunds",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/api/refunds";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getRefundSummary = createAsyncThunk(
    "refund/summary",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/api/refund/summury/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getRefund = createAsyncThunk(
    "refund",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/api/refund/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAdminRefunds = createAsyncThunk(
    "adminRefunds",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/admin/refunds";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);



export const confirmRefund = createAsyncThunk(
    "adminRefunds/confirm",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/admin/confirm_refund/${id}`;
            const res = await AxiosJwt.get(url);
            dispatch(getAdminRefunds())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createRefund = createAsyncThunk(
    "refunds/create",
    async (args, { rejectWithValue, getState }) => {
        try {
            const url = `/api/refund/store/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args });
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);



const initialState = {
    isLoading: false,
    deleteLoading: false,
    api_errors: null,
    success: null,
    refund: null,
    refundSummary: null,
    refunds: [],
    admin_refunds: [],
    filtered_refunds: [],
    filtered_admin_refunds: [],
    refundInfo: {
        makePartialRefund: "0",
        amount: 0,
        IsDeductRefundChargeFromCustomer: 0,
        IsDeductServiceChargeFromCustomer: 0,
        comments: ""
    }
};

export const refundSlice = createSlice({
    name: "refund",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        // getRefunds thunk
        [getRefunds.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getRefunds.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.refunds = payload.data;
            state.filtered_refunds = payload.data;
        },
        [getRefunds.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.refunds = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // getRefundSummary thunk
        [getRefundSummary.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.refundSummary = null;
        },
        [getRefundSummary.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.refundSummary = payload;
        },
        [getRefundSummary.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.refundSummary = null;
            state.api_errors = true;
        },

        // getRefund thunk
        [getRefund.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.refund = null;
        },
        [getRefund.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.refund = payload.data;
        },
        [getRefund.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.refund = null;
            state.api_errors = true;
        },

        // getAdminRefunds thunk
        [getAdminRefunds.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.admin_refunds = null;
            state.filtered_admin_refunds = null;
        },
        [getAdminRefunds.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.admin_refunds = payload.data;
            state.filtered_admin_refunds = payload.data;
        },
        [getAdminRefunds.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.admin_refunds = null;
            state.filtered_admin_refunds = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // createRefund thunk
        [createRefund.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createRefund.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Refund",
                description: payload.message
            })
        },
        [createRefund.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Refund",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Refund",
                    description: payload.message
                })
            }
        },

        // confirmRefund thunk
        [confirmRefund.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [confirmRefund.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Confirm Refund",
                description: payload.message
            })
        },
        [confirmRefund.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Confirm Refund",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Confirm Refund",
                    description: payload.message
                })
            }
        },


    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = refundSlice.actions;

export default refundSlice.reducer;
