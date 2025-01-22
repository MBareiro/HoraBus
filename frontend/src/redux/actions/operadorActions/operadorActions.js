import axios from 'axios'
import { setAccess, setRecoverPassword } from '../../slices/operadorSlice';

const api = 'https://hora-bus-backend.vercel.app/api'

export const getLogin = (loginForm) => async (dispatch) => {
    console.log(loginForm)
  try {
    const response = await axios.post(`${api}/auth/login`, loginForm);
    if (response.data.message && response.data.token) {
        const authData = {
            access: true,
            token: response.data.token,
          };
          localStorage.setItem("auth", JSON.stringify(authData));
          dispatch(setAccess(true))
      }
  } catch (error) {
    console.error("Error fetching paradas:", error);
  }
};

export const getRecoverPassword = (dni) => async (dispatch) => {
  console.log(dni)
  try{
    const response = await axios.post(`${api}/auth/forgot-password`, dni);
    const recoverPassword = {
      message: response.data.message,
      email: response.data.userMail
    }

    dispatch(setRecoverPassword(recoverPassword))
  }
  catch(error){
    console.error(error)
  }
}

export const getNewPassword = (newPassword) => async (dispatch) => {
  console.log(newPassword)
  try{
    const response = await axios.post(`${api}/auth/reset-password`, newPassword);
    dispatch(setRecoverPassword(response.data))
  }
  catch(error){
    console.error(error)
  }
}