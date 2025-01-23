import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecoverPassword } from "../../../redux/actions/operadorActions/operadorActions";
import './RecoverPassword.css'
import loadingGif from '../../../pictures/loading.gif'
import { validationsRecover } from "./validationsRecover";

export const RecoverPassword = () =>{

const recoverPassword = useSelector((state) => state.operador.recoverPassword)
const dispatch = useDispatch()

const [showLoadinGif, setShowLoadinGif] = useState(false)

        const [recoverForm, setRecoverForm] = useState({
            dni: "",
        })
        const [recoverPass, setRecoverPass]= useState({})

        const [errorsRecover, setErrorsRecover] = useState({
            dni: "",
        })
        const [errorsSend, setErrorsSend] = useState({
            dni: "",
        })

        const handleChange = ({target}) => {
            setRecoverForm((prevForm) => ({
                ...prevForm,
                [target.name]: target.value
            }));
         const fieldsErrors = validationsRecover(target.name, target.value);
                setErrorsRecover({
                  ...errorsRecover,
                  [target.name]: fieldsErrors[target.name],
                });
            setErrorsSend({
                dni: ""
            })
        }

        const handleSend = () => {
        if(!recoverForm.dni){
            setErrorsRecover({
                ...errorsRecover,
                dni: "Este campo no puede quedar vacio",
            })
        }
        if(!errorsRecover.dni && recoverForm.dni){
            setShowLoadinGif(true)
            dispatch(getRecoverPassword(recoverForm))
        } else{
            setErrorsSend({
                ...errorsSend,
                dni: "No puede enviar el formulario debido a errores en el campo",
            })
        }
        }
    
    useEffect(()=>{
        setRecoverPass({
            message: recoverPassword.message,
            email: recoverPassword.email
        })
        setShowLoadinGif(false)

    }, [recoverPassword])

    return(
        <div className="conteiner-recover-p">
            <div className="conteiner-form-recover">
                <h1 className="h1-recover">RECUPERAR CONTRASEÑA</h1>
                <form className="conteiner-form">
                    <label className="label-recover">INGRESE SU DNI</label>
                    <input
                    type="text"
                    name="dni"
                    id="dni"
                    onChange={handleChange}
                    value={recoverForm.dni}
                    className="input-recover"></input>
                    {errorsRecover.dni && <span className="span-error">{errorsRecover.dni}</span>}
                </form>
                <button onClick={handleSend} className="button-recover">ENVIAR</button>
              {recoverPass.message && <span className="span-recover">{recoverPass.message}: {recoverPass.email}</span>}
              {showLoadinGif && <img src={loadingGif} alt="Cargando..." className="loading-gif-recover" />}
              {errorsSend.dni && <span className="span-error">{errorsSend.dni}</span>}  
            </div>
        </div>
    )
}