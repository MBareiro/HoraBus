import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStops, getStops } from "../../../redux/actions/operadorActions/operadorActions";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";

export const ParadasOperador = ({setOpenParadas}) => {
const dispatch = useDispatch()
const stops = useSelector((state) => state.operador.stops)
const operadorData = useSelector ((state) => state.operador.data)

const [companyId, setCompanyId] = useState(null)

useEffect(() =>{
setCompanyId(operadorData.company_id)
dispatch(getMyStops(operadorData.company_id))
console.log(operadorData)
}, [operadorData])


    return (
        <div className="conteiner-hor-op">
            <div className='button-login-conteiner'>
            <button onClick={() => setOpenParadas(false)} className='button-close'>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>

            </div>
                <h2 className="center-text">PARADAS</h2>
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
                                sort((a,b)=>a.name.localeCompare(b.name))
                                .map((item)=>(
                                    <tr key={item.id}>
                                      <td>{item.name}</td>
                                      <td><FontAwesomeIcon icon={faSquareXmark} style={{color: "#e94e56",}} /></td>
                                      <td>
                                        <button>AGREGAR</button>
                                      </td>
                                    </tr>
                                    ))}
                              </tbody>
                            </table>
              
        </div>
    )
}