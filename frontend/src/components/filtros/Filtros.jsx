import { useState } from 'react'
import './Filtros.css'
import FiltrosModal from './FiltrosModal'

const Filtros = () => {

const [openFiltrosModal, setOpenFiltrosModal]=useState(false)

const handleOpenFiltrosModal = () =>{
    setOpenFiltrosModal(true)
}

    return (
        <div className='button-filtros-conteiner'>
            <button className='filtro-button' onClick={handleOpenFiltrosModal}>FILTROS</button>
            {openFiltrosModal && <FiltrosModal isOpen={openFiltrosModal} closeModal={setOpenFiltrosModal}/>}

        </div>
    )
}

export default Filtros