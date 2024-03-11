import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { AxiosGlobal, AxiosJwt } from '../../lib/axios';
import { NotifyMessage } from '../../comps/Messages';

const lang = getCookie('language') || 'en';
const token = getCookie('token');

// export const authThunk = createAsyncThunk(
//   'auth/login',
//   async (args, { rejectWithValue }) => {
//     try {
//       const url = '/api/login';
//       const res = await AxiosJwt.post(url, args);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return rejectWithValue(err);
//     }
//   }
// );

// export const otpVerify = createAsyncThunk(
//   'auth/login/otp',
//   async (args, { rejectWithValue }) => {
//     try {
//       const url = '/api/otp/verification';
//       const otpCredentials = JSON.parse(getCookie('otpCredentials'));
//       const payload = { ...args, ...otpCredentials };
//       const res = await AxiosJwt.post(url, payload);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return rejectWithValue(err);
//     }
//   }
// );

// export const logoutThunk = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const url = '/api/logout';
//       const res = await AxiosJwt.post(url, { token });
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return rejectWithValue(err);
//     }
//   }
// );

export const changePasswordThunk = createAsyncThunk(
  'auth/changePassword',
  async (args, { rejectWithValue }) => {
    try {
      const url = '/api/changePassword';

      const body = { token, ...args };
      const res = await AxiosJwt.post(url, body);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (args, { rejectWithValue }) => {
    try {
      const url = `/api/reset-password`;
      const sender = getCookie('sender');
      // console.log(typeof JSON.parse(sender))
      const payload = { ...args, ...JSON.parse(sender) };
      console.log('🚀 ~ file: authSlice.js:82 ~ payload:', payload);
      const res = await AxiosJwt.post(url, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const MultiFactorAuth = createAsyncThunk(
  'auth/multi-factor-auth',
  async (args, { rejectWithValue }) => {
    try {
      const url = `/api/multiFactotrAuth/update`;
      const res = await AxiosJwt.post(url, args);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const forgetPasswordByEmail = createAsyncThunk(
  'auth/forgetPassword/email',
  async (args, { rejectWithValue }) => {
    try {
      const url = `/api/forget-password`;
      const payload = { sender: args.email, type: 2 };
      const res = await AxiosJwt.post(url, payload);
      setCookie('sender', { sender: args.email });
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const forgetPasswordByPhone = createAsyncThunk(
  'auth/forgetPassword/phone',
  async (args, { rejectWithValue }) => {
    try {
      const url = `/api/forget-password`;
      const res = await AxiosJwt.post(url, {
        sender: args.phone_number,
        phone_code: args.phone_code,
        type: 1,
      });
      setCookie('sender', {
        sender: args.phone_number,
        phone_code: args.phone_code,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getMyData = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const url = '/api/me';
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getHomePage = createAsyncThunk(
  'homePage',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const url = '/api/homePage';
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getUSDBalance = createAsyncThunk(
  'usdBalance',
  async ({ from, to, amount }, { rejectWithValue }) => {
    try {
      const url = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`;
      const payload = {
        headers: { apikey: 'mCFAqSZGgfz1vYfLic62hcqbMHnZKm7G' },
      };
      const res = await AxiosGlobal.get(url, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getAdminHomePage = createAsyncThunk(
  'adminHomePage',
  async (_, { rejectWithValue }) => {
    try {
      const url = '/admin/homePage';
      const res = await AxiosJwt.get(url);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  token: getCookie('token'),
  user: null,
  isLoading: false,
  error: null,
  success: null,
  myData: {},
  statistics: {
    usd_balance: null,
    normal_invoices: null,
    payment_invoices: null,
    product_invoice: null,
    sales_invoice: null,
    transaction_count: null,
    transaction_value: null,
    wallet_profile: null,
    wallet_safqa: null,
    rate: null,
  },

  credentials: {
    email: '',
    password: '',
    remember_me: false,
  },

  changePassword: {
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  },

  resetPasswordInfo: {
    password: '',
    password_confirmation: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LogOut(state) {
      state.token = null;
      deleteCookie('token');
      window.location.reload();
    },
    ResetSuccess(state) {
      state.success = null;
    },
    ResetArrowActive(state) {
      setCookie('arrowActive', false);
    },
  },
  extraReducers: {
    // auth login
    // [authThunk.fulfilled]: (state, action) => {
    //   const { access_token, token_type, expires_in, multiAuth } =
    //     action.payload;
    //   state.isLoading = false;
    //   state.api_errors = null;
    //   setCookie('arrowActive', true);
    //   if (access_token) {
    //     setCookie('token', access_token);
    //     state.token = access_token;
    //     window.location.href = '/dashboard';
    //   } else {
    //     const { email } = action.meta.arg;
    //     setCookie('otpCredentials', JSON.stringify({ email }));
    //     NotifyMessage({
    //       type: 'success',
    //       title: 'Login',
    //       description: action.payload.message,
    //     });
    //     window.location.href = '/login/otp';
    //   }
    //   // if (multiAuth) {
    //   // }
    // },
    // [authThunk.pending]: (state) => {
    //   state.isLoading = true;
    //   state.api_errors = null;
    // },
    // [authThunk.rejected]: (state, { payload }) => {
    //   deleteCookie('token');
    //   state.isLoading = false;
    //   state.token = null;
    //   state.api_errors =
    //     payload.response?.data?.message ||
    //     payload.response?.data?.error ||
    //     payload.response?.data ||
    //     payload.message;
    //   NotifyMessage({
    //     type: 'error',
    //     title: 'Login',
    //     description: state.api_errors,
    //   });
    // },

    // auth login
    // [otpVerify.fulfilled]: (state, action) => {
    //   const { access_token, token_type, expires_in, multiAuth } =
    //     action.payload;
    //   state.isLoading = false;
    //   state.api_errors = null;
    //   setCookie('arrowActive', true);
    //   if (access_token) {
    //     setCookie('token', access_token);
    //     state.token = access_token;
    //   }
    //   deleteCookie('otpCredentials');

    //   window.location.href = '/dashboard';
    // },
    // [otpVerify.pending]: (state) => {
    //   state.isLoading = true;
    //   state.api_errors = null;
    // },
    // [otpVerify.rejected]: (state, { payload }) => {
    //   deleteCookie('token');
    //   state.isLoading = false;
    //   state.token = null;
    //   state.api_errors =
    //     payload.response?.data?.message ||
    //     payload.response?.data?.error ||
    //     payload.response?.data ||
    //     payload.message;
    //   // NotifyMessage({
    //   //   type: "error",
    //   //   title: "Verify OTP",
    //   //   description: state.api_errors
    //   // })
    // },

    // auth logout
    // [logoutThunk.fulfilled]: (state, action) => {
    //   deleteCookie('token');
    //   deleteCookie('myData');
    //   window.location.reload();
    // },
    // [logoutThunk.pending]: (state) => {},
    // [logoutThunk.rejected]: (state, { payload }) => {
    //   deleteCookie('token');
    //   deleteCookie('myData');
    //   window.location.reload();
    //   NotifyMessage({
    //     type: 'error',
    //     title: 'Logout',
    //     description: payload.message,
    //   });
    // },

    // get My Data thunk
    [getMyData.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.myData = payload;
    },
    [getMyData.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = payload.response?.data;
    },

    // get Home Page thunk
    [getHomePage.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomePage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.statistics.normal_invoices = payload.normal_invoices;
      state.statistics.payment_invoices = payload.payment_invoices;
      state.statistics.product_invoice = payload.product_invoice;
      state.statistics.sales_invoice = payload.sales_invoice;
      state.statistics.transaction_count = payload.transaction_count;
      state.statistics.transaction_value = payload.transaction_value;
      state.statistics.wallet_profile = payload.wallet_profile;
    },
    [getHomePage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = payload.response?.data;
    },

    // get Home Page thunk
    [getUSDBalance.pending]: (state) => {
      state.isLoading = true;
      state.statistics.usd_balance = null;
    },
    [getUSDBalance.fulfilled]: (state, { payload }) => {
      const {
        result,
        info: { rate },
      } = payload;
      state.isLoading = false;
      state.statistics.usd_balance = result;
      state.statistics.rate = 1 / rate;
    },
    [getUSDBalance.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.statistics.usd_balance = null;
      state.api_errors = payload.response?.data;
    },

    // get Home Page thunk
    [getAdminHomePage.pending]: (state) => {
      state.isLoading = true;
    },
    [getAdminHomePage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.statistics.normal_invoices = payload.normal_invoices;
      state.statistics.payment_invoices = payload.payment_invoices;
      state.statistics.product_invoice = payload.product_invoice;
      state.statistics.transaction_count = payload.transaction_count;
      state.statistics.transaction_value = payload.transaction_value;
      state.statistics.wallet_safqa = payload.wallet_safqa;
    },
    [getAdminHomePage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_errors = payload.response?.data;
    },

    // changePasswordThunk
    [changePasswordThunk.pending]: (state) => {
      state.isLoading = true;
      state.success = null;
      state.api_errors = null;
    },
    [changePasswordThunk.fulfilled]: (state, { payload }) => {
      state.api_errors = null;
      state.isLoading = false;
      state.success = payload.message || true;
      NotifyMessage({
        type: 'success',
        title: 'change password',
        description: payload.message,
      });
    },
    [changePasswordThunk.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      NotifyMessage({
        type: 'error',
        title: 'change password',
        description: payload.response?.data?.message || payload.message,
      });
    },

    // MultiFactorAuth
    [MultiFactorAuth.pending]: (state) => {
      state.isLoading = true;
      state.success = null;
      state.api_errors = null;
    },
    [MultiFactorAuth.fulfilled]: (state, { payload }) => {
      state.api_errors = null;
      state.isLoading = false;
      state.success = payload.message || true;
      NotifyMessage({
        type: 'success',
        title: 'update MultiFactorAuth',
        description: payload.message,
      });
    },
    [MultiFactorAuth.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      NotifyMessage({
        type: 'error',
        title: 'update MultiFactorAuth',
        description: payload.response?.data?.message || payload.message,
      });
    },

    // Reset password
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.success = null;
      state.api_errors = null;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.api_errors = null;
      state.isLoading = false;
      state.success = payload.message || true;
      NotifyMessage({
        type: 'success',
        title: 'Reset Password',
        description: payload.message,
      });
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      NotifyMessage({
        type: 'error',
        title: 'Reset Password',
        description: payload.response?.data?.message || payload.message,
      });
    },

    // forgetPasswordByEmail
    [forgetPasswordByEmail.pending]: (state) => {
      state.isLoading = true;
      state.success = null;
      state.api_errors = null;
    },
    [forgetPasswordByEmail.fulfilled]: (state, { payload }) => {
      state.api_errors = null;
      state.isLoading = false;
      state.success = payload.message || true;
      NotifyMessage({
        type: 'success',
        title: 'Forget Password',
        description: payload.message,
      });
    },
    [forgetPasswordByEmail.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      state.api_errors =
        payload.response?.data.message ||
        payload.response?.data ||
        payload.message;
      NotifyMessage({
        type: 'error',
        title: 'Forget Password',
        description: state.api_errors,
      });
    },

    // forgetPasswordByPhone
    [forgetPasswordByPhone.pending]: (state) => {
      state.isLoading = true;
      state.success = null;
      state.api_errors = null;
    },
    [forgetPasswordByPhone.fulfilled]: (state, { payload }) => {
      state.api_errors = null;
      state.isLoading = false;
      state.success = payload.message || true;
      NotifyMessage({
        type: 'success',
        title: 'Forget Password',
        description: payload.message,
      });
    },
    [forgetPasswordByPhone.rejected]: (state, { payload }) => {
      state.success = null;
      state.isLoading = false;
      state.api_errors =
        payload.response?.data.message ||
        payload.response?.data ||
        payload.message;
      NotifyMessage({
        type: 'error',
        title: 'Forget Password',
        description: state.api_errors,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { LogOut, ResetSuccess, ResetArrowActive } = authSlice.actions;

export default authSlice.reducer;
