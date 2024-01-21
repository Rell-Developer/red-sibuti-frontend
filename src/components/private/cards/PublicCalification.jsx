import { useState } from "react";
import { FaStar } from "react-icons/fa";
import dateTransfor from "../../../hooks/dateTransform.js";

const PublicCalification = ({calification}) => {
    const [open, setOpen] = useState(false);
    return (
        <div 
            className={`col-span-6 border p-2 shadow rounded grid grid-cols-12 gap-0 cursor-pointer ${open ? "row-span-3":"row-span-1"}`}
            onClick={() => setOpen(!open)}
        >
            <div className="flex flex-col col-span-4 justify-center text-center items-center">
                <img 
                    src={calification.usuario.imgProfile? `${import.meta.env.VITE_BACKEND_PUBLIC_IMAGES}${calification.usuario.imgProfile}`:"/public/img/generic-user.png"}
                    alt="profile-img" 
                    width={"50"} 
                    className='rounded-full border-color4 border-2 my-2 mx-auto transition-all'
                />
                <div className='flex justify-center'>
                    <h3 className='text-lg font-bold'>{ calification.usuario.firstName } { calification.usuario.lastName }</h3>
                    {
                        calification.usuario.verifiedToken && (
                            <>
                                {
                                    calification.usuario.verifiedAccount ? (
                                        <VerifiedSVG color={"#38A3A5"} size={"30px"}/>
                                    ):(
                                        <VerifiedSVG color={"#aaaaaa"} size={"30px"}/>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col col-span-8">
                <div className="flex flex-col my-1">
                    <p className="font-bold">Calificacion</p>
                    <div className="flex justify-center">
                        {
                            [...Array(5)].map((star, index) =>{
                                const currentRating = index + 1;
                                return (
                                    <label>
                                        <FaStar
                                            size={30}
                                            color={currentRating <= (calification.points) ? '#ffc107':'#e4e5e9'}
                                        ></FaStar>
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    open && (
                        <>
                            {
                                calification.description && (
                                    <div className="w-full my-1">
                                        <p className="font-bold">Descripcion</p>
                                        <p 
                                            className="text-wrap w-full break-words text-left" 
                                            style={{textOverflow:'ellipsis'}}
                                        >
                                            {calification.description}
                                        </p>
                                    </div>
                                )
                            }
                            <div className="my-1 flex flex-col col-span-full">
                                <div>
                                    <p className="font-bold">
                                        Fecha de Inicio: {''}
                                            <span className="font-normal">
                                                { dateTransfor(calification.agreement.start_date) }
                                            </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold">
                                        Fecha de Finalizacion: {''}
                                            <span className="font-normal">
                                                { dateTransfor(calification.agreement.finish_date) }
                                            </span>
                                    </p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default PublicCalification;