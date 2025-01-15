import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

export const Login = ({isOpen, closeModal}) => {
    const handleCloseModal = () =>{
        closeModal(false)
    }

    const [loginForm, setLoginForm] = useState({
        dni: "",
        contraseña: ""
    })

    handleChange = ({target}) => {


    }


    return(
        <Modal
        isOpen={isOpen}
        >
              <div>
                <div>
                <button onClick={handleCloseModal} className='button-close'>
                                <FontAwesomeIcon icon={faXmark}/>
                </button>
                </div>
                <h1>LOGIN</h1>
                <div>
                    <form>
                        <label>
                            DNI
                        </label>
                        <input
                        type="text"
                        name="dni"
                        id="dni"
                        placeholder="DNI"
                        onChange={handleChange}
                        value={loginForm.dni}>
                        </input>
                        <label>
                            CONTRASEÑA
                        </label>
                        <input>
                        </input>
                    </form>
                </div>
                
                </div>
        </Modal>

    )
}