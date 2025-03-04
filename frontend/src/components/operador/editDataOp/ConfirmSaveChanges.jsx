import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import './ConfirmSaveChanges.css'
import { useDispatch } from 'react-redux';
import { editDataOp } from '../../../redux/actions/operadorActions/operadorActions';
import { useEffect, useState } from 'react';

export const ConfirmSaveChanges = ({setOpenConfirmChanges, openConfirmChanges, operatorId, operadorData,
    opDataState
}) => {

 const [opDataModified, setOpDataModified] = useState({})

 useEffect(() =>{
    setOpDataModified({
        name: opDataState.name,
        dni: opDataState.dni,
        email: opDataState.email,
        role: operadorData.role,
        company_id: operadorData.company_id
    })
    }, [operadorData, opDataState])

const dispatch = useDispatch()
    const handleConfirm = (e) =>{
        if (e.target.textContent === "NO") {
            setOpenConfirmChanges(false)
        }
        else{
          dispatch(editDataOp(operatorId, opDataModified))  
        }
    }

    return(
        <Modal
        isOpen={openConfirmChanges}
        className="modal-login"
        overlayClassName="login-overlay">
            <div className='conteiner-confirm-changes'>
                  <div className='button-login-conteiner'>
                                <button className='button-close'>
                                                <FontAwesomeIcon icon={faXmark}/>
                                </button>
                                </div>
                <span className='span-confirm'>¿DESEA GUARDAR LOS CAMBIOS?</span>
                <div className='conteiner-buttons-confirm'>
                    <button className='button-no' onClick={handleConfirm}>NO</button>
                    <button className='button-no'onClick={handleConfirm}>SI</button>
                </div>
            </div>

        </Modal>
    )
}