import { useSelector } from "react-redux"
import './Horarios.css';
import { useEffect, useState } from "react";
import loadingGif from '../../pictures/loading.gif'

const Horarios = ({origen, destino}) => {
  console.log(origen, destino)

const horarios = useSelector((state) => state.user.horarios)
const [loading, setLoading] = useState(true)

useEffect(() => {
  if (horarios.length !== 0){
    setLoading(false)
  }
  }, [horarios])
  

    return (
        <div className="horariosConteiner">
            <h3 className="center-text">HORARIOS</h3>

            {loading ? 
            <div className="loading-container">
            <img src={loadingGif} alt="Cargando..." className="loading-gif" />
          </div>
          :

      <table className="tabla">
        <thead>
          <tr>
            <th>{origen}</th>
            <th>{destino}</th>
            <th>Frecuencia</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((item) => (
            <tr key={item.id}>
              <td>{item.departure_time}</td>
              <td>{item.arrival_time}</td>
              <td>{item.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
}

        </div>
    )
}

export default Horarios