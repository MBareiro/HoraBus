import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignIn } from "../../../../redux/slices/operadorSlice";
import { changePassword, getOperadorData } from "../../../../redux/actions/operadorActions/operadorActions";
import { useEffect, useState } from "react";
import loadingGif from '../../../../pictures/loading.gif'
import './ChangePassword.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { validationsChangePassword } from "./validationsChangePassword";

export const ChangePasswordOp = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData) {
      dispatch(setSignIn(true))
      navigate("/");
    } else {
      dispatch(getOperadorData(authData.userId))
    }
  }, [])

  const [operatorId, setOperatorId] = useState(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    return authData?.userId || null;
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState("");
  const [showLoadinGif, setShowLoadingGif] = useState(false)
  const [showCheck, setShowCheck] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);

    const fieldErrors = validationsChangePassword(name, value, newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoadingGif(true);

    setErrors("")

    if (newPassword !== confirmPassword) {
      setErrors("Las contraseñas no coinciden");
      return;
    }

    const data = {
      currentPassword,
      newPassword,
      operatorId
    };
    dispatch(changePassword(data))
  };

  return (
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
              onChange={handleChange}></input>

            {errors.currentPassword && <span className="error">{errors.currentPassword}</span>}

            <label className="label-recover">INGRESE SU CONTRASEÑA NUEVA</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="input-recover"
              value={newPassword}
              onChange={handleChange}></input>

            {errors.newPassword && <span className="error">{errors.newPassword}</span>}

            <label className="label-recover">CONFIRME SU NUEVA CONTRASEÑA</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="input-recover"
              value={confirmPassword}
              onChange={handleChange}
            />

            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

            <button className="button-recover" onClick={handleSubmit}>ENVIAR</button>
          </form>
          {showLoadinGif && <img src={loadingGif} alt="Cargando..." className="loading-gif-cp" />}
          <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#69d37b", }} />
        </div>
      </div>
    </div>
  )
}