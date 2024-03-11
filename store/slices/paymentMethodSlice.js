import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getPaymentMethods = createAsyncThunk(
    "paymentMethods",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/payment_methods";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getPaymentMethod = createAsyncThunk(
    "paymentMethod",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/payment_method/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getPaymentMethodsUser = createAsyncThunk(
    "paymentMethodsUser",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/payment_methods_user";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createPaymentMethod = createAsyncThunk(
    "paymentMethod/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/payment_method/store";
            const form = new FormData();

            for (let key in args) {
                key !== 'logo' && form.append(key, args[key]);
            }

            if (args.logo?.[0] && typeof args.logo === "object") {
                form.append("logo", args.logo[0]);
            }

            const res = await AxiosJwt.post(url, form);
            dispatch(getPaymentMethods())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updatePaymentMethod = createAsyncThunk(
    "paymentMethod/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/payment_method/update/${args.id}`;
            const form = new FormData();
            form.append("_method", 'PUT');

            for (let key in args) {
                key !== 'logo' && form.append(key, args[key]);
            }

            if (args.logo?.[0] && typeof args.logo === "object") {
                form.append("logo", args.logo[0]);
            }

            const res = await AxiosJwt.post(url, form);
            dispatch(getPaymentMethods())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updatePaymentMethodUser = createAsyncThunk(
    "paymentMethodUser/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/api/update-payment-methods-user`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getPaymentMethodsUser())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deletePaymentMethod = createAsyncThunk(
    "paymentMethod/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/payment_method/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getPaymentMethods())
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
    payment_methods_user: [],
    payment_methods: [],
    payment_method: null,
    filtered_payment_methods: [],
    urlFile: null,
    paymentMethodInfo: {
        name_en: "",
        name_ar: "",
        is_active: "",
        commission_bank: 0,
        commission_safqa: 0,
    }
};

export const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getPaymentMethods.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.urlFile = null;
        },
        [getPaymentMethods.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.urlFile = payload.urlFile;
            state.payment_methods = payload.data;
            state.filtered_payment_methods = payload.data;
        },
        [getPaymentMethods.rejected]: (state, { payload }) => {
            state.success = null;
            state.urlFile = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Payment Methods",
                description: payload.message,
            })
        },

        [getPaymentMethod.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.payment_method = null;
        },
        [getPaymentMethod.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.payment_method = payload.data;
        },
        [getPaymentMethod.rejected]: (state) => {
            state.payment_method = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        [getPaymentMethodsUser.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getPaymentMethodsUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.payment_methods_user = payload.data;
        },
        [getPaymentMethodsUser.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get User Payment Methods",
                description: payload.message,
            })
        },

        // create PaymentMethod
        [createPaymentMethod.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createPaymentMethod.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Payment Method",
                description: payload.message
            })
        },
        [createPaymentMethod.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Payment Method",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Payment Method",
                    description: payload.message
                })
            }
        },

        // update PaymentMethod
        [updatePaymentMethod.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updatePaymentMethod.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Payment Method",
                description: payload.message
            })
        },
        [updatePaymentMethod.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Payment Method",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Payment Method",
                    description: payload.message
                })
            }
        },

        // update PaymentMethodUser
        [updatePaymentMethodUser.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updatePaymentMethodUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Payment Method User",
                description: payload.message
            })
        },
        [updatePaymentMethodUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Payment Method User",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Payment Method User",
                    description: payload.message
                })
            }
        },

        // delete business_type
        [deletePaymentMethod.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deletePaymentMethod.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Payment Method",
                description: payload.message
            })
        },
        [deletePaymentMethod.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Payment Method",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = paymentMethodSlice.actions;
// Action creators are generated for each case reducer function
export default paymentMethodSlice.reducer;
