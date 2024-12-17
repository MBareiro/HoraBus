import './App.css';
import logo from './pictures/horabus2.png';
import Select from './components/select/Select';
import { useEffect } from 'react';
import { getFrequencies, getParadas } from './redux/actions/userActions/userActions';
import { useDispatch } from 'react-redux';


function App() {

const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getParadas());
    dispatch(getFrequencies())
  }, [dispatch]);

  return (
    <div className="app">
      <div className="logo-container">
        <img src={logo} alt="Horabus Logo" className="logo" />
      </div>
        <Select/>
    </div>
  );
}

export default App;


