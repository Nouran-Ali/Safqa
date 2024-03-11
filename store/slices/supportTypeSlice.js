import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotifyMessage } from '../../comps/Messages';
import {AxiosJwt} from '../../lib/axios';

// Define the async thunk for fetching support types from an API
export const getSupportTypes = createAsyncThunk(
    'supportTypes',
    async (args, { rejectWithValue }) => {
        try {
            const url = `/api/support_types`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getSupportType = createAsyncThunk(
    "supportType",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/support_type/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createSupportType = createAsyncThunk(
    "supportType/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/support_type/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getSupportTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateSupportType = createAsyncThunk(
    "supportType/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/support_type/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getSupportTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteSupportType = createAsyncThunk(
    "supportType/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/support_type/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getSupportTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);



// Define the initial state for the supportType slice
const initialState = {
    isLoading: false,
    success: null,
    api_errors: null,
    support_types: [],
    support_type: null,
    filtered_support_types: [],
    supportTypeInfo: {
        name: ''
    }
};


export const supportTypeSlice = createSlice({
    name: 'supportType',
    initialState,
    reducers: {
        // Define reducers for updating the state in response to actions
        ResetSuccess(state) {
            state.success = null;
        },
    },
    extraReducers: {
        // Define reducers for handling the async thunk actions
        [getSupportTypes.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getSupportTypes.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.support_types = payload.data;
            state.filtered_support_types = payload.data;
        },
        [getSupportTypes.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: 'error',
                title: 'get Support Types',
                description: payload?.message,
            });
        },

        [getSupportType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.support_type = null;
        },
        [getSupportType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.support_type = payload.data;
        },
        [getSupportType.rejected]: (state) => {
            state.support_type = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create SupportType
        [createSupportType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createSupportType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Support Type",
                description: payload.message
            })
        },
        [createSupportType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Support Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Support Type",
                    description: payload.message
                })
            }
        },

        // update SupportType
        [updateSupportType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateSupportType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Support Type",
                description: payload.message
            })
        },
        [updateSupportType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Support Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Support Type",
                    description: payload.message
                })
            }
        },

        // delete recurring Interval
        [deleteSupportType.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteSupportType.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Support Type",
                description: payload.message
            })
        },
        [deleteSupportType.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Support Type",
                description: payload.message
            })
        },
    },
});

// Export the actions and reducer from the slice
export const { ResetSuccess } = supportTypeSlice.actions;
export default supportTypeSlice.reducer;
