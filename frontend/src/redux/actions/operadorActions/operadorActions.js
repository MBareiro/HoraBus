import axios from 'axios'
import { setAccess, setMessage, setMyStops, setOperadorData, setRecoverPassword, setStops } from '../../slices/operadorSlice';
import { getToken } from '../../../hooks/token';

const api = 'https://hora-bus-backend.vercel.app/api'


export const getLogin = (loginForm) => async (dispatch) => {
  try {
    const response = await axios.post(`${api}/auth/login`, loginForm);

        if (response.data.message && response.data.token) {
        const token = response.data.token;
  
        const payloadBase64 = token.split(".")[1]; 
        const payload = JSON.parse(atob(payloadBase64)); 
        const userId = payload.id; 

        const authData = {
            access: true,
            token: token,
            userId: userId, 
        };

        localStorage.setItem("auth", JSON.stringify(authData));
        dispatch(setAccess(true));
    }
  } catch (error) {
    dispatch(setMessage(error.response.data.error));
    console.log(error.response.data.error);
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
    dispatch(setMessage(error.response.data.error))
  }
}

export const getNewPassword = (newPassword) => async (dispatch) => {
  try{
    const response = await axios.post(`${api}/auth/reset-password`, newPassword);
    dispatch(setRecoverPassword(response.data))
  }
  catch(error){
    console.error(error)
  }
}

export const getOperadorData = (operadorId) => async (dispatch) =>{
try{
  
  const response = await axios.get(`${api}/users/${operadorId}`, {
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
})
dispatch(setOperadorData(response.data))
console.log(response)
}
catch(error){
console.log(error)
}
}

export const editDataOp = (operadorId, datos) => async (dispatch) =>{
  try{
    
    const response = await axios.put(`${api}/users/${operadorId}`, datos, {
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
  dispatch(setOperadorData(response.data))
if(response.status = 200){
  dispatch(setMessage("Datos actualizados correctamente"))
}
  }
  catch(error){
    console.log(error)
    }
}

export const changePassword = (datos) => async (dispatch) => {
  const id = datos.operatorId
  const requiredData = {
    currentPassword: datos.currentPassword,
    newPassword: datos.newPassword
  }

  try {
    const response = await axios.post(`/${api}/users/${id}/update-password`, requiredData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  console.log(response)
  } catch (error) {
    dispatch(setMessage(error.response.data.error));
  }
};


export const getStops = () => async (dispatch) => {
  try{
    const response = await axios.get(`${api}/stops`,{
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
  dispatch(setStops(response.data))
  }
  catch (error){
    dispatch(setMessage(error.response.data.error))
  }
}

export const getMyStops = (company_id) => async (dispatch) => {
  try{
    const response = await axios.get(`${api}/companies_stops/companies/${company_id}/stops`,{
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
  dispatch(setMyStops(response.data))
  }
  catch (error){
    dispatch(setMessage(error.response.data.error))
  }
}

export const addNewStop = (newStop) => async (dispatch) =>{

}