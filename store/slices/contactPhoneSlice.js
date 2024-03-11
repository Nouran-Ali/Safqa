import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getContactPhones = createAsyncThunk(
    "contactphones",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/contactphones";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getContactPhone = createAsyncThunk(
    "contactphone",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/contactphones/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createContactPhone = createAsyncThunk(
    "contactphone/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/contactphones/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getContactPhones())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateContactPhone = createAsyncThunk(
    "contactphone/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/contactphones/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getContactPhones())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteContactPhone = createAsyncThunk(
    "contactphone/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/contactphones/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getContactPhones())
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
    contact_phones: [],
    contact_phone: null,
    filtered_contact_phones: [],
    contactPhoneInfo: {
        number: "",
        type: "",
    }
};

export const contactphoneSlice = createSlice({
    name: "contactPhone",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getContactPhones.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getContactPhones.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.contact_phones = payload.data;
            state.filtered_contact_phones = payload.data;
        },
        [getContactPhones.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Contact Phones",
                description: payload.message,
            })
        },


        [getContactPhone.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.contact_phone = null;
        },
        [getContactPhone.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.contact_phone = payload.data;
        },
        [getContactPhone.rejected]: (state) => {
            state.contact_phone = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },



        // create ContactPhone
        [createContactPhone.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createContactPhone.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Contact Phone",
                description: payload.message
            })
        },
        [createContactPhone.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Contact Phone",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Contact Phone",
                    description: payload.message
                })
            }
        },

        // update ContactPhone
        [updateContactPhone.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateContactPhone.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Contact Phone",
                description: payload.message
            })
        },
        [updateContactPhone.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Contact Phone",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Contact Phone",
                    description: payload.message
                })
            }
        },

        // delete business_type
        [deleteContactPhone.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteContactPhone.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Contact Phone",
                description: payload.message
            })
        },
        [deleteContactPhone.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Contact Phone",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = contactphoneSlice.actions;
// Action creators are generated for each case reducer function
export default contactphoneSlice.reducer;
