import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paradas: [],
  horarios: [],
  frecuencias: [],
  filtros: {}
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
    filterHorarios: (state, action) =>{
      state.horarios = action.payload
    },
    setFrecuencias: (state, action) =>{
      state.frecuencias = action.payload
    },
    filterFrequencies: (state, action) => {
      state.horarios = action.payload
    },
    setFilters: (state,action) =>{
      state.filtros = action.payload
    }
  },
});

export const {setParadas, setHorarios, clearHorarios, filterHorarios, setFrecuencias, filterFrequencies, setFilters} = userSlice.actions;

export default userSlice.reducer;
