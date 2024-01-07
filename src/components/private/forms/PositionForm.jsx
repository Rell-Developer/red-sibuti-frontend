// Importaciones
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../../public/Alert.jsx";
import clienteAxios from "../../../config/axios";
import Spinner from "../../public/Spinner.jsx";

// Componente
const PositionForm = () => {
    // useState
    const [alerta, setAlerta] = useState(null);
    const [loading, setLoading] = useState(null);
    const [position, setPosition] = useState({});
    const [editMode, setEditMode] = useState(false);
    // Parametros del link
    const params = useParams();
    // UseEffect
    useEffect(()=> {
        // let position = searchPosition();
        // setPosition(position);
        // // Verificamos que el parametro tenga id
        if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0) && !position.name) {
            // Por ende, es una lectura o edicion
            setEditMode(false);
            
            const searchPosition = async() => {
                // Buscamos el cargo
                let { data } = await clienteAxios(`/get-position/${params.id}`);
                // Verificamos que exista
                if(data.error){
                    setAlerta({error:true, message: data.message});
                    setTimeout(() => {
                        setAlerta(null);
                    }, 2000);
                    return
                }
                // Establecemos la data guardada
                setPosition(data.data);
            }
            // Buscamos el search position
            searchPosition();
        }

        // Si el parametro para un nuevo cargo
        if (window.location.pathname.split("cargos/")[1] === "nuevo") {
            setEditMode(true);
        }

        setLoading(false);
    });
    // Navegador
    const navigate = useNavigate();
    
    // Al guardar los cambios
    const onSubmit = async (dataPosition) => {
        try {
            setLoading(true);
            // Validacion
            if (!dataPosition.name || !dataPosition.name.trim().includes("")) {
                setLoading(false);
                setAlerta({error: true, message:"El nombre del cargo es obligatorio"});
                return setTimeout(() => setAlerta(null), 2000);
            }
            // Establecemos una ruta dinamica
            let infoPosition;
            let name = `${dataPosition.name[0].toUpperCase()}${dataPosition.name.toLowerCase().slice(1)}`;
            // Verificamos si tiene id, es para editar, sino, es para crear
            if (parseInt(params.id) > 0) {
                let { data } = await clienteAxios.put(`/write-position/${params.id}`, { name });
                infoPosition = data;
            }
            if (window.location.pathname.split("cargos/")[1] === "nuevo") {
                let { data } = await clienteAxios.post("/new-position", { name });
                infoPosition = data;
            }
            // Transformacion del name
            // si hay un error, lo mostramos
            if (infoPosition.error) {
                setLoading(false);
                setAlerta({error:true, message: infoPosition.message});
                setTimeout(() => setAlerta(null), 2000);
                return
            }
            // Agregamos el mensaje de exito
            setAlerta({error:false, message: infoPosition.message});
            setEditMode(false);
            setLoading(false);
            setPosition('');
            // En 2 segundos regresamos a la lista de cargos
            setTimeout(() => {
                setAlerta(null)
                return navigate("/inicio/control/cargos");
            }, 2000);
        } catch (error) {
            console.error(error.message);
        }
    }
    // Retorno
    return (
        <div className="flex flex-col lg:flex-row my-5 bg-white rounded-lg shadow w-96 h-96 items-center">
            <form 
                onSubmit={ (e) => {
                    e.preventDefault();
                    onSubmit(position);
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
                                {/* Nombre del cargo */}
                                <div className="flex flex-col col-span-full">
                                    <label htmlFor="name" className="font-bold text-lg text-center">Nombre del Cargo</label>
                                    {
                                        editMode ? (
                                            <>
                                                <input 
                                                    id="name"
                                                    type="text"
                                                    className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                    placeholder="Ingrese el nombre del cargo"
                                                    value={!position.name ? "":position.name}
                                                    onChange={(e) => setPosition({ name: e.target.value})}
                                                />
                                            </>
                                        ):(
                                            <p className="text-center">{position.name}</p>
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
                                <button 
                                    type="button"
                                    className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                    onClick={() => navigate("/inicio/control/cargos")}
                                >Regresar</button>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    )
}
// Retornamos el componente
export default PositionForm;