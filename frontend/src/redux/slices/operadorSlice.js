import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 access: false,
 recoverPassword:{},
 signIn: false,
 message: "",
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
    }
  },
});

export const {setAccess, setRecoverPassword, setSignIn, setMessage} = operadorSlice.actions;

export default operadorSlice.reducer;