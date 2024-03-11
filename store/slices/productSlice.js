import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { generateFormData } from "../../lib/submitServices";


const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getProducts = createAsyncThunk(
    "products",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/api/products";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getStore = createAsyncThunk(
    "store/info",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/api/aboutStore";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getAllStores = createAsyncThunk(
    "stores/admin",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/admin/aboutStore";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateStore = createAsyncThunk(
    "update/store",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/aboutStore/store";
            const form = generateFormData(args)
            const res = await AxiosJwt.post(url, form);
            dispatch(getStore())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);




export const getProduct = createAsyncThunk(
    "product",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/api/product/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getStoreProducts = createAsyncThunk(
    "store",
    async (id, { rejectWithValue, getState }) => {
        try {
            const url = `/api/productsInStore/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateAdminAboutStore = createAsyncThunk(
    "adminAboutStore/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/admin/aboutStore/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: 'PUT' });
            dispatch(getAllStores())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createProduct = createAsyncThunk(
    "product/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/product/store";
            const form = new FormData();
            form.append("token", token);

            for (let key in args) {
                key !== "product_image" && form.append(key, args[key]);
            }

            if (args.product_image?.[0] && typeof args.product_image === "object") {
                form.append("product_image", args.product_image[0]);
            }

            const res = await AxiosJwt.post(url, form);
            dispatch(getProducts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product/delete/${id}`;
            const body = {
                token,
                _method: "DELETE",
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getProducts())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/product/update/${args.id}`;
            const form = new FormData();
            form.append("token", token);
            form.append("_method", "PUT");

            for (let key in args) {
                key !== "product_image" && form.append(key, args[key]);
            }

            if (args.product_image?.[0] && typeof args.product_image === "object") {
                form.append("product_image", args.product_image[0]);
            }

            const res = await AxiosJwt.post(url, form);
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
    product: null,
    products: [],
    filtered_products: [],
    storeInfo: null,
    store_urlImage: "",
    urlImage: "",
    productInfo: {
        category_id: "",
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        quantity: 0,
        price: 0,
        product_image: "",
        is_stockable: 1,
        disable_product_on_sold: 1,
        is_active: 1,
        in_store: 1,
        is_shipping_product: 0,
        weight: 0,
        height: 0,
        width: 0,
        length: 0,
    },

    searchInfo: {
        product_name: "",
        category_name: "",
    },

    all_stores: [],
    urlImage: null,
    updateLoading: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        filterProducts(state, { payload }) {
            const { product_name, category_name } = payload;

            if (!product_name && !category_name) {

                state.filtered_products = state.products

            } else {

                if (state.products?.length > 0)

                    state.filtered_products = state.products.filter(product => {
                        if (product_name && product.name_en.toLowerCase().startsWith(product_name.trim().toLowerCase())) return product
                        if (category_name && product.category.name_en.toLowerCase().startsWith(category_name.trim().toLowerCase())) return product
                    })

            }

        }
    },

    extraReducers: {
        // getProducts thunk
        [getProducts.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.products = payload.data;
            state.filtered_products = payload.data;
            state.store_products = payload.data.filter(product => product.in_store == 1);
            state.urlImage = payload.urlImage;
        },
        [getProducts.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.products = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // getAllStores thunk
        [getAllStores.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getAllStores.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.all_stores = payload.data;
            state.urlImage = payload.urlImage;
        },
        [getAllStores.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.products = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        [getProduct.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.product = null;
        },
        [getProduct.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.product = payload.data;
        },
        [getProduct.rejected]: (state) => {
            state.product = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // get store 
        [getStore.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.storeInfo = null;
        },
        [getStore.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.storeInfo = payload.data;
            state.store_urlImage = payload.urlImage;
        },
        [getStore.rejected]: (state) => {
            state.storeInfo = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // updateStore thunk
        [updateStore.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateStore.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Store",
                description: payload.message
            })
        },
        [updateStore.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Update Store",
                description: state.api_errors
            })

        },

        // updateAdminAboutStore thunk
        [updateAdminAboutStore.pending]: (state, ) => {
            state.updateLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateAdminAboutStore.fulfilled]: (state, { payload }) => {
            state.updateLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update about store",
                description: payload.message
            })
        },
        [updateAdminAboutStore.rejected]: (state, { payload }) => {
            state.updateLoading = false;
            state.api_errors = payload.response?.data.message || payload.response?.data || payload.message;
            NotifyMessage({
                type: "error",
                title: "Update about Store",
                description: state.api_errors
            })

        },

        // getStoreProducts thunk
        [getStoreProducts.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getStoreProducts.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.store_products = payload.data;
            state.urlImage = payload.urlImage;
        },
        [getStoreProducts.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.products = null;
            state.api_errors = payload.response?.data || payload.response;
        },

        // createProduct thunk
        [createProduct.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createProduct.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Product",
                description: payload.message
            })
        },
        [createProduct.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Product",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Product",
                    description: payload.message
                })
            }

        },


        // deleteProduct thunk
        [deleteProduct.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteProduct.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Delete Product",
                description: payload.message
            })
        },
        [deleteProduct.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Delete Product",
                    description: payload.message
                })
            }
        },


        // updateProduct thunk
        [updateProduct.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateProduct.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Product",
                description: payload.message
            })
        },
        [updateProduct.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Product",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Product",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterProducts } = productSlice.actions;

export default productSlice.reducer;
