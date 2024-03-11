import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const getAdminExpiryTypes = createAsyncThunk(
    "expiry_types",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/admin/invoice_expiry";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getExpiryType = createAsyncThunk(
    "expiry_type",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/invoice_expiry/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createExpiryType = createAsyncThunk(
    "expiry_type/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/invoice_expiry/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getAdminExpiryTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateExpiryType = createAsyncThunk(
    "expiry_type/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/invoice_expiry/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getAdminExpiryTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteExpiryType = createAsyncThunk(
    "expiry_type/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/expiry_type/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getAdminExpiryTypes())
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
    expiry_type: null,
    profile_expiry_types: [],
    filtered_expiry_types: [],
    expiryTypeInfo: {
        name_en: "",
        name_ar: "",
    },
};

export const expiryTypeslice = createSlice({
    name: "expiryType",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAdminExpiryTypes.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAdminExpiryTypes.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.expiry_types = payload.data;
            state.filtered_expiry_types = payload.data;
        },
        [getAdminExpiryTypes.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Expiry Type",
                description: payload.message,
            })
        },

        [getExpiryType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.expiry_type = null;
        },
        [getExpiryType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.expiry_type = payload.data;
        },
        [getExpiryType.rejected]: (state) => {
            state.expiry_type = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // create ExpiryType
        [createExpiryType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createExpiryType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Expiry Type",
                description: payload.message
            })
        },
        [createExpiryType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Expiry Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Expiry Type",
                    description: payload.message
                })
            }
        },

        // update ExpiryType
        [updateExpiryType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateExpiryType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Expiry Type",
                description: payload.message
            })
        },
        [updateExpiryType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Expiry Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Expiry Type",
                    description: payload.message
                })
            }
        },

        // delete expiry Type
        [deleteExpiryType.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteExpiryType.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Expiry Type",
                description: payload.message
            })
        },
        [deleteExpiryType.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Expiry Type",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = expiryTypeslice.actions;
// Action creators are generated for each case reducer function
export default expiryTypeslice.reducer;
