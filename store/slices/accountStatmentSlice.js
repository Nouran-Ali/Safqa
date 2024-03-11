import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getAccountStatments = createAsyncThunk(
    "accountstatments",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/account_statment";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAllAccountStatments = createAsyncThunk(
    "allAccountstatments",
    async (_, { rejectWithValue }) => {
        try {
            const url = "/admin/account_statment";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getAdminAccountStatments = createAsyncThunk(
    "adminAccountstatments",
    async (id, { rejectWithValue }) => {
        try {
            const url = "/api/account_statment";
            const payload = {
                headers: {
                    profile: id
                }
            }
            const res = await AxiosJwt.get(url, payload);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAccountStatment = createAsyncThunk(
    "accountstatment",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/account_statment/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createAccountStatment = createAsyncThunk(
    "accountstatment/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/account_statment/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getAccountStatments())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateAccountStatment = createAsyncThunk(
    "accountstatment/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/account_statment/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getAccountStatments())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteAccountStatment = createAsyncThunk(
    "accountstatment/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/account_statment/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getAccountStatments())
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
    accountstatments: [],
    accountstatment: null,
    filtered_accountstatments: [],
    accountstatmentInfo: {
        name_en: "",
        name_ar: "",
        city_id: "",
    }
};

export const accountStatmentslice = createSlice({
    name: "accountstatment",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAccountStatments.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAccountStatments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.accountstatments = payload.data;
            state.filtered_accountstatments = payload.data;
        },
        [getAccountStatments.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Account Statments",
                description: payload.message,
            })
        },

        [getAllAccountStatments.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAllAccountStatments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.accountstatments = payload.data;
            state.filtered_accountstatments = payload.data;
        },
        [getAllAccountStatments.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get All Account Statments",
                description: payload.message,
            })
        },

        [getAdminAccountStatments.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAdminAccountStatments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.accountstatments = payload.data;
            state.filtered_accountstatments = payload.data;
        },
        [getAdminAccountStatments.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Account Statments",
                description: payload.message,
            })
        },


        [getAccountStatment.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAccountStatment.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.accountstatment = payload.data;
        },
        [getAccountStatment.rejected]: (state) => {
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create AccountStatment
        [createAccountStatment.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createAccountStatment.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Account Statment",
                description: payload.message
            })
        },
        [createAccountStatment.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Account Statment",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Account Statment",
                    description: payload.message
                })
            }
        },

        // update AccountStatment
        [updateAccountStatment.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateAccountStatment.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Account Statment",
                description: payload.message
            })
        },
        [updateAccountStatment.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Account Statment",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Account Statment",
                    description: payload.message
                })
            }
        },

        // delete accountstatment
        [deleteAccountStatment.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteAccountStatment.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Account Statment",
                description: payload.message
            })
        },
        [deleteAccountStatment.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Account Statment",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = accountStatmentslice.actions;
// Action creators are generated for each case reducer function
export default accountStatmentslice.reducer;
