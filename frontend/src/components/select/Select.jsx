import { useEffect, useRef, useState } from 'react'
import {getHorarios} from '../../redux/actions/userActions/userActions';
import { useDispatch } from 'react-redux';
import Horarios from '../horarios/Horarios'
import './Select.css';

function Select () {
  const dispatch = useDispatch();

    const paradas =  [
        { value: "Capioví", label: "Capioví" },
        { value: "Puerto Rico", label: "Puerto Rico" }
      ]

    const [origen, setOrigen] = useState(''); 
    const [destino, setDestino] = useState('');
    

const [showHorarios, setShowHorarios] = useState(false)

const destinoRef = useRef(null);

const handleDestinoChange = (event) =>{
    setDestino(event.target.value)
}


const handleOrigenChange = (event) =>{
    setOrigen(event.target.value)
}


const handleBuscarHorarios = () => {
dispatch(getHorarios(origen, destino))
setShowHorarios(true)
}

useEffect(() => {
setDestino('')
}, [origen])

return (
    <div className="select-container">
      <div className="select-container-buttons">
      <select className="selector" id="origen" value={origen} onChange={handleOrigenChange}>
        <option value="" disabled>ORIGEN</option>
        {paradas.map((parada) => (
          <option 
          key={parada.value} 
          value={parada.label}>
            {parada.value.toUpperCase()}
          </option>
        ))}
      </select>

      <select className="selector" id="destino" value={destino} onChange={handleDestinoChange} ref={destinoRef}>
  <option value="" disabled>DESTINO</option>
  {paradas.map((parada) => (
    origen !== parada.value && (
      <option 
        key={parada.value} 
        value={parada.value}
      >
        {parada.value.toUpperCase()}
      </option>
    )
  ))}
</select>
    
    <button className="selector" onClick={handleBuscarHorarios}>BUSCAR</button>

      </div>
       

{showHorarios && <Horarios origen={origen} destino={destino}/> }
    
</div>

)
}

export default Select;