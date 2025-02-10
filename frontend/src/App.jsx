import './App.css';
import logo from './pictures/horabus3.png';
import logoTekhne from './pictures/Fondo Transparente Letras Oscuras.png'
import Select from './components/select/Select';
import { useEffect } from 'react';
import { getFrequencies, getParadas } from './redux/actions/userActions/userActions';
import { useDispatch } from 'react-redux';
import { UserAccess } from './components/userAccess/UserAccess';


function App() {

const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getParadas());
    dispatch(getFrequencies())
  }, [dispatch]);

  return (
    <div className="app">
      <div className='conteiner-logo-user'>
        <div className='conteiner-barra'>
        <img src={logoTekhne} alt="Tekhne Logo" className="logoTekhne" />
        <UserAccess/>
        </div>
      <div className="logo-container">
        <img src={logo} alt="Horabus Logo" className="logo" />
      </div>
      </div>
        <Select/>
    </div>
  );
}

export default App;


