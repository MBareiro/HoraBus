import { useState } from 'react'
import './OpcionesHorarios.css'
import { AddSchedule } from '../horarios/agregarHorarios/AddSchedule'
import { updateState } from '../../../redux/actions/operadorActions/operadorActions'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSchedule } from '../horarios/deleteHorarios/DeleteSchedule'
import { ChangeStateSchedules } from '../horarios/cambiarEstado/ChangeStateSchedules'

export const OpcionesHorarios = ({company_id, origin, destination, selectedItemsData, setSelectedItems,
    setSelectedItemsData, addScheduleModal, setAddScheduleModal, addingState, setAddingState,
    setDeletingState, setChangingState, setOpenEmptySchedules
}) => {

    const dispatch = useDispatch()

    const horarios = useSelector((state) => state.operador.schedules)
    
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [selectAllOn, setSelectAllOn] = useState(false)
    const [openChangeStateModal, setOpenChangeStateModal] = useState(false)


    const handleSelectAll = () => {
        setSelectedItems(horarios.map((horario) => horario.id));
        setSelectedItemsData(horarios.map((horario) => horario))
        setSelectAllOn(true)
    }

    const handleWithDrawSelection = () =>{
        setSelectedItems([]);
        setSelectedItemsData([])
        setSelectAllOn(false)
    }

    return(
        <div className="conteiner-buttons-h">
            <button className='opciones-button-h' onClick={() => setAddScheduleModal(true)}>AGREGAR</button>
            <button className='opciones-button-h' onClick={() => setOpenChangeStateModal(true)}>HABILITAR/DESHABILITAR</button>
            <button className='opciones-button-h' onClick={() => setOpenModalDelete(true)}>ELIMINAR</button>
            {selectAllOn ?
             <button className='opciones-button-h' onClick={handleWithDrawSelection}>QUITAR SELECCIÓN</button>
            :
            <button className='opciones-button-h' onClick={handleSelectAll}>SELECCIONAR TODOS</button>
            }
           

            {addScheduleModal && 
            <AddSchedule isOpen={addScheduleModal} setIsOpen={setAddScheduleModal}
            company_id={company_id} origin={origin} destination={destination}
            addingState={addingState} setAddingState={setAddingState} setOpenModal={setOpenEmptySchedules}/>}
            {openModalDelete && 
            <DeleteSchedule isOpen={openModalDelete} setIsOpen={setOpenModalDelete}
            selectedItems={selectedItemsData} origin={origin} destination={destination}
            setSelectedItems={setSelectedItems} setSelectedItemsData={setSelectedItemsData}
            selectedItemsData={selectedItemsData} setDeletingState={setDeletingState}/>}
            {openChangeStateModal &&
            <ChangeStateSchedules isOpen={openChangeStateModal} setIsOpen={setOpenChangeStateModal}
            selectedItems={selectedItemsData} origin={origin} destination={destination}
            setSelectedItems={setSelectedItems} setSelectedItemsData={setSelectedItemsData}
            selectedItemsData={selectedItemsData} setSelectAllOn={setSelectAllOn}
            setChangingState={setChangingState}/>}
        </div>
    )
}