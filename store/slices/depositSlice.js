import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";
import { getAdminHomePage, getHomePage } from "./authSlice";

export const getDeposits = createAsyncThunk(
    "deposits/get",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/api/deposits";
            const res = await AxiosJwt.get(url);
            dispatch(getHomePage())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getDepositsTerms = createAsyncThunk(
    "deposit/terms/get",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/deposit_term";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createDeposit = createAsyncThunk(
    "deposit/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "api/request_money/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getDeposits())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateRequestMoney = createAsyncThunk(
    "request-money/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `api/request_money/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
            dispatch(getDeposits())
            dispatch(getAdminHomePage())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateAdminRequestMoney = createAsyncThunk(
    "request-money/admin/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `admin/request_money/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
            dispatch(getDeposits())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteRequestMoney = createAsyncThunk(
    "request-money/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `api/request_money/cancel/${id}`;
            const res = await AxiosJwt.get(url);
            dispatch(getDeposits())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const addToWallet = createAsyncThunk(
    "wallet/charge",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "api/charge/wallet";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getDeposits())
            dispatch(getHomePage())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAdminDeposits = createAsyncThunk(
    "adminDeposits/get",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/money_requests";
            const res = await AxiosJwt.get(url);
            dispatch(getAdminHomePage())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const confirmDeposit = createAsyncThunk(
    "deposit/confirm",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/request_money/confirm/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
            dispatch(getAdminDeposits())
            dispatch(getAdminHomePage())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateDeposit = createAsyncThunk(
    "deposit/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/deposit/update/${args.id}`;
            let form = new FormData();
            form.append("_method", "PUT")
            for (let key in args) key != 'flag' && form.append(key, args[key])
            args.flag?.[0] && typeof args.flag === "object" && form.append("flag", args.flag[0]);
            const res = await AxiosJwt.post(url, form);
            dispatch(getDeposits())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteDeposit = createAsyncThunk(
    "deposit/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/deposit/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getDeposits())
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

    deposit_terms: [],
    filtered_deposit_terms: [],

    deposits: [],
    filtered_deposits: [],

    admin_deposits: [],
    filtered_admin_deposits: [],


    depositInfo: {
        amount: 1
    },

    addToWalletInfo: {
        card_name: "",
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        amount: 1
    },
};

export const depositSlice = createSlice({
    name: "deposit",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getDeposits.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getDeposits.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.deposits = payload.data;
            state.filtered_deposits = payload.data;
        },
        [getDeposits.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Deposits",
                description: payload.message,
            })
        },

        [getAdminDeposits.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAdminDeposits.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.admin_deposits = payload.data;
            state.filtered_admin_deposits = payload.data;
        },
        [getAdminDeposits.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Deposits",
                description: payload.message,
            })
        },

        // get deposit terms
        [getDepositsTerms.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getDepositsTerms.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.deposit_terms = payload.data;
            state.filtered_deposit_terms = payload.data;
        },
        [getDepositsTerms.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Deposit terms",
                description: payload.message,
            })
        },

        // create deposit
        [createDeposit.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createDeposit.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create Withdrawal Request",
                description: payload.message
            })
        },
        [createDeposit.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Create Withdrawal Request",
                description: state.api_errors
            })
            
        },

        // create deposit
        [updateRequestMoney.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateRequestMoney.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "update Withdrawal Request",
                description: payload.message
            })
        },
        [updateRequestMoney.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Update Withdrawal Request",
                description: state.api_errors
            })
        },

        // add to wallet deposit
        [addToWallet.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [addToWallet.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Add to wallet",
                description: payload.message
            })
        },
        [addToWallet.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Add to wallet",
                description: state.api_errors
            })
            // if (payload.response?.data) {
            //     state.api_errors = payload.response?.data;
            //     NotifyMessage({
            //         type: "error",
            //         title: "Add to wallet",
            //         description: "Please Check The Fields"
            //     })
            // } else {
            //     state.api_errors = payload.response?.data?.message;
            //     NotifyMessage({
            //         type: "error",
            //         title: "Add to wallet",
            //         description: state.api_errors
            //     })
            // }
        },

        // create deposit
        [confirmDeposit.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [confirmDeposit.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "confirm Deposit",
                description: payload.message
            })
        },
        [confirmDeposit.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Confirm Deposit",
                description: state.api_errors
            })
        },

        // update deposit
        [updateDeposit.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateDeposit.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Deposit",
                description: payload.message
            })
        },
        [updateDeposit.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Update Deposit",
                description: state.api_errors
            })
        },

        // delete deposit
        [deleteRequestMoney.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteRequestMoney.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Cancel Request Money",
                description: payload.message
            })
        },
        [deleteRequestMoney.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
              state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Cancel Request Money",
                description: state.api_errors
            })
        },

        // delete deposit
        [deleteDeposit.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteDeposit.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Deposit",
                description: payload.message
            })
        },
        [deleteDeposit.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Delete Deposit",
                description: state.api_errors
            })
        },
    },
});

export const { ResetSuccess } = depositSlice.actions;
// Action creators are generated for each case reducer function
export default depositSlice.reducer;
