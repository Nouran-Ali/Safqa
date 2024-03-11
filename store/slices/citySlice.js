import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from "../../comps/Messages";

export const getCities = createAsyncThunk(
    "cities",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/admin/cities";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getCity = createAsyncThunk(
    "city",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/city/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getProfilesCity = createAsyncThunk(
    "profileCity",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/cities";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createCity = createAsyncThunk(
    "city/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/city/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getCities())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateCity = createAsyncThunk(
    "city/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/city/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getCities())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteCity = createAsyncThunk(
    "city/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/city/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getCities())
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
    cities: [],
    city: null,
    filtered_cities: [],
    cityInfo: {
        name_en: "",
        name_ar: "",
        country_id: "",
    }
};

export const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getCities.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getCities.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.cities = payload.data;
            state.filtered_cities = payload.data;
        },
        [getCities.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Cities",
                description: payload.message,
            })
        },

        [getCity.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.city = null;
        },
        [getCity.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.city = payload.data;
        },
        [getCity.rejected]: (state) => {
            state.city = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // get profileCity
        [getProfilesCity.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getProfilesCity.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.cities = payload.data;
            state.filtered_cities = payload.data;
        },
        [getProfilesCity.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Profile Cities",
                description: payload.message,
            })
        },

        // create city
        [createCity.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createCity.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New City",
                description: payload.message
            })
        },
        [createCity.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New City",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New City",
                    description: payload.message
                })
            }
        },

        // update City
        [updateCity.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateCity.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update City",
                description: payload.message
            })
        },
        [updateCity.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update City",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update City",
                    description: payload.message
                })
            }
        },

        // delete city
        [deleteCity.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteCity.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete City",
                description: payload.message
            })
        },
        [deleteCity.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete City",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = citySlice.actions;
// Action creators are generated for each case reducer function
export default citySlice.reducer;
