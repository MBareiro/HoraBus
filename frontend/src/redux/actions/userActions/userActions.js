// src/redux/actions/userActions/userActions.js
import { setHorarios, setParadas, clearHorarios, setFrecuencias, filterFrequencies } from '../../slices/userSlice';
import axios from 'axios';

const api = 'https://hora-bus-backend.vercel.app/api'

export const getHorarios = (origen, destino) => async (dispatch) => {
  try {
    dispatch(clearHorarios());
    const response = await axios.get(`${api}/schedules`, {
      params: { from: origen, to: destino }
    });

    console.log(response.data)
    const horarios = response.data.map(item => ({
      id: item.id,
      departure_time: item.departure_time.split(':').slice(0, 2).join(':'),
      arrival_time: item.arrival_time.split(':').slice(0, 2).join(':'),
      frequency: item.frequency,
      company: item.company
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

export const getFrequencies = () => async (dispatch) => {
  try{
    const response = await axios.get(`${api}/frequencies`)

    const frequencies = response.data.map(frequency => frequency.name);

    dispatch(setFrecuencias(frequencies))
  }
  catch (error) {
    console.error("Error fetching frequencies:", error)
  }
}

export const getFilteredFrequencies = (paramFilterHorarios) => async (dispatch) => {
  const { from, to, horaMin, horaMax, frequency} = paramFilterHorarios;

  const frequencyParam = frequency[0] === "Todas" ? [] : frequency
  try{
    const response = await axios.get(`${api}/schedules`,{
      params: {
        from,
        to,
        horaMin,
        horaMax,
        frequency: frequencyParam,
      }
    })
   
    const filterByFrequencies = response.data.map(item => ({
      id: item.id,
      departure_time: item.departure_time.split(':').slice(0, 2).join(':'),
      arrival_time: item.arrival_time.split(':').slice(0, 2).join(':'),
      frequency: item.frequency,
      company: item.company
    }))
    dispatch(filterFrequencies(filterByFrequencies))
  }
  catch (error) {
    console.error("Error filtering frequencies:", error)
  }
}


