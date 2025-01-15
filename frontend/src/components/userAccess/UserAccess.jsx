import { useState } from "react"
import { Login } from "../login/Login"

export const UserAccess = () => {

const [isOpen, setIsOpen] = useState(false)

const handleIsOpen = () => {
setIsOpen(true)
}
    return(
        <div>
            <button onClick={handleIsOpen}>LOGIN</button>
            <Login isOpen={isOpen} closeModal={setIsOpen}/>
            <button>REGISTER</button>
        </div>
    )
}