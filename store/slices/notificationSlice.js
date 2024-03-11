import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getNotifications = createAsyncThunk(
    "notifications",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/notifications";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAdminNotifications = createAsyncThunk(
    "adminNotifications",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/admin/notifications";
            const res = await AxiosJwt.get(url);
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
    notifications: [],
    filtered_notifications: [],
    accountstatmentInfo: {
        name_en: "",
        name_ar: "",
        city_id: "",
    }
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        AddNewNotification(state, { payload }) {
            state.notifications = [...state.notifications, {...payload, is_new: true}]
        }
    },

    extraReducers: {
        [getNotifications.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getNotifications.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.notifications = payload.data;
            state.filtered_notifications = payload.data;
        },
        [getNotifications.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "get Notifications",
                description: state.api_errors,
            })
        },

        [getAdminNotifications.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAdminNotifications.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.notifications = payload.data;
            state.filtered_notifications = payload.data;
        },
        [getAdminNotifications.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            state.api_errors = payload.response?.data?.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "get Notifications",
                description: state.api_errors,
            })
        },
    },
});

export const { ResetSuccess, AddNewNotification } = notificationSlice.actions;
// Action creators are generated for each case reducer function
export default notificationSlice.reducer;
