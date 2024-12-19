import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux"
import './FiltroFrecuencia.css'

const FiltroFrecuencia = ({frequencyFilter, setFrequencyFilter}) => {
    const frecuencias = useSelector((state) => state.user.frecuencias)

    const handleFrequencyFilter = (event) =>{
    if(event.target.checked){
        setFrequencyFilter(prevState => [...prevState, event.target.name])
    } else{
        const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
        setFrequencyFilter(nuevoArray)
    }
    }

    return(
        <div className="filtro-frecuencia-conteiner">
            <h2 className="h2">FRECUENCIAS</h2>
            <div className="opciones-conteiner">
                
                {frecuencias.map((opcion) => (
                <label key={opcion} className="opcion">
                    <input
                    type="checkbox"
                    name={opcion}
                    onChange={handleFrequencyFilter}
                    className="input"
                    />
                    {opcion}
                    </label>
))}
           
            </div>
        </div>
    )
}

export default FiltroFrecuencia