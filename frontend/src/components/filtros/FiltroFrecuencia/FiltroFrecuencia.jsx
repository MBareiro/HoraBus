import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux"
import './FiltroFrecuencia.css'

const FiltroFrecuencia = ({frequencyFilter, setFrequencyFilter}) => {
    const frecuencias = useSelector((state) => state.user.frecuencias)

   const [isTodasSelected,setIsTodasSelected] = useState(false)

    const handleFrequencyFilter = (event) =>{
    if(event.target.name === "Todas"){
        if(event.target.checked){
            setFrequencyFilter(prevState => [...prevState, event.target.name])
            setIsTodasSelected(true)
        } else{
            const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
            setFrequencyFilter(nuevoArray)
            setIsTodasSelected(false)
        }
    }else{
        if(event.target.checked){
            setFrequencyFilter(prevState => [...prevState, event.target.name])
        } else{
            const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
            setFrequencyFilter(nuevoArray)
        }
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
                    disabled={isTodasSelected}
                    />
                    {opcion}
                    </label>
))}
                    <label key="Todas" className="opcion">
                    <input
                    type="checkbox"
                    name="Todas"
                    onChange={handleFrequencyFilter}
                    className="input"
                    />
                    Todas
                    </label>
           
            </div>
        </div>
    )
}

export default FiltroFrecuencia