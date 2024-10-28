import { useState } from 'react'

function Select () {

    const [origen, setOrigen] = useState(''); 
    const [destino, setDestino] = useState('');

const handleDestinoChange = (event) =>{

}
const handleOrigenChange = (event) =>{

}

return (
    <div>
        
    <select className="selector" id="origen" value={origen} onChange={handleOrigenChange} >
        <option value="" disabled selected>ORIGEN</option>
        <option value="capiovi">Capioví</option>
        <option value="puerto_rico">Puerto Rico</option>
    </select>
    
    <select className="selector" id="destino" value={destino} onChange={handleDestinoChange}>
        <option value="" disabled selected>DESTINO</option>
        <option value="capiovi">Capioví</option>
        <option value="puerto_rico">Puerto Rico</option>
    </select>
    
    <button className="selector">BUSCAR</button>
</div>

)
}

export default Select;