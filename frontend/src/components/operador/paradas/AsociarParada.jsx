import { useDispatch } from "react-redux"
import { asociarStop } from "../../../redux/actions/operadorActions/operadorActions"


export const AsociarParada = ({ company_id, stop_id, setLoading, setShowLoadingGif,
    setMyStopsState
 }) => {
    const dispatch = useDispatch()

    const handleAsociarStops = () => {
        setShowLoadingGif(true)
        setMyStopsState([])
        dispatch(asociarStop(company_id, stop_id))
        setLoading(true)
    }

    return (
        <div>
            <button onClick={handleAsociarStops}>AGREGAR</button>
        </div>
    )
}