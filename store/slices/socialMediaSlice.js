import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosJwt } from "../../lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { NotifyMessage } from '../../comps/Messages'
import { getProducts } from './productSlice'
import { generateFormData } from "../../lib/submitServices";

const lang = getCookie("language") || "en";
const token = getCookie("token");

export const getAllSocialMedia = createAsyncThunk(
    "all_social_media",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = `/api/social_media`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getSocialMedia = createAsyncThunk(
    "social_media",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/social_media/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const getSocialMediaProfile = createAsyncThunk(
    "social_media_profile",
    async (_, { rejectWithValue, getState }) => {
        try {
            const url = `/api/social_media_profile`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createSocialMediaProfile = createAsyncThunk(
    "socialMediaProfile/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/social_media_profile/store`;
            const body = {
                token,
                ...args,
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getSocialMediaProfile())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const createSocialMedia = createAsyncThunk(
    "social_media/create",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/admin/social_media/store`;
            const form = generateFormData(args)
            const res = await AxiosJwt.post(url, form);
            dispatch(getAllSocialMedia())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateSocialMedia = createAsyncThunk(
    "social_media/update",
    async (args, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/admin/social_media/update/${args.id}`;
            const form = generateFormData({ ...args, _method: "PUT" })
            const res = await AxiosJwt.post(url, form);
            dispatch(getAllSocialMedia())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteSocialMedia = createAsyncThunk(
    "/socialMedia/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/admin/social_media/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE", });
            dispatch(getAllSocialMedia())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const deleteSocialMediaProfile = createAsyncThunk(
    "/socialMediaProfile/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const url = `/api/social_media_profile/delete/${id}`;
            const body = {
                _method: "DELETE",
                token,
            };
            const res = await AxiosJwt.post(url, body);
            dispatch(getSocialMediaProfile())
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
    createLoading: false,
    api_errors: null,
    success: null,
    social_media_list: [],
    social_media: null,
    social_media_profile_list: [],
    imageUrl: null,

    socialMediaInfo: {
        name_en: "",
        name_ar: "",
        icon: "",
    },

    socialMedia: {
        url: "",
        social_id: "",
    },
};

export const socialMediaSlice = createSlice({
    name: "socialMedia",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {

        // getAllSocialMedia thunk
        [getAllSocialMedia.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.imageUrl = null;
        },
        [getAllSocialMedia.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.social_media_list = payload.data;
            state.imageUrl = payload.urlImage;
        },
        [getAllSocialMedia.rejected]: (state, { payload, error }) => {
            state.isLoading = false;
            state.imageUrl = null;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: 'error',
                title: "Get All Social Media",
                description: error.message,
            })
        },

        [getSocialMedia.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.social_media = null;
        },
        [getSocialMedia.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.social_media = payload.data;
        },
        [getSocialMedia.rejected]: (state) => {
            state.social_media = null;
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },




        // getSocialMediaProfile thunk
        [getSocialMediaProfile.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
            state.social_media_profile_list = null;
        },
        [getSocialMediaProfile.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.social_media_profile_list = payload.data;
        },
        [getSocialMediaProfile.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = payload.response?.data;
            state.social_media_profile_list = null;
        },

        // createSocialMediaProfile thunk
        [createSocialMediaProfile.pending]: (state) => {
            state.createLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createSocialMediaProfile.fulfilled]: (state, { payload }) => {
            state.createLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Social Media",
                description: payload.message
            })
        },
        [createSocialMediaProfile.rejected]: (state, { payload }) => {
            state.createLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Social Media",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Social Media",
                    description: payload.message
                })
            }
        },

        // createSocialMedia thunk
        [createSocialMedia.pending]: (state) => {
            state.createLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createSocialMedia.fulfilled]: (state, { payload }) => {
            state.createLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Create Social Media",
                description: payload.message
            })
        },
        [createSocialMedia.rejected]: (state, { payload }) => {
            state.createLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create Social Media",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create Social Media",
                    description: payload.message
                })
            }
        },

        // update SocialMedia
        [updateSocialMedia.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateSocialMedia.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Social Media",
                description: payload.message
            })
        },
        [updateSocialMedia.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Social Media",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Social Media",
                    description: payload.message
                })
            }
        },

        // deleteSocialMediaProfile thunk
        [deleteSocialMediaProfile.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteSocialMediaProfile.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Delete Social Media Profile",
                description: payload.message
            })
        },
        [deleteSocialMediaProfile.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Delete Social Media Profile",
                    description: payload.message
                })
            }
        },

        // deleteSocialMedia thunk
        [deleteSocialMedia.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteSocialMedia.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = payload.message;
            NotifyMessage({
                type: "success",
                title: "Delete Social Media",
                description: payload.message
            })
        },
        [deleteSocialMedia.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.success = null;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Delete Social Media",
                    description: payload.message
                })
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { ResetSuccess } = socialMediaSlice.actions;

export default socialMediaSlice.reducer;
