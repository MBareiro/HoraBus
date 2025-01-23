import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNewPassword } from "../../../redux/actions/operadorActions/operadorActions";
import { setRecoverPassword, setSignIn } from "../../../redux/slices/operadorSlice";
import "./ResetPassword.css"
import loadingGif from '../../../pictures/loading.gif'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { validationsNewPassword } from "./validationsNewPassword";

export const ResetPassword = () => {
    const { token } = useParams();
    const dispatch = useDispatch()
    const recoverPassword = useSelector((state) => state.operador.recoverPassword)
    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [showLoadinGif, setShowLoadinGif] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [newPassword, setNewPassword] = useState({
        newPassword: "",
        token: token
    })

    const [errorsPassword, setErrorsPassword] = useState({
        newPassword: ""
    })

    const [errorReset, setErrorReset] = useState({
        errorReset: ""
    })

    const handleChange = ({ target }) => {
        setNewPassword((prevForm) => ({
            ...prevForm,
            [target.name]: target.value
        }));

        const fieldsErrors = validationsNewPassword(target.name, target.value);
                setErrorsPassword({
                  ...errorsPassword,
                  [target.name]: fieldsErrors[target.name],
                });
                setErrorReset({
                    errorReset: ""
                })
    }

    const handleNewPassword = () => {
        if(newPassword.newPassword === ""){
            setErrorsPassword({
                newPassword: "Este campo no puede quedar vacío",
              });
        } else{
            if(errorsPassword.newPassword){
                setErrorReset({
                    errorReset: "No puede restaurar su contraseña debido a errores en el campo"
                })
                } else{
                    setShowLoadinGif(true)
                    dispatch(getNewPassword(newPassword))
                }
        }
    }

    useEffect(() => {
        setShowLoadinGif(false)
        setMessage(recoverPassword.message)
    }, [recoverPassword])

    const handleSignIn = () => {
        dispatch(setSignIn(true))
        dispatch(setRecoverPassword({}))
        navigate("/")
    }

    const handleShowPassword = () => {
        showPassword ? 
        setShowPassword(false)
        : setShowPassword(true)
    }

    console.log(errorsPassword)

    return (
        <div className="conteiner-reset-password">
            <div className="conteiner-form-reset">
                <form className="conteiner-form">
                    <label className="label-reset">INGRESE SU NUEVA CONTRASEÑA</label>
                    <div className='conteiner-input-password'>
                    <input
                       type={showPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        onChange={handleChange}
                        value={newPassword.newPassword}
                        className="input-recover"></input>
                    <button className='eye-button'
                        type='button'
                        onClick={handleShowPassword}>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    </div>
                    {errorsPassword.newPassword && <span className='span-error'>{errorsPassword.newPassword}</span>}
                </form>
                <button onClick={handleNewPassword} className="button-recover">ENVIAR</button>
                {showLoadinGif && <img src={loadingGif} alt="Cargando..." className="loading-gif-recover" />}
                {message &&
                    <div className="conteiner-form-reset">
                        <span className="span-recover">{message}</span>
                        <button onClick={handleSignIn} className="button-recover"> INICIAR SESION </button>
                    </div>}
                    {errorReset.errorReset && <span className="span-error">{errorReset.errorReset}</span>}
            </div>
        </div>
    )
}