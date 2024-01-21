// Importaciones
// import { Chart } from "chart.js/auto";
import NumeroRandom from '../../../hooks/NumeroRandom.js';

let TortaGr = {};

// Funcion para llenar los datos
const llenadoTorta = (datos) =>{
    TortaGr = {
        type: "pie",
        data: {
            labels: datos.map( dato => dato.label),
            datasets: [{
                data: datos.map( dato => dato.value),
                backgroundColor: datos.map( dato => `rgb(${NumeroRandom()},${NumeroRandom()},${NumeroRandom()})`),
            }]
        }
    };
    
    return TortaGr
}

export {
    llenadoTorta
}

export default TortaGr