import { useState } from "react";
import Slider from "react-slider";
import './FiltroHorarios.css'

const FiltroHorarios = () =>{

    const MIN = 0;
    const MAX = 1439;

    const [horasMin, setHorasMin] = useState('')
    const [horasMax, setHorasMax] = useState('')

    const [values, setValues] = useState([MIN, MAX])

    const convertToTime = (minutes) => {
        const hours = Math.floor(minutes / 60); // Obtener horas
        const mins = minutes % 60; // Obtener minutos
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`; // Formato HH:MM
      };

      const handleSliderChange = (newValues) => {
        setValues(newValues);
      };

    const handleAplicar = () =>{
        setHorasMin(convertToTime(values[0]));
        setHorasMax(convertToTime(values[1])); 
    }

    console.log(horasMin)
    console.log(horasMax)

    return ( 
    <div className="horarios-conteiner"> 
        <h2>HORARIOS</h2>
        <p>
            Values: {convertToTime(values[0])} - {convertToTime(values[1])}
        </p>
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
         <button onClick={handleAplicar}>APLICAR</button>
        </div> );
}

export default FiltroHorarios