import { useState } from 'react'
import './OpcionesHorarios.css'
import { AddSchedule } from '../horarios/agregarHorarios/AddSchedule'

export const OpcionesHorarios = ({company_id, origin, destination}) => {

    const [addScheduleModal, setAddScheduleModal] = useState(false)

    return(
        <div className="conteiner-buttons-h">
            <button className='opciones-button-h' onClick={() => setAddScheduleModal(true)}>AGREGAR</button>
            <button className='opciones-button-h'>HABILITAR/DESHABILITAR</button>
            <button className='opciones-button-h'>ELIMINAR</button>
            <button className='opciones-button-h'>SELECCIONAR TODOS</button>

            {addScheduleModal && 
            <AddSchedule isOpen={addScheduleModal} setIsOpen={setAddScheduleModal}
            company_id={company_id} origin={origin} destination={destination}/>}

        </div>
    )
}