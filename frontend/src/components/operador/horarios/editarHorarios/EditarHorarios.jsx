import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { editSchedule, getScheduleData } from '../../../../redux/actions/operadorActions/operadorActions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import './EditarHorarios.css'

export const EditarHorarios = ({ isOpen, setOpenModalEdit, origin, destination, horario
}) => {
    const dispatch = useDispatch()

    const [dataEdit, setDataEdit] = useState({
        frequency: horario.frequency,
        departure_time: horario.departure_time,
        arrival_time: horario.arrival_time,
        origin: origin,
        destination: destination
    })

    const [horarioId, setHorarioId] = useState(horario?.id || null);

    const handleChange = (e) =>{
        const {name, value} = e.target

            setDataEdit((prevState) => ({
                ...prevState,
                [name]: value
            }));         
    }

    const handleEdit = () =>{

        let updatedDepartureTime = dataEdit.departure_time;
        if (updatedDepartureTime && !updatedDepartureTime.endsWith(":00")) {
            updatedDepartureTime = updatedDepartureTime.concat(":00");
        }

        let updatedArrivalTime = dataEdit.arrival_time;
        if (updatedArrivalTime && !updatedArrivalTime.endsWith(":00")) {
            updatedArrivalTime = updatedArrivalTime.concat(":00");
        }
    
        setDataEdit((prevState) => ({
            ...prevState,
            departure_time: updatedDepartureTime,
            arrival_time: updatedArrivalTime 
        }));

        dispatch(editSchedule(horarioId, dataEdit))
    }

    return (
        <Modal
            isOpen={isOpen}
             className="modal-content-e-s"
            overlayClassName="login-overlay">
            <div className='conteiner-edit-s'>
                <div className='conteiner-button-close-es'>
                    <button className='button-close' onClick={() => setOpenModalEdit(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className='conteiner-edit-h-i'> 
                    <h1 className="h2">{origin} <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffc107",}}/> {destination}</h1>
                    <label className='edit-label-s'>Horario de salida</label>
                    <input
                        type="text"
                        name="departure_time"
                        value={dataEdit.departure_time}
                        onChange={handleChange}
                        className='input-edit-s'
                    ></input>
                    <label className='edit-label-s'>Horario de llegada</label>
                    <input
                        type="text"
                        name="arrival_time"
                        value={dataEdit.arrival_time}
                        onChange={handleChange}
                        className='input-edit-s'
                    ></input>
                      <label className='edit-label-s'>Frecuencia</label>
                    <input
                        type="text"
                        name="frequency"
                        value={dataEdit.frequency}
                        onChange={handleChange}
                        className='input-edit-s'
                    ></input>

                    <button onClick={handleEdit} className='button-edit-s'>GUARDAR CAMBIOS</button>
                </div>

            </div>

        </Modal>

    )
}