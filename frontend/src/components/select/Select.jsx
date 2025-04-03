import { useEffect, useState } from 'react'
import { getDEstinationStops, getHorarios } from '../../redux/actions/userActions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Horarios from '../horarios/Horarios'
import './Select.css';
import { setFilters } from '../../redux/slices/userSlice';

function Select() {
  const dispatch = useDispatch();

  const origins = useSelector((state) => state.user.origins)
  const destinations = useSelector((state) => state.user.destinations)
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [showHorarios, setShowHorarios] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleDestinoChange = (event) => {
    setDestino(event.target.value)
    setShowError(false)

  }

  const handleOrigenChange = (event) => {
    const selectedValue = event.target.value;
    const selectedId = event.target.options[event.target.selectedIndex].getAttribute("data-id");

    dispatch(getDEstinationStops(selectedId))

    setOrigen(selectedValue);
    setShowError(false);
    dispatch(setFilters({ frequency: [] }));
  };


  const handleBuscarHorarios = () => {
    if (destino && origen) {
      setShowError(false)
      dispatch(getHorarios(origen, destino))
      setShowHorarios(true)
    } else {
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

          {origins.length === 0 ? (
            <option value="" disabled>⏳ Cargando...</option>
          ) : (
            origins.map((origin) => (
              <option key={origin.id} value={origin.name} data-id={origin.id}>
                {origin.name.toUpperCase()}
              </option>
            ))
          )}
        </select>

        <select className="selector" id="destino" value={destino} onChange={handleDestinoChange}>
          <option value="" disabled>DESTINO</option>

          {origen && destinations.length === 0 ? (
            <option value="" disabled>⏳ Cargando...</option>
          ) : destinations.length === 0 ? (
            <option value="" disabled>Seleccione origen</option>
          ) : (
            destinations.map((destination) =>
              origen !== destination.name && (
                <option key={destination.id} value={destination.name}>
                  {destination.name.toUpperCase()}
                </option>
              )
            )
          )}
        </select>



        <button className="selector" onClick={handleBuscarHorarios}>BUSCAR</button>

      </div>

      {showHorarios && <Horarios origen={origen} destino={destino} handleBuscarHorarios={handleBuscarHorarios} />}
      {showError && <p className="error">
        POR FAVOR, SELECCIONE EL ORIGEN Y EL DESTINO CORRECTAMENTE
      </p>}
    </div>

  )
}

export default Select;