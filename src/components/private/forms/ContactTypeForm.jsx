import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../../config/axios";
import Alert from "../../public/Alert.jsx";

const ContactTypeForm = () => {

    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [contact, setContact] = useState({
        max: "",
        name: ""
    });
    const [editMode, setEditMode] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    // UseEffect
    useEffect(()=> {
        // let position = searchPosition();
        // setPosition(position);
        // // Verificamos que el parametro tenga id
        if ((params.id && !isNaN(parseInt(params.id)) && parseInt(params.id) > 0) && !contact.name) {
            // Por ende, es una lectura o edicion
            setEditMode(false);
            
            const searchPosition = async() => {
                // Buscamos el cargo
                let { data } = await clienteAxios(`/get-contact-type/${params.id}`);
                // Verificamos que exista
                if(data.error){
                    setAlerta({error:true, message: data.message});
                    setTimeout(() => {
                        setAlerta(null);
                    }, 2000);
                    return
                }
                // Establecemos la data guardada
                setContact(data.result);
            }
            // Buscamos el search position
            searchPosition();
        }

        // Si el parametro para un nuevo cargo
        if (window.location.pathname.split("tipos-contactos/")[1] === "nuevo") {
            setEditMode(true);
        }

        setLoading(false);
    },[]);

    // Al guardar los cambios
    const onSubmit = async (dataContact) => {
        try {
            setLoading(true);
            // Validacion
            if (Object.values(dataContact).includes("") || Object.values(dataContact).length === 0) {
                setLoading(false);
                setAlerta({error: true, message:"Todos los campos son obligatorios"});
                return setTimeout(() => setAlerta(null), 3000);
            }
            // Validacion de numero
            if (isNaN(dataContact.max) || (Number(dataContact.max) < 1 && Number(dataContact.max) > 5)) {
                setLoading(false);
                setAlerta({error: true, message:"Ingrese una cantidad maxima entre 1 a 5"});
                return setTimeout(() => setAlerta(null), 3000);
            }   
            // Establecemos una ruta dinamica
            let info;
            // let name = `${dataContact.contact[0].toUpperCase()}${dataContact.contact.toLowerCase().slice(1)}`;
            // Verificamos si tiene id, es para editar, sino, es para crear
            if (parseInt(params.id) > 0) {
                let { data } = await clienteAxios.put(`/update-contact-type/${params.id}`, dataContact);
                info = data;
            }
            if (window.location.pathname.split("contactos/")[1] === "nuevo") {
                let { data } = await clienteAxios.post("/create-contact-type", dataContact);
                info = data;
            }
            // si hay un error, lo mostramos
            if (info.error) {
                setLoading(false);
                setAlerta({error:true, message: info.message});
                setTimeout(() => setAlerta(null), 2000);
                return
            }
            // Agregamos el mensaje de exito
            setAlerta({error:false, message: info.message});
            setEditMode(false);
            setLoading(false);
            setContact('');
            // En 2 segundos regresamos a la lista
            setTimeout(() => {
                setAlerta(null)
                return navigate("/inicio/control/tipos-contactos");
            }, 2000);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="flex flex-col lg:flex-row my-5 bg-white rounded-lg shadow w-96 items-center p-5">
            <form 
                onSubmit={ (e) => {
                    e.preventDefault();
                    onSubmit(contact);
                }} 
                className='mx-auto w-full md:w-5/6'
            >
                {
                    loading == null ? (
                        <Spinner/>
                    ):(
                        <>
                            { 
                                alerta ? <Alert alerta={alerta}/> :
                                (
                                    <div className="grid grid-cols-12 gap-4">
                                        {/* Nombre del tipo de contacto */}
                                        <div className="flex flex-col col-span-full">
                                            <label htmlFor="contact" className="font-bold text-lg text-center">Nombre del Tipo de Contacto</label>
                                            {
                                                editMode ? (
                                                    <>
                                                        <input 
                                                            id="contact"
                                                            type="text"
                                                            className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                            placeholder="Ingrese el nombre del tipo de contacto"
                                                            value={!contact.name ? "":contact.name}
                                                            onChange={(e) => setContact({ ...contact, name: e.target.value})}
                                                        />
                                                    </>
                                                ):(
                                                    <p className="text-center">{contact.name}</p>
                                                )
                                            }
                                        </div>
                                        {/* Maximo */}
                                        <div className="flex flex-col col-span-full">
                                            <label htmlFor="max" className="font-bold text-lg text-center">Cantidad Maxima por Usuario</label>
                                            {
                                                editMode ? (
                                                    <>
                                                        <input 
                                                            id="max"
                                                            type="number"
                                                            className="rounded-xl p-2 border-2 border-black mt-2 shadow-md" 
                                                            placeholder="Ingrese un limite por usuario"
                                                            value={!contact.max ? "":contact.max}
                                                            min={1}
                                                            max={5}
                                                            onChange={(e) => setContact({ ...contact, max: e.target.value})}
                                                        />
                                                    </>
                                                ):(
                                                    <p className="text-center">{contact.max}</p>
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
                                                        setEditMode(true);
                                                    }}
                                                >Editar</button>
                                            )
                                        }
                                        <button 
                                            type="button"
                                            className="p-3 bg-color6 rounded-lg shadow font-bold text-white uppercase mx-2 col-span-full" 
                                            onClick={() => navigate("/inicio/control/tipos-contactos")}
                                        >Regresar</button>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </form>
        </div>
    )
}

export default ContactTypeForm