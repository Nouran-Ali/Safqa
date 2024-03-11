import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NotifyMessage } from '../../comps/Messages';
import {AxiosJwt} from '../../lib/axios';

// Define the async thunk for fetching contacts from an API
export const getContacts = createAsyncThunk(
    'contacts/get',
    async (args, { rejectWithValue }) => {
        try {
            const url = `/api/contacts`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateContact = createAsyncThunk(
    "contacts/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/contact/update`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getContacts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


// Define the initial state for the contacts slice
const initialState = {
    isLoading: false,
    success: null,
    api_errors: null,
    contacts: null,
};

// Define the contacts slice
const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        // Define reducers for updating the state in response to actions
        ResetSuccess(state) {
            state.success = null;
        },
    },
    extraReducers: {
        // Define reducers for handling the async thunk actions
        [getContacts.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getContacts.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = true;
            state.api_errors = null;
            state.contacts = payload.data;
        },
        [getContacts.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Contacts",
                description: payload?.message,
            })
        },

        // update Contact
        [updateContact.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateContact.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Contact",
                description: payload.message
            })
        },
        [updateContact.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Contact",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Contact",
                    description: payload.message
                })
            }
        },
    }
});

// Export the actions and reducer from the slice
export const { ResetSuccess } = contactSlice.actions;
export default contactSlice.reducer;
