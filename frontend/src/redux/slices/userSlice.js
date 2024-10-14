import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user", 
    initialState: {
        value: 0, 
    },
    reducers: {
        increment: (state) => {
            state.value += 1; 
        },
        decrement: (state) => {
            state.value -= 1; 
        },
    },
});


export default userSlice.reducer;

export const { increment, decrement } = userSlice.actions;
