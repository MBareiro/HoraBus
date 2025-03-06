import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import './ConfirmSaveChanges.css'
import { useDispatch, useSelector } from 'react-redux';
import { editDataOp, getOperadorData } from '../../../redux/actions/operadorActions/operadorActions';
import { useEffect, useState } from 'react';
import { setMessage } from '../../../redux/slices/operadorSlice';

export const ConfirmSaveChanges = ({setOpenConfirmChanges, openConfirmChanges, operatorId, operadorData,
    opDataState, setOpenModalEdit
}) => {

const message = useSelector((state)=> state.operador.message)

 const [opDataModified, setOpDataModified] = useState({})

 const [showMessage, setShowMessage] = useState(false)

 const [messageState, setMessageState] = useState("")

 useEffect(() =>{
    setOpDataModified({
        name: opDataState.name,
        dni: opDataState.dni,
        email: opDataState.email,
        role: operadorData.role,
        company_id: operadorData.company_id
    })
    }, [operadorData, opDataState])

useEffect(() =>{
setMessageState(message)
}, [message])

const dispatch = useDispatch()
    const handleConfirm = (e) =>{
    if( e.target.textContent === "SI") {
        dispatch(editDataOp(operatorId, opDataModified)) 
      }
    else 
    {
            setOpenConfirmChanges(false)
            setOpenModalEdit(false)
            dispatch(getOperadorData(operatorId))
        }
    }

useEffect(() =>{
if(messageState){
    setShowMessage(true)
}
}, [messageState])

const handleClose = () => {
    setOpenConfirmChanges(false)
    dispatch(setMessage(""))
}

    return(
        <Modal
        isOpen={openConfirmChanges}
        className="modal-login"
        overlayClassName="login-overlay">
            <div className='conteiner-confirm-changes'>
                  <div className='button-login-conteiner'>
                                <button className='button-close'
                                onClick={handleClose}>
                                                <FontAwesomeIcon icon={faXmark}/>
                                </button>
                                </div>
                                {showMessage ?  
    <>
        <span className='span-confirm'>{message}</span>
        <div className='conteiner-buttons-confirm'>
            <button className='button-no' onClick={handleConfirm}>OK</button>
        </div> 
    </>
    :  
    <>
        <span className='span-confirm'>¿DESEA GUARDAR LOS CAMBIOS?</span>
        <div className='conteiner-buttons-confirm'>
            <button className='button-no' onClick={handleConfirm}>NO</button>
            <button className='button-no' onClick={handleConfirm}>SI</button>
        </div>
    </>
}
            </div>

        </Modal>
    )
}