import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getBusinessCategories = createAsyncThunk(
    "business_categories",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/business_categories";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);



export const getBusinessCategory = createAsyncThunk(
    "business_category",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/business_category/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createBusinessCategory = createAsyncThunk(
    "business_category/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/business_category/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getBusinessCategories())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateBusinessCategory = createAsyncThunk(
    "business_category/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/business_category/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getBusinessCategories())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteBusinessCategory = createAsyncThunk(
    "business_category/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/business_category/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getBusinessCategories())
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
    business_categories: [],
    business_category: null,
    filtered_business_categories: [],
    businessCategoryInfo: {
        name_en: "",
        name_ar: "",
    }
};

export const business_categorySlice = createSlice({
    name: "businessCategory",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        // get BusinessCategory
        [getBusinessCategories.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getBusinessCategories.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.business_categories = payload.data;
            state.filtered_business_categories = payload.data;
        },
        [getBusinessCategories.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Business Category",
                description: payload.message,
            })
        },

        [getBusinessCategory.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.business_category = null;
        },
        [getBusinessCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.business_category = payload.data;
        },
        [getBusinessCategory.rejected]: (state) => {
            state.business_category = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // create BusinessCategory
        [createBusinessCategory.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createBusinessCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Business Category",
                description: payload.message
            })
        },
        [createBusinessCategory.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Business Category",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Business Category",
                    description: payload.message
                })
            }
        },

        // update BusinessCategory
        [updateBusinessCategory.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateBusinessCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Business Category",
                description: payload.message
            })
        },
        [updateBusinessCategory.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Business Category",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Business Category",
                    description: payload.message
                })
            }
        },

        // delete business_category
        [deleteBusinessCategory.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteBusinessCategory.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Business Category",
                description: payload.message
            })
        },
        [deleteBusinessCategory.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Business Category",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = business_categorySlice.actions;
// Action creators are generated for each case reducer function
export default business_categorySlice.reducer;
