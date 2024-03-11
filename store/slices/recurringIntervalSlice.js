import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const getRecurringIntervals = createAsyncThunk(
    "recurring_intervals",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/recurring_interval";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getRecurringInterval = createAsyncThunk(
    "recurring_interval",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/recurring_interval/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createRecurringInterval = createAsyncThunk(
    "recurring_interval/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/recurring_interval/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getRecurringIntervals())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateRecurringInterval = createAsyncThunk(
    "recurring_interval/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/recurring_interval/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getRecurringIntervals())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteRecurringInterval = createAsyncThunk(
    "recurring_interval/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/recurring_interval/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getRecurringIntervals())
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
    recurring_interval: null,
    recurring_intervals: [],
    filtered_recurring_intervals: [],
    recurringIntervalInfo: {
        name_en: "",
        name_ar: "",
    },
};

export const recurringIntervalSlice = createSlice({
    name: "recurringInterval",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getRecurringIntervals.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getRecurringIntervals.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.recurring_intervals = payload.data;
            state.filtered_recurring_intervals = payload.data;
        },
        [getRecurringIntervals.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Recurring Interval",
                description: payload.message,
            })
        },


        [getRecurringInterval.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.recurring_interval = null;
        },
        [getRecurringInterval.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.recurring_interval = payload.data;
        },
        [getRecurringInterval.rejected]: (state) => {
            state.recurring_interval = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // create RecurringInterval
        [createRecurringInterval.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createRecurringInterval.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Recurring Interval",
                description: payload.message
            })
        },
        [createRecurringInterval.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Recurring Interval",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Recurring Interval",
                    description: payload.message
                })
            }
        },

        // update RecurringInterval
        [updateRecurringInterval.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateRecurringInterval.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Recurring Interval",
                description: payload.message
            })
        },
        [updateRecurringInterval.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Recurring Interval",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Recurring Interval",
                    description: payload.message
                })
            }
        },

        // delete recurring Interval
        [deleteRecurringInterval.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteRecurringInterval.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Recurring Interval",
                description: payload.message
            })
        },
        [deleteRecurringInterval.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Recurring Interval",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = recurringIntervalSlice.actions;
// Action creators are generated for each case reducer function
export default recurringIntervalSlice.reducer;
