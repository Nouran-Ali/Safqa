import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { getProducts } from './productSlice'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getApiKey = createAsyncThunk(
    "apiKey",
    async (_, { rejectWithValue }) => {
        try {
            const url = `/api/generateSecretKey`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const storeWebHook = createAsyncThunk(
    "webhook/store",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/webhook/store";
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
    api_key: null,

    webhookInfo: {
        enable_webhook: 0,
        endpoint: "",
        enable_secret_key: 0,
        webhook_secret_key: "",
        transaction_status_changed: 0,
        balance_transferred: 0,
        recurring_status_changed: 0,
        refund_status_changed: 0,
        supplier_status_changed: 0
    },
};


export const integrationSlice = createSlice({
    name: "integration",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },

    },

    extraReducers: {
        [getApiKey.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            // state.api_key = null;
        },
        [getApiKey.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.api_key = payload.secretKey;
        },
        [getApiKey.rejected]: (state) => {
            state.api_key = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // storeWebHook thunk
        [storeWebHook.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [storeWebHook.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Webhook",
                description: payload.message
            })
        },
        [storeWebHook.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Create Webhook",
                description: state.api_errors
            })
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = integrationSlice.actions;

export default integrationSlice.reducer;
