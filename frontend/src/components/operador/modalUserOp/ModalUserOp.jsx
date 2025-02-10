import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { CerrarSesion } from '../cerrarSesion/CerrarSesion';
import { useState } from 'react';

export const ModalUserOp = ({isOpen, setIsOpen}) => {

    const [showEditData, setShowEditData] = useState(false)

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const handleEditDataClick = () => {

    }
    return(
       <Modal
       isOpen={isOpen}
       className="modal-login"
       overlayClassName="login-overlay">
        <div className='conteinerLogin'>
            <div className='button-login-conteiner'>
                            <button onClick={handleCloseModal} className='button-close'>
                                            <FontAwesomeIcon icon={faXmark}/>
                            </button>
                            </div>
            <CerrarSesion/>
            <button className="button-logOut" >MODIFICAR DATOS PERSONALES</button>
        </div>
       </Modal>
    )
}