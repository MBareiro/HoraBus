import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignIn } from "../../../../redux/slices/operadorSlice";
import { getOperadorData } from "../../../../redux/actions/operadorActions/operadorActions";
import { useEffect, useState } from "react";
import loadingGif from '../../../../pictures/loading.gif'

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

    
      const [showLoadinGif, setShowLoadinGif] = useState(false)
    
    return(
          <div className="conteiner-recover-p">
                 <div className="conteiner-form-recover">
                     <h1 className="h1-recover">CAMBIAR CONTRASEÑA</h1>
                     <div className="conteiner-form-button">
                     <form className="conteiner-form">
                         <label className="label-recover">INGRESE SU CONTRASEÑA ACTUAL</label>
                         <input
                         type="text"
                         name="dni"
                         id="dni"
                         className="input-recover"></input>
                     </form>
                 {showLoadinGif ?
                 <img src={loadingGif} alt="Cargando..." className="loading-gif-recover" /> :
                 <button className="button-recover">ENVIAR</button>} 
                     </div>
                 </div>
             </div>
    )
}