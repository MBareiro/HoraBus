import { useDispatch, useSelector } from "react-redux"
import { OpcionesHorarios } from "../opcionesHorarios/OpcionesHorarios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faSquareCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Filtros from "../../filtros/Filtros/Filtros";
import LimpiarFiltros from "../../filtros/LimpiarFiltros/LimpiarFiltros";
import { useEffect, useState } from "react";
import './HorariosOperador.css'
import loadingGif from '../../../pictures/loading.gif'
import { EditarHorarios } from "./editarHorarios/EditarHorarios";

export const HorariosOperador = ({ origen, destino, handleBuscarHorarios, addScheduleModal,
  setAddScheduleModal, companyId, addingState, setAddingState, setOpenEmptySchedules
}) => {


  const horarios = useSelector((state) => state.operador.schedules)


  const [loading, setLoading] = useState(true)
  const [filtrosOn, setFiltrosOn] = useState(false)
  const [openFiltrosModal, setOpenFiltrosModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [horario, setHorario] = useState(null)
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsData, setSelectedItemsData] = useState([])
  const [deletingState, setDeletingState] = useState(false)
  const [changingState, setChangingState] = useState(false)
  const [editingState, setEditingState] = useState(false)
  const [editingRow, setEditingRow] = useState(null);


  useEffect(() => {
    if (horarios.length !== 0) {
      setOpenFiltrosModal(false)
      setLoading(false)
    }
    setAddingState(false)
    setDeletingState(false)
    setChangingState(false)
    setEditingState(false)
    setEditingRow(null)
  }, [horarios])


  const handleEdit = (item) => {
    setHorario(item)
    setOpenModalEdit(true)
  }

  const handleCheckboxChange = (id) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems((prev) => [...prev, id]);
      setSelectedItemsData((prev) => [...prev, horarios.find((horario) => horario.id === id)])
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };
  return (
    changingState || deletingState || loading ? (
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
            setSelectedItemsData={setSelectedItemsData} selectedItems={selectedItems}
            addScheduleModal={addScheduleModal} setAddScheduleModal={setAddScheduleModal}
            addingState={addingState} setAddingState={setAddingState} setDeletingState={setDeletingState}
            setChangingState={setChangingState} setOpenEmptySchedules={setOpenEmptySchedules} />
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

                editingRow === item.id && editingState ? (

                  <tr key={item.id}>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      <img src={loadingGif} alt="Cargando..." className="loading-gif" style={{ width: "40px", height: "40px" }} />
                    </td>
                  </tr>
                ) 
                : 
                (
                  <tr key={item.id}>
                    <td>{item.departure_time}</td>
                    <td>{item.arrival_time}</td>
                    <td>
                      <select className="select-state">
                        <option value="on-time">A tiempo</option>
                        <option value="delayed">Demorado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                    <td>{item.frequency}</td>
                    <td>
                      {item.enabled ? (

                        <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#6eaf82", fontSize: "26px" }} />
                      ) 
                      : 
                      (
                        <FontAwesomeIcon icon={faSquareXmark} style={{ color: "#e94e56", fontSize: "26px" }} />
                      )}
                    </td>
                    <td>
                      <button className="opciones-tabla-h" onClick={() => handleEdit(item)}>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#ffc107", fontSize: "22px" }} />
                      </button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                      />
                    </td>
                  </tr>
                )
              ))}

            {addingState && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <img src={loadingGif} alt="Cargando..." className="loading-gif" style={{ width: "40px", height: "40px" }} />
                </td>
              </tr>
            )}
          </tbody>

        </table>
        {openModalEdit && (
          <EditarHorarios
            isOpen={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            origin={origen}
            destination={destino}
            horario={horario}
            setEditingRow={setEditingRow}
            setEditingState={setEditingState}
          />
        )}
      </div>
    )
  );
}