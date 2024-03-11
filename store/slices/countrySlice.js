import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosGlobal, AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const getCountries = createAsyncThunk(
    "countries",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/countries";
            const res = await AxiosGlobal.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getCountry = createAsyncThunk(
    "country",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/country/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createCountry = createAsyncThunk(
    "country/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/country/store";
            let form = new FormData();
            for (let key in args) key != 'flag' && form.append(key, args[key])
            args.flag?.[0] && typeof args.flag === "object" && form.append("flag", args.flag[0]);
            const res = await AxiosJwt.post(url, form);
            dispatch(getCountries())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const updateCountry = createAsyncThunk(
    "country/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/country/update/${args.id}`;
            let form = new FormData();
            form.append("_method", "PUT")
            for (let key in args) key != 'flag' && form.append(key, args[key])
            args.flag?.[0] && typeof args.flag === "object" && form.append("flag", args.flag[0]);
            const res = await AxiosJwt.post(url, form);
            dispatch(getCountries())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteCountry = createAsyncThunk(
    "country/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/country/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getCountries())
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
    imageUrl: null,
    countries: null,
    country: null,
    active_countries: null,
    filtered_countries: [],
    countryInfo: {
        name_en: "",
        name_ar: "",
        nationality_en: "",
        nationality_ar: "",
        code: "",
        currency: "",
        short_currency: "",
        flag: "",
        country_active: "",
    }
};

export const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getCountries.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getCountries.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.imageUrl = payload.imageUrl;
            state.countries = payload.data;
            state.active_countries = payload.data?.filter(country => country.country_active);
            state.filtered_countries = payload.data;
        },
        [getCountries.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Countries",
                description: payload.message,
            })
        },

        [getCountry.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.country = null;
        },
        [getCountry.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.country = payload.data;
        },
        [getCountry.rejected]: (state) => {
            state.country = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create country
        [createCountry.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createCountry.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Country",
                description: payload.message
            })
        },
        [createCountry.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Country",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Country",
                    description: payload.message
                })
            }
        },

        // update country
        [updateCountry.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateCountry.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Country",
                description: payload.message
            })
        },
        [updateCountry.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Country",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Country",
                    description: payload.message
                })
            }
        },

        // delete country
        [deleteCountry.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteCountry.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Country",
                description: payload.message
            })
        },
        [deleteCountry.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Country",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = countrySlice.actions;
// Action creators are generated for each case reducer function
export default countrySlice.reducer;
