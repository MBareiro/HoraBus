import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecoverPassword } from "../../../redux/actions/operadorActions/operadorActions";
import './RecoverPassword.css'

export const RecoverPassword = () =>{

const recoverPassword = useSelector((state) => state.operador.recoverPassword)
const dispatch = useDispatch()

        const [recoverForm, setRecoverForm] = useState({
            dni: "",
        })
        const [recoverPass, setRecoverPass]= useState({})

        const handleChange = ({target}) => {
            setRecoverForm((prevForm) => ({
                ...prevForm,
                [target.name]: target.value
            }));
        }

        const handleSend = () => {
        dispatch(getRecoverPassword(recoverForm))
        }
    
    useEffect(()=>{
        setRecoverPass({
            message: recoverPassword.message,
            email: recoverPassword.email
        })

    }, [recoverPassword])

    return(
        <div className="conteiner-recover-p">
            <div>
                <form>
                    <label>INGRESE SU DNI</label>
                    <input
                    type="text"
                    name="dni"
                    id="dni"
                    onChange={handleChange}
                    value={recoverForm.dni}></input>
                </form>
                <button onClick={handleSend}>ENVIAR</button>
              {recoverPass.message && <span>{recoverPass.message}: {recoverPass.email}</span>}  
            </div>
        </div>
    )
}