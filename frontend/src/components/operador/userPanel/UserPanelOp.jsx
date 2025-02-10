import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import "./UserPanelOp.css"; // Importamos los estilos

export const UserPanelOp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-panel">
      <button className="user-button" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faUserGear} style={{ color: "#fecc26" }} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li className="op-li">Modificar Datos</li>
            <li className="op-li">Cerrar Sesión</li>
          </ul>
        </div>
      )}
    </div>
  );
};
