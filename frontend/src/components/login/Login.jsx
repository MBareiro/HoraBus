import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import './Login.css'

export const Login = ({isOpen, closeModal}) => {
    const handleCloseModal = () =>{
        closeModal(false)
    }

    const [loginForm, setLoginForm] = useState({
        dni: "",
        contraseña: ""
    })

    const handleChange = ({target}) => {
        setLoginForm((prevForm) => ({
            ...prevForm,
            [target.name]: target.value
        }));
    }

console.log(loginForm)
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
                         name="contraseña"
                         id="contraseña"
                         onChange={handleChange}
                         value={loginForm.contraseña}
                         className='input-login'>
                        </input>
                    </form>
                </div>
                <div>
                    <button className='login-button'>INICIAR SESIÓN</button>
                </div>
                </div>
        </Modal>
    )
}