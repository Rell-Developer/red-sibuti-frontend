// Importaciones
import { useState } from "react";
import dateTransform from "../../../hooks/dateTransform.js";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";

import clienteAxios from "../../../config/axios.jsx";
import Spinner from "../../public/Spinner.jsx";
// Componente
const AgreementsCard = ({agreement}) => {
    // States
    const [open, setOpen] = useState(false);
    const [finished, setFinished] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [ratingFound, setRatingFound] = useState(false);

    const setFinishedService = async () =>{
        try {
            setLoading(true);

            const usuarioId = JSON.parse(sessionStorage.getItem('user')).id;

            let sendRating = await clienteAxios.post('/create-rating',{
                usuarioId,
                agreementId: agreement.id,
                points: rating
            });

            if (sendRating.data.error) {
                console.log('Hubo un error');
                console.log(sendRating.data.message);
                return
            }

            let { data } = await clienteAxios.put(`/update-agreement/${agreement.id}`, {
                finish_date: new Date()
            });

            if (data.error) {
                console.log('Hubo un error');
                console.log(sendRating.data.message);
                return
            }

            agreement.finish_date = new Date();

            setLoading(false);
            setFinished(false);
            setOpen(false);
        } catch (error) {
            console.error('Hubo un error al finalizar el servicio');
            console.error(error.message);
        }
    }

    const getRating = async () => {
        try {
            if (!ratingFound && !open) {
                const usuarioId = JSON.parse(sessionStorage.getItem('user')).id;
                const { data } = await clienteAxios.post(`/get-rating-by-ids`, {
                    usuarioId,
                    agreementId: agreement.id
                });

                console.log(data);

                if (!data.found) {
                    setRating(0);
                    setDescription('');
                    setRatingFound(true);
                }else{
                    setRating(data.result.points);
                    setDescription(data.result.description);
                    setRatingFound(true);
                }

            }

        } catch (error) {
            console.error('Hubo un error al buscar la ponderacion');
            console.error(error.message);
        }
        setOpen(!open);
    }

    return (
        <div 
            className={`
                flex flex-col justify-around items-center p-3 w-full lg:w-5/6 mx-auto 
                rounded my-0 hover:shadow hover:border transition-all
                ${open && 'border'}
                `}
        >
            {
                loading ? ( <Spinner />):(
                    <>
                        <div 
                            className="w-full flex justify-around cursor-pointer"
                            onClick={() => getRating()}    
                        >
                            <div>
                                <img 
                                    src={agreement.service_offering.usuario.imgProfile? `${import.meta.env.VITE_BACKEND_PUBLIC_IMAGES}${agreement.service_offering.usuario.imgProfile}`:"/public/img/generic-user.png"}
                                    alt="user-profile" 
                                    width={50} 
                                    className="rounded-full"/>
                            </div>
                            <div className="mx-2">
                                <div>
                                    <h4 className="font-bold uppercase">
                                        <Link 
                                            className="hover:underline flex items-center"
                                            to={`/inicio/usuario/${agreement.service_offering.usuario.id}`}
                                            >
                                            {agreement.service_offering.usuario.firstName} {""}
                                            {agreement.service_offering.usuario.lastName} {""}
                                            ({agreement.service_offering.servicio.name})

                                            {agreement.service_offering.usuario.verifiedToken && (
                                                <>
                                                    { agreement.service_offering.usuario.verifiedAccount ? (
                                                        <VscVerifiedFilled 
                                                            color="#38A3A5"
                                                            size={20}
                                                        />
                                                    ):(
                                                        <VscVerifiedFilled 
                                                            color="#aaaaaa"
                                                            size={20}
                                                        />
                                                    )
                                                    }
                                                </>
                                                )
                                            }
                                        </Link>
                                    </h4>
                                </div>
                                <div>
                                    <p>
                                        {dateTransform(agreement.start_date)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {
                            open && (
                                <div className="mt-4 w-full">
                                    { !finished ? (
                                            <>
                                                <p className="font-bold" style={{fontSize: "14px"}}>
                                                    Inicio del Acuerdo: {""}
                                                    <span className="font-normal">
                                                        {dateTransform(agreement.start_date)}
                                                    </span>
                                                </p>
            
                                                <p className="font-bold" style={{fontSize: "14px"}}>
                                                    Fin del Acuerdo: {""}
                                                    <span className="font-normal">
                                                        {agreement.finish_date ? dateTransform(agreement.finish_date) : "Aún no ha terminado" }
                                                    </span>
                                                </p>

                                                { !agreement.finish_date ? (
                                                    <button
                                                        className="bg-red-600 transition-all rounded p-1 font-bold text-white w-full hover:bg-red-500 mt-2"
                                                        onClick={() => setFinished(true)}
                                                    >
                                                        Marcar como Terminado
                                                    </button>
                                                ):(
                                                    <div>
                                                        <div className="flex justify-center pt-2">
                                                            {
                                                                [...Array(5)].map((star, index) =>{
                                                                    const currentRating = index + 1;
                                                                    return (
                                                                        <label>
                                                                            <FaStar
                                                                                size={30}
                                                                                color={currentRating <= (rating) ? '#ffc107':'#e4e5e9'}
                                                                            ></FaStar>
                                                                        </label>
                                                                    )
                                                                })
                                                            }       
                                                        </div>
                                                        <div>
                                                            <p className="my-1" style={{fontSize: "14px"}}>
                                                                { description }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                                }
            
                                            </>
                                        ):(
                                            <>  
                                                <p className="font-bold" style={{fontSize: "14px"}}>
                                                    Clasifique el servicio
                                                </p>
                                                <div className="flex justify-center">
                                                    {
                                                        [...Array(5)].map((star, index) =>{
                                                            const currentRating = index + 1;
                                                            return (
                                                                <label>
                                                                    <input 
                                                                        type="radio" 
                                                                        name="rating" 
                                                                        value={currentRating} 
                                                                        onClick={() => rating === currentRating ? setRating(0): setRating(currentRating)} 
                                                                        className="hidden"
                                                                    />
                                                                    <FaStar
                                                                        size={30}
                                                                        color={currentRating <= (hover || rating) ? '#ffc107':'#e4e5e9'}
                                                                        onMouseEnter={()=> setHover(currentRating)}
                                                                        onMouseLeave={()=> setHover(null)}
                                                                        className="cursor-pointer"
                                                                    ></FaStar>
                                                                </label>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div>
                                                    <p className="font-bold" style={{fontSize: "14px"}}>
                                                        Descripcion (opcional)
                                                    </p>
                                                    <textarea 
                                                        name="description" 
                                                        id="description" 
                                                        cols="3" 
                                                        rows="2" 
                                                        className="w-full border rounded"
                                                        value={description}
                                                        onChange={e => setDescription(e.target.value)}
                                                        ></textarea>
                                                </div>
                                                <button
                                                    className="bg-color4 transition-all rounded p-1 font-bold text-white w-full mt-2"
                                                    onClick={() => setFinishedService()}
                                                >
                                                    Guardar
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default AgreementsCard;