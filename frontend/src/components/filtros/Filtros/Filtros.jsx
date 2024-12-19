import { useState } from 'react'
import './Filtros.css'
import FiltrosModal from '../FiltrosModal/FiltrosModal'

const Filtros = ({origen, destino, setLoading, filtrosOn, setFiltrosOn}) => {

const [openFiltrosModal, setOpenFiltrosModal]=useState(false)

const handleOpenFiltrosModal = () =>{
    setOpenFiltrosModal(true)
}

    return (
        <div className='button-filtros-conteiner'>
            <button className='filtro-button' onClick={handleOpenFiltrosModal}>FILTROS</button>
            {openFiltrosModal && <FiltrosModal isOpen={openFiltrosModal} closeModal={setOpenFiltrosModal} 
            origen={origen} destino={destino} setLoading={setLoading} filtrosOn={filtrosOn} 
            setFiltrosOn={setFiltrosOn} />}
        </div>
    )
}

export default Filtros