import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {AxiosJwt} from "../../lib/axios";
import { NotifyMessage } from "../../comps/Messages";

export const getAreas = createAsyncThunk(
    "areas",
    async (args, { rejectWithValue }) => {
        try {
            const url = "/api/areas";
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const getArea = createAsyncThunk(
    "area",
    async (id, { rejectWithValue }) => {
        try {
            const url = `/admin/area/show/${id}`;
            const res = await AxiosJwt.get(url);
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const createArea = createAsyncThunk(
    "area/create",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = "/admin/area/store";
            const res = await AxiosJwt.post(url, { ...args });
            dispatch(getAreas())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);

export const updateArea = createAsyncThunk(
    "area/update",
    async (args, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/area/update/${args.id}`;
            const res = await AxiosJwt.post(url, { ...args, _method: "PUT" });
            dispatch(getAreas())
            return res.data;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err);
        }
    }
);


export const deleteArea = createAsyncThunk(
    "area/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const url = `/admin/area/delete/${id}`;
            const res = await AxiosJwt.post(url, { _method: "DELETE" });
            dispatch(getAreas())
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
    areas: [],
    area: null,
    filtered_areas: [],
    areaInfo: {
        name_en: "",
        name_ar: "",
        city_id: "",
    }
};

export const areaSlice = createSlice({
    name: "area",
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },

    extraReducers: {
        [getAreas.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getAreas.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.areas = payload.data;
            state.filtered_areas = payload.data;
        },
        [getAreas.rejected]: (state, { payload }) => {
            state.success = null;
            state.isLoading = false;
            NotifyMessage({
                type: "error",
                title: "get Areas",
                description: payload.message,
            })
        },

        [getArea.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [getArea.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.success = payload.message;
            state.api_errors = null;
            state.area = payload.data;
        },
        [getArea.rejected]: (state) => {
            state.success = null;
            state.isLoading = false;
            state.api_errors = true;
        },

        // create Area
        [createArea.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [createArea.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "create New Area",
                description: payload.message
            })
        },
        [createArea.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Create New Area",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Create New Area",
                    description: payload.message
                })
            }
        },

        // update Area
        [updateArea.pending]: (state) => {
            state.isLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [updateArea.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Update Area",
                description: payload.message
            })
        },
        [updateArea.rejected]: (state, { payload }) => {
            state.isLoading = false;
            if (payload.response?.data) {
                state.api_errors = payload.response?.data;
                NotifyMessage({
                    type: "error",
                    title: "Update Area",
                    description: "Please Check The Fields"
                })
            } else {
                NotifyMessage({
                    type: "error",
                    title: "Update Area",
                    description: payload.message
                })
            }
        },

        // delete area
        [deleteArea.pending]: (state) => {
            state.deleteLoading = true;
            state.api_errors = null;
            state.success = null;
        },
        [deleteArea.fulfilled]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = null;
            state.success = true
            NotifyMessage({
                type: "success",
                title: "Delete Area",
                description: payload.message
            })
        },
        [deleteArea.rejected]: (state, { payload }) => {
            state.deleteLoading = false;
            state.api_errors = payload.response?.data;
            NotifyMessage({
                type: "error",
                title: "Delete Area",
                description: payload.message
            })
        },
    },
});

export const { ResetSuccess } = areaSlice.actions;
// Action creators are generated for each case reducer function
export default areaSlice.reducer;
