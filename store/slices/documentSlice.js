import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'


const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getDocuments = createAsyncThunk(
    "documents",
    async (args, { rejectWithValue, getState }) => {
        try {
            const url = "/api/documents";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getAdminDocuments = createAsyncThunk(
    "admin/documents",
    async (args, { rejectWithValue, getState }) => {
        try {
            const url = "/api/documents";
            const headers = {
                profile: args.profile_id
            }
            const res = await AxiosJwt.get(url, { headers });
            console.log("🚀 ~ file: documentSlice.js:21 ~ res:", res)
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createDocument = createAsyncThunk(
    "documents/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/documents/store";
            const form = new FormData();

            if (args.civil_id?.[0] && typeof args.civil_id === "object") {
                form.append("civil_id", args.civil_id[0]);
            }
            if (args.civil_id_back?.[0] && typeof args.civil_id_back === "object") {
                form.append("civil_id_back", args.civil_id_back[0]);
            }
            if (args.bank_account_letter?.[0] && typeof args.bank_account_letter === "object") {
                form.append("bank_account_letter", args.bank_account_letter[0]);
            }
            if (args.other?.[0] && typeof args.other === "object") {
                form.append("other", args.other[0]);
            }
            const res = await AxiosJwt.post(url, form);
            dispatch(getDocuments())
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
    documents: [],
    urlFile: null,
    documentInfo: {
        civil_id: null,
        civil_id_back: null,
        bank_account_letter: null,
        other: null,
    }
};

export const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        // getDocuments thunk
        [getDocuments.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.urlFile = null;
        },
        [getDocuments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.urlFile = payload.urlFile
            state.documents = payload.data[0];
            state.documentInfo = payload.data[0];
        },
        [getDocuments.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.documents = null;
            state.urlFile = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // getAdminDocuments thunk
        [getAdminDocuments.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.urlFile = null;
        },
        [getAdminDocuments.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.urlFile = payload.urlFile
            state.documents = payload.data[0];
            state.documentInfo = payload.data[0];
        },
        [getAdminDocuments.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.documents = null;
            state.urlFile = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // createDocument
        [createDocument.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createDocument.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Document",
                description: payload.message
            })
        },
        [createDocument.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Document",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Document",
                    description: payload.message
                })
            }

        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = documentSlice.actions;

export default documentSlice.reducer;
