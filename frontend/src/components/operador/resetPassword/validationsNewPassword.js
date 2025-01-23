export const validationsNewPassword = (property, value) =>{
    const errors = {}

    if(property === "newPassword"){
        if(value.length >20){
            errors.newPassword = "La contraseña no puede contener más de 20 caracteres"
        }
        if(value.length < 8){
             errors.newPassword = "La contraseña no puede contener menos de 8 caracteres"
        }
    }

    return errors
}