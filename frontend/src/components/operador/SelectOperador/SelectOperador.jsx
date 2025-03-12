import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './SelectOperador.css'
import { setFilters } from "../../../redux/slices/userSlice";
import { getHorarios } from "../../../redux/actions/userActions/userActions";
import { HorariosOperador } from "../horarios/HorariosOperador";


export const SelectOperador = () => {

    const dispatch = useDispatch();

    const paradas =  [
        { value: "Capiovi", label: "Capioví" },
        { value: "Puerto Rico", label: "Puerto Rico" }
      ]

    const [origen, setOrigen] = useState(''); 
    const [destino, setDestino] = useState('');
    const [showHorarios, setShowHorarios] = useState(false)
    const [showError, setShowError] = useState(false)

const handleDestinoChange = (event) =>{
    setDestino(event.target.value)
    setShowError(false)
}

const handleOrigenChange = (event) =>{
    setOrigen(event.target.value)
    setShowError(false)
    dispatch(setFilters({
      frequency: []
    }))
}

const handleBuscarHorarios = () => {
if(destino && origen){
  setShowError(false)
  dispatch(getHorarios(origen, destino))
  setShowHorarios(true)
} else
{
  setShowError(true)
}
}

useEffect(() => {
setDestino('')
setShowHorarios(false)
}, [origen])

    return(
    <div className="select-container-op">
    <div className="select-container-buttons-op">
    <select className="selector" id="origen" value={origen} onChange={handleOrigenChange}>
      <option value="" disabled>ORIGEN</option>
      {paradas.map((parada) => (
        <option 
        key={parada.value} 
        value={parada.value}>
          {parada.label.toUpperCase()}
        </option>
      ))}
    </select>

    <select className="selector" id="destino" value={destino} onChange={handleDestinoChange}>
<option value="" disabled>DESTINO</option>
{paradas.map((parada) => (
  origen !== parada.value && (
    <option 
      key={parada.value} 
      value={parada.value}
    >
      {parada.label.toUpperCase()}
    </option>
  )
))}
</select>
  
  <button className="selector" onClick={handleBuscarHorarios}>BUSCAR</button>

    </div>
    
{showHorarios && 
<HorariosOperador origen={origen} destino={destino} handleBuscarHorarios={handleBuscarHorarios}/> }
{showError && <p className="error">
POR FAVOR, SELECCIONE EL ORIGEN Y EL DESTINO CORRECTAMENTE
</p>}
</div>
    )
}