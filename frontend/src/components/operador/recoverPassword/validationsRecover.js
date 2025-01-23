export const validationsRecover = (property, value) =>{
    const errors = {}

    if(property === "dni"){
        if(value.length > 8){
            errors.dni = "El DNI no puede contener más de 8 caracteres";
        }
        if(value.length < 8){
            errors.dni = "El DNI no puede contener menos de 8 caracteres";
        }
        if (/[a-zA-Z]/.test(value) || /[^\w\s]/.test(value)) {
            errors.dni = "El DNI debe contener solo números, sin puntos";
        }
    }

    return errors
}