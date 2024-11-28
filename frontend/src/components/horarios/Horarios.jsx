import { useSelector } from "react-redux"
const Horarios = ({origen, destino}) => {

const horarios = useSelector((state) => state.user.horarios)
    return (
        <div>
            <h3>HORARIOS</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>{origen}</th>
            <th>{destino}</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((item) => (
            <tr key={item.id}>
              <td>{item.departure_time}</td>
              <td>{item.departure_time}</td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
    )
}

export default Horarios