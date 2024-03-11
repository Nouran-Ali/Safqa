import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const getAddressTypes = createAsyncThunk(
    "addressTypes",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/address_type";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getAddressType = createAsyncThunk(
    "addressType",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/address_type/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createAddressType = createAsyncThunk(
    "addressType/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/address_type/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getAddressTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateAddressType = createAsyncThunk(
    "addressType/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/address_type/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getAddressTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteAddressType = createAsyncThunk(
    "addressType/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/address_type/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getAddressTypes())
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
    addressTypes: [],
    addressType: null,
    filtered_addressTypes: [],
    addressTypeInfo: {
        name_en: "",
        name_ar: "",
    }
};

export const addressTypeSlice = createSlice({
    name: "addressType",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAddressTypes.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAddressTypes.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.addressTypes = payload.data;
            state.filtered_addressTypes = payload.data;
        },
        [getAddressTypes.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get address type",
                description: payload.message,
            })
        },

        [getAddressType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.addressType = null;
        },
        [getAddressType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.addressType = payload.data;
        },
        [getAddressType.rejected]: (state) => {
            state.addressType = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create AddressType
        [createAddressType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createAddressType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Address Type",
                description: payload.message
            })
        },
        [createAddressType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Address Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Address Type",
                    description: payload.message
                })
            }
        },

        // update AddressType
        [updateAddressType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateAddressType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Address Type",
                description: payload.message
            })
        },
        [updateAddressType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Address Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Address Type",
                    description: payload.message
                })
            }
        },

        // delete address type
        [deleteAddressType.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteAddressType.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Address Type",
                description: payload.message
            })
        },
        [deleteAddressType.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Address Type",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = addressTypeSlice.actions;
// Action creators are generated for each case reducer function
export default addressTypeSlice.reducer;
