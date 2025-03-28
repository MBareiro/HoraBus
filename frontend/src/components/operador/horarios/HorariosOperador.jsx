import { useSelector } from "react-redux"
import { OpcionesHorarios } from "../opcionesHorarios/OpcionesHorarios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faSquareCheck, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import Filtros from "../../filtros/Filtros/Filtros";
import LimpiarFiltros from "../../filtros/LimpiarFiltros/LimpiarFiltros";
import { useEffect, useState } from "react";
import './HorariosOperador.css'
import loadingGif from '../../../pictures/loading.gif'
import { EditarHorarios } from "./editarHorarios/EditarHorarios";

export const HorariosOperador = ({ origen, destino, handleBuscarHorarios }) => {

  const horarios = useSelector((state) => state.operador.schedules)
  const operatorData = useSelector((state) => state.operador.data)

  const [loading, setLoading] = useState(true)
  const [filtrosOn, setFiltrosOn] = useState(false)
  const [openFiltrosModal, setOpenFiltrosModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [horario, setHorario] = useState(null)
  const [companyId, setCompanyId] = useState(null)
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsData, setSelectedItemsData] = useState([])


  useEffect(() => {
    if (horarios.length !== 0) {
      setOpenFiltrosModal(false)
      setLoading(false)
    }
  }, [horarios])

  
  useEffect(()=>{
    setCompanyId(operatorData.company_id)
      }, [operatorData])    


  const handleEdit = (item) => {
    setHorario(item)
    setOpenModalEdit(true)
  }

  const handleCheckboxChange = (id) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems((prev) => [...prev, id]);
      setSelectedItemsData(horarios.filter((horario) => horario.id === id))
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    loading ? (
      <div className="loading-container-op">
        <img src={loadingGif} alt="Cargando..." className="loading-gif" />
      </div>
    ) : (
      <div>
        <h3 className="center-text">HORARIOS</h3>
        <div className="buttons-filters-conteiner">
          <Filtros
            origen={origen}
            destino={destino}
            setLoading={setLoading}
            filtrosOn={filtrosOn}
            setFiltrosOn={setFiltrosOn}
            openFiltrosModal={openFiltrosModal}
            setOpenFiltrosModal={setOpenFiltrosModal}
          />
          <LimpiarFiltros
            origen={origen}
            destino={destino}
            handleBuscarHorarios={handleBuscarHorarios}
            setLoading={setLoading}
            filtrosOn={filtrosOn}
            setFiltrosOn={setFiltrosOn}
          />
        </div>
        <div className="conteiner-opciones-h">
          <OpcionesHorarios company_id={companyId} origin={origen} destination={destino}
          selectedItemsData={selectedItemsData} setSelectedItems={setSelectedItems}
          setSelectedItemsData={setSelectedItemsData}/>
        </div>
        <table className="tabla">
          <thead>
            <tr>
              <th>{origen}</th>
              <th>{destino}</th>
              <th>Estado</th>
              <th>Frecuencia</th>
              <th>Habilitado</th>
              <th>Editar</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {horarios
              .slice()
              .sort((a, b) => a.departure_time.localeCompare(b.departure_time))
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.departure_time}</td>
                  <td>{item.arrival_time}</td>
                  <td>
                    <select className="select-state">
                      <option value="on-time">A tiempo</option>
                      <option value="delayed">Demorado</option>
                      <option value="cancelled">Cancelado</option>
                    </select></td>

                  <td>{item.frequency}</td>
                  <td>
                    {item.enabled ?
                    <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#6eaf82", fontSize: "26px" }} /> :
                    <FontAwesomeIcon
                    icon={faSquareXmark}
                    style={{ color: "#e94e56", fontSize: "26px" }}
                  />
                    }
                  </td>
                  <td key={item.id}>
                    <button className="opciones-tabla-h"
                      onClick={() => handleEdit(item)}>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffc107", fontSize: "22px" }} />
                    </button>

                  </td>
                  <td>
                    <input type="checkbox" checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {openModalEdit && (
          <EditarHorarios
            isOpen={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            origin={origen}
            destination={destino}
            horario={horario}
          />
        )}
      </div>
    )
  );
}