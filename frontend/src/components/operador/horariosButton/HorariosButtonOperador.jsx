import Select from "../../select/Select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import './HorariosButtonOperador.css'
import { SelectOperador } from "../SelectOperador/SelectOperador";

export const HorariosButtonOperador = ({setOpenHorarios}) =>{

    return(
        <div className="conteiner-hor-op">
            <div className='button-login-conteiner' >
            <button className='button-close' onClick={() => setOpenHorarios(false)}>
                                <FontAwesomeIcon icon={faXmark}/>
            </button>
            </div>
        <SelectOperador/>
        </div>
    )
}