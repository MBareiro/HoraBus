import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paradas: [],
  horarios: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setParadas: (state, action) => {
      state.paradas = action.payload;
    },
    setHorarios: (state,action) => {
        state.horarios = action.payload
    },
    clearHorarios: (state) => {
      state.horarios = []; 
    },
  },
});

export const { setParadas, setHorarios, clearHorarios } = userSlice.actions;

export default userSlice.reducer;
