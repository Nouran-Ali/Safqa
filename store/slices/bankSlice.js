import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosGlobal, AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getBanks = createAsyncThunk(
    "banks",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/banks";
            const res = await AxiosGlobal.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getBank = createAsyncThunk(
    "bank",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/bank/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);



export const createBank = createAsyncThunk(
    "bank/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/bank/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getBanks())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateBank = createAsyncThunk(
    "bank/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/bank/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getBanks())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteBank = createAsyncThunk(
    "bank/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/bank/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getBanks())
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
    banks: [],
    bank: null,
    filtered_banks: [],
    bankInfo: {
        name_en: "",
        name_ar: "",
        is_active: "",
        country_id: "",
    }
};

export const bankSlice = createSlice({
    name: "bank",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getBanks.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getBanks.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.banks = payload.data;
            state.filtered_banks = payload.data;
        },
        [getBanks.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Banks",
                description: payload.message,
            })
        },


        [getBank.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.bank = null;
        },
        [getBank.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.bank = payload.data;
        },
        [getBank.rejected]: (state) => {
            state.bank = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create Bank
        [createBank.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createBank.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Bank",
                description: payload.message
            })
        },
        [createBank.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Bank",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Bank",
                    description: payload.message
                })
            }
        },

        // update Bank
        [updateBank.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateBank.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Bank",
                description: payload.message
            })
        },
        [updateBank.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Bank",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Bank",
                    description: payload.message
                })
            }
        },

        // delete bank
        [deleteBank.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteBank.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Bank",
                description: payload.message
            })
        },
        [deleteBank.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Bank",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = bankSlice.actions;
// Action creators are generated for each case reducer function
export default bankSlice.reducer;
