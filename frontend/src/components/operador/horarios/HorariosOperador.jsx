import { useSelector } from "react-redux"
import { OpcionesHorarios } from "../opcionesHorarios/OpcionesHorarios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faSquareCheck, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import Filtros from "../../filtros/Filtros/Filtros";
import LimpiarFiltros from "../../filtros/LimpiarFiltros/LimpiarFiltros";
import { useEffect, useState } from "react";
import './HorariosOperador.css'


export const HorariosOperador = ({origen,destino,handleBuscarHorarios}) => {

    const horarios = useSelector((state) => state.user.horarios)
    const [loading, setLoading] = useState(true)
    const [filtrosOn, setFiltrosOn] = useState(false)
    const [openFiltrosModal, setOpenFiltrosModal]=useState(false)
    
    useEffect(() => {
      if (horarios.length !== 0){
        setOpenFiltrosModal(false)
        setLoading(false)
      }
      }, [horarios])
     return(
        <div>
             <h3 className="center-text">HORARIOS</h3>
             <div className="buttons-filters-conteiner">
            <Filtros origen={origen} destino={destino} setLoading={setLoading} filtrosOn={filtrosOn} setFiltrosOn={setFiltrosOn} 
            openFiltrosModal={openFiltrosModal} setOpenFiltrosModal={setOpenFiltrosModal}/>
            <LimpiarFiltros origen={origen} destino={destino} handleBuscarHorarios={handleBuscarHorarios} setLoading={setLoading} 
            filtrosOn={filtrosOn} setFiltrosOn={setFiltrosOn}/>
            </div>
             <div className="conteiner-opciones-h">
              <OpcionesHorarios/>
             </div>
             <table className="tabla">
        <thead>
          <tr>
            <th>{origen}</th>
            <th>{destino}</th>
            <th>Frecuencia</th>
            <th>Habilitado</th>
            <th>Editar</th>
            <th>Seleccionar</th>
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
      <td>
        <button className="opciones-tabla-h"><FontAwesomeIcon icon={faSquareCheck} style={{color: "#458762",}} /></button></td>
     {/* <FontAwesomeIcon icon={faSquareXmark} style={{color: "#b12533",}} /> */}
      <td> <button className="opciones-tabla-h"><FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffc107",}} /> </button>
        </td>
      <td>
                <input
                  type="checkbox"
                />
              </td>
    </tr>
  ))}
        </tbody>
      </table>
        </div>
     )       
}