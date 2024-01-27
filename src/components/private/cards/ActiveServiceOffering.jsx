// Importaciones
import { useState } from "react";
import { Link } from "react-router-dom";
import VerifiedSVG from '../../public/svg/VerifiedSVG.jsx';
import PublicCalificationList from "../lists/PublicCalificationList.jsx";
// Componente de Oferta de Servicio
const ActiveServiceOffering = ({service}) => {
    // states
    const [viewService, setViewService] = useState(false);
    const [viewRatings, setViewRatings] = useState(false);

    return (
        <div 
            className={`
                bg-white border border-color4 shadow-lg rounded-lg p-5 text-center transition-all transform
                h-72 col-span-full 
                ${viewRatings ? `lg:col-span-full row-span-2`: `${viewService ? "lg:col-span-6 cursor-pointer overflow-scroll":"lg:col-span-4 cursor-pointer overflow-scroll row-span-1"}`}
            `}
            onClick={() => setViewService(!viewService)}
        >
            {/* Si no estan viendo las calificaciones */}
            { !viewRatings ? (
                <div
                    className={`grid grid-cols-12 gap-4`}
                >
                    <div className={`
                        ${viewService ? "col-span-4":"col-span-full"}
                    `}>
                        <Link
                            to={`/inicio/usuario/${service.usuario.id}`}
                        >
                            <img 
                                src={ service.usuario.imgProfile ? `${import.meta.env.VITE_BACKEND_PUBLIC_IMAGES}${service.usuario.imgProfile}`:"/public/img/generic-user.png"}
                                alt="profile-img" 
                                width={"80"} 
                                style={{height:"80px"}}
                                className='rounded-full border-color4 border-2 my-2 mx-auto hover:shadow-lg hover:border-4 transition-all'
                            />
                        </Link>
                    </div>
                    <div className={` flex justify-center flex-col
                        ${viewService ? "col-span-8":"col-span-full"}
                    `}>
                        <div className='flex justify-center'>
                            <h3 className='text-lg font-bold'>{ service.usuario.firstName } { service.usuario.lastName }</h3>
                            {
                                service.usuario.verifiedToken && (
                                    <>
                                        {
                                            service.usuario.verifiedAccount ? (
                                                <VerifiedSVG color={"#38A3A5"} size={"30px"}/>
                                            ):(
                                                <VerifiedSVG color={"#aaaaaa"} size={"30px"}/>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div className='font-bold flex justify-around my-2'>
                            <p className='font-bold flex flex-col'>
                                Servicio { '' }
                                <span className='font-normal'>
                                    { service.servicio.name }
                                </span>
                            </p>
                            <p className='font-bold flex flex-col'>
                                Edad { '' }
                                <span className='font-normal'>
                                    { new Date().getFullYear() - new Date(service.usuario.dateBirth).getFullYear() }
                                </span>
                            </p>
                        </div>
                    </div>
                    {
                        viewService && (
                            <>
                                {/* Description */}
                                <div className="col-span-full ">
                                    <p className='font-bold flex flex-col'>
                                        Descripción { '' }  
                                        <span className='font-normal overflow-scroll text-left'>
                                            { service.description }
                                        </span>
                                    </p>
                                </div>
                                {/* Ver calificaciones */}
                                <button 
                                    className="col-span-full bg-color4 rounded py-2 text-white font-bold shadow"
                                    onClick={()=> {
                                        setViewRatings(true)
                                    }}
                                >
                                    Ver Calificaciones
                                </button>
                                {/* Ver usuario */}
                                <Link 
                                    className="col-span-full bg-color4 rounded py-2 text-white font-bold shadow"
                                    to={`/inicio/usuario/${service.usuario.id}`}
                                >
                                    Ver usuario
                                </Link>
                            </>
                        )
                    }
                </div>
            ):( <PublicCalificationList service={service} setViewRatings={setViewRatings}/> )}
        </div>
    )
}

export default ActiveServiceOffering;