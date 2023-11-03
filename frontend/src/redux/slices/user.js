import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "counter",
    initialState: {
      username: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
  });

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;