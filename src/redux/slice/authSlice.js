import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    accessToken: null,
    isLoading: false,
    error: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isLoading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        },
        signOut: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isLoading = false;
            state.error = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions

export default authSlice.reducer