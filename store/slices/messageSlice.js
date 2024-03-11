import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";
import { generateFormData } from "../../lib/submitServices";

export const getMessages = createAsyncThunk(
    "messages",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/admin/messages";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getMessage = createAsyncThunk(
    "messgae",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/message/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createMessage = createAsyncThunk(
    "message/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = '/api/message/store'
            const form = generateFormData(args);
            
            const response = await AxiosJwt.post(url, form);
            return response.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteMessage = createAsyncThunk(
    "message/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/message/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getMessages())
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
    message: null,
    messages: [],
    filtered_messages: [],
    messageInfo: {
        support_type_id: "",
        message: "",
        images_file: "",
    }
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getMessages.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getMessages.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.messages = payload.data;
            state.filtered_messages = payload.data;
        },
        [getMessages.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Messages",
                description: payload.message,
            })
        },

        [getMessage.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.message = null;
        },
        [getMessage.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.message = payload.data;
        },
        [getMessage.rejected]: (state) => {
            state.message = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create Message
        [createMessage.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createMessage.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Message",
                description: payload.message
            })
        },
        [createMessage.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Message",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Message",
                    description: payload.message
                })
            }
        },

        // delete business_type
        [deleteMessage.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteMessage.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Message",
                description: payload.message
            })
        },
        [deleteMessage.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Message",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = messageSlice.actions;
// Action creators are generated for each case reducer function
export default messageSlice.reducer;
