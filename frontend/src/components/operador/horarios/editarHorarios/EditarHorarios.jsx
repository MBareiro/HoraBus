import { useEffect } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { getScheduleData } from '../../../../redux/actions/operadorActions/operadorActions'

export const EditarHorarios = ({isOpen, horarioId}) =>{
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
            
            </div>

        </Modal>
        
    )
}