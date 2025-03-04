import Modal from 'react-modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import './EditDataOp.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperadorData } from '../../../redux/actions/operadorActions/operadorActions';
import { ConfirmSaveChanges } from './ConfirmSaveChanges';


export const EditDataOp = ({openModalEdit, setOpenModalEdit}) => {
const operadorData = useSelector((state)=> state.operador.data)
const dispatch = useDispatch()

  const [operatorId, setOperatorId] = useState(() => {
    const authData = JSON.parse(localStorage.getItem("auth")); 
    return authData?.userId || null;
});

const [opDataState, setOpDataState] = useState({
  name: "",
  dni: "",
  email: ""
})

const [openConfirmChanges, setOpenConfirmChanges] = useState(false)

useEffect(() => {
  if (operadorData) {
    setOpDataState({
      name: operadorData.name || "",
      dni: operadorData.dni || "",
      email: operadorData.email || ""
    });
  }
}, [operadorData]);

  const handleCloseModal = () => {
    if(
      opDataState.name !== operadorData.name ||
      opDataState.dni !== operadorData.dni ||
      opDataState.email !== operadorData.email
    ){
      setOpenConfirmChanges(true)
    } else{
      setOpenModalEdit(false)
    }
  }

  useEffect(() =>{
dispatch(getOperadorData(operatorId))
  }, [])


  const handleChange = (e) => {
    setOpDataState({
      ...opDataState,
      [e.target.name]: e.target.value
    });
  };

  const handleClickSaveChanges = () => {
    setOpenConfirmChanges(true)
  }

  console.log(opDataState)
    return(
      <Modal
      isOpen={openModalEdit}
      className="modal-edit-data"
      overlayClassName="login-overlay">
        <div className='conteiner-form-edit'>
          <div className='button-close-conteiner'>
                          <button onClick={handleCloseModal} className='button-close-edit'>
                                          <FontAwesomeIcon icon={faXmark}/>
                          </button>
                          </div>
          <h2 className='h2-op-edit'>ROL OPERADOR</h2>
          <label className="label-email-edit">NOMBRE</label>
          <input className='input-edit' type="text" 
          name="name" id="name"
          value={opDataState.name} onChange={handleChange}></input>
         <label className="label-email-edit">DNI</label>
         <input className='input-edit' type="text" value={opDataState.dni}  onChange={handleChange}
          name="dni" id="dni"></input>
          <form className='form-edit'>
            <label className="label-email-edit">EMAIL</label>
            <input   className='input-edit' value={opDataState.email}  onChange={handleChange}
            name='email' id="email"></input>
            <button className='button-change-p'  type="button">CAMBIAR CONTRASEÑA</button>
          </form>
          <button className='button-guardar-cambios' onClick={handleClickSaveChanges}>GUARDAR CAMBIOS</button>
        </div>
        <ConfirmSaveChanges setOpenConfirmChanges={setOpenConfirmChanges} openConfirmChanges={openConfirmChanges}
        operatorId={operatorId} operadorData={operadorData} opDataState={opDataState}/>
 
     </Modal>
    )
}