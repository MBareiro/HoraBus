import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux"

const FiltroFrecuencia = () => {
    const frecuencias = useSelector((state) => state.user.frecuencias)

    const [frequencyFilter, setFrequencyFilter] = useState([]);
    

    const handleFrequencyFilter = (event) =>{
    if(event.target.checked){
        setFrequencyFilter(prevState => [...prevState, event.target.name])
    } else{
        const nuevoArray = frequencyFilter.filter((item) => item !== event.target.name);
        setFrequencyFilter(nuevoArray)
    }
    }

    useEffect(() =>{
        console.log(frequencyFilter)
    }, [frequencyFilter])

    return(
        <div>
            <h2>FRECUENCIAS</h2>
            {frecuencias.map((opcion) => (
                <label key={opcion}>
                    <input
                    type="checkbox"
                    name={opcion}
                    onChange={handleFrequencyFilter}
                    />
                    {opcion}
                    </label>
))}
                    <label>
                    <input
                    type="checkbox"
                    name="Todas"
                    />
                    Todas
                    </label>
        </div>
    )
}

export default FiltroFrecuencia