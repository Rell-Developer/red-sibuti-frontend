import { useState } from "react";
import { Link } from "react-router-dom";
import VerifiedSVG from '../../public/svg/VerifiedSVG.jsx';

const ActiveServiceOffering = ({service}) => {

    // states
    const [viewService, setViewService] = useState(false);

    return (
        <div 
            className={`
                bg-white border border-color4 shadow-lg rounded-lg p-5 text-center transition-all cursor-pointer transform
                h-72 overflow-scroll col-span-full
                ${viewService ? "lg:col-span-6":"lg:col-span-3"}
            `}
            onClick={() => setViewService(!viewService)}
        >
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
                            src="/public/img/generic-user.png" 
                            alt="profile-img" 
                            width={"100"} 
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
        </div>
    )
}

export default ActiveServiceOffering;