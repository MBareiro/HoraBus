import { useState } from "react"
import { Login } from "../login/Login"
import './UserAccess.css'

export const UserAccess = () => {

const [isOpen, setIsOpen] = useState(false)

const handleIsOpen = () => {
setIsOpen(true)
}
    return(
        <div className="access-conteiner">
               <div>
                <button className="button-access" onClick={handleIsOpen}>ACCESSO PARA EMPRESAS</button>
                </div>
            <Login isOpen={isOpen} closeModal={setIsOpen}/>
        </div>
    )
}