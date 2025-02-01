import { useSelector } from "react-redux"


export const HorariosOperador = () => {
    const horarios = useSelector((state) => state.user.horarios)
     return(
        <div>
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
        {horarios
        .slice() // Crea una copia para evitar mutar el estado original
        .sort((a, b) => a.departure_time.localeCompare(b.departure_time)) // Ordena por departure_time
        .map((item) => (
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