// Importaciones
import axios from 'axios';

// Creacion del cliente Axios
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`
})

// Exportacion
export default clienteAxios;