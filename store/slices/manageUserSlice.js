import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { getProducts } from './productSlice'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getManageUsers = createAsyncThunk(
    "manageUsers",
    async (id, { rejectWithValue, getState }) => {
        try {
            const url = `/api/manage_users`;
            const payload = id ? {
                headers: {
                    profile: id
                }
            } : {}
            const res = await AxiosJwt.get(url, payload);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getManageUser = createAsyncThunk(
    "manageUser",
    async (args, { rejectWithValue }) => {
        try {
            const url = `/api/manage_user/show/${args.user_id}`;
            const payload = args.profile_id ? {
                headers: {
                    profile: args.profile_id
                }
            } : {}
            const res = await AxiosJwt.get(url, payload);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createManageUser = createAsyncThunk(
    "manageUser/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/manage_user/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getManageUsers())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateManageUser = createAsyncThunk(
    "manageUser/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/manage_user/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getManageUsers())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const adminUpdateManageUser = createAsyncThunk(
    "adminManageUser/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/manage_user/update/${args.id}`;
            const payload = {
                _method: "PUT",
                ...args,
            }
            const headers = {
                profile: args.profile_business_id
            }
            const res = await AxiosJwt.post(url, payload, { headers });
            dispatch(getManageUsers())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "category/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product/category/delete/${id}`;
            const body = {
                _method: "DELETE",
                token,
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getCategories())
            dispatch(getProducts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateCategory = createAsyncThunk(
    "category/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product/category/update/${args.id}`;
            const body = {
                _method: "PUT",
                token,
                ...args
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getCategories())
            dispatch(getProducts())
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
    manage_user: null,
    manage_users: [],
    filtered_manage_users: [],
    userInfo: {
        phone_number_manager: "",
        phone_number_manager_code_id: "",
        full_name: "",
        email: "",
        is_enable: "",
        nationality_id: "",
        // roles
        role_id: "",
        batch_invoices: false,
        deposits: false,
        payment_links: false,
        profile: false,
        users: false,
        refund: false,
        show_all_invoices: false,
        customers: false,
        invoices: false,
        products: false,
        commissions: false,
        account_statements: false,
        orders: false,
        suppliers: false,
        // notifications
        notification_create_invoice: false,
        notification_invoice_paid: false,
        notification_new_order: false,
        notification_create_batch_invoice: false,
        notification_deposit: false,
        notification_create_recurring_invoice: false,
        notification_refund_transfered: false,
        notification_notifications_service_request: false,
        notification_notifications_hourly_deposit_rejected: false,
        notification_approve_vendor_account: false,
        notification_create_shipping_invoice: false,
    },

    searchInfo: {
        user_name: "",
        phone_number: "",
        email: "",
    },
};

export const manageUserSlice = createSlice({
    name: "manageUser",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        filterManageUsers(state, { payload }) {
            const { user_name, phone_number, email } = payload;

            if (!user_name && !phone_number && !email) {

                state.filtered_manage_users = state.manage_users

            } else {

                if (state.manage_users?.length > 0)

                    state.filtered_manage_users = state.manage_users.filter(user => {
                        if (user_name && user.full_name.toLowerCase().startsWith(user_name.trim().toLowerCase())) return user
                        if (email && user.email.toLowerCase().startsWith(email.trim().toLowerCase())) return user
                        if (phone_number && user.phone_number_manager.toLowerCase().startsWith(phone_number.trim().toLowerCase())) return user
                    })

            }

        }
    },

    extraReducers: {
        // getManageUsers thunk
        [getManageUsers.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getManageUsers.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.manage_users = payload.data;
            state.filtered_manage_users = payload.data;
        },
        [getManageUsers.rejected]: (state, { payload, error }) => {
            state.isLoading = false;
            state.manage_users = null;
            state.filtered_manage_users = null;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: 'error',
                title: "Get manageUsers",
                description: error.message,
            })
        },



        [getManageUser.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.manage_user = null;
        },
        [getManageUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.manage_user = payload.data;
        },
        [getManageUser.rejected]: (state) => {
            state.manage_user = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },




        // createManageUser thunk
        [createManageUser.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createManageUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Manage User",
                description: payload.message
            })
        },
        [createManageUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Manage User",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Manage User",
                    description: payload.message
                })
            }
        },


        // updateManageUser thunk
        [updateManageUser.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateManageUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Manage User",
                description: payload.message
            })
        },
        [updateManageUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Manage User",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Manage User",
                    description: payload.message
                })
            }
        },

        // adminUpdateManageUser thunk
        [adminUpdateManageUser.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [adminUpdateManageUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Manage User",
                description: payload.message
            })
        },
        [adminUpdateManageUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Manage User",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Manage User",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterManageUsers } = manageUserSlice.actions;

export default manageUserSlice.reducer;
