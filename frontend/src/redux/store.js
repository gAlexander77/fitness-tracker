import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    initialState: null,
    name: "user",
    reducers: {
        login: (state, action) => state = action.payload,
        logout: (state) => state = null
    }
});

export const { login, logout } = slice.actions;

export const store = configureStore({
    reducer: { user: slice.reducer }
});