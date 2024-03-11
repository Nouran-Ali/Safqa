import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getBusinessTypes = createAsyncThunk(
    "businessTypes",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/businessTypes";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getBusinessType = createAsyncThunk(
    "businessType",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/businessType/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);



export const createBusinessType = createAsyncThunk(
    "businessType/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/businessType/store";
            const formData = new FormData();

            for (let key in args) {
                key !== "business_logo" && formData.append(key, args[key]);
            }

            if (args.business_logo?.[0] && typeof args.business_logo === "object") {
                formData.append("business_logo", args.business_logo[0]);
            }

            const res = await AxiosJwt.post(url, formData);
            dispatch(getBusinessTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateBusinessType = createAsyncThunk(
    "businessType/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/businessType/update/${args.id}`;
            const formData = new FormData();
            formData.append('_method', 'PUT');

            for (let key in args) {
                key !== "business_logo" && formData.append(key, args[key]);
            }

            if (args.business_logo?.[0] && typeof args.business_logo === "object") {
                formData.append("business_logo", args.business_logo[0]);
            }
            const res = await AxiosJwt.post(url, formData);
            dispatch(getBusinessTypes())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteBusinessType = createAsyncThunk(
    "businessType/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/businessType/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getBusinessTypes())
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
    business_types: null,
    business_type: null,
    filtered_business_types: [],
    businessTypeInfo: {
        name_en: "",
        name_ar: "",
        business_logo: "",
    },
    imageUrl: '',
};

export const businessTypeSlice = createSlice({
    name: "businessType",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getBusinessTypes.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;

            state.business_types = null
            state.filtered_business_types = null
            state.imageUrl = null
        },
        [getBusinessTypes.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.business_types = payload.data;
            state.filtered_business_types = payload.data;
            state.imageUrl = payload.imageUrl
        },
        [getBusinessTypes.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            state.api_errors = true;

            state.business_types = null
            state.filtered_business_types = null
            state.imageUrl = null

            NotifyMessage({
                type: "error",
                title: "get Business Types",
                description: payload.message,
            })
        },

        [getBusinessType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.business_type = null;
        },
        [getBusinessType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.business_type = payload.data;
        },
        [getBusinessType.rejected]: (state) => {
            state.business_type = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // create BusinessType
        [createBusinessType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createBusinessType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Business Type",
                description: payload.message
            })
        },
        [createBusinessType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Business Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Business Type",
                    description: payload.message
                })
            }
        },

        // update BusinessType
        [updateBusinessType.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateBusinessType.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Business Type",
                description: payload.message
            })
        },
        [updateBusinessType.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Business Type",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Business Type",
                    description: payload.message
                })
            }
        },

        // delete business_type
        [deleteBusinessType.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteBusinessType.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Business Type",
                description: payload.message
            })
        },
        [deleteBusinessType.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Business Type",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = businessTypeSlice.actions;
// Action creators are generated for each case reducer function
export default businessTypeSlice.reducer;
