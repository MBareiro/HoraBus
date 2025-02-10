import './CerrarSesion.css'

export const CerrarSesion = () => {

const handleLogOut = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
}
    return(
        <div>
            <button onClick={handleLogOut} className="button-logOut">CERRAR SESION</button>
        </div>
    )
}