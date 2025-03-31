import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSquareXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import './ChangeStateSchedules.css'

export const ChangeStateSchedules = ({ isOpen, setIsOpen, selectedItems, origin, destination,
    setSelectedItems, setSelectedItemsData, selectedItemsData }) => {

    const handleEnabled = () => {
        const updatedItems = selectedItemsData.map((item) => ({
            ...item,
            enabled: !item.enabled
        }));

        for (let i = 0; i < updatedItems.length; i++) {
            dispatch(updateState(updatedItems[i]));
        }
        setSelectedItems([])
        setSelectedItemsData([])
    }

    const handleNo = () => {
        setIsOpen(false)
        setSelectedItems([])
        setSelectedItemsData([])
    }

    return (
        <Modal
            isOpen={isOpen}
            className="modal-add-s"
            overlayClassName="login-overlay">
            <div className='conteiner-delete-s'>
                <span className='span-change-s'>¿Estas seguro que desea habilitar/deshabilitar estos horarios?</span>
                <table className="tabla-change-s">
                    <thead>
                        <tr>
                            <th colSpan={3}>{origin.toUpperCase()} <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffc107", }} /> {destination.toUpperCase()}</th>
                        </tr>
                        <tr>
                            <th>Horario de salida</th>
                            <th>Horario de llegada</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems && selectedItems.length > 0 ? (
                            selectedItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.departure_time}</td>
                                    <td>{item.arrival_time}</td>
                                    <td style={{ width: "150px"}}>
                                        {item.enabled ? (
                                            <>
                                                Se deshabilitará{" "}
                                                <FontAwesomeIcon icon={faSquareXmark} style={{ color: "#e94e56", fontSize: "22px" }} />
                                            </>
                                        ) : (
                                            <>
                                                Se habilitará{" "}
                                                <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#6eaf82", fontSize: "22px" }} />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='conteiner-buttons-confirm'>
                    <button onClick={handleEnabled} className='button-no-change'>Sí, estoy seguro</button>
                    <button className='button-no-change' onClick={handleNo}>No, no estoy seguro</button>
                </div>
            </div>
        </Modal>

    )
}