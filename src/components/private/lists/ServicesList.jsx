import { useEffect, useState } from "react";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from "../../../config/axios";
import ServiceOffering from "../cards/ServiceOffering.jsx";

const ServicesList = ({user}) => {

    // Servicios Ofrecidos
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const searchServices = async () => {
            try {
                const { data } = await clienteAxios(`/get-service-offerings/${user.id}`);

                // console.log(data);
                if (data.error) {
                    console.log("Hubo un error");
                    return setLoading(false);
                }

                if (data.result.length > 0) {
                    setServices(data.result);
                }
                return setLoading(false);
            } catch (error) {
                console.log("Hubo un error al cargar los servicios");
                console.error(error.message);
            }
        };

        searchServices();
    }, [])
    

    return (
        <>
            <section className="my-5 grid-cols-6">
                <div className="m-5 col-span-6">
                    <h3 className="text-lg uppercase text-color5 font-bold">Servicios</h3>
                    {
                        loading ? (
                            <Spinner />
                        ):(
                            <>
                                <div className="grid grid-cols-3 gap-4 py-5">
                                    {
                                        services.length > 0 ? (
                                            <>
                                                {
                                                    services.map( serv => 
                                                        <ServiceOffering 
                                                            service={serv} 
                                                            serviceList={{services, setServices}} 
                                                            isNewService={false}
                                                            isOwner={user.id === JSON.parse(sessionStorage.getItem("user")).id}/>
                                                    )
                                                }
                                            </>
                                        ):(
                                            <>
                                                {
                                                    user.id !== JSON.parse(sessionStorage.getItem("user")).id && (
                                                        <div className="col-span-full text-center uppercase">
                                                            <h3>Aún no ha ofrecido algun servicio</h3>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }

                                    {
                                        (user.id === JSON.parse(sessionStorage.getItem("user")).id && services.length < 6) && (
                                            <ServiceOffering 
                                                service={{}} 
                                                serviceList={{services, setServices}} 
                                                isNewService={true}/>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default ServicesList;