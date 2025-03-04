import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import "./UserPanelOp.css"; // Importamos los estilos
import { EditDataOp } from "../editDataOp/EditDataOp";

export const UserPanelOp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const handleLogOut = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
}

const handleOpenModalEdit = () => {
  setOpenModalEdit(true)
}


  return (
    <div className="user-panel">
      <button className="user-button" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faUserGear} style={{ color: "#fecc26" }} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li className="op-li" onClick={handleOpenModalEdit}>Modificar Datos</li>
            <li className="op-li" onClick={handleLogOut}>Cerrar Sesión</li>
          </ul>
        </div>
      )}
      <EditDataOp openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} />
    </div>
  );
};
