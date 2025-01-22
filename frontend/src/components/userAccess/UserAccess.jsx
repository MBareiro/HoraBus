import { useEffect, useState } from "react"
import { Login } from "../login/Login"
import './UserAccess.css'
import { useSelector } from "react-redux";

export const UserAccess = () => {
const [isOpen, setIsOpen] = useState(false)

const signIn = useSelector((state) => state.operador.signIn)

const handleIsOpen = () => {
setIsOpen(true)
}

useEffect(() =>{
signIn && setIsOpen(true)
}, [signIn])
    return(
        <div className="access-conteiner">
               <div>
                <button className="button-access" onClick={handleIsOpen}>ACCESSO PARA EMPRESAS</button>
                </div>
            <Login isOpen={isOpen} closeModal={setIsOpen}/>
        </div>
    )
}