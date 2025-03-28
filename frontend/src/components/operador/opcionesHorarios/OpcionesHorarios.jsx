import { useState } from 'react'
import './OpcionesHorarios.css'
import { AddSchedule } from '../horarios/agregarHorarios/AddSchedule'
import { updateState } from '../../../redux/actions/operadorActions/operadorActions'
import { useDispatch } from 'react-redux'

export const OpcionesHorarios = ({company_id, origin, destination, selectedItemsData, setSelectedItems,
    setSelectedItemsData
}) => {

    const dispatch = useDispatch()

    const [addScheduleModal, setAddScheduleModal] = useState(false)

    const handleEnabled = ()=>{
        const updatedItems = selectedItemsData.map((item) => ({
            ...item,
            enabled: !item.enabled  
        }));

        for (let i = 0; i < updatedItems.length; i++) {
            dispatch(updateState(updatedItems[i]));
        }
        setSelectedItems([])
        setSelectedItemsData([])
    }

    return(
        <div className="conteiner-buttons-h">
            <button className='opciones-button-h' onClick={() => setAddScheduleModal(true)}>AGREGAR</button>
            <button className='opciones-button-h' onClick={handleEnabled}>HABILITAR/DESHABILITAR</button>
            <button className='opciones-button-h'>ELIMINAR</button>
            <button className='opciones-button-h'>SELECCIONAR TODOS</button>

            {addScheduleModal && 
            <AddSchedule isOpen={addScheduleModal} setIsOpen={setAddScheduleModal}
            company_id={company_id} origin={origin} destination={destination}/>}

        </div>
    )
}