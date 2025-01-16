import axios from 'axios'
import { setAccess } from '../../slices/operadorSlice';

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