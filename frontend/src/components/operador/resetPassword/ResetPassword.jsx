import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNewPassword } from "../../../redux/actions/operadorActions/operadorActions";
import { setSignIn } from "../../../redux/slices/operadorSlice";

export const ResetPassword = () => {
    const { token } = useParams();
    const dispatch =  useDispatch()
    const recoverPassword = useSelector((state) => state.operador.recoverPassword)
    const navigate = useNavigate()

    const [message, setMessage] = useState("")

    const [newPassword, setNewPassword]= useState({
        newPassword: "",
        token: token
    })

    const handleChange = ({target}) => {
        setNewPassword((prevForm) => ({
            ...prevForm,
            [target.name]: target.value
        }));
    }

    const handleNewPassword = () => {
    dispatch(getNewPassword(newPassword))
    }

    useEffect(() => {
        setMessage(recoverPassword.message)
    }, [recoverPassword])

    const handleSignIn = () => {
        dispatch(setSignIn(true))
        navigate("/")
    }

    return(
        <div>
            <div>
            <form>
                <label>INGRESE SU NUEVA CONTRASEÑA</label>
                <input
                type="password"
                name="newPassword"
                id="newPassword"
                onChange={handleChange}
                value={newPassword.newPassword}></input>
            </form>
            </div>
            <button onClick={handleNewPassword}>ENVIAR</button>
            {message && <div>
                <span>{message}</span> <button onClick={handleSignIn}> INICIAR SESION </button> 
                </div>}
        </div>
    )
}