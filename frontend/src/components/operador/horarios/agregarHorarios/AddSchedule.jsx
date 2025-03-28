import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import './AddSchedule.css'
import { useDispatch, useSelector } from 'react-redux';
import { addSchedule } from '../../../../redux/actions/operadorActions/operadorActions';

export const AddSchedule = ({ origin, destination, isOpen, setIsOpen, company_id }) => {

    const dispatch = useDispatch()
    const frequencies = useSelector((state) => state.user.frecuencias)


    const [addScheduleData, setAddScheduleData] = useState({
        frequency: "",
        departure_time: "",
        arrival_time: "",
        origin: origin,
        destination: destination,
        company_id: company_id,
        status: "on_time",
        enabled: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setAddScheduleData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleAdd = () => {
        dispatch(addSchedule(addScheduleData))
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            className="modal-add-s"
            overlayClassName="login-overlay">

            <div className='conteiner-edit-s'>

                <div className='conteiner-button-close-es'>
                    <button className='button-close' onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div className='conteiner-edit-h-i'>
                    <h1 className="h1-add">AGREGAR HORARIO</h1>

                    <h2 className="h2-add">
                        {origin} <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffc107", }} /> {destination}</h2>

                    <label className='edit-label-s'>Horario de salida</label>
                    <input
                        type="time"
                        name="departure_time"
                        value={addScheduleData.departure_time}
                        onChange={handleChange}
                        className='input-edit-s'
                    ></input>

                    <label className='edit-label-s'>Horario de llegada</label>
                    <input
                        type="time"
                        name="arrival_time"
                        value={addScheduleData.arrival_time}
                        onChange={handleChange}
                        className='input-edit-s'
                    ></input>

                    <label className='edit-label-s'>Frecuencia</label>
                    <select
                        name="frequency"
                        value={addScheduleData.frequency}
                        onChange={handleChange}
                        className="select-freq"
                    >
                        <option value="" disabled >Selecciona una frecuencia</option>
                        {frequencies.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>

                    <button onClick={handleAdd} className='button-edit-a'>GUARDAR CAMBIOS</button>

                </div>



            </div>
        </Modal>
    )
}