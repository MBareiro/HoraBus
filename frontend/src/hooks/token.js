export const getToken = () => {
    const auth = localStorage.getItem("auth");

    if (!auth) return null;

    const parsedAuth = JSON.parse(auth); 
    return parsedAuth.token; 
};
