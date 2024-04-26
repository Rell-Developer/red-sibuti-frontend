// Importaciones
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../config/axios.jsx";
import dateTransform from "../../../hooks/dateTransform.js";

const ServicesList = () => {
    // useStates
    const [services, setServices] = useState([]);
    // useEffect
    useEffect(() => {
        const searchServices = async () => {
            try {
                let { data } = await clienteAxios("/get-services");
                // console.log(data);
                setServices(data.result);
            } catch (error) {
                console.error(error.message);
            }
        };

        searchServices();
    }, [])
    // 
    const navigate = useNavigate();

    // Retorno
    return (
        <>
            <div className="w-full my-5">
                <div className="w-full flex flex-col text-center uppercase font-bold my-4 justify-center">
                    <h2 className="text-3xl flex self-center">Servicios</h2>

                    <button 
                        className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full text-md flex self-start"
                        onClick={(e) => navigate("/inicio/control/servicios/nuevo")}
                        >Crear Servicio</button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center overflow-scroll" style={{"height":"75vh"}}>
                    <div className="col-span-4 grid grid-cols-4 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-2">
                            <p>Nombre</p>
                        </div>
                        <div className="col-span-2">
                            <p>Fecha de Creación</p>
                        </div>
                    </div>
                    {
                        services.length > 0 ? (
                            <>
                                {services.map( (service,index) => (
                                    <>
                                        <div 
                                            className="col-span-4 grid grid-cols-4 gap-4 bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition-all" 
                                            onClick={() => navigate(`/inicio/control/servicios/${service.id}`)}
                                        >
                                            <p className="col-span-2">{service.name}</p>
                                            <p className="col-span-2">{dateTransform(service.createdAt)}</p>
                                        </div>
                                    </>
                                ))}
                            </>
                        ):(
                            <div>
                                <h3>
                                    No hay servicios registrados
                                </h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ServicesList;