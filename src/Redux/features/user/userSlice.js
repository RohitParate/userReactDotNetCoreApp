import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Axios/axiosInstance";

const initialState = {
    currentUser: {},
    error : ''
}

export const userLogin = createAsyncThunk("user/login", async (userCredentials) => {
    const response = await axios.post("/auth/login", userCredentials);
    sessionStorage.setItem('token', response.data.token);
    return response.data;
})

const userSlice = createSlice({ // createSlice will automatically create action creators with same name as reducer functions.
    name: 'user',
    initialState,
    reducers : {
        // loggedIn : (state, action) => {
        //     state.currentUser = action.payload; // user immer library under the hood to update the state
        // },
        // loggedOut : (state, action) => {
        //     state.currentUser = {}
        // }
        clearError : (state) => {
            state.error = ''
        },
        clearUser : (state) => {
            state.currentUser = {}
        }
       
    },
    extraReducers: builder => {
        builder.addCase(userLogin.pending, (state) => {
            state.currentUser = {};
            state.error = '';
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.error = '';
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.currentUser = {};
            state.error = action.error
        })
    }

})

export default userSlice.reducer;

export const {
    // loggedIn, 
    // loggedOut,
    clearError,
    clearUser
} = userSlice.actions
