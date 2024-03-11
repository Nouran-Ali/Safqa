import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { getDate, getTime, getTomorrowDate } from "../../lib/dates";


let lang = getCookie("language") || "en";
let token = getCookie("token");


export const getInvoices = createAsyncThunk(
  "invoices",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = "/api/invoices";
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);


export const getInvoice = createAsyncThunk(
  "invoice",
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/invoice/show/${id}`;
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const getInvoicesExpiry = createAsyncThunk(
  "invoice/expiry/get",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = "/api/invoice_expiry";
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoice/create",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = "/api/invoice/store";
      const { prductItems } = args;
      const form = new FormData();

      if (args.send_invoice_option_id == 1) { // sms
        delete args.customer_email
      } else if (args.send_invoice_option_id == 2) { // email
        delete args.customer_mobile
        delete args.customer_mobile_code_id
      }

      if (args.is_discount == 0) {
        delete args.discount_type
        delete args.discount_value
        form.append("discount_type", 0);
        form.append("discount_value", 0);
      }

      if (args.is_open_invoice == 0) {
        delete args.min_invoice
        delete args.max_invoice
      }

      if (args.recurring_interval_id == 1) {
        delete args.recurring_start_date
        delete args.recurring_end_date
      }

      for (let key in args) {
        if (key !== 'prductItems' && key !== 'expiry_date' && key !== 'expiry_time' && key !== 'attach_file')
          form.append(key, args[key]);
      }

      if (args.attach_file?.[0] && typeof args.attach_file === "object") {
        form.append("attach_file", args.attach_file[0]);
      }

      form.append("expiry_date", `${args.expiry_date} ${args.expiry_time}`);

      prductItems.map((item, index) => {
        form.append(`prductItems[${index}][product_name]`, item.product_name);
        form.append(`prductItems[${index}][product_price]`, item.product_price);
        form.append(`prductItems[${index}][product_quantity]`, item.product_quantity);
      });


      const res = await AxiosJwt.post(url, form);
      dispatch(getInvoices())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/update",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `/api/invoice/update/${args.id}`;
      const { prductItems } = args;
      const form = new FormData();
      form.append('_method', "PUT")

      if (args.send_invoice_option_id == 1) { // sms
        delete args.customer_email
      } else if (args.send_invoice_option_id == 2) { // email
        delete args.customer_mobile
        delete args.customer_mobile_code_id
      }

      if (args.is_discount == 0) {
        delete args.discount_type
        delete args.discount_value
        form.append("discount_type", 0);
        form.append("discount_value", 0);
      }

      if (args.is_open_invoice == 0) {
        delete args.min_invoice
        delete args.max_invoice
      }

      if (args.recurring_interval_id == 1) {
        delete args.recurring_start_date
        delete args.recurring_end_date
      }

      for (let key in args) {
        if (key !== 'prductItems' && key !== 'expiry_date' && key !== 'expiry_time' && key !== 'attach_file')
          form.append(key, args[key]);
      }

      if (args.attach_file?.[0] && typeof args.attach_file === "object") {
        form.append("attach_file", args.attach_file[0]);
      }

      form.append("expiry_date", `${args.expiry_date} ${args.expiry_time}`);

      prductItems.map((item, index) => {
        form.append(`prductItems[${index}][product_name]`, item.product_name);
        form.append(`prductItems[${index}][product_price]`, item.product_price);
        form.append(`prductItems[${index}][product_quantity]`, item.product_quantity);
      });



      const res = await AxiosJwt.post(url, form);
      dispatch(getInvoices())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);

export const createQuickInvoice = createAsyncThunk(
  "quickInvoice/create",
  async (args, { rejectWithValue, getState, dispatch }) => {
    try {

      const url = "/api/invoice/quick/store";

      if (args.send_invoice_option_id == 1) { // sms
        delete args.customer_email
      } else if (args.send_invoice_option_id == 2) { // email
        delete args.customer_mobile
        delete args.customer_mobile_code_id
      }

      const res = await AxiosJwt.post(url, { ...args });
      dispatch(getInvoices())
      return res.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
);



export const deleteInvoice = createAsyncThunk(
  "invoice/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {

      let token = getCookie("token");
      const url = `/api/invoices/delete/${id}`;
      const body = {
        token,
        _method: 'DELETE'
      }

      const res = await AxiosJwt.post(url, body);
      dispatch(getInvoices())
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
  invoices: [],
  invoice: null,
  filtered_invoices: [],
  invoice_expiry: [],
  filtered_invoice_expiry: [],

  searchInfo: {
    customer_name: '',
    expiry_date: '',
    invoice_value: 0,
    status: 'all',
  },

  customerInfo: {
    customer_name: '',
    send_invoice_option_id: 2,
    customer_mobile_code_id: '',
    customer_mobile: '',
    customer_email: '',
    customer_reference: '',
  },

  invoiceInfo: {
    currency_id: '',
    recurring_interval_id: '',
    is_open_invoice: 0, // isFixed: 1,
    min_invoice: 0,
    is_discount: 0,
    is_terms: 0,
    discount_type: '',
    discount_value: 0,
    remind_after: 0,
    attach_file: '',
    expiry_date: getTomorrowDate(),
    expiry_time: getTime(),
    terms_and_conditions: '',
    comment: '',
  },

  prductItems: [
    {
      product_name: '',
      product_price: 0,
      product_quantity: 0,
    },
  ],

  quickInvoiceInfo: {
    customer_name: '',
    send_invoice_option_id: 2,
    customer_mobile_code_id: '',
    customer_mobile: '',
    customer_email: '',
    customer_reference: '',
    invoice_display_value: 0,
    currency_id: '',
  },

  commission_types: [
    { id: 0, name_en: 'Vendor', name_ar: 'البائع' },
    { id: 1, name_en: 'Client', name_ar: 'العميل' },
    { id: 2, name_en: 'Vendor and Client', name_ar: 'البائع والعميل' },
  ],

  payment_types: [
    { id: 1, name_en: 'Stripe', name_ar: 'سترايب' },
    { id: 2, name_en: 'CCAvenue', name_ar: 'سي سي افينيو' },
  ],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    ResetSuccess(state) {
      state.success = null;
    },
    filterInvoices(state, { payload }) {
      const { customer_name } = payload;

      if (!customer_name) {
        state.filtered_invoices = state.invoices
      }

      else {

        state.filtered_invoices = state.invoices.filter(invoice => {
          if (customer_name && invoice.customer_name.toLowerCase().startsWith(customer_name.toLowerCase())) return invoice
        })
      }
    }
  },

  extraReducers: {

    // getInvoices thunk
    [getInvoices.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [getInvoices.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.invoices = payload.data;
      state.filtered_invoices = payload.data;
    },
    [getInvoices.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.success = null;
      state.api_errors = payload.response?.data;
    },

    [getInvoice.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
      state.invoice = null;
    },
    [getInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.success = payload.message;
      state.api_errors = null;
      state.invoice = payload.data;
    },
    [getInvoice.rejected]: (state) => {
      state.invoice = null;
      state.success = null;
      state.isLoading = false;
      state.api_errors = true;
    },


    // getInvoicesExpiry thunk
    [getInvoicesExpiry.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [getInvoicesExpiry.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.invoice_expiry = payload.data;
      state.filtered_invoice_expiry = payload.data;
    },
    [getInvoicesExpiry.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.success = null;
      state.api_errors = payload.response?.data;
    },

    // createInvoice thunk
    [createInvoice.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [createInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Create Invoice",
        description: payload.message
      })
    },
    [createInvoice.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Create Invoice",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Create Invoice",
          description: payload.message
        })
      }
    },

    // updateInvoice thunk
    [updateInvoice.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [updateInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Update Invoice",
        description: payload.message
      })
    },
    [updateInvoice.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Update Invoice",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Update Invoice",
          description: payload.message
        })
      }
    },

    // createQuickInvoice thunk
    [createQuickInvoice.pending]: (state) => {
      state.isLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [createQuickInvoice.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = null;
      state.success = payload.message;
      NotifyMessage({
        type: "success",
        title: "Create Quick Invoice",
        description: payload.message
      })
    },
    [createQuickInvoice.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
        NotifyMessage({
          type: "error",
          title: "Create Quick Invoice",
          description: "Please Check The Fields"
        })
      } else {
        NotifyMessage({
          type: "error",
          title: "Create Quick Invoice",
          description: payload.message
        })
      }
    },

    // deleteInvoice thunk
    [deleteInvoice.pending]: (state) => {
      state.deleteLoading = true;
      state.api_errors = null;
      state.success = null;
    },
    [deleteInvoice.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.api_errors = null;
      state.success = payload.message;
    },
    [deleteInvoice.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.success = null;
      if (payload.response?.data) {
        state.api_errors = payload.response?.data;
      } else {
        NotifyMessage({
          type: "error",
          title: "Delete Invoice",
          description: payload.message
        })
      }
    },


  },
});

// Action creators are generated for each case reducer function
export const {
  ResetSuccess,
  filterInvoices
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
