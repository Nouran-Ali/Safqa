import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const getRole = createAsyncThunk(
    "role",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/roles";
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
    roles: [],
    filtered_roles: []
};

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getRole.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getRole.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.roles = payload.data;
            state.filtered_roles = payload.data;
        },
        [getRole.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Roles",
                description: payload.message,
            })
        },
    },
});

export const { ResetSuccess } = roleSlice.actions;
// Action creators are generated for each case reducer function
export default roleSlice.reducer;
