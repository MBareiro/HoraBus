import axios from 'axios';
import { setCharacter } from '../slices/characterSlice';

export const getCharacter = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    // Despacha la acción para almacenar el personaje en el estado
    dispatch(setCharacter(response.data));
    console.log(response.data)
  } catch (error) {
    console.error("Error fetching character:", error);
    // Manejo de errores, puedes despachar una acción para guardar el error si lo deseas
  }
};
