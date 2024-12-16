import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import FiltroHorarios from './FiltroHorarios';


const FiltrosModal = ({isOpen,closeModal}) =>{

 const handleCloseModal = () =>{
    closeModal(false)
 }

    return(
        <Modal
        isOpen={isOpen}
        >
              <div>
                <button onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faXmark}/>
                </button>
                <div>
                    <FiltroHorarios/>
                    <p>FRECUENCIA</p>
                </div>
        </div>
        </Modal>
      
    )
}

export default FiltrosModal