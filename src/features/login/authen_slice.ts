import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    email: string | null;
    avatar: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    email: null,
    avatar: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string; avatar: string }>) => {
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.email = null;
            state.avatar = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;