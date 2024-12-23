import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './FiltroFrecuencia.css'
import { setErrorFilter, setFilters } from "../../../redux/slices/userSlice";

const FiltroFrecuencia = ({frequencyFilter, setFrequencyFilter}) => {
    const dispatch = useDispatch()
    const frecuencias = useSelector((state) => state.user.frecuencias)
    const filtros = useSelector((state) => state.user.filtros)
    const { frequency } = filtros

   const [isTodasSelected,setIsTodasSelected] = useState(false)


    const handleFrequencyFilter = (event) =>{
    if(event.target.name === "Todas"){
        if(event.target.checked){
            setFrequencyFilter(prevState => [...prevState, event.target.name])
            setIsTodasSelected(true)
            dispatch(setFilters({
                frequency: [...frequency, event.target.name],
            }))
            dispatch(setErrorFilter(""))
        } else{
            const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
            setFrequencyFilter(nuevoArray)
            setIsTodasSelected(false)
            dispatch(setFilters({...filtros,
                frequency: nuevoArray
            }))
            dispatch(setErrorFilter(""))
        }
    }else{
        if(event.target.checked){
            setFrequencyFilter(prevState => [...prevState, event.target.name])
            dispatch(setFilters({
                frequency: [...frequency, event.target.name],
            }))
            dispatch(setErrorFilter(""))
        } else{
            const nuevoArray = frequency.filter((item) => item !== event.target.name);
            setFrequencyFilter(nuevoArray)
            dispatch(setFilters({...filtros,
                frequency: nuevoArray
            }))
            dispatch(setErrorFilter(""))
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
                    disabled={frequency.includes("Todas")}
                    checked={frequency.includes(opcion)}
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
                    checked={frequency.includes("Todas")}
                    />
                    Todas
                    </label>
           
            </div>
        </div>
    )
}

export default FiltroFrecuencia