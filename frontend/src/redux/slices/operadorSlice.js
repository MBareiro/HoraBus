import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 access: false,
 recoverPassword:{},
 signIn: false,
 message: "",
 data:{},
 stops: [],
 myStops: [],
 scheduleData: {},
};

const operadorSlice = createSlice({
  name: 'operador',
  initialState,
  reducers: {
    setAccess: (state, action) => {
      state.access = action.payload;
    },
    setRecoverPassword: (state, action) =>{
      state.recoverPassword =  action.payload
    },
    setSignIn: (state, action) => {
      state.signIn = action.payload
    },
    setMessage: (state, action) =>{
      state.message = action.payload
    },
    setOperadorData: (state, action) =>{
      state.data = action.payload
    },
    setStops: (state, action) => {
      state.stops =  action.payload
    },
    setMyStops: (state, action) => {
      state.myStops =  action.payload === null ? null : action.payload
    },
    setNewStop: (state, action) =>{
      state.myStops = state.myStops !== null ? [...state.myStops, action.payload ] : [action.payload]
    },
    setQuitarStop: (state,action) =>{
      state.myStops = state.myStops.filter(stop => stop.id !== action.payload)
    },
    setScheduleData: (state, action) =>{
      state.scheduleData = action.payload
    },
  },
});

export const {setAccess, setRecoverPassword, setSignIn, setMessage, setOperadorData,
  setStops, setMyStops, setNewStop, setScheduleData, setStatus, setQuitarStop
} = operadorSlice.actions;

export default operadorSlice.reducer;