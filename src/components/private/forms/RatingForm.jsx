// Importaciones
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "../../public/Alert.jsx";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from "../../../config/axios.jsx";
import RatingStar from "../../public/RatingStar.jsx";
// Componente
const RatingForm = () => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [rating, setRating] = useState({
        usuario:{}
    });
    const [ratingObj, setRatingObj] = useState({});
    const [services, setServices] = useState([]);
    const [onDelete, setOnDelete] = useState(false);
    const [users, setUsers] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);

    // Parametros del link
    const params = useParams();
    // UseEffect
    useEffect(()=> {
        // // Verificamos que el parametro tenga id
        if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0) && !rating.id) {
            // Por ende, es una lectura o edicion
            setEditMode(false);
            // Busquedad del servicio por su id
            const searchRating = async() => {
                // Buscamos el cargo
                let { data } = await clienteAxios(`/get-rating/${params.id}`);
                // console.log(data);
                // Verificamos que exista
                if(data.error){
                    setAlerta({error:true, message: data.message});
                    setTimeout(() => {
                        setAlerta(null);
                    }, 2000);
                    return
                }
                // console.log(data);
                // Establecemos la data guardada
                setRating(data.result);
            }
            // Buscamos el search position
            searchRating();
        }
        // Si el parametro para un nuevo cargo
        if (window.location.pathname.split("calificaciones/")[1] === "nuevo") {
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
                        // console.log(data);
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
            if (!dataService.agreement.service_offering.servicio.id  || !rating.agreement.service_offering.usuario.id) {
                setLoading(false);
                setAlerta({error: true, message:"El servicio y el ofertante son campos obligatorios"});
                return setTimeout(() => setAlerta(null), 3000);
            }
            // Establecemos una ruta dinamica
            let infoService;
            const dataToSend = { 
                // ...ratingObj,
                points: ratingValue,
                description: ratingObj.describe
            }
            // let name = `${dataService.name[0].toUpperCase()}${dataService.name.toLowerCase().slice(1)}`;
            // Verificamos si tiene id, es para editar, sino, es para crear
            if (parseInt(params.id) > 0) {
                let { data } = await clienteAxios.put(`/update-rating/${params.id}`, dataToSend);
                infoService = data;
                // console.log(data);
            }
            // return
            if (window.location.pathname.split("calificaciones/")[1] === "nuevo") {
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
            setRating({ usuario:{} });
            // En 3 segundos regresamos a la lista de oferta de servicios
            setTimeout(() => {
                setAlerta(null)
                return navigate("/inicio/control/calificaciones");
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
    const deleteRating = async() => {
        try {
            setLoading(true);
            // // Verificamos que el parametro tenga id
            if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0)) {
                // Realizamos la peticion
                const { data } = await clienteAxios.delete(`/delete-rating/${rating.id}`);
                // Quitamos el spinner de carga
                setLoading(false);
                setAlerta({error:data.error, message: data.message});
                setTimeout(() => setAlerta(null), 3000);
                // si hay un error, lo mostramos
                if (data.error) {
                    return
                }
                // Regresamos a la lista de registros
                return navigate("/inicio/control/calificaciones");
            }
        } catch (error) {
            console.error("Hubo un error al eliminar el registro");
            console.error(error.message);
        }
    }

    const establecerEditMode = async() => {
        setRatingObj({
            ...rating,
            servicioId: rating?.agreement?.service_offering?.servicio?.id,
            usuarioId: rating?.agreement?.service_offering?.usuario?.id,
            isActive: rating.agreement?.service_offering.isActive,
            description: rating.agreement?.service_offering.description,
            rating: rating.points,
            describe: rating.description,
        });
        setEditMode(true);
    }
    // Retorno
    return (
        <div className="flex flex-col lg:flex-row my-5 bg-white rounded-lg shadow w-5/6 p-5 items-center">
            <form 
                onSubmit={ (e) => {
                    e.preventDefault();
                    onSubmit(rating);
                }} 
                className='mx-auto w-full md:w-5/6'
            >
                {
                    loading ? (
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
                                                <p className="text-center">{rating?.agreement?.service_offering?.servicio?.name}</p>
                                            </div>
                                            {/* Ofertante */}
                                            <div className="flex flex-col col-span-4">
                                                <label htmlFor="bidder" className="font-bold text-lg text-center">Ofertante</label>
                                                <p className="text-center">
                                                    {rating?.agreement?.service_offering?.usuario?.firstName} {rating?.agreement?.service_offering?.usuario?.lastName} - {rating?.agreement?.service_offering?.usuario?.identification}
                                                </p>
                                            </div>
                                            {/* Status */}
                                            <div className="flex flex-col col-span-4">
                                                <label htmlFor="status" className="font-bold text-lg text-center">Estatus</label>
                                                <p className="text-center">{rating.agreement?.service_offering.isActive ? "Activo":"Inactivo"}</p>
                                            </div>
                                            {/* Description */}
                                            <div className="flex flex-col col-span-full">
                                                <label htmlFor="description" className="text-center font-bold">Descripcion del servicio</label>
                                                <p className="text-left">{rating.agreement?.service_offering.description}</p>
                                            </div>
                                            {/* Puntuacion */}
                                            <div className="flex flex-col col-span-full">
                                                <label htmlFor="points" className="text-center font-bold">Puntuacion</label>
                                                <RatingStar 
                                                    rating={rating?.points}
                                                    editMode={editMode}
                                                    ratingValue={ratingValue}
                                                    setRatingValue={setRatingValue}
                                                    // setData={setRatingObj}
                                                    // isRatingForm={true}
                                                    // ratingObj={ratingObj}
                                                />
                                            </div>
                                            {/* Description */}
                                            <div className="flex flex-col col-span-full">
                                                <label htmlFor="observation" className="text-center font-bold">Observacion del cliente</label>
                                                {
                                                    editMode ? (
                                                        <>
                                                            <textarea 
                                                                id="observation"
                                                                className="rounded-xl p-2 border-2 border-black mt-2 shadow-md bg-white" 
                                                                rows={3}
                                                                value={!ratingObj.describe ? "": ratingObj.describe}
                                                                onChange={(e) => setRatingObj({ ...ratingObj, describe: e.target.value })}
                                                            >
                                                            </textarea>
                                                        </>
                                                    ):(
                                                        <p className="text-left">{rating?.description}</p>
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
                                                        establecerEditMode()
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
                                            onClick={() => navigate("/inicio/control/calificaciones")}
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
                                            onClick={() => deleteRating()}
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

export default RatingForm;