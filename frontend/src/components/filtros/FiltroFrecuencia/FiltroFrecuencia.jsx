import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './FiltroFrecuencia.css'
import { setFilters } from "../../../redux/slices/userSlice";

const FiltroFrecuencia = ({frequencyFilter, setFrequencyFilter}) => {
    const dispatch = useDispatch()
    const frecuencias = useSelector((state) => state.user.frecuencias)
    const filtros = useSelector((state) => state.user.filtros)

   const [isTodasSelected,setIsTodasSelected] = useState(false)
   const [isChecked, setIsChecked] = useState(false)

    const handleFrequencyFilter = (event) =>{
    if(event.target.name === "Todas"){
        if(event.target.checked){
            setFrequencyFilter(prevState => [...prevState, event.target.name])
            setIsTodasSelected(true)
            dispatch(setFilters({...filtros,
                frequency: [...frequency, event.target.name]
            }))
        } else{
            const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
            setFrequencyFilter(nuevoArray)
            setIsTodasSelected(false)
            dispatch(setFilters({...filtros,
                frequency: nuevoArray
            }))
        }
    }else{
        if(event.target.checked){
            setFrequencyFilter(prevState => [...prevState, event.target.name])
            dispatch(setFilters({...filtros,
                frequency: [...frequency, event.target.name]
            }))
            setIsChecked(true)
        } else{
            const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
            setFrequencyFilter(nuevoArray)
            dispatch(setFilters({...filtros,
                frequency: nuevoArray
            }))
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
                    checked={isChecked}
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