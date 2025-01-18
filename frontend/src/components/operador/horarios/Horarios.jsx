import Select from "../../select/Select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

export const Horarios = ({setOpenHorarios}) =>{
    return(
        <div>
            <button className='button-close' onClick={() => setOpenHorarios(false)}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
            <div>
            <Select/>
            </div>
        </div>
    )
}