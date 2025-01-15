import { useState } from "react"
import { Login } from "../login/Login"
import './UserAccess.css'
import logo from '../../pictures/horabus2.png';

export const UserAccess = () => {

const [isOpen, setIsOpen] = useState(false)

const handleIsOpen = () => {
setIsOpen(true)
}
    return(
        <div className="access-conteiner">
            <div className="logo-container">
                    <img src={logo} alt="Horabus Logo" className="logo" />
                  </div>
            <div className="conteiner-log-reg">
            <button onClick={handleIsOpen} className="button-log-reg">INICIAR SESIÓN</button>
            <Login isOpen={isOpen} closeModal={setIsOpen}/>
            <button className='inicio-button'>VOLVER A INICIO</button>
            </div>
            
        </div>
    )
}