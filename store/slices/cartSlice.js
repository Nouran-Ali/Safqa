import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosGlobal, AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'


const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getStore = createAsyncThunk(
    "store",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `api/productsInStore/${id}`
            const res = await AxiosGlobal.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const checkoutStore = createAsyncThunk(
    "store/checkout",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/checkout/invoice/store/${args.id}`
            const state = getState()
            const { cart_products } = state.cart
            const payload = {
                ...args,
                products: cart_products.map(p => ({ id: p.id, quantity: p.quantity }))
            }
            const res = await AxiosGlobal.post(url, payload);
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
    store_urlImage: "https://api.safqapay.com/image/aboutStore",
    cart_products: [],
    store_products: [],
    products: null,
    categories: [],
    urlImage: "",
    profile: null,
    invocie_id: null,
    checkout_info: {
        customer_name: "",
        customer_mobile: "",
        customer_email: "",
        civil_id: "",
        comment: "",
    }
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        hydrateCartState(state) {
            if (state.products?.length) {
                state.store_products = [...state.products]
            }
            // manipulate store products and add in_cart attributes
            // to render in store page
            if (state.store_products?.length && state.cart_products?.length) {
                state.store_products = state.store_products.map(store_product => {
                    const productIndex = state.cart_products.findIndex(cart_product => cart_product.id == store_product.id)
                    return ({ ...store_product, in_cart: productIndex > -1 })
                })
            }
        },
        getStoredCart(state) {
            const storage_cart = localStorage.getItem("cart_products") ? JSON.parse(localStorage.getItem("cart_products")) : []
            state.cart_products = storage_cart
            console.log("state.products: ", state.products)
            // check if all cart products exists in store products
            // to render in cart page
            if (state.products?.length && state.cart_products?.length) {
                state.cart_products = state.products.map(product => {
                    const productIndex = state.cart_products.findIndex(cart_product => cart_product.id == product.id);
                    if (productIndex > -1) {
                        return ({
                            ...product,
                            quantity: state.cart_products[productIndex].quantity > product.quantity ? product.quantity : state.cart_products[productIndex].quantity,
                            max_quantity: product.quantity
                        })
                    }
                    return null;
                }).filter(product => product !== null);
            }
            localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
        },
        AddToCart(state, { payload }) {
            const new_cart = [...state.cart_products, { ...payload, quantity: 1, max_quantity: payload.quantity }];
            console.log("🚀 ~ file: cartSlice.js:111 ~ AddToCart ~ new_cart:", new_cart)
            state.cart_products = new_cart;
            localStorage.setItem("cart_products", JSON.stringify(new_cart));
        },
        DeleteFromCart(state, { payload }) {
            const { id } = payload
            const new_cart = state.cart_products.filter(product => product.id !== id)
            state.cart_products = new_cart;
            localStorage.setItem("cart_products", JSON.stringify(new_cart));
        },
        EditQuantity(state, { payload }) {
            console.log("🚀 ~ file: cartSlice.js:121 ~ EditQuantity ~ EditQuantity:")
            const { id, quantity } = payload
            const productIndx = state.cart_products.findIndex(p => p.id == id)
            if (productIndx > -1) {
                state.cart_products[productIndx].quantity = quantity
                localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
            }
        },
    },

    extraReducers: {
        // getStore thunk
        [getStore.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.isLoading = false;
            state.products = null
            state.categories = null
            state.urlImage = null
        },
        [getStore.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.description = payload?.myStore?.description;
            // state.logo = `https://api.safqapay.com/image/aboutStore/${payload.myStore?.logo}`;
            state.products = payload.myStore?.products;
            state.categories = payload.myStore?.product_categories;
            state.urlImage = payload.urlImage;
            state.profile = payload.profile;
            state.logo = payload.myStore?.logo;
        },
        [getStore.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.products = null
            state.categories = null
            state.urlImage = null
            state.api_errors = payload.response?.data || payload.response;
        },

        // checkoutStore thunk
        [checkoutStore.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.invoice_id = null;
        },
        [checkoutStore.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            state.invoice_id = payload.invoice;
        },
        [checkoutStore.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.invoice_id = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Checkout Error",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Checkout Error",
                    description: payload.message
                })
            }

        },

    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, getStoredCart, AddToCart, DeleteFromCart, EditQuantity, hydrateCartState } = cartSlice.actions;

export default cartSlice.reducer;
