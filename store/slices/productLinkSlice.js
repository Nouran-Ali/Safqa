import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'


const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getProductsLinks = createAsyncThunk(
    "productLinks",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/api/product_links";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getProductsLink = createAsyncThunk(
    "productLink",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/api/product_link/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getStoreProductLinks = createAsyncThunk(
    "store",
    async (id, { rejectWithValue, getState }) => {
        try {
            const url = `/api/productLinksInStore/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createProductLink = createAsyncThunk(
    "productLink/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/product_link/store";
            const res = await AxiosJwt.post(url, args);
            dispatch(getProductsLinks())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteProductLink = createAsyncThunk(
    "productLink/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product_link/delete/${id}`;
            const body = {
                token,
                _method: "DELETE",
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getProductsLinks())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateProductLink = createAsyncThunk(
    "productLink/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product_link/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
            dispatch(getProductsLinks())
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
    product_links: [],
    product_link: null,
    filtered_product_links: [],
    urlImage: "",
    productLinkInfo: {
        name_en: "",
        name_ar: "",
        is_active: "",
        Terms_and_conditions: "",
        products: []
    },

    searchInfo: {
        productLink_name: "",
        category_name: "",
    }
};

export const productLinkSlice = createSlice({
    name: "productLink",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        filterProductLinks(state, { payload }) {
            const { productLink_name, category_name } = payload;

            if (!productLink_name && !category_name) {

                state.filtered_productLinks = state.productLinks

            } else {

                if (state.productLinks?.length > 0)

                    state.filtered_productLinks = state.productLinks.filter(productLink => {
                        if (productLink_name && productLink.name_en.toLowerCase().startsWith(productLink_name.trim().toLowerCase())) return productLink
                        if (category_name && productLink.category.name_en.toLowerCase().startsWith(category_name.trim().toLowerCase())) return productLink
                    })

            }

        }
    },

    extraReducers: {
        // getProductsLinks thunk
        [getProductsLinks.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getProductsLinks.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.product_links = payload.data;
            state.filtered_product_links = payload.data;
            state.urlImage = payload.urlImage;
        },
        [getProductsLinks.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.productLinks = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // getProductsLink
        [getProductsLink.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.product_link = null;
        },
        [getProductsLink.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.product_link = payload.data;
        },
        [getProductsLink.rejected]: (state) => {
            state.product_link = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },


        // getStoreProductLinks thunk
        [getStoreProductLinks.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getStoreProductLinks.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.store_productLinks = payload.data;
            state.urlImage = payload.urlImage;
        },
        [getStoreProductLinks.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.productLinks = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // createProductLink thunk
        [createProductLink.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createProductLink.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Product Link",
                description: payload.message
            })
        },
        [createProductLink.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Product Link",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Product Link",
                    description: payload.message
                })
            }

        },


        // updateProductLink thunk
        [updateProductLink.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateProductLink.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Product Link",
                description: payload.message
            })
        },
        [updateProductLink.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Product Link",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Product Link",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterProductLinks } = productLinkSlice.actions;

export default productLinkSlice.reducer;
