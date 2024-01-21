// Importaciones
import NumeroRandom from '../../../hooks/NumeroRandom.js';

// Declaracion del objeto a retornar
let LineGr = {};

// Funcion para llenar los datos
const llenadoLinea = (datos) =>{

    // Configuracion del chart para la gráfica de tipo Barra
    LineGr = {
        type: "line",
        data: {
            labels: datos.map( dato => dato.label),
            datasets: [{
                data: datos.map( dato => dato.value),
                backgroundColor: datos.map( dato => `rgb(${NumeroRandom()},${NumeroRandom()},${NumeroRandom()})`),
                borderColor: "rgb(0,0,0)",
                borderWidth: 2,
            }],
            options:{
                scales:{
                    xAxes:[{
                        ticks:{
                            beginAtZero: true,
                        }
                    }]
                }
            }
        }
    };
    
    // Retorno de la configuracion del grafico
    return LineGr
}

// ============== Exportaciones ==============
// Exportaciones Comunes
export {
    llenadoLinea
}

// Exportaciones por defecto
export default LineGr