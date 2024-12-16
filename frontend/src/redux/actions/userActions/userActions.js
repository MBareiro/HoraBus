// src/redux/actions/userActions/userActions.js
import { setHorarios, setParadas, clearHorarios } from '../../slices/userSlice';
import datos from '../../../datos/datos.json';
import axios from 'axios';

const api = 'https://hora-bus-backend.vercel.app/api'

export const getHorarios = (origen, destino) => async (dispatch) => {
  try {
    dispatch(clearHorarios());
    const response = await axios.get(`${api}/schedules`, {
      params: { from: origen, to: destino }
    });

    const horarios = response.data.map(item => ({
      id: item.id,
      departure_time: item.departure_time.split(':').slice(0, 2).join(':'),
      arrival_time: item.arrival_time.split(':').slice(0, 2).join(':'),
      frequency: item.frequency,
      company: item.company.name
    }));

    // Usar la acción predefinida
    dispatch(setHorarios(horarios));
  } catch (error) {
    console.error("Error fetching horarios:", error);
  }
};

export const getParadas = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api}/stops`);
    
    const paradas = response.data.map(parada => ({
      name: parada.name
    }));
    dispatch(setParadas(paradas));
  } catch (error) {
    console.error("Error fetching paradas:", error);
  }
};
