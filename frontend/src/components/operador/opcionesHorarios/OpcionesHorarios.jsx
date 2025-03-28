import { useState } from 'react'
import './OpcionesHorarios.css'
import { AddSchedule } from '../horarios/agregarHorarios/AddSchedule'
import { updateState } from '../../../redux/actions/operadorActions/operadorActions'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSchedule } from '../horarios/deleteHorarios/DeleteSchedule'

export const OpcionesHorarios = ({company_id, origin, destination, selectedItemsData, setSelectedItems,
    setSelectedItemsData, selectedItems
}) => {

    console.log(selectedItems)

    const dispatch = useDispatch()

    const horarios = useSelector((state) => state.operador.schedules)

    const [addScheduleModal, setAddScheduleModal] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [selectAllOn, setSelectAllOn] = useState(false)

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

    const handleSelectAll = () => {
        setSelectedItems(horarios.map((horario) => horario.id));
        setSelectAllOn(true)
    }

    const handleWithDrawSelection = () =>{
        setSelectedItems([]);
        setSelectAllOn(false)
    }

    return(
        <div className="conteiner-buttons-h">
            <button className='opciones-button-h' onClick={() => setAddScheduleModal(true)}>AGREGAR</button>
            <button className='opciones-button-h' onClick={handleEnabled}>HABILITAR/DESHABILITAR</button>
            <button className='opciones-button-h' onClick={() => setOpenModalDelete(true)}>ELIMINAR</button>
            {selectAllOn ?
             <button className='opciones-button-h' onClick={handleWithDrawSelection}>QUITAR SELECCIÓN</button>
            :
            <button className='opciones-button-h' onClick={handleSelectAll}>SELECCIONAR TODOS</button>
            }
           

            {addScheduleModal && 
            <AddSchedule isOpen={addScheduleModal} setIsOpen={setAddScheduleModal}
            company_id={company_id} origin={origin} destination={destination}/>}
            {openModalDelete && 
            <DeleteSchedule isOpen={openModalDelete} setIsOpen={setOpenModalDelete}
            selectedItems={selectedItemsData} origin={origin} destination={destination}
            setSelectedItems={setSelectedItems} setSelectedItemsData={setSelectedItemsData}
            selectedItemsData={selectedItemsData}/>}

        </div>
    )
}