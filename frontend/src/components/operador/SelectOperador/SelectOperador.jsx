import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SelectOperador.css'
import { setFilters } from "../../../redux/slices/userSlice";
import { HorariosOperador } from "../horarios/HorariosOperador";
import { getHorariosOp, getMyStops } from "../../../redux/actions/operadorActions/operadorActions";
import { EmptySchedulesModal } from "./emptySchedules/EmptySchedulesModal";
import loadingGif from '../../../pictures/loading.gif'


export const SelectOperador = () => {

  const dispatch = useDispatch();
  const stops = useSelector((state) => state.operador.myStops)
  const schedules = useSelector((state) => state.operador.schedules)
  const operatorData = useSelector((state) => state.operador.data)

  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [showHorarios, setShowHorarios] = useState(false)
  const [showError, setShowError] = useState(false)
  const [openEmptySchedules, setOpenEmptySchedules] = useState(false)
  const [addScheduleModal, setAddScheduleModal] = useState(false)
  const [companyId, setCompanyId] = useState(null)
  const [addingState, setAddingState] = useState(false)


  const handleDestinoChange = (event) => {
    setDestino(event.target.value)
    setShowError(false)
  }

  const handleOrigenChange = (event) => {
    setOrigen(event.target.value)
    setShowError(false)
    dispatch(setFilters({
      frequency: []
    }))
  }

  const handleBuscarHorarios = () => {
    if (destino && origen) {
      setShowError(false)
      dispatch(getHorariosOp(origen, destino))
      console.log("si")
      setShowHorarios(true)
    } else {
      setShowError(true)
    }
  }

  useEffect(() => {
    setDestino('')
    setShowHorarios(false)
  }, [origen])

  useEffect(() => {
    schedules === null && setOpenEmptySchedules(true)
  }, [schedules])

  useEffect(() => {
    setCompanyId(operatorData.company_id)
    dispatch(getMyStops(operatorData.company_id))
  }, [operatorData])

  return (
<div className="select-container-op">
  <div className="select-container-buttons-op">
    
    {/* Selector de Origen */}
    <select className="selector" id="origen" value={origen} onChange={handleOrigenChange}>
      <option value="" disabled>ORIGEN</option>
      {stops.length === 0 ? (
        <option value="" disabled>Cargando...</option>
      ) : (
        stops.map((stop) => (
          stop.name !== destino && ( // No mostrar en origen si está seleccionado en destino
            <option key={stop.name} value={stop.name}>
              {stop.name.toUpperCase()}
            </option>
          )
        ))
      )}
    </select>

    {/* Selector de Destino */}
    <select className="selector" id="destino" value={destino} onChange={handleDestinoChange}>
      <option value="" disabled>DESTINO</option>
      {stops.length === 0 ? (
        <option value="" disabled>Cargando...</option>
      ) : (
        stops.map((stop) =>
          stop.name !== origen && ( // No mostrar en destino si está seleccionado en origen
            <option key={stop.name} value={stop.name}>
              {stop.name.toUpperCase()}
            </option>
          )
        )
      )}
    </select>

    {/* Botón de búsqueda */}
    <button className="selector" onClick={handleBuscarHorarios}>BUSCAR</button>

      </div>
      {schedules === null && addingState &&
        <div className="loading-container-op">
          <img src={loadingGif} alt="Cargando..." className="loading-gif" />
        </div>
      }

      {schedules !== null && showHorarios &&
        <HorariosOperador origen={origen} destino={destino} handleBuscarHorarios={handleBuscarHorarios}
          addScheduleModal={addScheduleModal} setAddScheduleModal={setAddScheduleModal} companyId={companyId}
          addingState={addingState} setAddingState={setAddingState}
          setOpenEmptySchedules={setOpenEmptySchedules} />}
      {showError && <p className="error">
        POR FAVOR, SELECCIONE EL ORIGEN Y EL DESTINO CORRECTAMENTE
      </p>}

      {openEmptySchedules &&
        <EmptySchedulesModal isOpen={openEmptySchedules} setIsOpen={setOpenEmptySchedules}
          setAddScheduleModal={setAddScheduleModal} addScheduleModal={addScheduleModal}
          origin={origen} destination={destino} companyId={companyId} setAddingState={setAddingState} />}
    </div>
  )
}