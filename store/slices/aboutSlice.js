import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getAbouts = createAsyncThunk(
    "abouts",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/abouts";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAbout = createAsyncThunk(
    "about",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/about/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createAbout = createAsyncThunk(
    "about/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/about/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getAbouts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateAbout = createAsyncThunk(
    "about/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/about/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getAbouts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteAbout = createAsyncThunk(
    "about/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/about/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getAbouts())
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
    abouts: [],
    abouts: null,
    filtered_abouts: [],
    aboutInfo: {
        about: "",
    }
};

export const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAbouts.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAbouts.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.abouts = payload.data;
            state.filtered_abouts = payload.data;
        },
        [getAbouts.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Abouts",
                description: payload.message,
            })
        },

        [getAbout.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAbout.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.about = payload.data;
        },
        [getAbout.rejected]: (state) => {
            state.success = null;
            state.isLoading = false;
            state.api_errors = true
        },

        // create About
        [createAbout.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createAbout.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New About",
                description: payload.message
            })
        },
        [createAbout.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New About",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New About",
                    description: payload.message
                })
            }
        },

        // update About
        [updateAbout.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateAbout.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update About",
                description: payload.message
            })
        },
        [updateAbout.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update About",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update About",
                    description: payload.message
                })
            }
        },

        // delete about
        [deleteAbout.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteAbout.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete About",
                description: payload.message
            })
        },
        [deleteAbout.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete About",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = aboutSlice.actions;
// Action creators are generated for each case reducer function
export default aboutSlice.reducer;
