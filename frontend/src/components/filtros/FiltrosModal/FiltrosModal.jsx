import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import FiltroHorarios from '../FiltroHorarios/FiltroHorarios';
import FiltroFrecuencia from '../FiltroFrecuencia/FiltroFrecuencia';
import './FiltrosModal.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredFrequencies, getHorarios} from '../../../redux/actions/userActions/userActions';
import { setErrorFilter, setFilters, setHorarios } from '../../../redux/slices/userSlice';

Modal.setAppElement('#root')

const FiltrosModal = ({isOpen,closeModal, origen, destino, setLoading, setFiltrosOn, filtrosOn}) =>{
const {frequency} = useSelector((state) => state.user.filtros)
const error = useSelector((state) => state.user.errorFilter)

const [showError, setShowError] = useState(false)

const dispatch = useDispatch()

 const handleCloseModal = () =>{
    closeModal(false)
    if(filtrosOn === false){
        dispatch(setFilters({
            frequency: []
        }))
    }
    if(error){
        dispatch(getHorarios(origen,destino))
        setFiltrosOn(false)
        dispatch(setErrorFilter(""))
        dispatch(setFilters({
            frequency: []
        }))
    }
 }

 const [horasMin, setHorasMin] = useState('')
 const [horasMax, setHorasMax] = useState('')

 const [frequencyFilter, setFrequencyFilter] = useState([]);

 const handleAplicar = () => {
    setFiltrosOn(true)
    dispatch(setHorarios([]))
    setLoading(true)
    const paramFilterHorarios = {
        from: origen,
        to: destino,
        horaMin: horasMin,
        horaMax: horasMax,
        frequency: frequency,
    }
    dispatch(getFilteredFrequencies(paramFilterHorarios))
    dispatch(setFilters(paramFilterHorarios))
 }

 useEffect(()=>{
    if(error){
        setShowError(true)
    }
    setLoading(false)
 }, [error])

    return(
        <Modal
        isOpen={isOpen}
        className="modal-content"
        overlayClassName="modal-overlay"
        >
              <div className='conteiner'>
                <div className='button-conteiner'>
                <button onClick={handleCloseModal} className='button-close'>
                <FontAwesomeIcon icon={faXmark}/>
                </button>
                </div>
                <div className='filtros-conteiner'>
                    <FiltroHorarios setHorasMin={setHorasMin} setHorasMax={setHorasMax} filtrosOn={filtrosOn}
                    setFiltrosOn={setFiltrosOn}/>
                    <FiltroFrecuencia frequencyFilter={frequencyFilter} setFrequencyFilter={setFrequencyFilter}
                    filtrosOn={filtrosOn}/>
                    <div className='button-aplicar-conteiner'>
                    <button onClick={handleAplicar} className='button-aplicar'>APLICAR</button>
                    </div>
                    {showError &&
                <div className='span-conteiner-error'>
                     <span  className="span-error"> {error}</span>
                </div>}
                </div>
               
                </div>
        </Modal>
      
    )
}

export default FiltrosModal