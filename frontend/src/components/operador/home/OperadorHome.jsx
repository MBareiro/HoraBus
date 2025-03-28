import { useEffect } from 'react';
import logo from '../../../pictures/horabus3.png';
import logoTekhne from '../../../pictures/Fondo Transparente Letras Oscuras.png'
import './OperadorHome.css'
import { useDispatch } from 'react-redux';
import { setSignIn } from '../../../redux/slices/operadorSlice';
import { Menu } from '../menu/Menu';
import { useNavigate } from 'react-router-dom';
import { UserPanelOp } from '../userPanel/UserPanelOp';
import { getOperadorData, getStops } from '../../../redux/actions/operadorActions/operadorActions';
import { getFrequencies } from '../../../redux/actions/userActions/userActions';

export const OperadorHome = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

  useEffect(()=>{
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (!authData) {
         dispatch(setSignIn(true))
         navigate("/");
        } else{
          dispatch(getOperadorData(authData.userId))
          dispatch(getStops())
          dispatch(getFrequencies())
        }

  }, [])

  return (
    <div className="app-operador">
       <div className='conteiner-logo-user'>
              <div className='conteiner-barra'>
              <img src={logoTekhne} alt="Tekhne Logo" className="logoTekhne" />
              <UserPanelOp/>
              </div>
            <div className="logo-container">
              <img src={logo} alt="Horabus Logo" className="logo" />
            </div>
            </div>
            <Menu />
    </div>
  ); 
}