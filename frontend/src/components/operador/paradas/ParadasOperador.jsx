import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

export const ParadasOperador = ({setOpenParadas}) => {


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
                                  <th>Seleccionar</th>
                                </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>
                                        <input type="checkbox" />
                                      </td>
                                    </tr>
                              </tbody>
                            </table>
              
        </div>
    )
}