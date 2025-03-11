import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignIn } from "../../../../redux/slices/operadorSlice";
import { changePassword, getOperadorData } from "../../../../redux/actions/operadorActions/operadorActions";
import { useEffect, useState } from "react";
import loadingGif from '../../../../pictures/loading.gif'
import './ChangePassword.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck} from "@fortawesome/free-solid-svg-icons";

export const ChangePasswordOp = () => {

const navigate = useNavigate()
const dispatch = useDispatch()

      useEffect(()=>{
            const authData = JSON.parse(localStorage.getItem("auth"));
            if (!authData) {
             dispatch(setSignIn(true))
             navigate("/");
            } else{
              dispatch(getOperadorData(authData.userId))
            }
      }, [])

      const [operatorId, setOperatorId] = useState(() => {
        const authData = JSON.parse(localStorage.getItem("auth")); 
        return authData?.userId || null;
    });

      const [currentPassword, setCurrentPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');

    
      const [showLoadinGif, setShowLoadingGif] = useState(false)
      const [showCheck, setShowCheck] = useState(false)

      const handleSubmit = async (event) => {
        event.preventDefault();
        setShowLoadingGif(true);

        const data = {
            currentPassword,
            newPassword,
            operatorId
          };
          dispatch(changePassword(data))
    };
    
    return(
          <div className="conteiner-recover-p">
                 <div className="conteiner-form-recover">
                     <h1 className="h1-recover">CAMBIAR CONTRASEÑA</h1>
                     <div className="conteiner-form-button">
                     <form className="conteiner-form">
                         <label className="label-recover">INGRESE SU CONTRASEÑA ACTUAL</label>
                         <input
                       type="password"
                       name="currentPassword"
                       id="currentPassword"
                       className="input-recover"
                       value={currentPassword}
                       onChange={(e) => setCurrentPassword(e.target.value)}></input>
                          <label className="label-recover">INGRESE SU CONTRASEÑA NUEVA</label>
                         <input
                         type="password"
                         name="newPassword"
                         id="newPassword"
                         className="input-recover"
                         value={newPassword}
                         onChange={(e) => setNewPassword(e.target.value)}></input>

                 <button className="button-recover" onClick={handleSubmit}>ENVIAR</button>
                     </form>
                     {showLoadinGif && <img src={loadingGif} alt="Cargando..." className="loading-gif-cp" /> } 
                     <FontAwesomeIcon icon={faSquareCheck} style={{color: "#69d37b",}} />
                     </div>
                 </div>
             </div>
    )
}