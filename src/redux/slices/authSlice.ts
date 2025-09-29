import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    user: Object | null;
    token: string | null;
    isAuthenticated: boolean;
}
const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;