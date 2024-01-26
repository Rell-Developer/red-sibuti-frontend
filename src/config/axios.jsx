// Importaciones
import axios from 'axios';

// Creacion del cliente Axios
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`
});
// Funcion para crear la configuracion de usuarios
const configAuth = token => {
    // Si no trae el token
    if (!token) {
        // Busqueda de los datos del usuario
        let user = sessionStorage.getItem("user");
        // Si no existe, retornamos el fallo
        if (!user || JSON.parse(user)) {
            return { error: true, message:"Token invalido o inexistente" }
        }
        // Asignamos el token
        token = JSON.parse(user).authToken;
    }
    // Retornamos la configuracion para autenticacion de usuarios
    return {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
};



// Exportacion
export default clienteAxios;
// Exportamos la funcion
export { configAuth }