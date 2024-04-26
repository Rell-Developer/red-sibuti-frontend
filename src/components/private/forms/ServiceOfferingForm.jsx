// Importaciones
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../public/Alert.jsx";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from "../../../config/axios.jsx";
// Componente
const ServiceOfferingForm = () => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [serviceOffering, setService] = useState({
        usuario:{}
    });
    const [services, setServices] = useState([]);
    const [onDelete, setOnDelete] = useState(false);
    const [users, setUsers] = useState([]);
    // Parametros del link
    const params = useParams();
    // UseEffect
    useEffect(()=> {
        // // Verificamos que el parametro tenga id
        if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0) && !serviceOffering.id) {
            // Por ende, es una lectura o edicion
            setEditMode(false);
            // Busquedad del servicio por su id
            const searchService = async() => {
                // Buscamos el cargo
                let { data } = await clienteAxios(`/get-service-offering/${params.id}`);
                // Verificamos que exista
                if(data.error){
                    setAlerta({error:true, message: data.message});
                    setTimeout(() => {
                        setAlerta(null);
                    }, 2000);
                    return
                }
                console.log(data);
                // Establecemos la data guardada
                setService(data.result);
            }
            // Buscamos el search position
            searchService();
        }
        // Si el parametro para un nuevo cargo
        if (window.location.pathname.split("oferta-servicios/")[1] === "nuevo") {
            setEditMode(true);
        }
        if (editMode) {
            // Busqueda de los servicios
            const searchServices = async()=> {
                try {
                    if (services.length === 0) {
                        // Peticion para buscar los servicios
                        const { data } = await clienteAxios("/get-services");
                        // Si existe un error
                        if (data.error) {
                            setAlerta({ error: data.error, message: data.message});
                            setTimeout(() => {
                                setAlerta(null);
                            }, 3000);
                            return
                        }
                        // Colocamos los servicios
                        setServices(data.result);
                    }
                } catch (error) {
                    console.error("Hubo un error al buscar los servicios");
                }
            }

            // Busqueda de los servicios
            const searchUsers = async()=> {
                try {
                    if (users.length === 0) {
                        // Peticion para buscar los servicios
                        const { data } = await clienteAxios("/users");
                        console.log(data);
                        // Si existe un error
                        if (data.error) {
                            setAlerta({ error: data.error, message: data.message});
                            setTimeout(() => {
                                setAlerta(null);
                            }, 3000);
                            return
                        }
                        // console.log(data);
                        // Colocamos los servicios
                        setUsers(data);
                    }
                } catch (error) {
                    console.error("Hubo un error al buscar los servicios");
                }
            }

            searchServices();
            searchUsers();
        }
        setLoading(false);
    });
    // Navegador
    const navigate = useNavigate();
    
    // Al guardar los cambios
    const onSubmit = async (dataService) => {
        try {
            setLoading(true);
            // Validacion
            if (!dataService.servicio || !dataService.usuario) {
                setLoading(false);
                setAlerta({error: true, message:"El servicio y el ofertante son campos obligatorios"});
                return setTimeout(() => setAlerta(null), 3000);
            }
            // console.log(serviceOffering);
            // return
            // Establecemos una ruta dinamica
            let infoService;
            const dataToSend = { 
                ...serviceOffering,
                usuarioId: serviceOffering.usuario.id,
                servicioId: serviceOffering.servicio.id
            }
            // let name = `${dataService.name[0].toUpperCase()}${dataService.name.toLowerCase().slice(1)}`;
            // Verificamos si tiene id, es para editar, sino, es para crear
            if (parseInt(params.id) > 0) {
                let { data } = await clienteAxios.put(`/update-service-offerings/${params.id}`, dataToSend);
                infoService = data;
            }
            if (window.location.pathname.split("oferta-servicios/")[1] === "nuevo") {
                let { data } = await clienteAxios.post("/create-service-offering", dataToSend);
                infoService = data;
            }
            // Transformacion del name
            // si hay un error, lo mostramos
            if (infoService.error) {
                setLoading(false);
                setAlerta({error:true, message: infoService.message});
                setTimeout(() => setAlerta(null), 3000);
                return
            }
            // Agregamos el mensaje de exito
            setAlerta({error:false, message: infoService.message});
            setEditMode(false);
            setLoading(false);
            setService({ usuario:{} });
            // En 3 segundos regresamos a la lista de oferta de servicios
            setTimeout(() => {
                setAlerta(null)
                return navigate("/inicio/control/oferta-servicios");
            }, 3000);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
            setAlerta({error:true, message: error.message});
            setTimeout(() => setAlerta(null), 3000);
            return
        }
    }
    // Eliminar servicio
    const deleteService = async() => {
        try {
            setLoading(true);
            // // Verificamos que el parametro tenga id
            if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0)) {
                // Realizamos la peticion
                const { data } = await clienteAxios.delete(`/delete-service-offerings/${serviceOffering.id}`);
                // Quitamos el spinner de carga
                setLoading(false);
                setAlerta({error:data.error, message: data.message});
                setTimeout(() => setAlerta(null), 3000);
                // si hay un error, lo mostramos
                if (data.error) {
                    return
                }
                // Regresamos a la lista de registros
                return navigate("/inicio/control/oferta-servicios");
            }
        } catch (error) {
            console.error("Hubo un error al eliminar el registro");
            console.error(error.message);
        }
    }
    // Retorno
    return (
        <div className="flex flex-col lg:flex-row my-5 bg-white rounded-lg shadow w-5/6 p-5 items-center">
            <form 
                onSubmit={ (e) => {
                    e.preventDefault();
                    onSubmit(serviceOffering);
                }} 
                className='mx-auto w-full md:w-5/6'
            >
                {
                    loading == null ? (
                        <Spinner/>
                    ):(
                        <>
                            { alerta && <Alert alerta={alerta}/>}
                            <div className="grid grid-cols-12 gap-4">
                                { !onDelete ? (
                                    <>
                                        <div className="m-5 grid grid-cols-12 gap-4 col-span-full">
                                            {/* Servicio */}
                                            <div className="flex flex-col col-span-4">
                                                <label htmlFor="service" className="font-bold text-lg text-center">Servicio</label>
                                                {
                                                    editMode ? (
                                                        <>
                                                            <select 
                                                                id="service"
                                                                type="text"
                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                                value={!serviceOffering.servicio?.id ? "":serviceOffering.servicio.id}
                                                                onChange={(e) => setService({ 
                                                                    ...serviceOffering,
                                                                    servicio: { id: e.target.value, name: e.target.selectedOptions[0].textContent }
                                                                })}
                                                            >
                                                                <option value="">Seleccione un Servicio</option>
                                                                {
                                                                    services.length > 0 && (
                                                                        <>
                                                                            {services.map( serv => <option value={serv.id}>{serv.name}</option>)}
                                                                        </>
                                                                    )
                                                                }
                                                            </select>
                                                        </>
                                                    ):(
                                                        <p className="text-center">{serviceOffering.servicio?.name}</p>
                                                    )
                                                }
                                            </div>
                                            {/* Ofertante */}
                                            <div className="flex flex-col col-span-4">
                                                <label htmlFor="bidder" className="font-bold text-lg text-center">Ofertante</label>
                                                {
                                                    editMode ? (
                                                        <>
                                                            <select 
                                                                id="bidder"
                                                                type="text"
                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                                value={!serviceOffering.usuario.id ? "":serviceOffering.usuario.id}
                                                                onChange={(e) => setService({ ...serviceOffering, usuario: { id: e.target.value, name: e.target.selectedOptions[0].textContent}})}
                                                            >
                                                                <option value="">Seleccione un Ofertante</option>
                                                                {
                                                                    users.length > 0 && (
                                                                        <>
                                                                            {
                                                                                users.map( user => <option value={user.id}>{user.firstName} {user.lastName} - {user.identification}</option>)
                                                                            }
                                                                        </>
                                                                    )
                                                                }
                                                            </select>
                                                        </>
                                                    ):(
                                                        <p className="text-center">{serviceOffering.usuario?.firstName} {serviceOffering.usuario?.lastName} - {serviceOffering.usuario?.identification}</p>
                                                    )
                                                }
                                            </div>
                                            {/* Status */}
                                            <div className="flex flex-col col-span-4">
                                                <label htmlFor="status" className="font-bold text-lg text-center">Estatus</label>
                                                {
                                                    editMode ? (
                                                        <>
                                                            <select 
                                                                id="status"
                                                                type="text"
                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                                value={!serviceOffering.isActive ? "false":serviceOffering.isActive}
                                                                onChange={(e) => setService({ ...serviceOffering, isActive: e.target.value === "true" ? true:false})}
                                                            >
                                                                <option value="true">Activo</option>
                                                                <option value="false">Inactivo</option>
                                                            </select>
                                                        </>
                                                    ):(
                                                        <p className="text-center">{serviceOffering.isActive ? "Activo":"Inactivo"}</p>
                                                    )
                                                }
                                            </div>
                                            {/* Description */}
                                            <div className="flex flex-col col-span-full">
                                                <label htmlFor="description" className="text-center font-bold">Descripcion</label>
                                                {
                                                    editMode ? (
                                                        <>
                                                            <textarea 
                                                                id="status"
                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                                rows={10}
                                                                value={!serviceOffering.description ? "": serviceOffering.description}
                                                                onChange={(e) => setService({ ...serviceOffering, description: e.target.value })}
                                                            >
                                                            </textarea>
                                                        </>
                                                    ):(
                                                        <p className="text-left">{serviceOffering.description}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        {/* Boton de guardado */}
                                        {
                                            (editMode) && (
                                                <button 
                                                    type="submit"
                                                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-4" 
                                                >Guardar Cambios</button>
                                            )
                                        }
                                        {/* Boton de edicion */}
                                        {
                                            (params.id && !editMode) && (
                                                <button 
                                                    type="button"
                                                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-4" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setEditMode(true)
                                                    }}
                                                >Editar</button>
                                            )
                                        }
                                        {
                                            ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0 && !editMode)) && (
                                                <button 
                                                    type="button"
                                                    className="p-3 bg-red-600 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-4" 
                                                    onClick={() => setOnDelete(true)}
                                                >Eliminar</button>
                                            ) 
                                        }
                                        <button 
                                            type="button"
                                            className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-4" 
                                            onClick={() => navigate("/inicio/control/oferta-servicios")}
                                        >Regresar</button>
                                    </>
                                ):(
                                    <>
                                        <div className="col-span-full text-center">
                                            <p>¿Está seguro de eliminar este registro?</p>
                                        </div>
                                        <button 
                                            type="button"
                                            className="p-3 bg-red-600 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-6" 
                                            onClick={() => deleteService()}
                                        >Sí, Eliminar</button>
                                        <button 
                                            type="button"
                                            className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-6" 
                                            onClick={() => setOnDelete(false)}
                                        >Descartar</button>
                                    </>
                                )}
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    )
}

export default ServiceOfferingForm;