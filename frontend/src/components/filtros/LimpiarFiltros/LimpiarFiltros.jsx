import { useDispatch } from 'react-redux';
import './LimpiarFiltros.css'
import { getFrequencies, getParadas } from '../../../redux/actions/userActions/userActions';

const LimpiarFiltros = () =>{
const dispatch = useDispatch()

const handleLimpiarFiltros = () =>{
    dispatch(getParadas());
    dispatch(getFrequencies())
}

    return(
        <div className="button-filtros-conteiner">
            <button className='limpiar-button' onClick={handleLimpiarFiltros}>QUITAR FILTROS</button>
        </div>
    )
}

export default LimpiarFiltros