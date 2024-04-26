// Importaciones
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../public/Alert.jsx";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from "../../../config/axios.jsx";
// Componente
const ServiceForm = () => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [service, setService] = useState({});
    const [onDelete, setOnDelete] = useState(false);
    // Parametros del link
    const params = useParams();
    // UseEffect
    useEffect(()=> {
        // // Verificamos que el parametro tenga id
        if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0) && !service.name) {
            // Por ende, es una lectura o edicion
            setEditMode(false);
            // Busquedad del servicio por su id
            const searchService = async() => {
                // Buscamos el cargo
                let { data } = await clienteAxios(`/get-service/${params.id}`);
                // Verificamos que exista
                if(data.error){
                    setAlerta({error:true, message: data.message});
                    setTimeout(() => {
                        setAlerta(null);
                    }, 2000);
                    return
                }
                // Establecemos la data guardada
                setService(data.result);
            }
            // Buscamos el search position
            searchService();
        }
        // Si el parametro para un nuevo cargo
        if (window.location.pathname.split("servicios/")[1] === "nuevo") {
            setEditMode(true);
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
            if (!dataService.name || !dataService.name.trim().includes("")) {
                setLoading(false);
                setAlerta({error: true, message:"El nombre del servicio es obligatorio"});
                return setTimeout(() => setAlerta(null), 3000);
            }
            // Establecemos una ruta dinamica
            let infoService;
            let name = `${dataService.name[0].toUpperCase()}${dataService.name.toLowerCase().slice(1)}`;
            // Verificamos si tiene id, es para editar, sino, es para crear
            if (parseInt(params.id) > 0) {
                let { data } = await clienteAxios.put(`/update-service/${params.id}`, { name });
                infoService = data;
            }
            if (window.location.pathname.split("servicios/")[1] === "nuevo") {
                let { data } = await clienteAxios.post("/create-service", { name });
                infoService = data;
            }
            // Transformacion del name
            // si hay un error, lo mostramos
            if (infoService.error) {
                setLoading(false);
                setAlerta({error:true, message: infoService.message});
                setTimeout(() => setAlerta(null), 2000);
                return
            }
            // Agregamos el mensaje de exito
            setAlerta({error:false, message: infoService.message});
            setEditMode(false);
            setLoading(false);
            setService('');
            // En 2 segundos regresamos a la lista de cargos
            setTimeout(() => {
                setAlerta(null)
                return navigate("/inicio/control/servicios");
            }, 2000);
        } catch (error) {
            console.error(error.message);
        }
    }
    // Eliminar servicio
    const deleteService = async() => {
        try {
            setLoading(true);
            // // Verificamos que el parametro tenga id
            if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0)) {
                // Realizamos la peticion
                const { data } = await clienteAxios.delete(`/delete-service/${service.id}`);
                // Quitamos el spinner de carga
                setLoading(false);
                setAlerta({error:data.error, message: data.message});
                setTimeout(() => setAlerta(null), 3000);
                // si hay un error, lo mostramos
                if (data.error) {
                    return
                }
                // Regresamos a la lista de registros
                return navigate("/inicio/control/servicios");
            }
        } catch (error) {
            console.error("Hubo un error al eliminar el registro");
            console.error(error.message);
        }
    }
    // Retorno
    return (
        <div className="flex flex-col lg:flex-row my-5 bg-white rounded-lg shadow w-96 h-96 items-center">
            <form 
                onSubmit={ (e) => {
                    e.preventDefault();
                    onSubmit(service);
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
                                        {/* Nombre del cargo */}
                                        <div className="flex flex-col col-span-full">
                                            <label htmlFor="name" className="font-bold text-lg text-center">Nombre del Servicio</label>
                                            {
                                                editMode ? (
                                                    <>
                                                        <input 
                                                            id="name"
                                                            type="text"
                                                            className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                            placeholder="Ingrese el nombre del servicio"
                                                            value={!service.name ? "":service.name}
                                                            onChange={(e) => setService({ name: e.target.value})}
                                                        />
                                                    </>
                                                ):(
                                                    <p className="text-center">{service.name}</p>
                                                )
                                            }
                                        </div>
                                        {/* Boton de guardado */}
                                        {
                                            (editMode) && (
                                                <button 
                                                    type="submit"
                                                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                                >Guardar Cambios</button>
                                            )
                                        }
                                        {/* Boton de edicion */}
                                        {
                                            (params.id && !editMode) && (
                                                <button 
                                                    type="button"
                                                    className="p-3 bg-color4 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
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
                                                    className="p-3 bg-red-600 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                                    onClick={() => setOnDelete(true)}
                                                >Eliminar</button>
                                            ) 
                                        }
                                        <button 
                                            type="button"
                                            className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                            onClick={() => navigate("/inicio/control/servicios")}
                                        >Regresar</button>
                                    </>
                                ):(
                                    <>
                                        <div className="col-span-full text-center">
                                            <p>¿Está seguro de eliminar este registro?</p>
                                        </div>
                                        <button 
                                            type="button"
                                            className="p-3 bg-red-600 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                            onClick={() => deleteService()}
                                        >Sí, Eliminar</button>
                                        <button 
                                            type="button"
                                            className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
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

export default ServiceForm