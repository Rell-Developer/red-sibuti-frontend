// Importaciones
import axios from 'axios';

// Creacion del cliente Axios para DPT (Division Politico Territorial / API VENEZUELA)
const DPTaxios = axios.create({
    baseURL: `${import.meta.env.VITE_DPT_URL}/api/`,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

// Logeo a la API
const DPTUserLogin = async () => await DPTaxios.post('v1/login',{
    usuario: import.meta.env.VITE_DPT_USER,
    clave: import.meta.env.VITE_DPT_PASSWORD
});

// Exportacion
// Por defecto se exporta el cliente para futuras peticiones a la api
export default DPTaxios;
// Se exporta la funcion del logeo para obtener sus propiedades
export {
    DPTUserLogin
}