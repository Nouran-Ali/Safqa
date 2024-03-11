import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { getProducts } from './productSlice'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getCategories = createAsyncThunk(
    "categories",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = `/api/product/categories`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getCategory = createAsyncThunk(
    "category",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/api/product/category/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createCategory = createAsyncThunk(
    "category/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/product/category/store";
            const body = {
                token,
                ...args,
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getCategories())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "category/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product/category/delete/${id}`;
            const body = {
                _method: "DELETE"
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getCategories())
            dispatch(getProducts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateCategory = createAsyncThunk(
    "category/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product/category/update/${args.id}`;
            const body = {
                _method: "PUT",
                ...args
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getCategories())
            dispatch(getProducts())
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
    category: null,
    categories: [],
    active_categories: [],
    filtered_categories: [],

    categoryInfo: {
        name_en: "",
        name_ar: "",
        is_active: "",
    },

    is_active_list: [
        { id: 1, name: 'yes' },
        { id: 0, name: 'no' },
    ]
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        filterCategories(state, { payload }) {
            const { name_en, name_ar } = payload;

            if (!name_en && !name_ar) {

                state.filtered_categories = state.categories

            } else {

                if (state.categories?.length > 0)

                    state.filtered_categories = state.categories.filter(category => {
                        if (name_en && category.name_en.toLowerCase().startsWith(name_en.trim().toLowerCase())) return category
                        if (name_ar && category.name_ar.toLowerCase().startsWith(name_ar.trim().toLowerCase())) return category

                    })

            }

        }
    },

    extraReducers: {
        // getCategories thunk
        [getCategories.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getCategories.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.categories = payload.data;
            state.filtered_categories = payload.data;
            state.active_categories = payload.data.filter(category => category.is_active == 1);
        },
        [getCategories.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data;
            state.categories = null;
            state.filtered_categories = null;
        },

        [getCategory.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.category = null;
        },
        [getCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.category = payload.data;
        },
        [getCategory.rejected]: (state) => {
            state.category = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // createCategory thunk
        [createCategory.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Category",
                description: payload.message
            })
        },
        [createCategory.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Category",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Category",
                    description: payload.message
                })
            }
        },


        // deleteCategory thunk
        [deleteCategory.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteCategory.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Delete Category",
                description: payload.message
            })
        },
        [deleteCategory.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Delete Category",
                    description: payload.message
                })
            }
        },


        // updateCategory thunk
        [updateCategory.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;

        },
        [updateCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Category",
                description: payload.message
            })
        },
        [updateCategory.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Category",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Category",
                    description: payload.message
                })
            }
        },

    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterCategories } = categorySlice.actions;

export default categorySlice.reducer;
