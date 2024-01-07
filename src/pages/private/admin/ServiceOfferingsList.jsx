// Importaciones
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../config/axios.jsx";
import dateTransform from "../../../hooks/dateTransform.js";

const ServiceOfferingsList = () => {
    // useStates
    const [serviceOfferings, setServiceOfferings] = useState([]);
    // useEffect
    useEffect(() => {
        const searchServiceOfferings = async () => {
            try {
                let { data } = await clienteAxios("/get-service-offerings");
                console.log(data);
                setServiceOfferings(data.result);
            } catch (error) {
                console.error(error.message);
                setServiceOfferings([]);
            }
        };

        searchServiceOfferings();
    }, [])
    // 
    const navigate = useNavigate();

    // Retorno
    return (
        <>
            <div className="w-full my-5">
                <div className="w-full flex flex-col text-center uppercase font-bold my-4 justify-center">
                    <h2 className="text-3xl flex self-center">Ofertas de Servicios</h2>

                    <button 
                        className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full text-md flex self-start"
                        onClick={(e) => navigate("/inicio/control/oferta-servicios/nuevo")}
                        >Crear Oferta de Servicio</button>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center overflow-scroll">
                    <div className="col-span-full grid grid-cols-6 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-2">
                            <p>Servicio</p>
                        </div>
                        <div className="col-span-2">
                            <p>Ofertado Por</p>
                        </div>
                        <div className="col-span-2">
                            <p>Fecha de Creación</p>
                        </div>
                    </div>
                    {
                        serviceOfferings.length > 0 ? (
                            <>
                                {serviceOfferings.map( (oferta,index) => (
                                    <>
                                        <div 
                                            className="col-span-full grid grid-cols-6 gap-4 bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition-all" 
                                            onClick={() => navigate(`/inicio/control/oferta-servicios/${oferta.id}`)}
                                        >
                                            <p className="col-span-2">{oferta.servicio.name}</p>
                                            <p className="col-span-2">{oferta.usuario.firstName} {oferta.usuario.lastName}</p>
                                            <p className="col-span-2">{dateTransform(oferta.createdAt)}</p>
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

export default ServiceOfferingsList;