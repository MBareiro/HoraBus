export const validationsLogin = (property, value) =>{
    const errors = {}

    if (property === "dni") {
        if (/[a-zA-Z]/.test(value) || /[^\w\s]/.test(value)) {
            errors.dni = "El DNI debe contener solo números, sin puntos";
        }
        if(value.length > 8){
            errors.dni = "El DNI no puede contener más de 8 caracteres";
        }
        if(value.length < 8){
            errors.dni = "El DNI no puede contener menos de 8 caracteres";
        }
    }
    if(property === "password"){
        if(value.length >20){
            errors.password = "La contraseña no puede contener más de 20 caracteres"
        }
        if(value.length < 8){
             errors.password = "La contraseña no puede contener menos de 8 caracteres"
        }
    }

    return errors
}