import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 access: false,
 recoverPassword:{},
 signIn: false,
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
    }
  },
});

export const {setAccess, setRecoverPassword, setSignIn} = operadorSlice.actions;

export default operadorSlice.reducer;