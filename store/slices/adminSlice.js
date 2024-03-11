import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getAdmins = createAsyncThunk(
    "admins",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/admin/admins";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAdmin = createAsyncThunk(
    "admin",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/admin/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createAdmin = createAsyncThunk(
    "admin/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/admin/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getAdmins())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateAdmin = createAsyncThunk(
    "admin/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/admin/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getAdmins())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteAdmin = createAsyncThunk(
    "admin/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/admin/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getAdmins())
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
    success: null,
    api_errors: null,
    admins: [],
    admin: null,
    filtered_admins: [],
    adminInfo: {
        name: "",
        email: "",
        phone: "",
        phone_number_manager_code_id: "",
        is_super_admin: 0,
        // roles
        wallet: false,
        admins: false,
        profiles: false,
        invoices: false,
        refunds: false,
        addresses: false,
        languages: false,
        banks: false,
        business_categories: false,
        business_types: false,
        payment_methods: false,
        social_media: false,
    }
};

export const adminslice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAdmins.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAdmins.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.admins = payload.data;
            state.filtered_admins = payload.data;
        },
        [getAdmins.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Admins",
                description: payload.message,
            })
        },

        [getAdmin.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.admin = null;
        },
        [getAdmin.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.admin = payload.data;
        },
        [getAdmin.rejected]: (state) => {
            state.success = null;
            state.isLoading = false;
            state.admin = null;
            state.api_errors = true;
        },

        // create Admin
        [createAdmin.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createAdmin.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Admin",
                description: payload.message
            })
        },
        [createAdmin.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Admin",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Admin",
                    description: payload.message
                })
            }
        },

        // update Admin
        [updateAdmin.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateAdmin.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Admin",
                description: payload.message
            })
        },
        [updateAdmin.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Admin",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Admin",
                    description: payload.message
                })
            }
        },

        // delete admin
        [deleteAdmin.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteAdmin.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Admin",
                description: payload.message
            })
        },
        [deleteAdmin.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Admin",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = adminslice.actions;
// Action creators are generated for each case reducer function
export default adminslice.reducer;
