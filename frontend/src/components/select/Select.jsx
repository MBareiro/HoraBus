import { useEffect, useRef, useState } from 'react'
import {getHorarios} from '../../redux/actions/userActions/userActions';
import { useDispatch } from 'react-redux';
import Horarios from '../horarios/Horarios'
import './Select.css';

function Select () {
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

return (
    <div className="select-container">
      <div className="select-container-buttons">
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
      
{showHorarios && <Horarios origen={origen} destino={destino}/> }
{showError && <p className="error">
  POR FAVOR, SELECCIONE EL ORIGEN Y EL DESTINO CORRECTAMENTE
  </p>}
</div>

)
}

export default Select;