import { useState } from "react"
import { ParadasOperador } from "../paradas/ParadasOperador"
import { HorariosButtonOperador } from '../horariosButton/HorariosButtonOperador'

export const Menu = () => {

const [openParadas, setOpenParadas] = useState(false)
const [openHorarios, setOpenHorarios] = useState(false)

const handleOpenParadas = () =>{
    setOpenParadas(true)
    setOpenHorarios(false)
}

const handleOpenHorarios = () => {
    setOpenHorarios(true)
    setOpenParadas(false)
}

    return(
        <div className="select-container">
        <div className="select-container-buttons">
            <button className="selector" onClick={handleOpenParadas}>PARADAS</button>
            <button className="selector" onClick={handleOpenHorarios}>HORARIOS</button>
        </div>
        {openParadas && <ParadasOperador setOpenParadas={setOpenParadas}/> }
        {openHorarios && <HorariosButtonOperador setOpenHorarios={setOpenHorarios}/>}
  </div>
    )
}