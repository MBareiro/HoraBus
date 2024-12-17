import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import FiltroHorarios from './FiltroHorarios';
import FiltroFrecuencia from './FiltroFrecuencia';
import './FiltrosModal.css'
import { useState } from 'react';

Modal.setAppElement('#root')

const FiltrosModal = ({isOpen,closeModal}) =>{

 const handleCloseModal = () =>{
    closeModal(false)
 }

 const [horasMin, setHorasMin] = useState('')
 const [horasMax, setHorasMax] = useState('')

 const handleAplicar = () => {
    console.log(horasMin)
    console.log(horasMax)
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
                    <FiltroFrecuencia/>
                    <div className='button-aplicar-conteiner'>
                    <button onClick={handleAplicar} className='button-aplicar'>APLICAR</button>
                    </div>
                    
                </div>
                </div>
        </Modal>
      
    )
}

export default FiltrosModal