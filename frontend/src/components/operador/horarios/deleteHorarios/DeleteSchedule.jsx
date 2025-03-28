import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { deleteSchedule } from '../../../../redux/actions/operadorActions/operadorActions';
import './DeleteSchedule.css'

export const DeleteSchedule = ({ setIsOpen, isOpen, selectedItems, origin, destination,
    setSelectedItems, setSelectedItemsData, selectedItemsData
}) => {

    console.log(selectedItems)

    const dispatch = useDispatch()

    const handleDelete = () => {
        for (let i = 0; i < selectedItems.length; i++) {
            dispatch(deleteSchedule(selectedItems[i].id));
        }
        setSelectedItems([])
        setSelectedItemsData([])

        setIsOpen(false)
    }

    const handleNoDelete = () =>{
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
                <div className='conteiner-button-close-es'>
                    <button className='button-close' onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <span className='span-delete-s'>¿Estas seguro que desea eliminar los siguientes horarios?</span>
                <table  className="tabla-delete">
                    <thead>
                        <tr>
                            <th>{origin.toUpperCase()}</th>
                            <th>{destination.toUpperCase()}</th>
                        </tr>
                        <tr>
                        <th>Horario de salida</th>
                        <th>Horario de llegada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.departure_time}</td> 
                                <td>{item.arrival_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='conteiner-buttons-confirm'>
                <button onClick={handleDelete} className='button-no'>SI</button>
                <button className='button-no' onClick={handleNoDelete}>NO</button>
                </div>
                
            </div>
        </Modal>
    )
}