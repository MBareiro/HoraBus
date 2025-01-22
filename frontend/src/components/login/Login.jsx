import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../../redux/actions/operadorActions/operadorActions';
import { useNavigate } from "react-router-dom";
import { RecoverPassword } from '../operador/recoverPassword/RecoverPassword';

export const Login = ({isOpen, closeModal}) => {

const access = useSelector((state) => state.operador.access)
const dispatch = useDispatch()
const navigate = useNavigate();

    const handleCloseModal = () =>{
        closeModal(false)
    }

    const [loginForm, setLoginForm] = useState({
        dni: "",
        password: ""
    })

    const handleChange = ({target}) => {
        setLoginForm((prevForm) => ({
            ...prevForm,
            [target.name]: target.value
        }));
    }

const handleLogin = () =>{
dispatch(getLogin(loginForm))
}

useEffect(() =>{
if(access){
    navigate("/operador")
}
}, [access])

const handleClick = () => {
navigate("/recoverPassword")
}
    return(
        <Modal
        isOpen={isOpen}
        className="modal-login"
        overlayClassName="login-overlay"
        >
              <div className='conteinerLogin'>
                <div className='button-login-conteiner'>
                <button onClick={handleCloseModal} className='button-close'>
                                <FontAwesomeIcon icon={faXmark}/>
                </button>
                </div>
                <h1 className="h2-login">INICIO DE SESIÓN</h1>
                <div className='conteiner-form-login'>
                    <form className='conteiner-form-login'>
                        <label className="label-login" >
                            DNI
                        </label>
                        <input
                        type="text"
                        name="dni"
                        id="dni"
                        onChange={handleChange}
                        value={loginForm.dni}
                        className='input-login'>
                        </input>
                        <label className="label-login">
                            CONTRASEÑA
                        </label>
                        <input
                         type="password"
                         name="password"
                         id="password"
                         onChange={handleChange}
                         value={loginForm.password}
                         className='input-login'>
                        </input>
                    </form>
                </div>
                <div className='conteiner-buttons-login'>
                    <button className='login-button' onClick={handleLogin}>INICIAR SESIÓN</button>
                    <button className='recover-button' onClick={handleClick}>Recuperar contraseña</button>
                </div>
                </div>
        </Modal>
    )
}