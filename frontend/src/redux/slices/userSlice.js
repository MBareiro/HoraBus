import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paradas: [],
  origins: [],
  destinations: [],
  horarios: [],
  frecuencias: [],
  filtros: {
    frequency: []
  },
  errorFilter: ""
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
    setOrigins: (state, action) =>{
      state.origins = action.payload
    },
    setDestinations: (state, action) =>{
      state.destinations = action.payload
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
    },
    setErrorFilter: (state, action) =>{
      state.errorFilter = action.payload
    }
  },
});

export const {setParadas, setHorarios, clearHorarios, filterHorarios, setFrecuencias, filterFrequencies, setFilters,
  setErrorFilter, setDestinations, setOrigins
} = userSlice.actions;

export default userSlice.reducer;
