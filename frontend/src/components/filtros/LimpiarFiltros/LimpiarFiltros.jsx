import { useDispatch } from 'react-redux';
import './LimpiarFiltros.css'
import { getFrequencies} from '../../../redux/actions/userActions/userActions';
import { setHorarios } from '../../../redux/slices/userSlice';

const LimpiarFiltros = ({setLoading, handleBuscarHorarios, filtrosOn, setFiltrosOn}) =>{
const dispatch = useDispatch()

const handleLimpiarFiltros = () =>{
    if(filtrosOn){
        setLoading(true)
        dispatch(setHorarios([]))
        handleBuscarHorarios()
        dispatch(getFrequencies())
        setFiltrosOn(false)
    }
}

    return(
        <div className="button-filtros-conteiner">
            <button className='limpiar-button' onClick={handleLimpiarFiltros}>QUITAR FILTROS</button>
        </div>
    )
}

export default LimpiarFiltros