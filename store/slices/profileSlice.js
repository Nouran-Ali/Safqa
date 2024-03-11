import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { getProducts } from './productSlice'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getProfiles = createAsyncThunk(
    "profiles",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = `/admin/admin_profiles`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getProfile = createAsyncThunk(
    "profile",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/admin_profile/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/admin_profile/update/${args.id}`;

            let formData = new FormData();
            formData.append("_method", 'PUT');

             for (let key in args) {
                if (args[key] && key !== 'logo') {
                    formData.append(key, args[key]);
                }
            }

            if (args.logo?.[0] && typeof args.logo === "object") {
                formData.append("logo", args.logo[0]);
            }

            const res = await AxiosJwt.post(url, formData);
            // dispatch(getProfile(args.id))
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
    profile: null,
    profiles: [],
    filtered_profiles: [],
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
        filterProfiles(state, { payload }) {
            const { user_name, phone_number, email } = payload;

            if (!user_name && !phone_number && !email) {

                state.filtered_profiles = state.profiles

            } else {

                if (state.profiles?.length > 0)

                    state.filtered_profiles = state.profiles.filter(user => {
                        if (user_name && user.full_name.toLowerCase().startsWith(user_name.trim().toLowerCase())) return user
                        if (email && user.email.toLowerCase().startsWith(email.trim().toLowerCase())) return user
                        if (phone_number && user.phone_number_manager.toLowerCase().startsWith(phone_number.trim().toLowerCase())) return user
                    })

            }

        }
    },

    extraReducers: {
        // getProfiles thunk
        [getProfiles.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getProfiles.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.profiles = payload.data;
            state.filtered_profiles = payload.data;
        },
        [getProfiles.rejected]: (state, { payload, error }) => {
            state.isLoading = false;
            state.profiles = null;
            state.filtered_profiles = null;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: 'error',
                title: "Get profiles",
                description: error.message,
            })
        },


        [getProfile.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.profile = null;
        },
        [getProfile.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.profile = payload.data;
        },
        [getProfile.rejected]: (state) => {
            state.profile = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // update Profile
        [updateProfile.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateProfile.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Profile",
                description: payload.message
            })
        },
        [updateProfile.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Profile",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Profile",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess, filterProfiles } = profileSlice.actions;

export default profileSlice.reducer;
