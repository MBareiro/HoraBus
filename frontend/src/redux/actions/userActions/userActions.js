// src/redux/actions/userActions/userActions.js
import { setHorarios, setParadas } from '../../slices/userSlice';
import datos from '../../../datos/datos.json';
import axios from 'axios';

export const getHorarios = (origen, destino) => (dispatch) => {
  const horarios = datos.map(item => ({
    id: item.id,
    departure_time: item.departure_time,
    arrival_time: item.arrival_time,
    frequency: item.frequency
  }));

  dispatch(setHorarios(horarios));
};

export const getParadas = () => async (dispatch) => {
  try {
    const response = await axios.get('https://horabus.onrender.com/api/stops');
    
    const paradas = response.data.map(parada => ({
      name: parada.name
    }));
    dispatch(setParadas(paradas));
  } catch (error) {
    console.error("Error fetching paradas:", error);
  }
};
