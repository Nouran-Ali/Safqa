import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'


const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getOrders = createAsyncThunk(
    "order",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = "/api/orders";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createOrder = createAsyncThunk(
    "order/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = "/api/order/store";
            const form = new FormData();
            form.append("token", token);

            for (let key in args) {
                key !== "order_image" && form.append(key, args[key]);
            }

            if (args.order_image?.[0] && typeof args.order_image === "object") {
                form.append("order_image", args.order_image[0]);
            }

            const res = await AxiosJwt.post(url, form);
            dispatch(getOrder())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "order/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/order/delete/${id}`;
            const body = {
                token,
                _method: "DELETE",
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getOrder())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "order/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/order/update/${args.id}`;
            const form = new FormData();
            form.append("token", token);
            form.append("_method", "PUT");

            for (let key in args) {
                key !== "order_image" && form.append(key, args[key]);
            }

            if (args.order_image?.[0] && typeof args.order_image === "object") {
                form.append("order_image", args.order_image[0]);
            }

            const res = await AxiosJwt.post(url, form);
            dispatch(getOrder())
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
    orders: [],
    filtered_orders: [],
    urlImage: "",
    orderInfo: {
        category_id: "",
        name_en: "",
        name_ar: "",
        description_en: "",
        description_ar: "",
        quantity: 0,
        price: 0,
        is_stockable: 0,
        disable_order_on_sold: 0,
        is_active: 0,
        order_image: "",
        is_shipping_order: 1,
        weight: 0,
        height: 0,
        width: 0,
        length: 0,
    },

};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        filterOrders(state, { payload }) {
            const { order_name, category_name } = payload;

            if (!order_name && !category_name) {

                state.filtered_orders = state.orders

            } else {

                if (state.orders?.length > 0)

                    state.filtered_orders = state.orders.filter(order => {
                        if (order_name && order.name_en.toLowerCase().startsWith(order_name.trim().toLowerCase())) return order
                        if (category_name && order.category.name_en.toLowerCase().startsWith(category_name.trim().toLowerCase())) return order
                    })

            }

        }
    },

    extraReducers: {
        // getOrders thunk
        [getOrders.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
        },
        [getOrders.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.orders = payload.data;
            state.filtered_orders = payload.data;
            state.urlImage = payload.urlImage;
        },
        [getOrders.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.orders = null;
            state.api_errors = payload.response?.data || payload.response;
        },


        // createOrder thunk
        [createOrder.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createOrder.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Order",
                description: payload.message
            })
        },
        [createOrder.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Order",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Order",
                    description: payload.message
                })
            }

        },


        // deleteOrder thunk
        [deleteOrder.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteOrder.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Delete Order",
                description: payload.message
            })
        },
        [deleteOrder.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Delete Order",
                    description: payload.message
                })
            }
        },


        // updateOrder thunk
        [updateOrder.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateOrder.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Update Order",
                description: payload.message
            })
        },
        [updateOrder.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Order",
                    description: "Please Check The Fields"
                })

            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Order",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterOrders } = orderSlice.actions;

export default orderSlice.reducer;
