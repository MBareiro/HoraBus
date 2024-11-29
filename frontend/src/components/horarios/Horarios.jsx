import { useSelector } from "react-redux"
import './Horarios.css';

const Horarios = ({origen, destino}) => {
  console.log(origen, destino)

const horarios = useSelector((state) => state.user.horarios)
    return (
        <div className="horariosConteiner">
            <h3 className="center-text">HORARIOS</h3>
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

        </div>
    )
}

export default Horarios