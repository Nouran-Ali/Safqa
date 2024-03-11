import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { AxiosGlobal } from "../../lib/axios";
import { getDate, getTime, getTomorrowDate } from "../../lib/dates";


let lang = getCookie("language") || "en";
let token = getCookie("token");


export const getPayProduct = createAsyncThunk(
  "payProduct",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/PayProduct/Details/${id}`;
      const res = await AxiosGlobal.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const checkoutPayProduct = createAsyncThunk(
  "payProduct/checkout",
  async (args, { rejectWithValue, getState }) => {
    try {
      const url = `/api/store/product_invoice/${args.id}`;
      const state = getState()
      const { link_products } = state.payProduct
      console.log("🚀 ~ file: payProductSlice.js:34 ~ link_products:", link_products)
      const payload = {
        ...args,
        prductItems: link_products?.map(p => ({ product_id: p.product_id, product_quantity: p.quantity }))
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
  api_errors: null,
  success: null,
  products: null,
  profile: null,
  imageUrl: "https://api.safqapay.com/image/product",
  link_products: null,
  url_id: null,
  urlImage: null,
  invoice_id: null,
  checkout_info: {
    customer_name: "",
    customer_mobile: "",
    customer_email: "",
    civil_id: "",
    comment: "",
  }
};

export const payProductSlice = createSlice({
  name: "payProduct",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
    getStoredPayProducts(state, { payload }) {
      const { id } = payload;
      state.url_id = localStorage.getItem("url_id") ? JSON.parse(localStorage.getItem("url_id")) : null
      state.link_products = localStorage.getItem("link_products") ? JSON.parse(localStorage.getItem("link_products")) : []
      // check if all cart products exists in store products
      // to render in cart page
      if (state.url_id == id) {
        state.link_products = state.products.map(product => {
          const productIndex = state.link_products.findIndex(link_product => link_product.product_id == product.product_id);
          console.log("productIndex: ", productIndex)
          if (productIndex > -1) {
            return ({
              ...product,
              quantity: state.link_products[productIndex].quantity > product.quantity ? product.quantity : state.link_products[productIndex].quantity,
              max_quantity: product.quantity
            })
          } else {
            return ({ ...product, quantity: 0, max_quantity: product.quantity })
          }
        })
      } else {
        state.link_products = state.products.map(product => {
          return ({ ...product, quantity: 0, max_quantity: product.quantity })
        })
        state.url_id = id
        localStorage.setItem("url_id", `${id}`);
        localStorage.setItem("link_products", JSON.stringify(state.link_products));
      }
    },
    EditQuantity(state, { payload }) {
      const { id, quantity } = payload
      const productIndx = state.link_products.findIndex(p => p.product_id == id)
      if (productIndx > -1) {
        state.link_products[productIndx].quantity = quantity
        localStorage.setItem("link_products", JSON.stringify(state.link_products));
      }
    },
  },

  extraReducers: {

    [getPayProduct.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.payProduct = null;
    },
    [getPayProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.api_errors = null;
      state.products = payload.data?.products;
      state.profile = payload.data?.profile;
      state.urlImage = payload.data?.urlImage;
    },
    [getPayProduct.rejected]: (state) => {
      state.payProduct = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },

    // checkoutPayProduct
    [checkoutPayProduct.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.invoice_id = null;
    },
    [checkoutPayProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      state.invoice_id = payload.invoice;
      NotifyMessage({
        type: "success",
        title: "Pay Products",
        description: payload.message
      })
    },
    [checkoutPayProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.invoice_id = null;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Pay Products",
          description: "Please Check The Fields"
        })

      } else {
        NotifyMessage({
          type: "error",
          title: "Pay Products",
          description: payload.message
        })
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ResetSuccess,
  getStoredPayProducts,
  EditQuantity
} = payProductSlice.actions;

export default payProductSlice.reducer;
