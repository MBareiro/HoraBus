import { useEffect, useState } from "react";
import Slider from "react-slider";
import './FiltroHorarios.css'
import { useSelector } from "react-redux";

const FiltroHorarios = ({setHorasMin, setHorasMax, filtrosOn, setFiltrosOn}) =>{
const {horaMin,horaMax} = useSelector((state) => state.user.filtros)

let MIN, MAX;

MIN = 0;
MAX = 1439;

const [values, setValues] = useState([MIN, MAX])

const convertToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

  
useEffect(() => {
  if (filtrosOn && horaMin && horaMax) {
    setValues([convertToMinutes(horaMin), convertToMinutes(horaMax)]);
  }
  setHorasMin(horaMin);
  setHorasMax(horaMax)
}, [filtrosOn, horaMin, horaMax]);


const convertToTime = (minutes) => {
  const hours = Math.floor(minutes / 60); // Obtener horas
  const mins = minutes % 60; // Obtener minutos
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`; // Formato HH:MM
};

const handleSliderChange = (newValues) => {
  setValues(newValues);
  setHorasMin(convertToTime(newValues[0]));
  setHorasMax(convertToTime(newValues[1]))
};

    return ( 
    <div className="horarios-conteiner"> 
        <h2 className="h2">HORARIOS</h2>
        <div className="slider-conteiner">
        <span className="span">
            Horario de Salida: {convertToTime(values[0])} - {convertToTime(values[1])}
        </span>
        <Slider
        onChange={handleSliderChange}
        value={values}
        min={MIN}
        max={MAX}
        className={"slider"}
        renderMark={(props) => {
            return <span {...props} />;
          }}
         />

        </div>
       
        </div> );
}

export default FiltroHorarios