// Importaciones
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../config/axios.jsx";
import dateTransform from "../../../hooks/dateTransform.js";

const RatingsList = () => {
    // useStates
    const [ratings, setRatings] = useState([]);
    // useEffect
    useEffect(() => {
        const searchRatings = async () => {
            try {
                let { data } = await clienteAxios("/get-ratings");
                // console.log(data);
                setRatings(data.result);
            } catch (error) {
                console.error(error.message);
                setRatings([]);
            }
        };

        searchRatings();
    }, [])
    // 
    const navigate = useNavigate();

    // Retorno
    return (
        <>
            <div className="w-full my-5">
                <div className="w-full flex flex-col text-center uppercase font-bold my-4 justify-center">
                    <h2 className="text-3xl flex self-center">Calificaciones</h2>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center overflow-scroll">
                    <div className="col-span-full grid grid-cols-10 gap-4 bg-white rounded shadow p-4 font-bold uppercase">
                        <div className="col-span-2">
                            <p>Servicio</p>
                        </div>
                        <div className="col-span-2">
                            <p>Ofertante</p>
                        </div>
                        <div className="col-span-2">
                            <p>Calificado Por</p>
                        </div>
                        <div className="col-span-2">
                            <p>Fecha de Inicio del Acuerdo</p>
                        </div>
                        <div className="col-span-2">
                            <p>Fecha Fin del Acuerdo</p>
                        </div>
                    </div>
                    {
                        ratings.length > 0 ? (
                            <>
                                {ratings.map( (rating,index) => (
                                    <>
                                        <div 
                                            className="col-span-full grid grid-cols-10 gap-4 bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition-all" 
                                            onClick={() => navigate(`/inicio/control/calificaciones/${rating.id}`)}
                                        >
                                            <p className="col-span-2">{rating.agreement.service_offering.servicio.name}</p>
                                            <p className="col-span-2">{rating.agreement.service_offering.usuario.firstName} {rating.agreement.service_offering.usuario.lastName}</p>
                                            <p className="col-span-2">{rating.usuario.firstName} {rating.usuario.lastName}</p>
                                            <p className="col-span-2">{dateTransform(rating.agreement.start_date)}</p>
                                            <p className="col-span-2">{dateTransform(rating.agreement.finish_date)}</p>
                                        </div>
                                    </>
                                ))}
                            </>
                        ):(
                            <div>
                                <h3>
                                    No hay calificaciones registradas
                                </h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default RatingsList;