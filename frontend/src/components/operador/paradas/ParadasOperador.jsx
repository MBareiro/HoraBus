import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

export const ParadasOperador = ({setOpenParadas}) => {


    return (
        <div>
            <div>
                <button onClick={() => setOpenParadas(false)} className='button-close'>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <h2>PARADAS</h2>
                <ul>
                    <li>Elemento 1</li>
                    <li>Elemento 2</li>
                    <li>Elemento 3</li>
                    </ul>
            </div>
            <div>
                <h2>
                    MIS PARADAS
                </h2>
            </div>
        </div>
    )
}