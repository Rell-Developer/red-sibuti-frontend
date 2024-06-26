import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from '../../../config/axios.jsx';
import Spinner from "../../public/Spinner.jsx";

const ServiceOffering = ({
        service, 
        editMode = false, 
        isNewService = true,
        serviceList,
        isOwner
    }) => {

    const [newService, setNewService] = useState({
        servicioId: "",
        description:""
    });
    const [createMode, setCreateMode] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [isActive, setIsActive] = useState(null);

    const params = useParams();

    useEffect(() => {
        setIsActive(service.isActive);
    }, [])
    

    // Acciones
    // Cambio de modo
    const changeMode = async () => {
        try {
            setCreateMode(true);
            if (services.length < 1) {
                const { data } = await clienteAxios('/get-services');
                setServices(data.result);
                setLoading(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // Guardar la oferta de servicio
    const handleSubmit = async() => {
        try {
            setLoading(true);

            const { data } = await clienteAxios.post('/create-service-offering', {...newService, usuarioId: params.id});

            console.log(data);

            // setNotification({
            //     message: data.message,
            //     error: data.error
            // });
            
            // setLoading(false);
            // isNewService = false;
            // setCreateMode(false);

            // setNewService({
            //     servicioId: "",
            //     description:""
            // });

            setMessageInCard(data);

            setTimeout(() => {
                service = {
                    ...newService,
                    isActive: true,
                };

                setNotification(null);
                serviceList.setServices( serv => [...serv, service]);
            }, 5000);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Cambiar estatus del servicio
    const changeStatus = async (isActive) => {
        try {
            setLoading(true);

            setTimeout(async () => {
                const { data } = await clienteAxios.put(`/change-status-service/${service.id}`, { isActive });
    
                if (data.error) {
                    console.error(data.message);
                    setLoading(false);
                    return
                }
    
                service = {
                    ...service,
                    isActive
                }
    
                setIsActive(isActive);

                setLoading(false);
                // setCreateMode(true);
                // setMessageInCard(data);
    
                // setTimeout(() => {
                //     isNewService = false;
                //     setNotification(null)
                // }, 5000);
            }, 2000);
            console.log("Cambiando el valor del estatus");
        } catch (error) {
            console.log(error.message);
        }
    }

    const setMessageInCard = (data) => {
        setNotification({
            message: data.message,
            error: data.error
        });
        
        setLoading(false);
        isNewService = false;
        setCreateMode(false);

        setNewService({
            servicioId: "",
            description:""
        });
    }

    const discardChanges = () => {
        setNewService({
            servicioId: "",
            description:""
        });
        setCreateMode(false);
    }

    const createAgreement = async()=> {
        try {
            setLoading(true);

            const dataAgreement = {
                usuarioId: JSON.parse(sessionStorage.getItem("user")).id,
                serviceOfferingId: service.id,
                start_date: new Date()
            }

            const { data } = await clienteAxios.post("/create-agreement", dataAgreement);

            if (data.error) {
                console.log(data.message);
                setLoading(false);
                return
            }
            setLoading(false);
        } catch (error) {
            console.error("Hubo un error al crear el acuerdo");
            console.error(error.message);
        }
    }

    return (
        <>
            {/* Carta principal */}
            <div 
                className={`
                    col-span-1 shadow-lg rounded-lg border w-5/6 mx-auto grid grid-cols-6 gap-4 p-5 transition-all items-center
                    ${!isNewService? '':`
                        ${createMode ? '':`
                            bg-opacity-25 cursor-pointer
                            hover:shadow-xl hover:border-2 hover:border-color4 hover:transform hover:scale-105
                        `}
                    `}
                `}
            >
                {
                    loading ? (
                        <div className="col-span-full">
                            <Spinner/>
                        </div>
                    ):(
                        <>
                            {/* Si no es el boton de nuevo servicio, es una tarjeta de servicio */}
                            {
                                !isNewService ? (
                                    // Informacion del servicio
                                    <>
                                        <div className="col-span-3">
                                            <h3 className="uppercase">
                                                { service.servicioName || service.servicio.name}
                                            </h3>
                                        </div>
                                        <div className="col-span-3">
                                            <div 
                                                className={`
                                                    w-5/6 border rounded-full text-center text-white
                                                    ${ isActive ? 'bg-color4 border-color3':'bg-red-600 border-red-500'}
                                                `}
                                            >
                                                { isActive ? 'Activo':'Inactivo'}
                                            </div>
                                        </div>
                                        <div className="col-span-6">
                                        {
                                            isOwner ? (
                                                <>
                                                    <button
                                                        className={`${!isActive ? "bg-color4":"bg-red-600"}  
                                                            text-white font-bold rounded p-2 mx-auto text-sm uppercase`
                                                        }
                                                        onClick={() => isActive ? changeStatus(false):changeStatus(true)}
                                                    >
                                                        {isActive ? "Dejar de Ofrecer este Servicio":"Habilitar Servicio"}  
                                                    </button>
                                                </>
                                            ):(
                                                <>
                                                    {
                                                        isActive && (
                                                            <button 
                                                                onClick={() => createAgreement()}
                                                                className="bg-color4 text-white font-bold rounded p-2 mx-auto text-sm uppercase w-full"
                                                            >
                                                                Realizar Acuerdo
                                                            </button>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                        </div>
                                    </>
                                ):(
                                    <>
                                        {
                                            !createMode ? (
                                                <>
                                                    {
                                                        !notification ? (
                                                            // El boton de nuevo servicio
                                                            <div className="col-span-full text-center" onClick={() => changeMode()}>
                                                                <h3 className="uppercase">
                                                                    Ofrecer un nuevo servicio
                                                                </h3>
                                                                <div className="flex justify-center">
                                                                    <svg width="40" dataSlot="icon" aria-hidden="true" fill="#38A3A5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                        <path clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" fillRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            // La notificacion
                                                            <div className="col-span-full text-center flex flex-col justify-center items-center">
                                                                <h3 className="uppercase">{ notification.message }</h3>
                                                                {
                                                                    notification.error ? (
                                                                        <svg width={"40"} dataSlot="icon" aria-hidden="true" fill="#FF0000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path clipRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fillRule="evenodd" />
                                                                        </svg>
                                                                    ):(
                                                                        <svg width={"40"} dataSlot="icon" aria-hidden="true" fill="#38A3A5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <path clipRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" fillRule="evenodd" />
                                                                        </svg>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                
                                                </>
                                            ):(
                                                <div className="col-span-full">
                                                    {loading ? (<Spinner/>):(
                                                        // Formulario de nuevo servicio
                                                        // <div className="col-span-full">
                                                        <>
                                                            <div className="w-full flex flex-col my-2">
                                                                <label htmlFor="service" className="font-bold">Servicio</label>
                                                                <select 
                                                                    id="service" 
                                                                    name="service" 
                                                                    className="bg-white border rounded p-1 my-1"
                                                                    value={newService.servicioId}
                                                                    onChange={e => setNewService({...newService, servicioId: e.target.value, servicioName: e.target.selectedOptions[0].textContent})}
                                                                >
                                                                    <option value="">Seleccione un Servicio</option>
                                                                    {
                                                                        services.map( serv => <option value={serv.id}>{serv.name}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="description" className="font-bold">Descripcion</label>
                                                                <textarea 
                                                                    id="description" 
                                                                    name="description" 
                                                                    rows="2" 
                                                                    className="w-full bg-white border rounded p-2 my-1"
                                                                    value={newService.description}
                                                                    onChange={ e => setNewService({...newService, description: e.target.value})}
                                                                ></textarea>
                                                            </div>
                                                            <button 
                                                                className="bg-color4 font-bold text-white rounded px-3 py-1 w-full"
                                                                onClick={() => handleSubmit()}>Guardar</button>
                                                            <button 
                                                                className="bg-color6 font-bold text-white rounded px-3 py-1 w-full my-2"
                                                                onClick={() => discardChanges()}>Descartar</button>
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default ServiceOffering