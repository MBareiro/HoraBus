import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AddSchedule } from "../../horarios/agregarHorarios/AddSchedule";
import { useEffect } from "react";
import './EmptySchedulesModal.css'

export const EmptySchedulesModal = ({ isOpen, setIsOpen, setAddScheduleModal, addScheduleModal, origin,
    destination, companyId, setAddingState
}) => {
    
    const dispatch = useDispatch();

    const schedules = useSelector((state) => state.operador.schedules)

    const handleNo = () => {
        setIsOpen(false);
    };

    const handleSi = () => {
        setAddScheduleModal(true);
    };

    useEffect(() =>{
        schedules !== null && setIsOpen(false)
    }, [schedules])

    return (
        <>
            {addScheduleModal ? (
                <div>
                    <AddSchedule isOpen={addScheduleModal} setIsOpen={setAddScheduleModal}
                        origin={origin} destination={destination} company_id={companyId}
                        setOpenModal={setIsOpen} setAddingState={setAddingState}/>
                </div>
            ) : (
                <Modal className="modal-login" overlayClassName="login-overlay" isOpen={isOpen}>
                    <div className='conteiner-confirm-changes'>
                        <span className='span-empty'>No hay horarios registrados en esta ruta</span>
                        <span className='span-confirm'>¿Desea agregar uno?</span>
                        <div className='conteiner-buttons-confirm'>
                            <button onClick={handleSi} className='button-no'>Sí</button>
                            <button onClick={handleNo} className='button-no'>No</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};
