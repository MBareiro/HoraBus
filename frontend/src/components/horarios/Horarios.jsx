import { useSelector } from "react-redux"
import './Horarios.css';
import { useEffect, useState } from "react";
import loadingGif from '../../pictures/loading.gif'
import Filtros from '../filtros/Filtros/Filtros'
import LimpiarFiltros from "../filtros/LimpiarFiltros/LimpiarFiltros";

const Horarios = ({origen, destino, handleBuscarHorarios}) => {

const horarios = useSelector((state) => state.user.horarios)
const [loading, setLoading] = useState(true)
const [filtrosOn, setFiltrosOn] = useState(false)

useEffect(() => {
  if (horarios.length !== 0){
    setLoading(false)
  }
  }, [horarios])
  

    return (
        <div className="horariosConteiner">
            <h3 className="center-text">HORARIOS</h3>
            <div className="buttons-filters-conteiner">
            <Filtros origen={origen} destino={destino} setLoading={setLoading} filtrosOn={filtrosOn} setFiltrosOn={setFiltrosOn} />
            <LimpiarFiltros origen={origen} destino={destino} handleBuscarHorarios={handleBuscarHorarios} setLoading={setLoading} 
            filtrosOn={filtrosOn} setFiltrosOn={setFiltrosOn}/>
            </div>
         
            {loading ? 
            <div className="loading-container">
            <img src={loadingGif} alt="Cargando..." className="loading-gif" />
          </div>
          :

      <table className="tabla">
        <thead>
          <tr>
            <th>{origen}</th>
            <th>{destino}</th>
            <th>Frecuencia</th>
            <th>Empresa</th>
          </tr>
        </thead>
        <tbody>
        {horarios
        .slice() // Crea una copia para evitar mutar el estado original
        .sort((a, b) => a.departure_time.localeCompare(b.departure_time)) // Ordena por departure_time
        .map((item) => (
    <tr key={item.id}>
      <td>{item.departure_time}</td>
      <td>{item.arrival_time}</td>
      <td>{item.frequency}</td>
      <td>{item.company}</td>
    </tr>
  ))}

        </tbody>
      </table>
}
        </div>
    )
}

export default Horarios