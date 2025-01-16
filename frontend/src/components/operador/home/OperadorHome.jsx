import { useEffect } from 'react';
import logo from '../../../pictures/horabus2.png';
import './OperadorHome.css'
import { useDispatch } from 'react-redux';
import { setAccess } from '../../../redux/slices/operadorSlice';
import { Menu } from '../menu/Menu';

export const OperadorHome = () => {
const dispatch = useDispatch()

  useEffect(()=>{
    const {access} = 
        JSON.parse(localStorage.getItem("auth"))
    dispatch(setAccess(access))
  }, [])
    return (
        <div className="app">
             <div className="access-conteiner">
                           <div>
                            <button className="button-operador">ROL OPERADOR</button>
                            </div>
                    </div>
            <div className="logo-container-operador">
                    <img src={logo} alt="Horabus Logo" className="logo" />
                  </div>
                  <Menu/>
        </div>
    )
}