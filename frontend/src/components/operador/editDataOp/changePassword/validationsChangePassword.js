export const validationsChangePassword = (name, value, newPassword) => {
    let errors = {};
  
    if (name === "currentPassword" && value.length < 6) {
      errors.currentPassword = "La contraseña actual debe tener al menos 6 caracteres";
    }
  
    if (name === "newPassword" && value.length < 6) {
      errors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres";
    }
  
    if (name === "confirmPassword" && value !== newPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  
    return errors;
  };