// src/redux/actions/userActions/userActions.js
import { setHorarios } from '../../slices/userSlice';
import datos from '../../../datos/datos.json';

export const getHorarios = (origen, destino) => (dispatch) => {
  const horarios = datos.map(item => ({
    id: item.id,
    departure_time: item.departure_time
  }));

  dispatch(setHorarios(horarios));
};
