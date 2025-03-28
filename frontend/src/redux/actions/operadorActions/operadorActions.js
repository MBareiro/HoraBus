import axios from 'axios'
import { clearHorariosOp, setAccess, setHorariosOp, setMessage, setMyStops, setNewSchedule, 
  setNewStop, setOperadorData, setQuitarStop, setRecoverPassword, setScheduleData, setStops, 
  setUpdatedState} from '../../slices/operadorSlice';
import { getToken } from '../../../hooks/token';

const api = 'https://horabus.onrender.com/api'


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
 
  } catch (error) {
    dispatch(setMessage(error.response.data.error));
  }
};

export const getHorariosOp = (origen, destino) => async (dispatch) => {
  try {
    dispatch(clearHorariosOp());
    const response = await axios.get(`${api}/schedules`, {
      params: { from: origen, to: destino }
    });
    
    const horarios = response.data.map(item => ({
      id: item.id,
      departure_time: item.departure_time.split(':').slice(0, 2).join(':'),
      arrival_time: item.arrival_time.split(':').slice(0, 2).join(':'),
      frequency: item.frequency,
      company: item.company,
      enabled: item.enabled,
      status: item.status
    }));

    dispatch(setHorariosOp(horarios));
  } catch (error) {
    console.error("Error fetching horarios:", error);
  }
};


export const getStops = () => async (dispatch) => {
  try{
    const response = await axios.get(`${api}/stops`,{
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
  dispatch(setStops(response.data.stops))
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
  response.data.length === 0 ? 
  dispatch(setMyStops(null)) :
  dispatch(setMyStops(response.data))
  }
  catch (error){
    dispatch(setMessage(error.response.data.error))
  }
}

export const asociarStop = (company_id, stopId) => async (dispatch) => {

  const stop_id = {
    stop_ids: [stopId] 
  };

  try {
    const response = await axios.post(
      `${api}/companies_stops/companies/${company_id}/stops`,
      stop_id, 
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    dispatch(setMessage(response.data.message))
    dispatch(setNewStop(response.data.stops[0]))
  } catch (error) {
    console.error("Error al asociar la parada:", error);
  }
};

export const quitarStop = (company_id, stopId) => async (dispatch) =>{

  const stop_id = {
    stop_ids: [stopId] 
  };
try{
  const response = await axios.delete(
    `${api}/companies_stops/companies/${company_id}/stops`,
    {
      data: stop_id,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
dispatch(setQuitarStop(stopId))
}
catch(error){
console.log(error)
}
}


export const getScheduleData = (scheduleId) => async (dispatch) => {
 
  try{
    const response = await axios.get(`/${api}/schedules/${scheduleId}`,{
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
  dispatch(setScheduleData(response.data))

  }
  catch (error){
    dispatch(setMessage(error.response.data.error))
  }
}

export const editSchedule = (scheduleId, datos) => async (dispatch) =>{

  try{
    
    const response = await axios.put(`${api}/schedules/${scheduleId}`, datos, {
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
  
  }
  catch(error){
    console.log(error)
    }
}

export const addSchedule = (dataSchedule) => async (dispatch) => {
 
  try {
    const response = await axios.post(
      `${api}/schedules`,dataSchedule, 
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    dispatch(setNewSchedule(response.data.schedule))
  } catch (error) {
    console.error("Error al asociar la parada:", error);
  }
}

export const updateState = (updateItem) => async (dispatch) => {
  
  console.log(updateItem)

  try{
    const response = await axios.put(`${api}/schedules/${updateItem.id}`, updateItem, {
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })

  console.log(response.data)
  dispatch(setUpdatedState(response.data))
  
  }
  catch(error){
    console.log(error)
    }
  
}