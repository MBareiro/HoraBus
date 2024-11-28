import { useState } from 'react'
import {getHorarios} from '../../redux/actions/userActions/userActions';
import { useDispatch } from 'react-redux';
import Horarios from '../horarios/Horarios'

function Select () {
  const dispatch = useDispatch();

    const paradas =  [
        { value: "capiovi", label: "Capioví" },
        { value: "puerto_rico", label: "Puerto Rico" }
      ]

    const [origen, setOrigen] = useState(''); 
    const [destino, setDestino] = useState('');

  const [showHorarios, setShowHorarios] = useState(false)

const handleDestinoChange = (event) =>{
    console.log(event.target.value)
    setDestino(event.target.value)

}
const handleOrigenChange = (event) =>{
    console.log(event.target.value)
    setOrigen(event.target.value)
}

const handleBuscarHorarios = () => {
dispatch(getHorarios(origen, destino))
setShowHorarios(true)
}

return (
    <div>
        <select className="selector" id="origen" value={origen} onChange={handleOrigenChange}>
        <option value="" disabled>ORIGEN</option>
        {paradas.map((parada) => (
          <option 
          key={parada.value} 
          value={parada.value}>
            {parada.label}
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
        {parada.label}
      </option>
    )
  ))}
</select>
    
    <button className="selector" onClick={handleBuscarHorarios}>BUSCAR</button>
{showHorarios && <Horarios/> }
    
</div>

)
}

export default Select;