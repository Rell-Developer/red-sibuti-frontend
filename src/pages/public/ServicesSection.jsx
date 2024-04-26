import { useEffect, useState } from "react"
import { FaHandshake } from "react-icons/fa6";
import clienteAxios from "../../config/axios";
import { Link } from "react-router-dom";
const ServicesSection = () => {

    const [services, setServices] = useState({});

    useEffect(()=>{
        const searchServices = async() => {
            try {
                const { data } = await clienteAxios("/get-public-service-offerings");
                console.log(data);
                setServices(data.result);
            } catch (error) {
                console.error("Hubo un error");
                console.error(error.message);
                setServices({});
            }
        }
        searchServices();
    },[])
    return (
        <section className='w-full h-96 bg-color4 p-5 flex justify-center items-center'>
            <div className='w-full grid grid-cols-12 gap-4 lg:w-5/6 mx-auto items-center'>
                <div className='col-span-4 mx-5 text-left'>
                    <p className='text-4xl text-color1 w-10/12'>
                        { services?.serviceOfferings && `${services?.serviceOfferings} `} Personas han dado el paso de {''}
                        <span className='font-bold text-5xl uppercase'>
                            Ofrecer sus Servicios
                        </span>
                    </p>
                    <Link 
                        to='/iniciar-sesion' 
                        className='bg-color1 flex self-end justify-center w-1/2 px-5 py-2 shadow font-bold rounded my-10 uppercase'
                    >
                        Dar el paso
                    </Link>
                </div>

                <div className="col-span-4 p-5 shadow border bg-white rounded-full mx-auto">
                    <FaHandshake
                        size={150}
                        color="#38A3A5"
                    />
                </div>

                <div className='col-span-4 mx-5 text-right'>
                    <p className='text-4xl text-color1 w-10/12 flex flex-col self-end'>
                        Y { services?.agreements && `${services?.agreements} `} Personas han {''}
                        <span className='font-bold text-5xl uppercase'>
                            disfrutado {''}
                        </span>
                        de los mismos
                    </p>
                    <div className="w-full grid grid-cols-12">
                        <Link 
                            to='/iniciar-sesion' 
                            className='bg-color1 px-5 py-2 shadow font-bold rounded my-10 uppercase col-start-6 col-end-12'
                        >
                            Buscar Ofertantes
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection