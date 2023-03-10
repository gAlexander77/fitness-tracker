import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "counter",
    initialState: {
      username: ""
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        }
    }
  });

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;