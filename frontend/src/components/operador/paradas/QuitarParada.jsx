import { useDispatch } from "react-redux"
import { quitarStop } from "../../../redux/actions/operadorActions/operadorActions"


export const QuitarParada = ({company_id, stop_id, setShowLoadingGif}) => {

const dispatch = useDispatch()

    const handleQuitarStop = () =>{
        setShowLoadingGif(true)
        dispatch(quitarStop(company_id, stop_id))
    }

    return(
     <div>
        <button onClick={handleQuitarStop} className="button-add-withdraw"> QUITAR</button>
     </div>
    )
}