// Importaciones
import NumeroRandom from '../../../hooks/NumeroRandom.js';

// Declaracion del objeto a retornar
let BarGr = {};

// Funcion para llenar los datos
const llenadoBarra = (datos) =>{

    // Configuracion del chart para la gráfica de tipo Barra
    BarGr = {
        type: "bar",
        data: {
            labels: datos.map( dato => dato.label),
            datasets: [{
                data: datos.map( dato => dato.value),
                backgroundColor: datos.map( dato => `rgb(${NumeroRandom()},${NumeroRandom()},${NumeroRandom()})`),
                borderColor: "rgb(0,0,0,.1)",
                borderWidth: 2,
                options:{
                    scales:{
                        yAxes:[{
                            ticks:{
                                beginAtZero: true,
                            }
                        }]
                    }
                }
            }]
        }
    };
    
    // Retorno de la configuracion del grafico
    return BarGr
}

// ============== Exportaciones ==============
// Exportaciones Comunes
export {
    llenadoBarra
}

// Exportaciones por defecto
export default BarGr