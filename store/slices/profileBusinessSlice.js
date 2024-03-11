import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getProfilesBusiness = createAsyncThunk(
    "getProfileBusiness",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = `/api/profile_business`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateProfileBusiness = createAsyncThunk(
    "profileBusiness/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/api/profile_business/update`;
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
            dispatch(getProfilesBusiness())
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
    profile_business: null,
};

export const profileBusinessSlice = createSlice({
    name: "profileBusiness",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        // getProfilesBusiness thunk
        [getProfilesBusiness.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.profile_business = null;
        },
        [getProfilesBusiness.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.profile_business = payload.data;
        },
        [getProfilesBusiness.rejected]: (state, { payload, error }) => {
            state.isLoading = false;
            state.profile_business = null;
            state.api_errors = payload?.response?.data;
            NotifyMessage({
                type: 'error',
                title: "Get profile Business",
                description: error.message,
            })
        },

        // update ProfileBusiness
        [updateProfileBusiness.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateProfileBusiness.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Profile Business",
                description: payload.message
            })
        },
        [updateProfileBusiness.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Profile Business",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Profile Business",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = profileBusinessSlice.actions;

export default profileBusinessSlice.reducer;
