import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import VerifiedSVG from "../../public/svg/VerifiedSVG.jsx";
import PublicCalification from "../cards/PublicCalification.jsx";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from '../../../config/axios.jsx'

const PublicCalificationList = ({service, setViewRatings}) => {

    // States
    const [califications, setCalifications] = useState([]);
    const [loading, setLoading] = useState(true);
    // Al renderizar el componente
    useEffect(()=>{
        const searchCalifications = async () => {
            try {
                // console.log(service);
                const { data } = await clienteAxios(`/get-rating-of-service-offering/${service.id}`)
                console.log(data);

                if (data.error) {
                    setLoading(false);
                    return
                }

                setCalifications(data.result);
                setLoading(false);

            } catch (error) {
                console.error('hubo un error al buscar las calificaciones');
                console.error(error.message);
            }
        }

        searchCalifications();
    },[]);

    return (
        <div
            className={`grid grid-cols-12 gap-4`}
        >
            <div className="col-span-full flex justify-between">
                <button
                    onClick={() => setViewRatings(false)}
                ><BsFillXCircleFill size={30} /></button>
                
                <h3 className="text-lg font-bold">
                    { service.servicio.name }
                </h3>

                <div className="flex items-center">
                    <Link 
                        to={`/inicio/usuario/${service.usuario.id}`} 
                        className='text-lg font-bold hover:underline'>
                            { service.usuario.firstName } { service.usuario.lastName }
                        </Link>
                    {
                        service.usuario.verifiedToken && (
                            <>
                                {
                                    service.usuario.verifiedAccount ? (
                                        <VerifiedSVG color={"#38A3A5"} size={"25px"}/>
                                    ):(
                                        <VerifiedSVG color={"#aaaaaa"} size={"25px"}/>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <hr className="col-span-full"/>
            {/* Lista de calificaciones */}
            <div className="col-span-full overflow-scroll h-44">
                {
                    loading ? ( <Spinner/> ):(
                        <>
                            {
                                califications.length > 0 ? (
                                    <div className="grid grid-cols-12 grid-rows-12 gap-4">
                                        {
                                            califications.map(calification => (
                                                <>
                                                    <PublicCalification 
                                                    calification={calification} 
                                                    key={calification.id}/>
                                                </>
                                            )
                                            )
                                        }
                                    </div>
                                ):(
                                    <div className="w-full h-full flex items-center justify-center">
                                        <h2 className="uppercase text-slate-500 font-bold">Aun no tiene calificaciones</h2>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default PublicCalificationList;