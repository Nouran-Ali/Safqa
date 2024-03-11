import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getLanguages = createAsyncThunk(
    "languages",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/languages";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getLanguage = createAsyncThunk(
    "language",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/language/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createLanguage = createAsyncThunk(
    "language/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/language/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getLanguages())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateLanguage = createAsyncThunk(
    "language/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/language/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getLanguages())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteLanguage = createAsyncThunk(
    "language/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/language/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getLanguages())
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
    languages: [],
    language: null,
    filtered_languages: [],
    languageInfo: {
        name: "",
        short_name: "",
        slug: "",
    }
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getLanguages.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getLanguages.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.languages = payload.data;
            state.filtered_languages = payload.data;
        },
        [getLanguages.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Languages",
                description: payload.message,
            })
        },

        [getLanguage.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.language = null;
        },
        [getLanguage.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.language = payload.data;
        },
        [getLanguage.rejected]: (state) => {
            state.language = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },
        
        // create Language
        [createLanguage.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createLanguage.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Language",
                description: payload.message
            })
        },
        [createLanguage.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Language",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Language",
                    description: payload.message
                })
            }
        },

        // update Language
        [updateLanguage.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateLanguage.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Language",
                description: payload.message
            })
        },
        [updateLanguage.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Language",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Language",
                    description: payload.message
                })
            }
        },

        // delete language
        [deleteLanguage.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteLanguage.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Language",
                description: payload.message
            })
        },
        [deleteLanguage.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Language",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = languageSlice.actions;
// Action creators are generated for each case reducer function
export default languageSlice.reducer;
