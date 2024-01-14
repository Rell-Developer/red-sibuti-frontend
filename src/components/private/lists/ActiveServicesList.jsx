// Importaciones
import { useState, useEffect} from 'react'
import clienteAxios from '../../../config/axios.jsx';
import ActiveServiceOffering from '../cards/ActiveServiceOffering.jsx';
import Spinner from '../../public/Spinner.jsx';
// Listado de ofertas de servicios
const ActiveServicesList = () => {
    // States
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    // Al renderizar el listado
    useEffect(()=> {
        const searchServices = async () => {
            try {
                // Buscamos las ofertas de oferta de servicios
                const { data } = await clienteAxios("/get-service-offerings");
                // console.log(data);
                setServices(data.result);
                setLoading(false);
            } catch (error) {
                console.log("Hubo un error al buscar los servicios");
                console.log(error.message);
            }
        }

        searchServices();
    },[])
    return (
        <>
            {/* Vista de servicios */}
            <div className="w-full col-span-2 flex flex-col" style={{height: "91vh"}}>
                {/* Buscador */}
                {/* <div className="w-full">
                    <div className="w-full mt-5 mx-auto bg-color4 rounded-xl shadow-lg p-5">
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            className="p-3 rounded-full w-full font-bold border-2 border-color2" 
                            placeholder="ESCRIBA LO QUE QUIERA BUSCAR"/>
                    </div>
                </div> */}
                {/* Resultados de los servicios*/}
                <div className="w-full overflow-scroll h-full">
                    {
                        loading ? (<Spinner/>) :(
                            <>
                                {
                                    services.length > 0 ? (
                                        <div className='grid grid-cols-12 grid-rows-12 gap-4 p-5 transition-all'>
                                            {
                                                services.map( serv => <ActiveServiceOffering service={serv}/>)
                                            }
                                        </div>
                                    ):(
                                        <div className='flex justify-center items-center self-center h-full text-center uppercase'>
                                            No hay servicios registrados
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
// Exportacion
export default ActiveServicesList;