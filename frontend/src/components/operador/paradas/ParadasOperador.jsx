import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStops, getStops } from "../../../redux/actions/operadorActions/operadorActions";
import { faSquareXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { AsociarParada } from "./AsociarParada";
import loadingGif from '../../../pictures/loading.gif'
import { QuitarParada } from "./QuitarParada";

export const ParadasOperador = ({ setOpenParadas }) => {
  const dispatch = useDispatch()
  const stops = useSelector((state) => state.operador.stops)
  const operadorData = useSelector((state) => state.operador.data)
  const myStops = useSelector((state) => state.operador.myStops)

  const [companyId, setCompanyId] = useState(null)
  const [myStopsState, setMyStopsState] = useState([])
  const [loading, setLoading] = useState(true);
  const [stopData, getStopsData] = useState({})
  const [showLoadingGif, setShowLoadingGif] = useState(false)

  useEffect(() => {
    setCompanyId(operadorData.company_id)
    dispatch(getMyStops(operadorData.company_id))
  }, [operadorData])

  useEffect(() => {
    if (myStops.length > 0) {
      setLoading(false);
    }
    setMyStopsState(myStops)
  }, [myStops]);

  useEffect(() => {
    if (myStopsState.length > 0) {
      setShowLoadingGif(false)
    }
  }, [myStops])


  return (
    <div className="conteiner-hor-op">
      <div className='button-login-conteiner'>
        <button onClick={() => setOpenParadas(false)} className='button-close'>
          <FontAwesomeIcon icon={faXmark} />
        </button>

      </div>
      <h2 className="center-text">PARADAS</h2>
      {showLoadingGif && !myStopsState.length ? <div className="loading-container-op">
        <img src={loadingGif} alt="Cargando..." className="loading-gif" />
      </div> :
        <table className="tabla">
          <thead>
            <tr>
              <th>Paradas</th>
              <th>Mis Paradas</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {stops && [...stops].
              sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (

                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {loading ? (
                      <span>Cargando...</span>
                    ) : (
                      myStops.some((stop) => stop.id === item.id) ? (
                        <FontAwesomeIcon
                          icon={faSquareCheck}
                          style={{ color: "#6eaf82", fontSize: "24px" }}
                        />
                      ) : !myStops.some((stop) => stop.id === item.id) && (
                        <FontAwesomeIcon
                          icon={faSquareXmark}
                          style={{ color: "#e94e56", fontSize: "24px" }}
                        />
                      )
                    )}
                  </td>
                  <td>
                    {myStops.some((stop) => stop.id === item.id) ?

                      <QuitarParada company_id={companyId} stop_id={item.id} 
                      setShowLoadingGif={setShowLoadingGif}/>
                      :

                      <AsociarParada company_id={companyId} stop_id={item.id} setLoading={setLoading}
                        setShowLoadingGif={setShowLoadingGif} setMyStopsState={setMyStopsState} />

                    }

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      }

    </div>
  )
}