import { useEffect } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { getScheduleData } from '../../../../redux/actions/operadorActions/operadorActions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

export const EditarHorarios = ({isOpen, horarioId, setOpenModalEdit, origen,destino}) =>{
const dispatch = useDispatch()

    useEffect (() =>{
        dispatch(getScheduleData(horarioId))
    }, [])
    
    return(
        <Modal
        isOpen={isOpen}
        className="modal-login"
        overlayClassName="login-overlay">
            <div>
                <div>
                      <button className='button-close' onClick={() => setOpenModalEdit(false)}>
                            <FontAwesomeIcon icon={faXmark}/>
                                </button>
                </div>

                <div>
                    <h1>Origen:{origen} - Destino: {destino} </h1>
                    <input></input>
                </div>
            
            </div>

        </Modal>
        
    )
}