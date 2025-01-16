import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 access: false
};

const operadorSlice = createSlice({
  name: 'operador',
  initialState,
  reducers: {
    setAccess: (state, action) => {
      state.access = action.payload;
    },
  },
});

export const {setAccess} = operadorSlice.actions;

export default operadorSlice.reducer;