import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import FiltroHorarios from '../FiltroHorarios/FiltroHorarios';
import FiltroFrecuencia from '../FiltroFrecuencia/FiltroFrecuencia';
import './FiltrosModal.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilteredFrequencies} from '../../../redux/actions/userActions/userActions';
import { setHorarios } from '../../../redux/slices/userSlice';

Modal.setAppElement('#root')

const FiltrosModal = ({isOpen,closeModal, origen, destino, setLoading, filtrosOn, setFiltrosOn}) =>{
const dispatch = useDispatch()
 const handleCloseModal = () =>{
    closeModal(false)
 }

 const [horasMin, setHorasMin] = useState('')
 const [horasMax, setHorasMax] = useState('')

 const [frequencyFilter, setFrequencyFilter] = useState([]);

 const handleAplicar = () => {
    setFiltrosOn(true)
    dispatch(setHorarios([]))
    setLoading(true)
    closeModal(false)
    const paramFilterHorarios = {
        from: origen,
        to: destino,
        horaMin: horasMin,
        horaMax: horasMax,
        frequency: frequencyFilter
    }
    dispatch(getFilteredFrequencies(paramFilterHorarios))
 }

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
                    <FiltroHorarios setHorasMin={setHorasMin} setHorasMax={setHorasMax}/>
                    <FiltroFrecuencia frequencyFilter={frequencyFilter} setFrequencyFilter={setFrequencyFilter}/>
                    <div className='button-aplicar-conteiner'>
                    <button onClick={handleAplicar} className='button-aplicar'>APLICAR</button>
                    </div>
                </div>
                </div>
        </Modal>
      
    )
}

export default FiltrosModal