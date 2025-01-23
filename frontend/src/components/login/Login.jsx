import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEye} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../../redux/actions/operadorActions/operadorActions';
import { useNavigate } from 'react-router-dom';
import { setSignIn } from '../../redux/slices/operadorSlice';
import { validationsLogin } from './validationsLogin';

export const Login = ({isOpen, closeModal}) => {
const navigate = useNavigate()
const access = useSelector((state) => state.operador.access)
const dispatch = useDispatch()

const [showPassword, setShowPassword] = useState(false)

const [errorsLogin, setErrorsLogin] = useState({
    dni: "",
    password: ""
})

const handleCloseModal = () => {
    closeModal(false);
    dispatch(setSignIn(false))
  };

    const [loginForm, setLoginForm] = useState({
        dni: "",
        password: ""
    })

    const handleChange = ({target}) => {
        setLoginForm((prevForm) => ({
            ...prevForm,
            [target.name]: target.value
        }));
        const fieldsErrors = validationsLogin(target.name, target.value);
        setErrorsLogin({
          ...errorsLogin,
          [target.name]: fieldsErrors[target.name],
        });
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

const handleShowPassword = () => {
    showPassword ? 
    setShowPassword(false)
    : setShowPassword(true)
}

console.log(errorsLogin)
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
                        {errorsLogin.dni && <span className='span-error'>{errorsLogin.dni} </span>}
                        <label className="label-login">
                            CONTRASEÑA
                        </label>
                        <div className='conteiner-input-password'>
                        <input
                         type={showPassword ? "text" : "password"}
                         name="password"
                         id="password"
                         onChange={handleChange}
                         value={loginForm.password}
                         className='input-login'>
                        </input>
                        <button className='eye-button'
                        type='button'
                        onClick={handleShowPassword}>
                        <FontAwesomeIcon icon={faEye} />
                        </button>
                        </div>
                        {errorsLogin.password && <span className='span-error'>{errorsLogin.password} </span>}
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